import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";
import { placeOrder } from '../services/orderService';


function CheckoutPage() {
  const { cart, calculateTotalPrice } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "creditCard",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to proceed to checkout!");
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };
  
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      await placeOrder(customerDetails, cart, setOrderPlaced);
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      setError(err.message);
    }
    
  }; 

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <main>
      <Helmet
        title="Checkout | E-SHOP"
        description="SOMETHING."
        keywords=""
      />
      <div className="container checkout-page mt-5">
        <h1 className="text-center mb-4">Checkout</h1>

        {orderPlaced ? (
          <div className="alert alert-success bg-dark text-center">
            <h3 className="text-gray">Thank you for your order, {customerDetails.name}!</h3>
            <p>Your order has been placed successfully.</p>
          </div>
        ) : (
          <div className="row py-5">
            <div className="col-md-6 mb-4">
              <h3 className="mb-3">Order Summary</h3>
              {cart.map((item, index) => (
                <div key={index} className="mb-3 border-bottom pb-2">
                  <h5>{item.name}</h5>
                  <p>${item.price} x {item.quantity}</p>
                  <p>Price: ${item.totalPrice}</p>
                </div>
              ))}
              <h4 className="mt-3">Total: ${Math.round(calculateTotalPrice())}</h4>
            </div>

            <div className="col-md-6">
              <h3 className="mb-3">Customer Details</h3>
              <form onSubmit={handlePlaceOrder}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    name="paymentMethod"
                    value={customerDetails.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cashOnDelivery">Cash on Delivery</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CheckoutPage;
