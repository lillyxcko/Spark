import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import App from "./App";
import AuthProvider from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(BrowserRouter, { children: _jsx(QueryProvider, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }) }));
