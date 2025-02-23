import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CapsuleProvider } from "./context/CapsuleContext.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CapsuleProvider>
        <App />
      </CapsuleProvider>
    </AuthProvider>
  </React.StrictMode>
);
