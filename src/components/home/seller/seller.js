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

function Seller() {
  const {t} = useTranslation();
  const [seller, setSeller] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [numberOfSellers, setNumberOfSellers] = useState();
  const [response, setResponse] = useState();

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  const navigate = useNavigate();

  const showSellerInfo = (pageNum) => {
    counter = pageNum;
    ApiService.getSeller(pageNum).then(
      (response) => {
        // console.log("amit",response);   
        setSeller(response.sellers);
        setNumberOfSellers(response.totalSellers);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    showSellerInfo(1);
  }, [response]);

  const addSeller = () => {
    navigate("/home/addseller");
  };

  const deleteSeller = () => {
    console.log(deleteId);
    ApiService.deleteSeller(deleteId).then(
      (response) => {
        console.log(response);
        setResponse(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const updateSeller = (seller) => {
    navigate("/home/addseller", { state: { seller: seller } });
  };

  const searchSeller = (str) => {
    ApiService.searchSeller(str).then(
      (response) => {
        setSeller(response.seller);
        setNumberOfSellers(response.totalSellers);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const numberOfPages = Math.ceil(numberOfSellers / 5);
  // debugger
  const getButtons = (numberOfPages) => {
    let buttons = [];
    for (let i = 1; i <= numberOfPages; i++) {
      // console.log("Amit", i);
      buttons.push(
        <li
          className={`page-item ${counter === i ? "active" : ""}`}
          key={i}
          onClick={() => {
            showSellerInfo(i);
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
      showSellerInfo(count);
    }
  };
  const incrementByone = () => {
    if (counter !== numberOfPages) {
      var count = (counter += 1);
      showSellerInfo(count);
    }
  };

  return (
    <>
      <h2 className="text-center">
        <u>{t('seller')}</u>
      </h2>

      <div className="d-flex justify-content-end ">
        <Button onClick={addSeller}>
          <PersonFillAdd size={20} /> {t("add_seller")}
        </Button>
      </div>

      <div>
        <div class="col-sm-3 mt-3 ">
          <input
            class=" form-control"
            type="search"
            placeholder="Search"
            onChange={(e) => {
              searchSeller(e.target.value);
            }}
          />
        </div>
      </div>
      {numberOfSellers === 0 && (
        <div className="text-center text-danger mt-3">
          <i class="bi bi-exclamation-triangle"></i> Sorry, no results found!
        </div>
      )}

      <Row>
        {seller?.map((name) => (
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
                        updateSeller(name);
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
        {numberOfPages !== 0 ? (
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
        ) : (
          ""
        )}
      </div>

      <Modal size="sm" show={show} onClick={handleClose} animation={false}>
        <Modal.Body>
          <p>Are you sure you want to delete ?</p>
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
            onClick={deleteSeller}
          >
            <Trash color="white" size={18}></Trash>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Seller;
