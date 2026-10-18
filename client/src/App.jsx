import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashoard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/protectedRoutes";
function App() {
  return (
    <>
    <BrowserRouter>
    
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
      <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashoard />
    </ProtectedRoute>
  }
/>

<Route path="/admin/login" element={<AdminLogin />} />
   </Routes>
   <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;