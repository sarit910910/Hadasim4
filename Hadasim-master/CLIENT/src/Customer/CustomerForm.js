import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Customer.css";
import { CustomerApi } from "../utils";
const initialCustomer = {
  id: "",
  idNumber: "",
  firstName: "",
  lastName: "",
  address: {
    city: "",
    street: "",
    number: 0,
  },
  birthDate: "",
  phone: "",
  mobile: "",
};
const CustomerForm = ({ onEdit }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState(initialCustomer);
  const { id } = useParams();

  useEffect(() => {
    onEdit ? getCustomer() : setCustomer(initialCustomer);
  }, []);

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
  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handelAddressInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCustomer({
      ...customer,
      address: {
        ...customer.address,
        [name]: value,
      },
    });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const url = onEdit ? CustomerApi.concat("/") + id : CustomerApi;
      const method = onEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        body: JSON.stringify(customer),
        headers: { "Content-Type": "application/json" },
        mode: 'cors'
      });

      if (response.ok) {
        navigate("/customers");
      } else {
        console.error("Form submission failed!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="customer-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Customer Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={customer.firstName}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={customer.lastName}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="idNumber" className="form-label">
            Identity Number
          </label>
          <input
            type="number"
            className="form-control"
            id="idNumber"
            name="idNumber"
            value={customer.idNumber}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Date Of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={customer.birthDate}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={customer.address.city}
            onChange={handelAddressInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">
            Street
          </label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={customer.address.street}
            onChange={handelAddressInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Num Of Street
          </label>
          <input
            type="number"
            className="form-control"
            id="number"
            name="number"
            value={customer.address.number}
            onChange={handelAddressInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="number"
            className="form-control"
            id="mobile"
            name="mobile"
            value={customer.mobile}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Submit
        </button>
      </form>
     
    </div>
  );
};

export default CustomerForm;
