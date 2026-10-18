import { useState,useEffect } from "react";
import api from "../api/api";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
function AdminDashoard(){
const navigate = useNavigate();

const handleLogout = () => {
  sessionStorage.removeItem("adminToken");
  navigate("/admin/login", { replace: true });
};
    const[services,setServices]=useState([]);
    const[bookings,setBookings]=useState([]);
    useEffect(()=>{
        const fetchDashboardData = async ()=>{
            const token = sessionStorage.getItem("adminToken");
            try {
                const servicesResponse = await api.get("/services");
                const bookingsResponse = await api.get("/bookings", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
                setServices(servicesResponse.data);
                setBookings(bookingsResponse.data);
            }
            catch (error) {
  if (error.response?.status === 401) {
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  } else {
    console.error("Error fetching dashboard data:", error);
  }
}
        };
        fetchDashboardData();
     },[navigate]);
    const totalServices = services.length;
    const totalBookings = bookings.length;

    const pendingBookings = bookings.filter(
      (booking) => booking.status === "pending"
      ).length;

    const confirmedBookings = bookings.filter(
     (booking) => booking.status === "confirmed"
      ).length;

  return (
  <div className="admin-dashboard">

    <div className="admin-dashboard-header">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage clinic services and bookings.</p>
      </div>

      <button
        className="admin-logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>

    <div className="admin-stats-grid">

      <div className="admin-stat-card">
        <p>Total Services</p>
        <h2>{totalServices}</h2>
      </div>

      <div className="admin-stat-card">
        <p>Total Bookings</p>
        <h2>{totalBookings}</h2>
      </div>

      <div className="admin-stat-card">
        <p>Pending Bookings</p>
        <h2>{pendingBookings}</h2>
      </div>

      <div className="admin-stat-card">
        <p>Confirmed Bookings</p>
        <h2>{confirmedBookings}</h2>
      </div>

    </div>
  </div>
);
}
export default AdminDashoard;