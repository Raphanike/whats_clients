import axios from 'axios'

const api = axios.create({
    baseURL: 'https://whats-back-end-5.onrender.com/api'
})

export default api
