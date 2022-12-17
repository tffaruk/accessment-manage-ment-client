import axios from "axios";

const Axios = axios.create({
  baseURL:
    // "https://gethugothemes-backend.vercel.app/",
    "http://localhost:7000/",
  // "https://test-db-sl6v.vercel.app/",
  // headers: {
  //   authorization: `Bearer ${Token}`,
  // },
});

export default Axios;
