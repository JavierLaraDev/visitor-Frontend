import { useMutation } from "@tanstack/react-query";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { AuthUser } from "@/src/types/User";


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
export const useAuthMe = () => {
  return useQuery<AuthUser>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
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