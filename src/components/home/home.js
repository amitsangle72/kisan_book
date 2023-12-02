import { useEffect } from "react";
import React from "react";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate("");
  const Tokan = localStorage.getItem("token");

  const Auth = () => {
    if (!Tokan) {
      navigate("/");
    }
  };
  useEffect(() => {
    Auth();
  });

  return (
    <div>
      <Header></Header>
      <Sidebar></Sidebar>
    </div>
  );
}
export default Home;
