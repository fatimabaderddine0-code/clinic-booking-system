
import { useState } from "react";
import api from "../api/api";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/contact", formData);

      alert("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-container">

        <div className="contact-info">
          <span className="contact-label">GET IN TOUCH</span>

          <h1>Let's Talk About Your Health.</h1>

          <p>
            Have a question or need assistance?
            Our team is here to help you.
          </p>

          <div className="contact-details">
            <div>
              <h3>📍 Address</h3>
              <p>Lebanon</p>
            </div>

            <div>
              <h3>📞 Phone</h3>
              <p>+961 XX XXX XXX</p>
            </div>

            <div>
              <h3>✉️ Email</h3>
              <p>info@example.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <span className="contact-label">SEND A MESSAGE</span>
          <h2>How Can We Help?</h2>

          <form onSubmit={handleSubmit}>

            <label htmlFor="contact-name">
              Full Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message ↗"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;
