// filepath: src/components/ThemeToggle.jsx
import {Button} from "@/components/ui/button";
import {useTheme} from "./ThemeProvider";

export function ThemeToggle() {
  const {theme, setTheme} = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      default:
        return "💻";
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "System";
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-auto px-3 transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
      title={`Current theme: ${getThemeLabel()}. Click to change.`}
    >
      <span className="text-lg mr-1">{getThemeIcon()}</span>
      <span className="text-xs hidden sm:inline">{getThemeLabel()}</span>
    </Button>
  );
}
