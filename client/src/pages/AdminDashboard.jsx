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

   return(
    <div>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>
  Logout
</button>
        <p>Manage clinic services and bookings.</p>
        <div className="dashboard-stats">
            <div>
                <h3>Total Services</h3>
                <p>{totalServices}</p>
            </div>
            <div>
                <h3>Total Bookings</h3>
                <p>{totalBookings}</p>
            </div>
            <div>
                <h3>Pending Bookings</h3>
                <p>{pendingBookings}</p>
            </div>
            <div>
                <h3>Confirmed Bookings</h3>
                <p>{confirmedBookings}</p>
            </div>
        </div>
    </div>
   );
}
export default AdminDashoard;