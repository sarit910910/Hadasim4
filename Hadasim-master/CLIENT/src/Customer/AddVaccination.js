import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AddVaccinationForm = ({ saveVaccination, handleClose }) => {
  const [vaccinationData, setVaccinationData] = useState({
    dateReceived: null,
    manufacturerCode: null,
  });

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setVaccinationData({
      ...vaccinationData,
      [name]: value,
    });
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Vaccination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="dateReceived" className="form-label">
            Date Received
          </label>
          <input
            type="date"
            className="form-control"
            id="dateReceived"
            name="dateReceived"
            value={vaccinationData.dateReceived}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="manufacturerCode" className="form-label">
            Manufacturer Code
          </label>
          <input
            className="form-control"
            id="manufacturerCode"
            name="manufacturerCode"
            value={vaccinationData.manufacturerCode}
            onChange={handelInput}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>saveVaccination(vaccinationData)}>
          Save Data
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVaccinationForm;
