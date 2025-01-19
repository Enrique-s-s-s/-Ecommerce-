import React, { Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/global.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './layouts/navbar';
import Footer from './layouts/footer';

const HomePage = lazy(() => import('./pages/home'));
const ProfilePage = lazy(() => import('./pages/profile'));
const AllProducts = lazy(() => import('./pages/products'));
const ProductDetailPage = lazy(() => import('./pages/details'));
const CartPage = lazy(() => import('./pages/cart'));
const CheckoutPage = lazy(() => import('./pages/checkout'));
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Suspense fallback={ 
            <div className="loading-container">
              <div className="spinner"></div> 
              <p>Loading...</p>
             </div>
            }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </div>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();

  const noHeaderFooterRoutes = ['/login', '/register'];

  return (
    <>
      {!noHeaderFooterRoutes.includes(location.pathname) && <Navbar />}
      {children}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
