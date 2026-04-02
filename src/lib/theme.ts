export const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const applyTheme = (theme: "light" | "dark") => {
  const root = document.documentElement;

  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");

  localStorage.setItem("theme", theme);
};
