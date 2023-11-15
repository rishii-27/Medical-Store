import React, { useEffect, useState } from "react";

const StoreContext = React.createContext({});

export const StoreContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://crudcrud.com/api/d271cb6de91a427ebe878e143104f588/items", {
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

  useEffect(() => {
    // Fetch data from the API
    fetch("https://crudcrud.com/api/d271cb6de91a427ebe878e143104f588/cart", {
      method: "GET",
    })
      .then((response) => response.json()) // Parse the response body as JSON
      .then((data) => {
        setCartItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addMedsToList = (item) => {
    fetch(`https://crudcrud.com/api/d271cb6de91a427ebe878e143104f588/items`, {
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
    fetch(`https://crudcrud.com/api/d271cb6de91a427ebe878e143104f588/cart`, {
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

    setCartItems([...cartItems, item]);
  };

  const removeFromCartHandle = (id) => {
    // Send DELETE request to the API
    fetch(
      `https://crudcrud.com/api/d271cb6de91a427ebe878e143104f588/cart/${id}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        // Fetch updated cart items from the API
        return fetch(
          `https://crudcrud.com/api/d271cb6de91a427ebe878e143104f588/cart`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
      });
  };

  const contextValue = {
    enteredItem: items,
    addToList: addMedsToList,
    cartItems: cartItems,
    addToCart: addMedsToCart,
    removeCartItem: removeFromCartHandle,
  };
  console.log(cartItems);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
