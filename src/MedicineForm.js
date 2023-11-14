import React, { useContext, useRef } from "react";
import StoreContext from "./storeContext";

const MedicineForm = () => {
  const medInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const storeCtx = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMedicineObj = {
      name: medInputRef.current.value,
      description: descriptionInputRef.current.value,
      price: priceInputRef.current.value,
    };
    console.log("New Medicine Object:", newMedicineObj);
    storeCtx.addToList(newMedicineObj);

    // Optionally, you can clear the form input values using useRef:
    medInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    priceInputRef.current.value = "";
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">Medicine Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="medInput" className="form-label fw-bold">
            Medicine Name
          </label>
          <input
            type="text"
            className="form-control"
            id="medInput"
            ref={medInputRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label fw-bold">
            Description
          </label>
          <textarea
            className="form-control"
            id="descriptionInput"
            ref={descriptionInputRef}
            rows="2"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priceInput" className="form-label fw-bold">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="priceInput"
            ref={priceInputRef}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;
