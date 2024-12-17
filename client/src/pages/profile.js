import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchUserProfile } from "../services/userService";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile(navigate);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      }
    };

    getUserProfile();
  }, [navigate]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="loading-container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet title="Profile | E-SHOP" description="" keywords="" />
      <div className="container profile py-5">
        <div className="card profile-card shadow-sm mx-auto">
          <div className="profile-header p-4 text-center text-white bg-primary">
            <h3>{user.name}</h3>
            <p className="mb-0">{user.email}</p>
          </div>
          <div className="card-body">
            <h4 className="mb-4 text-center">Your Payments</h4>
            {user.payments && user.payments.length > 0 ? (
              <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                <table className="table table-bordered table-hover">
                  <thead className="table-dark sticky-top">
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th style={{ width: "20%" }}>Payment ID</th>
                      <th>Products</th>
                      <th style={{ width: "15%" }}>Total Price</th>
                      <th style={{ width: "15%" }}>Purchase Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.payments.map((payment, paymentIndex) => (
                      <tr key={paymentIndex}>
                        <td>{paymentIndex + 1}</td>
                        <td>{payment._id}</td>
                        <td>
                          <div className="table-responsive">
                            <table className="table table-sm table-striped mb-0">
                              <thead>
                                <tr>
                                  <th>Product ID</th>
                                  <th>Name</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {payment.products.map((product, productIndex) => (
                                  <tr key={productIndex}>
                                    <td>{product.productId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                        <td>${Math.round(payment.totalAmount)}</td>
                        <td>{new Date(payment.purchasedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center mt-3">You have not purchased any products yet.</p>
            )}
          </div>
          <div className="card-footer text-center">
            <button
              className="btn btn-danger w-50"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
