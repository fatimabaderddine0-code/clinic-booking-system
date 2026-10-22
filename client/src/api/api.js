
import axios from "axios";

const api = axios.create({
  baseURL: "https://clinic-booking-system-a0mq.onrender.com/api"
});

export default api;
