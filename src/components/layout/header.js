import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import "./header.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useTranslation } from "react-i18next";



function Header() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logOutHandler = (event) => {
    localStorage.removeItem("token");
    navigate("/");
    event.preventDefault();
  };



  return (
    <>
   

      <nav
        class="navbar navbar-expand-lg bg-dark"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            {t('kisan_book')}
          </a>
          <button
            onClick={handleShow}
            class="navbar-toggler text-white my-2 my-sm-0"
            type="submit"
          >
            <BoxArrowRight className=" mx-1" size={22} /> {t("log_out")}
          </button>
          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav me-auto"></ul>

            <button
              onClick={handleShow}
              class="btn btn-primary my-2 my-sm-0"
              type="submit"
            >
              <BoxArrowRight className="mx-1" size={22} /> {t("log_out")}
            </button>
          </div>
        </div>

      </nav>
      <Modal size="sm" show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <p>Are you sure you want to log out ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={handleClose}
          >
            <i class="m-1 bi bi-x-square " ></i>
            Close
          </Button>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={logOutHandler}
          >
            <BoxArrowRight className="mx-1" size={22} /> Log Out
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}
export default Header;
