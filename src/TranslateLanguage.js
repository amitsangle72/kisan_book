import React from "react";
import "./App.css";
import Welcome from "./Welcome";
import LocaleContext from "./LocaleContext";
import { useState } from "react";
import i18n from "./i18n";

function TranslateLanguage() {
    const [locale , setLocale] = useState(i18n.language)

    i18n.on('languageChanged',(lng)=>setLocale(i18n.language))
    const handleChange = (event) =>{
     i18n.changeLanguage(event.target.value)
    }
  
  return (
    <>

        <LocaleContext.Provider value={{locale,setLocale}}>
          <div>
            <label className="m-5">language change</label>
            <select value={locale} onChange={handleChange}>
              <option value="en">English</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
        <Welcome/>
        </LocaleContext.Provider>
    </>
  );
}

export default TranslateLanguage;
