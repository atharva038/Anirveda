import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "./components/ThemeProvider.jsx";
import "./style.css";

import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import TraceabilityPage from "./pages/TraceabilityPage.jsx";
import MarketplacePage from "./pages/MarketplacePage.jsx";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="agrochain-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="traceability" element={<TraceabilityPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
