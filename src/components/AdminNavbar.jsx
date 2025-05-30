import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import image from "./Images/logo.png";

export default function AdminNavbar(props) {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const items = useCart();
  const isAdminLoggedIn = localStorage.getItem('adminToken'); // Check if admin is logged in

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin'); // Redirect to admin login page
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-warning fixed-top position-sticky mb-5"
        style={{
          boxShadow: '0px 10px 20px black',
          filter: 'blur(20)',
          position: 'fixed',
          zIndex: '10',
          width: '100%',
        }}
      >
        <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
            <img
              src={image}
              alt="ImageLogo"
              style={{ width: "4.5rem", marginLeft: "3rem" }}
            />
          </Link>
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
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/admin">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/all">
                  Order History
                </Link>
              </li>
            </ul>
            {isAdminLoggedIn ? ( // Render the logout button only if admin is logged in
              <div>
                <button onClick={handleLogout} className="btn bg-white text-warning mx-2">
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white text-warning mx-1 " to="/adminlogin">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
