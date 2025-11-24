import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/Cart/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  const handleCheckout = () => {
    // In real app, this would redirect to payment gateway
    alert('Redirecting to secure checkout...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <i className="fas fa-shopping-cart fa-3x"></i>
            <h2>Your cart is empty</h2>
            <p>Browse our courses and add some learning to your cart!</p>
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} course{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div 
                  className="cart-item-image"
                  style={{ backgroundColor: item.imageColor }}
                ></div>
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-instructor">{item.instructor}</p>
                  <div className="cart-item-meta">
                    <span><i className="far fa-clock"></i> {item.duration}</span>
                    <span><i className="fas fa-users"></i> {item.students} students</span>
                  </div>
                </div>
                <div className="cart-item-price">
                  R {item.price}
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>R {getCartTotal()}</span>
              </div>
              
              <div className="summary-row">
                <span>Discount:</span>
                <span className="discount">-R 0</span>
              </div>
              
              <div className="summary-row total">
                <span>Total:</span>
                <span>R {getCartTotal()}</span>
              </div>

              <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                <i className="fas fa-lock"></i>
                Proceed to Checkout
              </button>

              <div className="payment-methods">
                <h4>Secure Payment Methods</h4>
                <div className="payment-icons">
                  <span className="payment-method">FNB EFT</span>
                  <span className="payment-method">PayFast</span>
                  <span className="payment-method">PayShap</span>
                  <span className="payment-method">PayPal</span>
                  <span className="payment-method">Stripe</span>
                </div>
              </div>

              <button 
                className="btn btn-outline clear-cart-btn"
                onClick={clearCart}
              >
                <i className="fas fa-trash"></i>
                Clear Cart
              </button>

              <div className="security-notice">
                <i className="fas fa-shield-alt"></i>
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
