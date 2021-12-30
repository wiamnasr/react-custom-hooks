import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      //   we get the data, then execute a fn that we get from the component that uses the hook, and pass that data to that function
      // this way, the concrete transformation steps can be defined in the component, where this custom hook is being used
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  //   I want to return something to the component, where the custom hook is used
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
