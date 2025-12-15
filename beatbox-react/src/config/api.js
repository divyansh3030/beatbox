const API_URL = import.meta.env.PROD 
  ? 'https://beatbox-backend.onrender.com' 
  : 'http://localhost:5000';

export default API_URL;