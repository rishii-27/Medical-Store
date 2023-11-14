import React, { useContext, useState } from "react";
import StoreContext from "./storeContext";

const DisplayMedicine = () => {
  const storeCtx = useContext(StoreContext);

  // State to keep track of selected quantity for each medicine
  const [selectedQuantities, setSelectedQuantities] = useState(1);

  // Function to handle adding to cart
  const addToCart = (med) => {
    // Create an object with relevant information
    const cartItem = {
      name: med.name,
      description: med.description,
      price: med.price,
      quantity: selectedQuantities,
    };
    storeCtx.addToCart(cartItem);
    // You can now use cartItem as needed, for example, add it to a cart state.
    console.log("Added to cart:", cartItem);
  };

  return (
    <div className="container">
      <div className="row">
        {storeCtx.enteredItem.map((med, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5>{med.name}</h5>
                <h6 className="text-muted">₹ {med.price}</h6>
                <p>{med.description}</p>
                <label htmlFor="quantity">Quantity : </label>
                <select
                  name="quantity"
                  id="quantity"
                  onChange={(e) =>
                    setSelectedQuantities(parseInt(e.target.value))
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <br />
                <button
                  className="btn btn-danger"
                  onClick={() => addToCart(med)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMedicine;
