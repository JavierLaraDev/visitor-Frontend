
import api from '@/src/lib/api'
import { Visitor } from '@/src/types/visitor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreateVisitor = ()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: async(data:Partial<Visitor>)=>{
            const response=await api.post('/visitors',data);
            return response.data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['visitors']});
        }
    })
}

export const useGetVisitors = () => {
  return useQuery({
    queryKey: ['visitors'],
    queryFn:async ()=>{
        const {data}=await api.get('/visitors')
        return data;
    }
  })
}

export const useUpdateVisitor=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: async ({id,data}:{id:number;data:Partial<Visitor>})=>{
            const response=await api.put(`/visitors/${id}`,data);
            return response.data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['visitors']});
        },
    });
};

export const useDeleteVisitor=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async(id:number)=>{
            await api.delete(`/visitors/${id}`);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['visitors']});
        },
    });
};