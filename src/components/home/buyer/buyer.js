import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ApiService from "../../../service";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash, Cash, PersonFillAdd } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

var counter = 0;

function Buyer() {
  const {t} = useTranslation();
  
  const [buyer, setBuyer] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [numberOfBuyers, setNumberOfBuyers] = useState();
  const [response, setResponse] = useState();

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  const navigate = useNavigate();

  const showBuyerInfo = (pageNum) => {
    counter = pageNum;
    ApiService.getBuyer(pageNum).then(
      (response) => {
        // console.log(response);
        setBuyer(response.buyers);
        setNumberOfBuyers(response.totalBuyers);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    showBuyerInfo(1);
  }, [response]);

  const addBuyer = () => {
    navigate("/home/addbuyer");
  };

  const deleteBuyer = () => {
    console.log(deleteId);
    ApiService.deleteBuyer(deleteId).then(
      (response) => {
        console.log(response);
        setResponse(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const updateBuyer = (buyer) => {
    navigate("/home/addbuyer", { state: { buyer: buyer } });
  };

  const searchBuyer = (str) => {
    ApiService.searchBuyer(str).then(
      (response) => {
        console.log("amit", response);
        setBuyer(response.buyer);
        setNumberOfBuyers(response.totalBuyers);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const numberOfPages = Math.ceil(numberOfBuyers / 5);
  // debugger
  const getButtons = (numberOfPages) => {
    let buttons = [];
    for (let i = 1; i <= numberOfPages; i++) {
      console.log("Amit", i);
      buttons.push(
        <li
          className={`page-item ${counter === i ? "active" : ""}`}
          key={i}
          onClick={() => {
            showBuyerInfo(i);
          }}
        >
          <Link className="page-link">{i}</Link>
        </li>
      );
    }
    return buttons;
  };
  const decrementByone = () => {
    var count = (counter -= 1);
    if (count !== 0) {
      showBuyerInfo(count);
    }
  };
  const incrementByone = () => {
    if (counter !== numberOfPages) {
      var count = (counter += 1);
      showBuyerInfo(count);
    }
  };

  return (
    <>
      <h2 className="text-center">
        <u>{t("buyer")}</u>
      </h2>

      <div className="d-flex justify-content-end ">
        <Button onClick={addBuyer}>
          <PersonFillAdd size={20} /> {t("add_buyer")}
        </Button>
      </div>

      <div>
        <div class="col-sm-3 mt-3">
          <input
            class=" form-control"
            type="search"
            placeholder="Search"
            onChange={(e) => {
              searchBuyer(e.target.value);
            }}
          />
        </div>
      </div>

      {numberOfBuyers === 0 && (
        <div className="text-center">Sorry, no results found!
        </div>
      )}

      <Row>
        {buyer?.map((name) => (
          <Col md={4}>
            <Col>
              <Card className="mt-4 bg-light">
                <Card.Header>
                  <Card.Title>
                    {name?.firstName} {name?.middleName} {name?.lastName}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Button
                      onClick={(e) => {
                        updateBuyer(name);
                      }}
                      className="bg-primary btn-sm float-end"
                    >
                      <Pencil color="white" size={20}></Pencil>
                    </Button>
                    <p className="mb-0">
                      Mob. {name?.primaryMobileNumber}/ <br />
                      <p className="ms-5 mb-0">{name?.secondaryMobileNumber}</p>
                    </p>
                    <Button
                      onClick={() => handleShow(name._id)}
                      className="bg-primary btn-sm float-end"
                    >
                      <Trash color="white" size={20}></Trash>
                    </Button>
                    {name?.address.address1}

                    <br />
                    {name?.address.location}
                    <p>
                      {name?.address.city}. {name?.address.pinCode}
                      <Button className="bg-primary btn-sm float-end">
                        <Cash color="white" size={20}></Cash>
                      </Button>
                      <br />
                      {name?.address.state} , {name?.address.country}.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        ))}
      </Row>

      <div>
      {
        numberOfPages !==0 ?
        <div className="d-flex justify-content-end mt-3">
          <ul className="pagination  ">
            <li
              className={`page-item ${counter === 1 ? "disabled" : ""}`}
              onClick={() => {
                decrementByone();
              }}
            >
              <Link className="page-link">&laquo;</Link>
            </li>
            {getButtons(numberOfPages)}
            <li
              className={`page-item ${
                counter === numberOfPages ? "disabled" : ""
              }`}
              onClick={() => {
                incrementByone();
              }}
            >
              <Link className="page-link">&raquo;</Link>
            </li>
          </ul>
        </div>
        : ""}
      </div>

      <Modal size="sm" show={show} onClick={handleClose} animation={false}>
        <Modal.Body>
          <p>Are you sure you want to delete ? </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={handleClose}
          >
            <i class="m-1 bi bi-x-square-fill text-white "></i>
            Close
          </Button>

          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={deleteBuyer}
          >
            <Trash color="white" size={18}></Trash>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Buyer;
