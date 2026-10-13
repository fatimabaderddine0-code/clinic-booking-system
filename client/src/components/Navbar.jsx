import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setisOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2>🩺 HealthCore</h2>

      <button
        type="button"
        className={`menu-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setisOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setisOpen(false)}>
          Home
        </Link>

        <Link to="/about" onClick={() => setisOpen(false)}>
          About
        </Link>

        <Link to="/services" onClick={() => setisOpen(false)}>
          Services
        </Link>

        <Link to="/contact" onClick={() => setisOpen(false)}>
          Contact
        </Link>

        <Link
          to="/booking"
          className="nav-book-btn"
          onClick={() => setisOpen(false)}
        >
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;