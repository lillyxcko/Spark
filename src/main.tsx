import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryProvider } from "@/lib/react-query/QueryProvider";

import App from "./App";
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
);