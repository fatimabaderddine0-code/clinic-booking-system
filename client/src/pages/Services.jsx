import { Link } from "react-router-dom";
import "./Services.css";
import { useState,useEffect } from "react";
import api from "../api/api";
function Services() {
  const [services, setServices] = useState([]);
  useEffect(()=>{
    const fetchServices = async ()=>{
      try{
        const response = await api.get("./services");
        setServices(response.data);
      }catch(error){
        console.error("Error fetching services:",error);
      }
    };
    fetchServices();
  },[]);
  // const services = [
  //   {
  //     id: 1,
  //     name: "General Consultation",
  //     description: "General medical consultation",
  //     icon: "🩺"
  //   },
  //   {
  //     id: 2,
  //     name: "Follow-up Visit",
  //     description: "Follow-up medical appointment.",
  //     icon: "📋"
  //   },
  //   {
  //     id: 3,
  //     name: "Routine Checkup",
  //     description: "Routine health examination.",
  //     icon: "💙"
  //   }
  // ];

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

      <span className="service-icon">✚</span>

      <div className="service-info">
        <h2>{service.NAME}</h2>
        <p>{service.DESCRIPTION}</p>
        <p>Price: ${service.price}</p>
        <p>Duration: {service.duration} minutes</p>
      </div>

      <Link
        to="/booking"
        className="service-arrow"
        aria-label={`Book ${service.NAME}`}
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