import React, { useEffect, useState } from "react";

const StoreContext = React.createContext({});

export const StoreContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://crudcrud.com/api/18d5bbfb61144c829b8324e6d4feb3b9/items", {
      method: "GET",
    })
      .then((response) => response.json()) // Parse the response body as JSON
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addMedsToList = (item) => {
    fetch(`https://crudcrud.com/api/18d5bbfb61144c829b8324e6d4feb3b9/items`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to add medicine. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

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
