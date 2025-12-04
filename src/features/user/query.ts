import api from "@/src/lib/api"
import { User } from "@/src/types/User"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetUsers = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
        const {data}=await api.get("/users")
        return data;
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async(id:number)=>{
            await api.delete(`/users/${id}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient(); 
  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await api.post(`/users`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<User> }) => {
      const response = await api.put(`/users/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },  
  });
};

