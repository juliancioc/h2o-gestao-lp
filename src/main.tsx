import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

// Container do GTM antes do render: o id vem do ambiente (não fica escrito no
// index.html) e as tags precisam estar de pé antes do primeiro page_view.
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
