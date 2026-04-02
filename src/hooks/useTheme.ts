import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme } from "../lib/theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return { theme, setTheme };
};
