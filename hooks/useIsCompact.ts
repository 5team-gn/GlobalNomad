import { useEffect, useState } from "react";

export function useIsCompact() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsCompact(window.innerWidth < 1024);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isCompact;
}
