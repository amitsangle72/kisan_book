import React from "react";
import "./sidebar.css";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


function Sidebar() {
  const location = useLocation();
  const {t} = useTranslation();

  let breadcrumLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      breadcrumLink += `/${crumb}`;
      return (  
        <li>
          {" "}
          <Link to={breadcrumLink}>{crumb}/</Link>
        </li> 
      );
    });
  return (

    <body>
      <div class="sidebar">
        <Link to="/home/signup">
          <i class="bi bi-speedometer "></i> {t("dashboard")}
        </Link>
        <Link to="/home/seller">
          <i class="bi bi-person "></i> {t("seller")}
        </Link>
        <Link to="/home/buyer">
          <i class="bi bi-person "></i> {t("buyer")}
        </Link>
       
      </div>
      <div className="content">
        <nav className="breadcrumb mt-3" aria-label="breadcrumb">
          <ol class="breadcrumb">{crumbs}</ol>
        </nav>
        <Outlet />
      </div>
    </body>
  );
}
export default Sidebar;
