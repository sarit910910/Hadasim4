import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Customer.css";
import { CustomerApi } from "./utils";
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(CustomerApi.concat("/data"))
      .then((item) => {
        setData(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-5">
      
    </div>
  );
};
export default Customer;
