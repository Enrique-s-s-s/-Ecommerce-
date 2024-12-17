import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { fetchProducts } from '../services/productService';


function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts(); 
        setProducts(products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> 
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <Helmet
        title="Products | E-SHOP"
        description="Browse our featured products. Find the perfect items for you."
        keywords="products, shopping, e-commerce"
      />
      <div className="container product-page py-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="product-card shadow-sm">
                <img src={product.imageUrl} alt={product.name} className="product-img" />
                <div className="product-info">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-price">${product.price}</p>
                  <Link to={`/product/${product._id}`} className="btn btn-primary"> View Details </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
