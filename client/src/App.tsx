import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter,
  Routes, Route } from "react-router-dom";
import {LoginPage} from "./components/routes/LoginPage";
import { Home } from "./components/routes/HomePage";
import { RegisterPage } from "./components/routes/RegisterPage";
import { AuthProvider } from "./components/authentication/AuthProvider";
import { Nav } from "./components/nav/Nav";
import { PastTradesPage } from "./components/routes/PastTradesPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/past" element={<PastTradesPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
