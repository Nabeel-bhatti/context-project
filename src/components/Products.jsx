import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "./context";

function Products() {
  const [data, setData] = useState([]);
  const { addToCart } = useContext(MyContext);
  const { addTodos } = useContext(MyContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const pdata = await response.json();
        setData(pdata);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
    console.log("useEffect running");
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <h2>Data</h2>
      <div className="main">
        {data.map((item) => (
          <div className="box" key={item.id}>
            <img
              src={item.image}
              alt="Product-image"
              height={200}
              width={150}
            />
            <div className="box-title">{item.title}</div>
            <div className="box-text">{item.description}</div>
            <div>
              Rating: {item.rating.rate} ({item.rating.count} Reviews)
            </div>
            <div>
              Price : <b>$</b>
              {item.price}
            </div>
            <div className="btnGroup">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addToCart(item);
                }}
              >
                Add to cart...
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  addTodos(item);
                }}
              >
                Purchase Later
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
