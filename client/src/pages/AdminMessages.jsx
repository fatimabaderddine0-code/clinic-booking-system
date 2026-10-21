
import { useEffect, useState } from "react";
import api from "../api/api";
import "./AdminMessages.css";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = sessionStorage.getItem("adminToken");

        const response = await api.get("/contact", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <section className="admin-messages">
      <div className="admin-messages-header">
        <h2>Contact Messages</h2>
        <p>View messages sent by clinic visitors.</p>
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p>{error}</p>
      ) : messages.length === 0 ? (
        <p>No messages received yet.</p>
      ) : (
        <div className="admin-messages-list">
          {messages.map((message) => (
            <div className="admin-message-card" key={message.id}>
              <div className="admin-message-top">
                <h3>{message.name}</h3>
                <span>
                  {new Date(message.created_at).toLocaleString()}
                </span>
              </div>

              <p className="admin-message-email">
                {message.email}
              </p>

              <p className="admin-message-text">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminMessages;
