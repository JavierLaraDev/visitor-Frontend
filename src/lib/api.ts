import axios from "axios";

//creandoi una instancia de axios
const api=axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, //la url de la api ejemplo: http://localhost:3001 https://miapi.com
    withCredentials: true, //Como ahora el token está en una cookie, debe enviar las peticiones con credentials: 'include' para que la cookie viaje automáticamente.
    headers: {
        'Content-Type': 'application/json',
    }, 
})
// 🛠️ Interceptor para agregar el token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token inválido o expirado");
      // opcional: redirigir al login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default api;