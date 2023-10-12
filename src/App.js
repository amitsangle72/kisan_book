import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/pages/user_login";
import OtpInput from "./components/pages/otp_input";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />}></Route>

          <Route path="otp" element={<OtpInput />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
