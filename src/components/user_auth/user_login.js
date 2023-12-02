import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ApiService from "../../service";
import "./user_login.css";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const showSuccess = () => {
    setShow(true);
    setTimeout(() => {
      navigate("/otp", { state: { mobile: phoneNumber } });
    }, 1000);
  };

  const PhaneNumberChange = (value) => {
    setError(null);
    setPhoneNumber(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const mobileNumber = { mobileNumber: phoneNumber };
    // console.log("amit");

    const phoneNumberRegex = /^[0-9]{12}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      setError({ message: "Please enter a valid mobile number" });
    } else {
      ApiService.userLogin(mobileNumber)
        .then((response) => {
          console.log("amit",response);
          showSuccess();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            setError(error.response.data);
          }
        });
    }
  };

  return (
    <>
      <div className="container " data-parallax="scroll">
        <div className="container">
          <div className="row justify-content-center vertically">
            <div class="col-lg-4">
              <div
                className="rounded shadow border border-muted p-4 p-sm-4 mt-3 wow fadeIn "
                data-wow-delay="0.5s"
              >
                <h2 className="text-center">{t("log_in")}</h2>

                <label className="text mt-2">{t("mobile_number")}:</label>
                <PhoneInput
                  className="PhoneInput mt-1"
                  country={"in"}
                  value={phoneNumber}
                  onChange={PhaneNumberChange}
                  inputStyle={{
                    borderColor: error ? "red" : "",
                  }}
                />
                {error && (
                  <small className="text-danger">{error.message}</small>
                )}
                <div className="justify-content-end d-flex">
                  <button
                    type="submit"
                    onClick={submitHandler}
                    className="btn btn-primary mt-3"
                  >
                    {t("otp")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size="sm" show={show} animation={false}>
        <p className="text-center mt-3 text-success">
          {/* Verification code sent to {"+" + phoneNumber} */}
          {t("otp_sent")}
        </p>
      </Modal>
    </>
  );
}
export default LoginForm;
