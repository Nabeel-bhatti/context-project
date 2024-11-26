import React, { createContext, useState } from "react";

export const MyContext = createContext();

export function DataProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [todosItems, setTodosItems] = useState([]);
  const [count, setCount] = useState(0);

  // const addToCart = (item) => {
  //   setCartItems((prevItems) => {
  //     const itemExists = prevItems.some((cartItem) => cartItem.id === item.id);
  //     if (!itemExists) {
  //       setCount((count) => count + 1);
  //       return [...prevItems, { ...item, count: 1 }];
  //     }

  //     return prevItems;
  //   });
  // };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some((cartItem) => cartItem.id === item.id);

      if (itemExists) {
        const updatedItems = prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );

        setCount((count) => count + 1);
        return updatedItems;
      } else {
        setCount((count) => count + 1);
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };

  console.log(count);

  const updateCartCount = (itemId, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, count: item.count + increment } : item
      )
    );
    setCount((count) => count + increment);
  };

  // const addTodos = (item) => {
  //   setTodosItems((prevItems) => {
  //     const itemExists = prevItems.some((todoItem) => todoItem.id === item.id);
  //     if (!itemExists) {
  //       return [...prevItems, { ...item, count: 1 }];
  //     }
  //     return prevItems;
  //   });
  // };

  const addTodos = (item) => {
    setTodosItems((prevItems) => {
      const itemExists = prevItems.some((todosItem) => todosItem.id === item.id);

      if (itemExists) {
        const updatedTodos = prevItems.map((todosItem) =>
          todosItem.id === item.id
            ? { ...todosItem, count: todosItem.count + 1 }
            : todosItem
        );

        return updatedTodos;
      } else {
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };
  

  const updateTodoCount = (itemId, increment) => {
    setTodosItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, count: item.count + increment } : item
      )
    );
  };

  const dlt = (itemId) => {
    setTodosItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <MyContext.Provider
      value={{
        updateTodoCount,
        updateCartCount,
        count,
        cartItems,
        addToCart,
        todosItems,
        addTodos,
        dlt,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
