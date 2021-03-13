import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:45000/Lab1",
  headers: {
    "Content-type": "application/json"
  }
});
