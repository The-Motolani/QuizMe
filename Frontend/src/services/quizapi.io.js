import axios from "axios";

const BASE_URL = "https://quizapi.io/api/v1/";
const apiKey = import.meta.env.VITE_QUIZ_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: apiKey ? `token ${apiKey}` : "",
  },
});


fetch(`https://quizapi.io/api/v1/data?key=${apiKey}`)
  .then(res => res.json())
  .then(data => console.log(data));
