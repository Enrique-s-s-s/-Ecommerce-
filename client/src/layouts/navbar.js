import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

function NavigationBar() {
  const { countCart } = useCart();
  const count = countCart();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    alert('You have been signed out.');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ET.Ecommerce
        </Link>

        <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                <i className="fas fa-box-open"></i> Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <i className="fas fa-shopping-cart"></i> Cart
                {count > 0 && <span className="badge bg-danger ms-1">{count}</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/checkout" className="nav-link">
                <i className="fas fa-credit-card"></i> Checkout
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle"  id="accountDropdown" data-bs-toggle="dropdown" >
                  <i className="fas fa-user"></i> User
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <i className="fas fa-user-circle"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleSignOut} >
                      <i className="fas fa-sign-out-alt"></i> Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle"  id="accountDropdown" data-bs-toggle="dropdown" >
                  <i className="fas fa-user"></i> Account
                </Link>
                <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                  <li>
                    <Link to="/login" className="dropdown-item">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="dropdown-item">
                      <i className="fas fa-user-plus"></i> Register
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
