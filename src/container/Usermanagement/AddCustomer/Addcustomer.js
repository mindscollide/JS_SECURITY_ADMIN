import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { Paper, TextField, Button } from "../../../components/elements";
import CustomerModal from "../../Pages/Modals/Add-Customer-Modal/Customermodal";
import UploadCustomerModal from "../../Pages/Modals/Upload-Customer-Modal/UploadCustomerModal";
import { validateEmail } from "../../../commen/functions/emailValidation";
import "./Addcustomer.css";
import Select from "react-select";

const Addcustomer = () => {
  // customer modal States
  const [modalAddCustomer, setModalAddCustomer] = useState(false);

  // Upload Customer modal states
  const [customerUpload, setCustomerUpload] = useState(false);

  const [addCustomerState, setAddCustomerState] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    companyName: {
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

    natureClient: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Category: 0,
    rfqTimer: 0,
  });

  const addCustomerValidationHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerState({
          ...addCustomerState,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setAddCustomerState({
        ...addCustomerState,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerState({
          ...addCustomerState,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setAddCustomerState({
        ...addCustomerState,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerState({
          ...addCustomerState,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setAddCustomerState({
        ...addCustomerState,
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setAddCustomerState({
          ...addCustomerState,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setAddCustomerState({
        ...addCustomerState,
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
    if (addCustomerState.Email.value !== "") {
      if (validateEmail(addCustomerState.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // open modal on Plus icon
  const openModalPlusIcon = () => {
    setModalAddCustomer(true);
  };

  // open Customer Upload modal
  const openUploadCustomerModal = () => {
    setCustomerUpload(true);
  };
  return (
    <Fragment>
      <Container className="addCustomer-user-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span>Add a Bank user</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={11} md={11} sm={12}>
                <Paper className="addCustomer-paper">
                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        Name
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField
                        name="Name"
                        value={addCustomerState.Name.value}
                        onChange={addCustomerValidationHandler}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        Company Name
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <span className="span-field">
                        <TextField
                          name="companyName"
                          value={addCustomerState.companyName.value}
                          onChange={addCustomerValidationHandler}
                          labelClass="d-none"
                          className="Text-field-with-icon"
                        />
                        <span
                          className="field-clickable-icon"
                          onClick={openModalPlusIcon}
                        >
                          <PlusLg />
                        </span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        Category
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <Select
                        name="Category"
                        labelClass="d-none"
                        isDisabled={true}
                      />
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        Email
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField
                        name="Email"
                        value={addCustomerState.Email.value}
                        onChange={addCustomerValidationHandler}
                        onBlur={handlerEmail}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        Contact
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField
                        name="Contact"
                        value={addCustomerState.Contact.value}
                        onChange={addCustomerValidationHandler}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        RFQ Timer
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <Select
                        name="Category"
                        labelClass="d-none"
                        isDisabled={true}
                      />
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        Nature Of Client
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField disable={true} labelClass="d-none" />
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <span className="labels-add-Customer">
                        File Upload
                        <span className="addCustomer-aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <Button
                        className="upload-btn"
                        onClick={openUploadCustomerModal}
                        text="Upload your contacts"
                      />
                    </Col>
                    <Col lg={5} md={5} sm={12}></Col>

                    <Row className="mt-3">
                      <Col
                        lg={9}
                        md={9}
                        sm={12}
                        className="add-customer-active-cancel"
                      >
                        <Button
                          icon={<i className="icon-check icon-check-space"></i>}
                          text="Activate"
                          className="Active-btn-Add-Customer"
                        />
                        <Button
                          icon={<i className="icon-close icon-check-space"></i>}
                          text="Cancel"
                          className="Cancel-btn-Add-Customer"
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

      {modalAddCustomer ? (
        <>
          <CustomerModal
            customerModal={modalAddCustomer}
            setCustomerModal={setModalAddCustomer}
          />
        </>
      ) : null}

      {customerUpload ? (
        <>
          <UploadCustomerModal
            uploadCustomerModal={customerUpload}
            setUploadCustomerModal={setCustomerUpload}
          />
        </>
      ) : null}
    </Fragment>
  );
};

export default Addcustomer;
