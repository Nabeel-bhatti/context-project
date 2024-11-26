import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "./context";


function Header() {

    const {count}= useContext(MyContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart-Items
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/todos">
                Todos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts">
                Blogs
              </NavLink>
            </li>
          </ul>
          <button type="button" className="btn btn-primary position-relative">
            <NavLink className="nav-link" to="/cart">
              <i className="bi bi-cart"></i> Cart
            </NavLink>

            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {count}<span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
