import axios from "axios";

const Axios = axios.create({
  baseURL: "https://access-management-backend.vercel.app/",

  // "http://localhost:7000/",

  // headers: {
  //   authorization: `Bearer ${Token}`,
  // },
});

export default Axios;
