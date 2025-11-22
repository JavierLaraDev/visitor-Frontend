import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { useQuery } from "@tanstack/react-query";


interface UserData {
    email: string;
    password: string;
}
// 🔐 Login (usa cookies automáticas)
export const useLogin = ()=>{
    return useMutation({
        mutationFn: async (data: UserData) => {
            const response = await api.post("/auth/login", data);
            return response.data;
        }
    })
}
// 👤 Obtener usuario autenticado (desde cookie)
export const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me"); // tu backend devuelve {id, email, role}
      return data;
    },
    retry: false, // evita bucles si no hay sesión
    staleTime: 1000 * 60 * 5, // cachea 5 minutos
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/logout");
      return response.data;
    }
  });
}