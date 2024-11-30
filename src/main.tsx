import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "providers/AppProviders";
import { Router } from "Router";
import "./polyfills";

import "@fontsource-variable/rubik";
import "@fontsource/bebas-neue";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <Router />
    </AppProviders>
  </React.StrictMode>
);
