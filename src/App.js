import React from "react";
import "./App.css";
import Form from "./components/user_auth/user_login";
import OtpInputs from "./components/user_auth/otp_input";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Seller from "./components/home/seller/seller";
import Buyer from "./components/home/buyer/buyer";
import AddSeller from "./components/home/seller/addseller";
import AddBuyer from "./components/home/buyer/addbuyer";
import Signup from "./components/user_auth/user_signup";
import TranslateLanguage from "./TranslateLanguage";
import { useState } from "react";
import i18n from "./i18n";
import LocaleContext from "./LocaleContext";

function App() {
  const [locale , setLocale] = useState(i18n.language)

  i18n.on('languageChanged',(lng)=>setLocale(i18n.language))
  const handleChange = (event) =>{
   i18n.changeLanguage(event.target.value)
  }
  return (
    <div className="App">
        <LocaleContext.Provider value={{locale,setLocale}}>
      <div className="text-end m-2">
            
            <select  value={locale} onChange={handleChange}  class="btn btn-primary  dropdown-toggle"  href="#" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          </LocaleContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />}></Route>
          <Route path="/lan" element={<TranslateLanguage/>}></Route>
          <Route path="/otp" element={<OtpInputs />}></Route>
          <Route path="/home" element={<Home />}>
          <Route path="/home/signup" element={<Signup/>}></Route>
            <Route path="/home/seller" element={<Seller/>}></Route>
            <Route path="/home/buyer" element={<Buyer/>}></Route>
            <Route path="/home/addseller" element={<AddSeller/>}></Route>
            <Route path="/home/addbuyer" element={<AddBuyer/>}></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
