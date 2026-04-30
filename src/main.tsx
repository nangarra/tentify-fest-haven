import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ignore unhandled promise rejections from browser extensions (e.g. MetaMask)
window.addEventListener("unhandledrejection", (event) => {
  const msg = String(event.reason?.message || event.reason || "");
  const stack = String(event.reason?.stack || "");
  if (
    msg.includes("MetaMask") ||
    stack.includes("chrome-extension://") ||
    stack.includes("moz-extension://")
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
