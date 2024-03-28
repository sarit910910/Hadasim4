
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SERVER.Models;
using SERVER.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomerController(CustomerService customerService) =>
            _customerService = customerService;

        [HttpGet]
        public async Task<List<Customer>> Get() =>
            await _customerService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Customer>> Get(string id)
        {
            var customer = await _customerService.GetAsync(id);

            if (customer is null)
            {
                return NotFound();
            }

            return customer;
        }
        [HttpGet("data")]
        public async Task<(object, object)> Data()
        {
            var notVaccinated = await _customerService.GetAsyncNotVaccinated();

            var positivePerDate = await _customerService.PositivePerDate();

            return (notVaccinated, positivePerDate);

        }
        [HttpPost]
        public async Task<IActionResult> Post(Customer newCustomer)
        {
            await _customerService.CreateAsync(newCustomer);

            return CreatedAtAction(nameof(Get), new { id = newCustomer.IdNumber }, newCustomer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Customer updatedCustomer)
        {
            var customer = await _customerService.GetAsync(id);

            if (customer is null)
            {
                return NotFound();
            }

            updatedCustomer.IdNumber = customer.IdNumber;

            await _customerService.UpdateAsync(id, updatedCustomer);

            return NoContent();
        }
        [HttpPut("{id}/vaccination")]
        public async Task<IActionResult> AddVaccination(string id, Vaccination vaccination)
        {
            await _customerService.AddVaccinationAsync(id, vaccination);
            return NoContent();
        }
        [HttpPut("{id}/covid-data")]
        public async Task<IActionResult> UpdateCovidData(string id, [FromQuery] DateTime covidPositiveDate, [FromQuery] DateTime covidRecoveryDate)
        {
            await _customerService.UpdateCovidDataAsync(id, covidPositiveDate, covidRecoveryDate);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var customer = await _customerService.GetAsync(id);

            if (customer is null)
            {
                return NotFound();
            }

            await _customerService.RemoveAsync(id);

            return NoContent();
        }

    }
}