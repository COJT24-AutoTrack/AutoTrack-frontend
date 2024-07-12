// useBreakpoint.jsx
import { useState, useEffect } from "react";
import { breakpoints } from "../styles/breakpoints";

const useBreakpoint = () => {
  const [isPC, setIsPC] = useState(window.innerWidth >= parseInt(breakpoints.PC, 10));

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth >= parseInt(breakpoints.PC, 10));
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isPC;
};

export default useBreakpoint;
