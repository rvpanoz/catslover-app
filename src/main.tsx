import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { AppProvider } from "./context/AppContext";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
