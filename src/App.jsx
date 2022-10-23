import Home from "./components/Home";

export default function App() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.theme = "light";
  localStorage.theme = "dark";
  localStorage.removeItem("theme");

  return (
    <div className="App bg-dark-100 h-[100vh]">
      <Home />˝
    </div>
  );
}
