import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleProductNavigation = (route) => {
    navigate(route);
  };

  return (
  <footer className="footer-container">
    <div className="footer-main">
      <div className="footer-col">
        <h3>Our Products</h3>
        <ul>
          <li 
            onClick={() => handleProductNavigation('/sweet')}
            style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#B22222'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Sweets
          </li>
          <li 
            onClick={() => handleProductNavigation('/sav')}
            style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#B22222'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Tiffins & Snacks
          </li>
          <li 
            onClick={() => handleProductNavigation('/ghee')}
            style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#B22222'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Ghee Sweets
          </li>
          <li 
            onClick={() => handleProductNavigation('/cake')}
            style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#B22222'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Cakes
          </li>
          <li 
            onClick={() => handleProductNavigation('/milk')}
            style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#B22222'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Milk Sweets
          </li>
          <li 
            onClick={() => handleProductNavigation('/namk')}
            style={{ cursor: 'pointer', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#B22222'}
            onMouseLeave={(e) => e.target.style.color = 'inherit'}
          >
            Namkeen
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>Quick Links</h3>
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Gifts</li>
          <li>Safety Guidelines</li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>Policies</h3>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms &amp; Condition</li>
          <li>Payment Policy</li>
          <li>Refund Policy</li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>Address</h3>
        <ul>
          <li>Panduranga Nagar,   </li>
          <li>Amaravathi main road,</li>
          <li>Nagarallu, Guntur</li>
          <li>Andhra Pradesh 522034</li>
        </ul>
      </div>
      <div className="footer-col footer-hours">
        <h3>Working Hours</h3>
        <div className="footer-hours-content">
          <div className="working-time">Mon - Sun <br />9:00AM - 10:30PM</div>
          <div className="footer-contact">
            <span><FaPhone /> +91 9618335976</span>
            <span><FaWhatsapp /> +91 9618335976</span>
          </div>
          <div className="footer-icons">
            <span className="icon"><FaFacebook/></span> {/* Facebook */}
            <span className="icon"><FaInstagram/></span> {/* Instagram */}
            <span className="icon"><MdMail/></span> {/* Email/Cross */}
            <span className="icon"><FaYoutube/></span> {/* YouTube */}
          </div>
        </div>
      </div>
    </div>
    <hr style={{ 
      margin: '24px auto 16px auto',
      border: 'none',
      borderBottom: '2px solid #000',
      width: '90%'
    }} />
    <div className="footer-bottom">
      &copy; 2025 Naveena Sweets &amp; Bakery All rights reserved
    </div>
  </footer>
);
};

export default Footer;
