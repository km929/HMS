"use client";

import { useTheme } from "@/app/ThemeProvider/TheamProvider";

// import { useTheme } from "./theme-provider";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <header className="bg-1 border-b border-main p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-2 text-foreground-1 rounded-md hover:bg-3 transition-colors"
        >
          {theme === "light"
            ? "Switch to Dark"
            : theme === "dark"
              ? "Switch to System"
              : "Switch to Light"}
        </button>
      </div>
    </header>
  );
}
