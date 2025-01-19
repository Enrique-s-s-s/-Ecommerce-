import React from 'react';
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <>
      <Helmet
        title="Home | E-SHOP"
        description="Welcome to the best e-commerce store. Shop for your favorite products!"
        keywords="e-commerce, shopping, best products"
      />

      <main>
        <section className="hero">
          <div className="container text-center text-white">
            <h1 className="hero-title" aria-label="Welcome to Our Store">
              Welcome to Our Store
            </h1>
            <p className="hero-description">
              Your one-stop shop for the best products!
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary"> Shop Now </button>
              <button className="btn"> Learn More </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
