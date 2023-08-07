import { useCallback, useState } from "react";
const useRequeste = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchRequeste = useCallback(async (requesteConfig, applyFun) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const responce = await fetch(requesteConfig.url, {
        method: requesteConfig.method ? requesteConfig.method : "GET",
        headers: requesteConfig.headers ? requesteConfig.headers : {},
        body: requesteConfig.body ? JSON.stringify(requesteConfig.body) : null,
      });

      if (!responce.ok) {
        throw new Error("somthing was rong !");
      }
      
      const data = await responce.json();
      applyFun(data);
    } catch (err) {
      setError(err.message || "somthing was rong !");
      console.log("error");
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);
  return {
    fetchRequeste,
    isLoading,
    error,
  };
};

export default useRequeste;
