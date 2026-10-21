
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="admin-mobile-header">
        <h2>🩺 HealthCore</h2>

        <button
          className="admin-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle admin menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {menuOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeMenu}
        />
      )}

      <aside
        className={`admin-sidebar ${
          menuOpen ? "admin-sidebar-open" : ""
        }`}
      >
        <h2>HealthCore</h2>

        <nav className="admin-sidebar-nav">
          <NavLink to="/admin" end onClick={closeMenu}>
            Overview
          </NavLink>

          <NavLink to="/admin/services" onClick={closeMenu}>
            Services
          </NavLink>

          <NavLink to="/admin/bookings" onClick={closeMenu}>
            Bookings
          </NavLink>

          <NavLink to="/admin/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/admin/messages" onClick={closeMenu}>
            Messages
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar;
