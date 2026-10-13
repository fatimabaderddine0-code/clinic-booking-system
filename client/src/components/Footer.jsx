import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h2>HealthCore Clinic</h2>
          <p>
            Providing quality healthcare services
            for you and your family.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Lebanon</p>
          <p>info@example.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 HealthCore Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;