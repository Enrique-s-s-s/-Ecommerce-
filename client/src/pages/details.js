import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";
import { fetchProductDetails } from '../services/productService';


function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await fetchProductDetails(id); 
        setProduct(product);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity, totalPrice };
    addToCart(productWithQuantity);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value < 1 ? 1 : parseInt(event.target.value); 
    setQuantity(newQuantity);
  };

  const totalPrice = product ? (product.price * quantity).toFixed(2) : "0.00";

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> 
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-detail-page vh-100">
      <Helmet
        title={product.name || "Product Details"}
        description={product.description || "Detailed view of the product"}
        keywords={product.name ? `product, ${product.name}, buy` : "product details"}
      />
      <div className="container">
        <div className="product-detail shadow-lg p-4 rounded">
          <div className="row">
            <div className="col-md-6 product-image">
              <img src={product.imageUrl} alt={product.name} className="img-fluid rounded" />
            </div>

            <div className="col-md-6 product-info">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>

              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={quantity}  onChange={handleQuantityChange}   min="1" 
                  className="form-control"/>
              </div>

              <div className="total-price">
                <p>Total Price: ${totalPrice}</p>
              </div>

              <div className="product-actions">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>

                {addedToCart && (
                  <div className="added-to-cart-message">
                    Product added to cart!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
