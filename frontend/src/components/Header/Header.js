import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <i className="fas fa-graduation-cap"></i>
          <span>SkillCraft Pro</span>
        </Link>
        
        <nav className="nav">
          <ul>
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>Courses</Link>
            </li>
            <li>
              <a href="#traditional-trades">Traditional Trades</a>
            </li>
            <li>
              <a href="#creators">For Creators</a>
            </li>
            <li>
              <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
          <button className="btn btn-outline">Login</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
