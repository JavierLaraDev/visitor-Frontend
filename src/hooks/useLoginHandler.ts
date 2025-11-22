
import { useLogin } from "./useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useLoginHandler = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router=useRouter();
    const queryClient = useQueryClient();

    const loginMutation = useLogin();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password }, {
            onSuccess: (data) => {
                alert("✅ Login exitoso");
                queryClient.invalidateQueries({ queryKey: ["authUser"]}); // actualizar estado de autenticación
               router.push("/dashboard"); // redirigir a la pantalla de inicio = "/dashboard";
            },
            onError: (error: any) => {
                alert(`❌ Error al iniciar sesión: ${error.response?.data?.message || error.message}`);
            }
        });
    }
    return {
        handleSubmit,
        email,
        setEmail,
        password,
        setPassword,
    }
}
