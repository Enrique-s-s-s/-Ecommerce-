import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function CartPage() {
  const { cart, removeFromCart, calculateTotalPrice } = useCart();

  return (
    <div className="cart-page py-5">
      <Helmet
        title="Cart | E-SHOP"
        description="Review your cart and proceed to checkout."
        keywords="cart, e-commerce, checkout"
      />
      <div className="container">
        <h1 className="text-center">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart text-center">
            <p>Your cart is currently empty.</p>
            <Link to="/products" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="cart-items">
              {cart.map((item, index) => {
                return (
                  <div key={index} className="cart-item shadow-sm p-3 mb-4">
                    <div className="cart-item-image">
                      <img  src={item.imageUrl} alt={item.name} className="img-fluid rounded"/>
                    </div>
                    <div className="cart-item-details">
                      <h2 className="cart-item-name">{item.name}</h2>
                      <p className="cart-item-price">
                        ${item.price} x {item.quantity}
                      </p>
                      <p className="cart-item-total"> Total: ${item.totalPrice} </p>
                      <button className="btn btn-danger mt-3" onClick={() => removeFromCart(item._id)}> Remove </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary text-center">
              <h3 className="total-price">Total: ${Math.round(calculateTotalPrice())}</h3>
              <Link to="/checkout" className="btn btn-success btn-lg mt-3">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
