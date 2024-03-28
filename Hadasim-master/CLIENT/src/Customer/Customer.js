import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Customer.css";
import { CustomerApi } from "../utils";
import AddCovidDataForm from "./AddCovidDataModal";
import AddVaccinationForm from "./AddVaccination";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const { id } = useParams();
  const [covidDataModal, setCovidDataModal] = useState(false);
  const [vaccinationModal, setVaccinationModal] = useState(false);

  useEffect(() => {
    getCustomer();
  }, []);
  const handelSaveCovidData = async ({
    covidPositiveDate,
    covidRecoveryDate,
  }) => {
    const url = `${CustomerApi}/${id}/covid-data?covidPositiveDate=${covidPositiveDate}&covidRecoveryDate=${covidRecoveryDate}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    if (response.ok) {
      getCustomer();
    } else {
      alert("Failed to save covid data");
    }
    setCovidDataModal(false);
  };

  const handelAddVaccination = async (data) => {
    const url = `${CustomerApi}/${id}/vaccination`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    if (response.ok) {
      getCustomer();
    } else {
      alert("Failed to save vaccination");
    }
    setVaccinationModal(false);
  };
  const getCustomer = () => {
    axios
      .get(CustomerApi.concat("/") + id)
      .then((item) => {
        setCustomer(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{customer.firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{customer.lastName}</td>
          </tr>
          <tr>
            <td>Identity Number</td>
            <td>{customer.idNumber}</td>
          </tr>
          <tr>
            <td>Birth Date</td>
            <td>{customer.birthDate}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{customer.phone}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{customer.mobile}</td>
          </tr>
          {customer.covidPositiveDate && (
            <tr>
              <td>Covid Positive Date</td>
              <td>{customer.covidPositiveDate}</td>
            </tr>
          )}
          {customer.covidRecoveryDate && (
            <tr>
              <td>Covid Recovery Date</td>
              <td>{customer.covidRecoveryDate}</td>
            </tr>
          )}
        </tbody>
      </table>
      {!customer.covidPositiveDate && (
        <button onClick={() => setCovidDataModal(true)}>Add Covid Data</button>
      )}
      {(!customer.vaccinations || customer.vaccinations?.length < 4) && (
        <button onClick={() => setVaccinationModal(true)}>
          Add Vaccination
        </button>
      )}
      <h2>Vaccinations</h2>
      {customer.vaccinations?.map((vaccination, idx) => (
        <div key={idx}>
          <strong>Date Received: </strong>
          <span>{vaccination.dateReceived}</span>
          <strong>Manufacturer Code: </strong>
          <span>{vaccination.manufacturerCode}</span>
        </div>
      ))}
      {covidDataModal && (
        <AddCovidDataForm
          saveCovidData={handelSaveCovidData}
          handleClose={() => setCovidDataModal(false)}
        />
      )}
      {vaccinationModal && (
        <AddVaccinationForm
          saveVaccination={handelAddVaccination}
          handleClose={() => setVaccinationModal(false)}
        />
      )}
    </div>
  );
};
export default Customer;
