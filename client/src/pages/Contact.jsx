import "./Contact.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been received!");
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
            <label htmlFor="contact-name">Full Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Enter your name"
              required
            />

            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              placeholder="Write your message"
              rows="5"
              required
            />

            <button type="submit">Send Message ↗</button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;