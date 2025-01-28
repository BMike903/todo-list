import { useHttp } from "../hooks/useHttp";

const useTaskService = () => {
    const {request, loading, error, clearError} = useHttp();

    const getTasksByUser = async (id: number) => {
        const response = await request(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
        return response;
    };

    return {loading, error, clearError, getTasksByUser};
}

export default useTaskService;