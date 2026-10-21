
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./About.css";

function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/about");
        setAbout(response.data);
      } catch (error) {
        console.error("Error fetching About:", error);
      }
    };

    fetchAbout();
  }, []);

  return (
    <section className="about">
      <div className="about-container">

        <div className="about-top">
          <span className="about-label">01 / ABOUT US</span>
          <span className="about-plus">+</span>
        </div>

        <h1 className="about-title">
          {about?.title}
        </h1>

        <div className="about-details">
          <div className="about-intro">
            <h2>{about?.subtitle}</h2>
            <p>{about?.description}</p>
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
          <p>{about?.bottom_text}</p>

          <Link to="/services" className="about-btn">
            Explore Our Services ↗
          </Link>
        </div>

      </div>
    </section>
  );
}

export default About;
