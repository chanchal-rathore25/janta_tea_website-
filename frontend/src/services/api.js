import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

export const submitContactForm = (data) => api.post('/contact', data)
export const fetchProducts = () => api.get('/products')
export const fetchProductById = (id) => api.get(`/products/${id}`)
export const fetchBlogPosts = () => api.get('/blog')

export default api
