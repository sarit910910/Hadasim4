import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AddCovidDataForm = ({ saveCovidData, handleClose }) => {
  const [covidData, setCovidData] = useState({
    covidPositiveDate: '',
    covidRecoveryDate: '',
  });

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCovidData({
      ...covidData,
      [name]: value,
    });
  };

  const handleSave = ()=>{
    if(covidData.covidPositiveDate >= covidData.covidRecoveryDate){
      alert('Invalid Dates. Recovery Date should be greater then test date')
      return
    }
    if(covidData.covidPositiveDate > Date.now() || covidData.covidRecoveryDate > Date.now()){
      alert('Invalid Date. Should be lower then current date')
      return
    }
    saveCovidData(covidData)
  }

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Customer Covid Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="covidPositiveDate" className="form-label">
            Positive Date
          </label>
          <input
            type="date"
            className="form-control"
            id="covidPositiveDate"
            name="covidPositiveDate"
            value={covidData.covidPositiveDate}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="covidRecoveryDate" className="form-label">
            Recovery Date
          </label>
          <input
            type="date"
            className="form-control"
            id="covidRecoveryDate"
            name="covidRecoveryDate"
            value={covidData.covidRecoveryDate}
            onChange={handelInput}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Data
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCovidDataForm;
