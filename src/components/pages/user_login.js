import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import "./user_login.css";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

function SigninForm() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const PhaneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const submitHandler = () => {
    navigate("/otp");
  };

  return (
    <div className="container " data-parallax="scroll">
      <div className="container">
        <div className="row justify-content-center vertically">
          <div class="col-lg-5">
            <div
              className="rounded shadow border border-muted p-4 p-sm-4 mt-3 wow fadeIn "
              data-wow-delay="0.5s"
            >
              <h2 className="text-center">Login</h2>

              <label className="text mt-2">Enter Mobile Number:</label>
              <PhoneInput
                className="PhoneInput mt-1"
                country={"in"}
                value={phoneNumber}
                onChange={PhaneNumberChange}
              />
              <div className="justify-content-end d-flex">
                <button
                  type="button"
                  onClick={submitHandler}
                  className="btn btn-primary mt-2"
                >
                  Request OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SigninForm;
