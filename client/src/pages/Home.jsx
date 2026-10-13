import { Link } from "react-router-dom";
import "./Home.css";
function Home(){
    return(
        
         <section className="home">
            <div className="home-content">
            <h1>Welcome to HealthCore Clinic</h1>
            <p>
                 We provide quality healthcare services
                 to help you stay healthy.
            </p>
            <Link to="/booking"  className="home-btn">
           
                 Book an Appointment
              
            </Link>
            </div>
          </section>
        
    );
}
export default Home;