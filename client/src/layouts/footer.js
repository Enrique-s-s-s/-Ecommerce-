import React from 'react';
import '../styles/footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="container text-center">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Erique.T / All Rights Reserved.
        </p>
        <div className="social-icons">
          <a href="https://github.com/Enrique-s-s-s" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/E.n.r.i.q.u.eSsSsSs/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/enriqueturmanidze/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
