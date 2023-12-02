import { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../service";
import { useTranslation } from "react-i18next";

function InputOtp() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile;

  const [otp, setOtp] = useState(0);
  const [error, setError] = useState();

  const showSuccess = () => {
    setTimeout(() => {
      navigate("/home");
    },);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const mobileNumber = { mobile: mobile, otp: otp };

    ApiService.submitOtp(mobileNumber)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.token);
        showSuccess();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setError(error.response.data);
        }
      });
  };

  return (
    <>
      <form>
        <div class="container " data-parallax="scroll">
          <div class="container py-2">
            <div class="row justify-content-center vertically">
              <div class="col-lg-4">
                <div
                  class="rounded shadow border border-muted p-4 p-sm-4 mt-5 wow fadeIn"
                  data-wow-delay="0.5s"
                >
                  <div class="row g-3">
                    <div class="container height-100 d-flex justify-content-center align-items-center">
                      <div class="position-relative">
                        <div class="p-2 mt-3 text-center">
                          <h6>
                           {t("otp_page")}
                          </h6>
                          <div>
                            <p className="text-center">
                            {t("otp_page2")}
                              {"+" + mobile}{" "}
                            </p>
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
                                renderSeparator={<span className="p-2"></span>}
                                renderInput={(props) => (
                                  <input
                                    {...props}
                                    style={{ width: "50px", height: "35px" }}
                                    className="text-center"
                                  />
                                )}
                              />
                              <div className="text-center mt-2">
                                {error && (
                                  <p className="text-danger ">
                                    {error.message}
                                  </p>
                                )}
                              </div>
                              <div class="mt-3">
                                <button
                                  class="btn btn-primary float-end"
                                  onClick={onSubmit}
                                  disabled={otp.length !== 4 ? true : false}
                                  type="submit"
                                >
                                  Verify
                                </button>
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
          </div>
        </div>
      </form>
    </>
  );
}
export default InputOtp;
