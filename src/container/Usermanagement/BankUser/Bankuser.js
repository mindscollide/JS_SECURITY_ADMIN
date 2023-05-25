import React, { Fragment, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { Paper, TextField, Button } from "../../../components/elements";
import BankModal from "../../Pages/Modals/Add-Banker-Modal/Bankuser-Modal";
import { validateEmail } from "../../../commen/functions/emailValidation";
import UploadAddModal from "../../Pages/Modals/Upload-AddBank-Modal/UploadAddModal";
import Select from "react-select";
import "./Bankuser.css";

const Bankuser = () => {
  //state for Add Bank User
  const [addBankUser, setAddBankUser] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Contact: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    userRole: 0,
  });

  //add bank user security admin validate handler
  const addBankUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setAddBankUser({
        ...addBankUser,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setAddBankUser({
        ...addBankUser,
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setAddBankUser({
          ...addBankUser,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setAddBankUser({
        ...addBankUser,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (addBankUser.Email.value !== "") {
      if (validateEmail(addBankUser.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  //state for Bankmodal
  const [addBankModal, setAddBankModal] = useState(false);

  //state for BankUploadModal
  const [uplaodModal, setUploadModal] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
    // ...
  ];

  const handleInputChange = (newValue) => {
    // const inputValue = newValue.replace(/\W/g, "");
    // return inputValue;
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  //OPEN BANK MODAL
  const openBankModal = () => {
    setAddBankModal(true);
  };

  //open upload bank modal
  const openUploadModal = () => {
    setUploadModal(true);
  };

  return (
    <Fragment>
      <Container className="bank-user-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="bank-user-label">Add a Bank user</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={11} md={11} sm={12}>
                <Paper className="bankuser-paper">
                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-bank">
                        Name<span className="aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField
                        name={"Name"}
                        value={addBankUser.Name.value}
                        onChange={addBankUserValidateHandler}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={4} md={4} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-bank">
                        User Role<span className="aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <span className="span-select">
                        <Select
                          options={options}
                          value={selectedOption}
                          onInputChange={handleInputChange}
                          onChange={handleOptionChange}
                          isSearchable={true}
                          className="react-select-field"
                        />
                        <span
                          className="select-clickable-icon"
                          onClick={openBankModal}
                        >
                          <PlusLg />
                        </span>
                      </span>
                    </Col>
                    <Col lg={4} md={4} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-bank">
                        Email<span className="aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField
                        name="Email"
                        value={addBankUser.Email.value}
                        onChange={addBankUserValidateHandler}
                        onBlur={handlerEmail}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={4} md={4} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-bank">
                        Contact<span className="aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField
                        name={"Contact"}
                        value={addBankUser.Contact.value}
                        onChange={addBankUserValidateHandler}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={4} md={4} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-bank">
                        File Upload<span className="aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <Button
                        text="Upload your contacts"
                        className="upload-btn"
                        onClick={openUploadModal}
                      />
                    </Col>
                    <Col lg={4} md={4} sm={12}></Col>

                    <Row className="mt-3">
                      <Col
                        lg={9}
                        md={9}
                        sm={12}
                        className="active-cancel-btn-col"
                      >
                        <Button
                          icon={<i className="icon-check icon-check-space"></i>}
                          text="Activate"
                          className="Active-btn"
                        />
                        <Button
                          icon={<i className="icon-close icon-check-space"></i>}
                          text="Cancel"
                          className="Cancel-btn"
                        />
                      </Col>
                    </Row>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {addBankModal ? (
        <BankModal bankModal={addBankModal} setBankModal={setAddBankModal} />
      ) : null}

      {uplaodModal ? (
        <UploadAddModal
          uploadAddModal={uplaodModal}
          setUploadAddModal={setUploadModal}
        />
      ) : null}
    </Fragment>
  );
};

export default Bankuser;
