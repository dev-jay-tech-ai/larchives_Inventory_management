import axios from 'axios'

const apiClient = axios.create({
  baseURL:
  import.meta.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/',
  headers: {
    'Content-Type': 'multipart/form-data' 
  }  
})

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem('userInfo'))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')!).token
      }`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default apiClient