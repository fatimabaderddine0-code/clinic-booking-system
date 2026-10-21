import { useState, useEffect } from "react";
import api from "../api/api";
import "./AdminBookings.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      const token = sessionStorage.getItem("adminToken");

      const response = await api.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
useEffect(() => {
  let cancelled = false;

  const loadBookings = async () => {
    try {
      const token = sessionStorage.getItem("adminToken");

      const response = await api.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!cancelled) {
        setBookings(response.data);
      }
    } catch (error) {
  console.error("Status:", error.response?.status);
  console.error("Backend error:", error.response?.data);
  console.error("Full error:", error);

  alert("Failed to update booking status.");
}
  };

  loadBookings();

  return () => {
    cancelled = true;
  };
}, []);

  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("adminToken");

      await api.put(
        `/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-bookings">
      <h2>Manage Bookings</h2>
      <p>View and manage clinic appointments.</p>

      <div className="bookings-total">
        Total Bookings: {bookings.length}
      </div>

      <div className="bookings-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer_name}</td>
                <td>{booking.phone}</td>
                <td>{booking.email}</td>
                <td>{booking.service_id}</td>

                <td>
                  <span className={`booking-status ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>

                <td>
                  <div className="booking-actions">
                    <button
                      className="confirm-btn"
                      disabled={loading || booking.status === "confirmed"}
                      onClick={() =>
                        handleStatusChange(booking.id, "confirmed")
                      }
                    >
                      Confirm
                    </button>

                    <button
                      className="cancel-btn"
                      disabled={loading || booking.status === "cancelled"}
                      onClick={() =>
                        handleStatusChange(booking.id, "cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-bookings">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminBookings;