import axios from 'axios'

const api = axios.create({
  baseURL: 'https://whats-back-end-7.onrender.com/api' // correto!
})

export default api
