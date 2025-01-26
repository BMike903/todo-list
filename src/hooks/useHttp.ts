import { useCallback, useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const request = useCallback(async (url = "https://jsonplaceholder.typicode.com/todos", method = "Get", body = null, headers = {'Content-Type': 'application/json'}) => {
        
        setLoading(true);
        try{
            const response = await fetch(url, {method, headers, body});

            if(!response.ok){
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            if(error instanceof Error){
                setError(error.message);
            }
            throw error;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {request, loading, error, clearError};
}