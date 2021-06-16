import {useEffect, useState} from "react";
import axios from "axios";

interface FetchState<T> {
    data: T;
    error?: string;
    loading: boolean;
}

const useFetch = <T>(url: string): FetchState<T | null> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(!url) return;

        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await axios(url);
                setData(response.data);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                setError(err.message);
            }
        }

        fetchData();
    }, [url])

    return { data, loading, error };
}

export default useFetch;