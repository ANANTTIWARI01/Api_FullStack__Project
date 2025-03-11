import axios from "axios";

const instance = axios.create({baseURL:`https://api-fullstack-project-back.onrender.com/api`})
export default instance;