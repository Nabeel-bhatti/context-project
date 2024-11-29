import React, { useContext } from "react";
import { MyContext } from "./context";

function Todos() {
  const { todosItems, dlt, updateTodoCount } = useContext(MyContext);

  return (
    <div>
      <h1>Todos Page</h1>
      <p>Todos Page</p>
      <p>Todos{input}</p>
      <div className="todos-main">
        {todosItems.map((item) => (
          <div className="todo-main-box" key={item.id}>
            <div className="todos-box1">
              <img
                src={item.image}
                alt="Product-image"
                height={50}
                width={50}
              />
            </div>
            <div className="todos-box2">
              <button
                type="button"
                onClick={() => dlt(item.id)}
                className="btn btn-danger"
              >
                x
              </button>
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
                  onClick={() => updateTodoCount(item.id, -1)}
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
                  onClick={() => updateTodoCount(item.id, 1)}
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

export default Todos;
