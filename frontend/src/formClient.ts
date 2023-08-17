import axios from 'axios'

const apiClient = axios.create({
  baseURL:
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/',
  headers: {
    'Content-Type': 'multipart/form-data' 
  }  
})

apiClient.interceptors.request.use(async (config) => {
  // console.log(config)
  return config
  },
  (error) => {
    console.log('에러',error)
    Promise.reject(error)
  }
)

export default apiClient