import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about-container">

        <div className="about-top">
          <span className="about-label">01 / ABOUT US</span>
          <span className="about-plus">+</span>
        </div>

        <h1 className="about-title">
          Healthcare that puts
          <span> you first.</span>
        </h1>

        <div className="about-details">
          <div className="about-intro">
            <h2>Welcome to HealthCore</h2>
            <p>
              At HealthCore, we believe healthcare should be
              accessible, personal, and built around your needs.
              Our goal is to provide a comfortable experience
              and reliable medical services for every patient.
            </p>
          </div>

          <div className="about-values">
            <div>
              <span>01</span>
              <h3>Compassion</h3>
              <p>Care that puts patients first.</p>
            </div>

            <div>
              <span>02</span>
              <h3>Trust</h3>
              <p>Reliable and professional healthcare.</p>
            </div>

            <div>
              <span>03</span>
              <h3>Convenience</h3>
              <p>Simple and easy appointment booking.</p>
            </div>
          </div>
        </div>

        <div className="about-bottom">
          <p>Your health is our priority.</p>

          <Link to="/services" className="about-btn">
            Explore Our Services ↗
          </Link>
        </div>

      </div>
    </section>
  );
}

export default About;