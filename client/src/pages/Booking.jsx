import { useState } from "react";
import "./Booking.css";

function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      phone,
      email,
      service,
      date,
      time,
      notes
    });
  };

  return (
    <section className="booking">

      <div className="booking-header">
        <h1>Book an Appointment</h1>
        <p>Schedule your visit with our medical team.</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>

        <div className="booking-fields">

          <div>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="service">Service</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              <option value="1">General Consultation</option>
              <option value="2">Follow-up Visit</option>
              <option value="3">Routine Checkup</option>
            </select>
          </div>

          <div>
            <label htmlFor="date">Booking Date</label>
            <input
              id="date"
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="time">Booking Time</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

        </div>

        <div className="booking-notes">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            placeholder="Additional notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button className="booking-btn" type="submit">
          Book Now
        </button>

      </form>
    </section>
  );
}

export default Booking;