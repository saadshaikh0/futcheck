import { useState, useEffect } from "react";

export const useHandleResize = (mobileBreakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mobileBreakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    // Initialize on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  return isMobile;
};
