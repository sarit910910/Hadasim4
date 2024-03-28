import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import { CustomerApi } from "../utils";

const CustomerList = () => {
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(CustomerApi.concat("/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setCustomer(customer.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios
      .get(CustomerApi)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (customer.length < 0) {
    return <h1>no Customer found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Identity Number</th>
              <th>Date of Birth</th>
              <th>City</th>
              <th>Street</th>
              <th>Num of Street</th>
              <th>Phone</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customer?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.idNumber}</td>
                  <td>{item.birthDate}</td>
                  <td>{item.address?.city}</td>
                  <td>{item.address?.street}</td>
                  <td>{item.address?.number}</td>
                  <td>{item.phone}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <Link to={`/edit-customer/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/customers/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default CustomerList;
