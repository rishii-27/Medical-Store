import React, { useState } from "react";

const StoreContext = React.createContext({});

export const StoreContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addMedsToList = (item) => {
    setItems([...items, item]);
  };

  const addMedsToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const contextValue = {
    enteredItem: items,
    addToList: addMedsToList,
    cartItems: cartItems,
    addToCart: addMedsToCart,
  };
  console.log(contextValue.enteredItem);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
