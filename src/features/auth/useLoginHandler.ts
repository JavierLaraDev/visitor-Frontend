import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "./query";
import { ToastState } from "@/src/types/toast";

export const useLoginHandler = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<ToastState>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          // 🔄 refresca la sesión
          await queryClient.invalidateQueries({ queryKey: ["authUser"] });

          setToast({
            message: "¡Bienvenido! Redirigiendo...",
            type: "success",
          });

          // 🔐 REDIRECCIÓN SEGÚN ROL
          if (data.role === "ADMIN") {
            router.push("/dashboard");
          } else if (data.role === "PASANTE") {
            router.push("/visitors");
          } else {
            // rol desconocido → logout o fallback
            router.push("/login");
          }
        },

        onError: (error: any) => {
          setToast({
            message: `Error: ${error.response?.data?.message || error.message}`,
            type: "error",
          });
        },
      }
    );
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    toast,
    setToast,
    handleSubmit,
  };
};
