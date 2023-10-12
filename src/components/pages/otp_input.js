import OtpInput from "react-otp-input";
import { useState } from "react";
import "./otp_input.css";

function InputOtp() {
  const [otp, setOtp] = useState("");

  return (
    <>
      <form>
        <div class="container " data-parallax="scroll">
          <div class="container py-2">
            <div class="row justify-content-center vertically">
              <div class="col-lg-5">
                <div
                  class="rounded shadow border border-muted p-4 p-sm-4 mt-5 wow fadeIn"
                  data-wow-delay="0.5s"
                >
                  <div class="row g-3">
                    <div class="container height-100 d-flex justify-content-center align-items-center">
                      <div class="position-relative">
                        <div class="p-2 mt-3 text-center">
                          <h6>
                            Please enter the one time password <br />
                            to verify your account
                          </h6>
                          <div>
                            <span>A code has been sent to</span>
                            <small>********7272</small>
                          </div>
                          <div
                            id="otp"
                            class="inputs d-flex flex-row justify-content-center mt-2"
                          >
                            <div class="mt-2">
                              <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} style={{width:"60px" ,height:"35px"}} />}
                              />
                              <div class="mt-3">
                                <button class="btn btn-primary float-end">
                                  Verify
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="content d-flex justify-content-center align-items-center mt-2">
                            <span>Didn't get the code :</span>
                            <a href="#" class="text-decoration-none ms-1">
                              Resend
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default InputOtp;
