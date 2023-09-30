import { useState, useEffect } from "react";
import { Data } from "../interfaces";

export default function useFetch(url: string) {
  const [response, setResponse] = useState<null | Data>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<null | {
    message: string;
    status: number;
  }>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error in fetching from url : ${url}`);

        const data = await res.json();
        setResponse(data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
      }
    })();
  }, []);

  function resetError() {
    setError(null);
  }

  return { response, isLoading, error, resetError };
}
