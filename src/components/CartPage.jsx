import React, { useContext } from "react";
import { MyContext } from "./context";

function CartPage() {
  const { cartItems, updateCartCount } = useContext(MyContext);

  return (
    <div>
      <h1>Cart Page</h1>
      <div className="cart-main">
        {cartItems.map((item) => (
          <div className="main-box" key={item.id}>
            <div className="box">
              <img
                src={item.image}
                alt="Product-image"
                height={500}
                width={500}
              />
            </div>
            <div className="cart-box2">
              <div className="box-category">Categoty / {item.category}</div>
              <div className="cart-box-title">{item.title}</div>
              <div className="cart-box-text">{item.description}</div>
              <div>
                Rating: {item.rating.rate} ({item.rating.count} Reviews)
              </div>
              <div>
                Price : <b>$</b>
                {item.price}
              </div>
              <div className="input-group mb-3" style={{ maxWidth: "150px" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => updateCartCount(item.id, -1)}
                  disabled={item.count <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={item.count}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => updateCartCount(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;
