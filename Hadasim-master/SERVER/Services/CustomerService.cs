using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using MongoDB.Bson;
using MongoDB.Driver;
using SERVER.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SERVER.Services

{
    public class CustomerService
    {
        private readonly IMongoCollection<Customer> _customerCollection;

        public CustomerService(
            IOptions<CustomerDBSettings> customerDBSettings)
        {
            var mongoClient = new MongoClient(
                customerDBSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                customerDBSettings.Value.DatabaseName);

            _customerCollection = mongoDatabase.GetCollection<Customer>(
                customerDBSettings.Value.CustomerCollectionName);
        }

        public async Task<List<Customer>> GetAsync() =>
            await _customerCollection.Find(_ => true).ToListAsync();

        public async Task<Customer?> GetAsync(string id) =>
            await _customerCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Customer newCustomer) =>
            await _customerCollection.InsertOneAsync(newCustomer);

        public async Task UpdateAsync(string id, Customer customer)
        {

            FilterDefinition<Customer> filter = Builders<Customer>.Filter.Eq("Id", id);
            UpdateDefinition<Customer> update = Builders<Customer>.Update
            .Set("FirstName", customer.FirstName)
            .Set("LastName", customer.LastName)
            .Set("Phone", customer.Phone)
            .Set("Mobile", customer.Mobile)
            .Set("Address", customer.Address);
            await _customerCollection.UpdateOneAsync(filter, update);
            return;
        }

        public async Task UpdateCovidDataAsync(string id, DateTime covidPositiveDate, DateTime covidRecoveryDate)
        {

            FilterDefinition<Customer> filter = Builders<Customer>.Filter.Eq("Id", id);
            UpdateDefinition<Customer> update = Builders<Customer>.Update
            .Set("CovidPositiveDate", covidPositiveDate)
            .Set("CovidRecoveryDate", covidRecoveryDate);
            await _customerCollection.UpdateOneAsync(filter, update);
            return;
        }
        public async Task AddVaccinationAsync(string id, Vaccination vaccination)
        {
            FilterDefinition<Customer> filter = Builders<Customer>.Filter.Eq("Id", id);
            UpdateDefinition<Customer> update = Builders<Customer>.Update.Push("Vaccinations", vaccination);
            await _customerCollection.UpdateOneAsync(filter, update);
            return;
        }

        public async Task RemoveAsync(string id) =>
            await _customerCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Customer>> GetAsyncNotVaccinated() =>
            await _customerCollection.Find(x => x.Vaccinations.Count == 0).ToListAsync();


        public async Task<List<BsonDocument>> PositivePerDate() =>
        await _customerCollection.Aggregate()
                       .Match(x => x.CovidPositiveDate.Value.Month == DateTime.Now.Month)
                       .Group(new BsonDocument { { "_id", new BsonDocument { { "month", new BsonDocument("$month", "$CovidPositiveDate.DateTime") }, { "day", new BsonDocument("$dayOfMonth", "$CovidPositiveDate.DateTime") }, { "year", new BsonDocument("$year", "$CovidPositiveDate.DateTime") } } }, { "count", new BsonDocument("$sum", 1) } })
                       .ToListAsync();

    }
}
