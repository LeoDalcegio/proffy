import React from "react";
import "./components/FontawesomeIcons";

import "./assets/styles/global.css";

import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
