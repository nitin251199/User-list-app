import React, { useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedVal;
};

export default useDebounce;
