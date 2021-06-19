import axios from 'axios'

export const api = axios.create({
  baseURL: "https://lit-taiga-71004.herokuapp.com"
})