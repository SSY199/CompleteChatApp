import axios from "axios";
import { HOST } from "../utils/constants.js";

const apiclient = axios.create({
  baseURL: HOST,
})
export default apiclient;