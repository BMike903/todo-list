import { useHttp } from "../hooks/useHttp";

const useTaskService = () => {
    const {request, loading, error, clearError} = useHttp();
    const baseURL = "https://jsonplaceholder.typicode.com/users/";

    const getTasksByUser = async (id: number) => {
        const response = await request(`${baseURL}${id}/todos`);
        return response;
    };

    const getUserById = async (id: number) => {
        const response = await request(`${baseURL}${id}`);
        return response;
    }

    return {loading, error, clearError, getTasksByUser, getUserById};
}

export default useTaskService;