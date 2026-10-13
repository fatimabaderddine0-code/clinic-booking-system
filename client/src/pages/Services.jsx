import { Link } from "react-router-dom";
import "./Services.css";

function Services() {
  const services = [
    {
      id: 1,
      name: "General Consultation",
      description: "General medical consultation",
      icon: "🩺"
    },
    {
      id: 2,
      name: "Follow-up Visit",
      description: "Follow-up medical appointment.",
      icon: "📋"
    },
    {
      id: 3,
      name: "Routine Checkup",
      description: "Routine health examination.",
      icon: "💙"
    }
  ];

  return (
    <section className="services">
      <div className="services-header">
        <span>WHAT WE OFFER</span>
        <h1>Care for every step of your health.</h1>
        <p>Explore our medical services designed around your needs.</p>
      </div>

      <div className="services-container">
        {services.map((service) => (
          <div className="service-item" key={service.id}>
            <span className="service-number">
              {String(service.id).padStart(2, "0")}
            </span>

            <span className="service-icon">{service.icon}</span>

            <div className="service-info">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
            </div>

            <Link
              to="/booking"
              className="service-arrow"
              aria-label={`Book ${service.name}`}
            >
              ↗
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;