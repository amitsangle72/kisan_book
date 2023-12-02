import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../../service";
import { Country, State, City } from "country-state-city";
import { useTranslation } from "react-i18next";

function AddBuyer() {
   const {t} = useTranslation();
  const locations = useLocation();
  const buyer = locations.state?.buyer;
  //   console.log("amit", buyer);
  const navigate = useNavigate();
  let googleTransliterate = require('google-input-tool');
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState(buyer?.firstName || "");
  const [middleName, setMiddleName] = useState(buyer?.middleName || "");
  const [lastName, setLastName] = useState(buyer?.lastName);
  const [primaryMobileNumber, setPrimaryMobileNumber] = useState(
    buyer?.primaryMobileNumber || ""
  );
  const [secondaryMobileNumber, setSecondaryMobileNumber] = useState(
    buyer?.secondaryMobileNumber || ""
  );
  const [address1, setAddress1] = useState(buyer?.address.address1 || "");
  const [location, setLocation] = useState(buyer?.address.location || "");
  const [pinCode, setPinCode] = useState(buyer?.address.pinCode || "");
  const [changeTitle, setChangeTitle] = useState(
    !buyer ? "Add Buyer" : "Update Buyer"
  );
  const [primaryMobError, setPrimaryMobError] = useState();
  const [pinCodeError, setPinCodeError] = useState();

  const [selectedCountry, setSelectedCountry] = useState(
    buyer?.address.country || ""
  );
  const [selectedState, setSelectedState] = useState(
    buyer?.address.state || ""
  );
  const [selectedCity, setSelectedCity] = useState(buyer?.address.city || "");

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(selectedCountry?.isoCode);
  const cities = City.getCitiesOfState(
    selectedCountry?.isoCode,
    selectedState.isoCode
  );

  useEffect(() => {
    if (buyer) {
      const countries = Country.getAllCountries().find(
        (c) => c.name === buyer.address.country
      );
      const states = State.getStatesOfCountry(countries?.isoCode).find(
        (s) => s.name === buyer.address.state
      );
      const cities = City.getCitiesOfState(
        countries?.isoCode,
        states.isoCode
      ).find((c) => c.name === buyer.address.city);

      setSelectedCountry(countries);
      setSelectedState(states);
      setSelectedCity(cities);
    }
  }, [buyer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const addBuyer = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      primaryMobileNumber: primaryMobileNumber,
      secondaryMobileNumber: secondaryMobileNumber,
      address1: address1,
      location: location,
      country: selectedCountry.name,
      state: selectedState.name,
      city: selectedCity.name,
      pinCode: pinCode,
    };

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else if (
      primaryMobileNumber.length > 10 ||
      primaryMobileNumber.length < 10
    ) {
      return setPrimaryMobError({ message: "Enter a valid mobile number" });
    } else if (pinCode.length > 6 || pinCode.length < 6) {
      return setPinCodeError({ message: "Enter a valid pin code" });
    } else if (buyer) {
      if (
        primaryMobileNumber.toString().length > 10 ||
        primaryMobileNumber.toString().length < 10
      ) {
        setPrimaryMobError({ message: "Enter a valid mobile number" });
      } else if (
        pinCode.toString().length > 6 ||
        pinCode.toString().length < 6
      ) {
        setPinCodeError({ message: "Enter a valid pin code" });
      }
      addBuyer["_id"] = buyer._id;
      buyerUpdate(addBuyer);
    } else {
      addBuyerData(addBuyer);
    }
  };

  const addBuyerData = (addBuyer) => {
    ApiService.addBuyer(addBuyer)
      .then((response) => {
        navigate("/home/buyer");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buyerUpdate = (addBuyer) => {
    console.log("amit", buyerUpdate);
    ApiService.buyerUpdate(addBuyer._id, addBuyer)
      .then((response) => {
        navigate("/home/buyer");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [firstNameText, setFirstNameText] = useState('');
  
  const handleFirstNameChange = (e) => {
    let sourceText = e.target.value;
    let inputLanguage = 'mr-t-i0-und';
    let request = new XMLHttpRequest();
    let maxResult = 8;

    googleTransliterate(request, sourceText, inputLanguage,maxResult)
    .then(function(response) {
      setFirstNameText(response[0][0]);
    });
    console.log(firstNameText)
  };


  const [middleNameText, setMiddleNameText] = useState('');
  
  const handleMiddleNameChange = (e) => {
    let sourceText = e.target.value;
    let inputLanguage = 'mr-t-i0-und';
    let request = new XMLHttpRequest();
    let maxResult = 8;

    googleTransliterate(request, sourceText, inputLanguage,maxResult)
    .then(function(response) {
      setMiddleNameText(response[0][0]);
    });
  };

  

  const [lastNameText, setLastNameText] = useState('');
  
  const handleLastNameChange = (e) => {
    let sourceText = e.target.value;
    let inputLanguage = 'mr-t-i0-und';
    let request = new XMLHttpRequest();
    let maxResult = 8;

    googleTransliterate(request, sourceText, inputLanguage,maxResult)
    .then(function(response) {
      setLastNameText(response[0][0]);
    });
  };


  const [addressText, setAddressText] = useState('');
  
  const handleAddressChange = (e) => {
    let sourceText = e.target.value?.split(" ").join("1111111");
    let inputLanguage = 'mr-t-i0-und';
    let request = new XMLHttpRequest();
    let maxResult = 8;
    googleTransliterate(request, sourceText, inputLanguage, maxResult)
    .then(function(response) {
      let resp = response[0][0].split("१११११११").join(" ")
      setAddressText(resp);
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <Form
        className="col-md-9 rounded shadow border border-muted p-4 p-sm-4 mt-1 wow fadeIn "
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center shadow-sm p-2 mb-4 bg-white">
        {changeTitle}
        </h3>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>
            First Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => {
                handleFirstNameChange(event)
                setFirstName(event.target.value.replace(/[^a-z]/gi, ''));
              }}
            />
            <Form.Control.Feedback type="invalid">
            Enter a first name
            </Form.Control.Feedback>
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>
            Middle Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(event) => {
                handleMiddleNameChange(event)
                setMiddleName(event.target.value.replace(/[^a-z]/gi, ''));
              }}
            />
            <Form.Control.Feedback type="invalid">
            Enter a middle name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>
            Last Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => {
                handleLastNameChange(event)
                setLastName(event.target.value.replace(/[^a-z]/gi, ''));
              }}
            />
            <Form.Control.Feedback type="invalid">
            Enter a last name
            </Form.Control.Feedback>
          </Form.Group>
        </Row>



        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>
            प्रथम नाव<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="प्रथम नाव"
              value={firstNameText}
              onChange={(event) => {
                setFirstName(event.target.value.replace(/[^a-z]/gi, ''));
              }}
            />
            <Form.Control.Feedback type="invalid">
            प्रथम नाव टाका
            </Form.Control.Feedback>
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>
            वडीलांचे नाव <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="वडीलांचे नाव"
              value={middleNameText}
              onChange={(event) => {
                setMiddleName(event.target.value.replace(/[^a-z]/gi, ''));
              }}
            />
            <Form.Control.Feedback type="invalid">
            वडीलांचे नाव टाका
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>
            आडनाव<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="आडनाव"
              value={lastNameText}
              onChange={(event) => {
                setLastName(event.target.value.replace(/[^a-z]/gi, ''));
              }}
            />
            <Form.Control.Feedback type="invalid">
            आडनाव टाका
            </Form.Control.Feedback>
          </Form.Group>
        </Row>



        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>
            Primary mobile Number<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Primary mobile Number"
              className={primaryMobError ? "square border border-danger" : ""}
              value={primaryMobileNumber}
              required
              style={primaryMobError}
              onChange={(event) => {
                setPrimaryMobileNumber(event.target.value.slice(0,10));
              }}
            />
            <small className="text-danger">{primaryMobError?.message}</small>
            <Form.Control.Feedback type="invalid">
            Enter a primary mobile number
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>
            Secondary mobile Number
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Secondary mobile Number"

              value={secondaryMobileNumber}
              onChange={(event) => {
                setSecondaryMobileNumber(event.target.value.slice(0,10));
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter a secondary mobile number
            </Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>
            प्राथमिक मोबाईल क्रमांक<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="प्राथमिक मोबाईल क्रमांक"
              className={primaryMobError ? "square border border-danger" : ""}
              value={primaryMobileNumber}
              required
              style={primaryMobError}
              onChange={(event) => {
                setPrimaryMobileNumber(event.target.value.slice(0,10));
              }}
            />
            <small className="text-danger">{primaryMobError?.message}</small>
            <Form.Control.Feedback type="invalid">
            प्राथमिक मोबाईल क्रमांक टाका
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>
            पर्यायी  मोबाईल क्रमांक
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="पर्यायी  मोबाईल क्रमांक"

              value={secondaryMobileNumber}
              onChange={(event) => {
                setSecondaryMobileNumber(event.target.value.slice(0,10));
              }}
            />
            {/* <Form.Control.Feedback type="invalid">
            पर्यायी  मोबाईल क्रमांक टाका
            </Form.Control.Feedback> */}
          </Form.Group>
        </Row>




        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>
            Address<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address1}
              required
              onChange={(event) => {
                handleAddressChange(event)
                setAddress1(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
            Enter a address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>
            Location<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              required
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
            Enter a location
            </Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label>
            पत्ता<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="पत्ता"
              value={addressText}
              required
              onChange={(event) => {
                setAddress1(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
            पत्ता टाका
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>
            ठिकाण<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="ठिकाण"
              value={location}
              required
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
            ठिकाण टाका
            </Form.Control.Feedback>
          </Form.Group>
        </Row>





        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom08">
            <Form.Label>
            Country <span className="text-danger">*</span>
            </Form.Label>
            <select
              required
              value={selectedCountry ? selectedCountry.isoCode : ""}
              className="form-control"
              onChange={(e) =>
                setSelectedCountry(
                  countries.find((c) => c.isoCode === e.target.value)
                ) 
              }
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>

            <Form.Control.Feedback type="invalid">
            Select a country
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>
            State <span className="text-danger">*</span>
            </Form.Label>
            <select
              required
              value={selectedState ? selectedState.isoCode : ""}
              className="form-control"
              onChange={(e) =>
                setSelectedState(
                  states.find((s) => s.isoCode === e.target.value)
                )
              }
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>

            <Form.Control.Feedback type="invalid">
            Select a state
            </Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom08">
            <Form.Label>
            देश<span className="text-danger">*</span>
            </Form.Label>
            <select
              required
              value={selectedCountry ? selectedCountry.isoCode : ""}
              className="form-control"
              onChange={(e) =>
                setSelectedCountry(
                  countries.find((c) => c.isoCode === e.target.value)
                ) 
              }
            >
              <option value="">देश</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>

            <Form.Control.Feedback type="invalid">
            देश निवडा
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>
            राज्य <span className="text-danger">*</span>
            </Form.Label>
            <select
              required
              value={selectedState ? selectedState.isoCode : ""}
              className="form-control"
              onChange={(e) =>
                setSelectedState(
                  states.find((s) => s.isoCode === e.target.value)
                )
              }
            >
              <option value="">राज्य</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>

            <Form.Control.Feedback type="invalid">
            राज्य निवडा
            </Form.Control.Feedback>
          </Form.Group>
        </Row>





        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom08">
            <Form.Label>
            City
              <span className="text-danger">*</span>
            </Form.Label>
            <select
              required
              className="form-control"
              value={selectedCity ? selectedCity.name : ""}
              onChange={(e) =>
                setSelectedCity(cities?.find((c) => c.name === e.target.value))
              }
            >
               <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.isoCode} value={city.isoCode}>
                  {city.name}
                </option>
              ))}
            </select>

            <Form.Control.Feedback type="invalid">
            Select a city
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>
            Pin Code <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              className={pinCodeError ? "square border border-danger" : ""}
              placeholder="Pin Code"
              required
              style={pinCodeError}
              value={pinCode}
              onChange={(event) => {
                setPinCode(event.target.value.slice(0,6));
              }}
            />
            <small className="text-danger">{pinCodeError?.message}</small>
            <Form.Control.Feedback type="invalid">
            Enter a pin code
            </Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom08">
            <Form.Label>
            शहर
              <span className="text-danger">*</span>
            </Form.Label>
            <select
              required
              className="form-control"
              value={selectedCity ? selectedCity.name : ""}
              onChange={(e) =>
                setSelectedCity(cities?.find((c) => c.name === e.target.value))
              }
            >
               <option value="">शहर</option>
              {cities.map((city) => (
                <option key={city.isoCode} value={city.isoCode}>
                  {city.name}
                </option>
              ))}
            </select>

            <Form.Control.Feedback type="invalid">
            शहर निवडा
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>
            पिन कोड  <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              className={pinCodeError ? "square border border-danger" : ""}
              placeholder="पिन कोड"
              required
              style={pinCodeError}
              value={pinCode}
              onChange={(event) => {
                setPinCode(event.target.value.slice(0,6));
              }}
            />
            <small className="text-danger">{pinCodeError?.message}</small>
            <Form.Control.Feedback type="invalid">
            पिन कोड टाका
            </Form.Control.Feedback>
          </Form.Group>
        </Row>



        <div className="text-end">
          <Button variant="primary" type="submit">
          {changeTitle}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddBuyer;
