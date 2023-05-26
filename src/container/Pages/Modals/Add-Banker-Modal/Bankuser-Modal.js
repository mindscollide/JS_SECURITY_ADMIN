import React, { Fragment, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import Select from "react-select";
import "./Bankuser-Modal.css";

const BankModal = ({ ModalTitle, bankModal, setBankModal, acceptHandler }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // add bank modal states
  const [addBankModal, setAddBankModal] = useState({
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

  const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
    // ...
  ];

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  //add bank user security admin validate handler
  const addBankModalValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddBankModal({
          ...addBankModal,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setAddBankModal({
        ...addBankModal,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddBankModal({
          ...addBankModal,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setAddBankModal({
        ...addBankModal,
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setAddBankModal({
          ...addBankModal,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setAddBankModal({
        ...addBankModal,
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
    if (addBankModal.Email.value !== "") {
      if (validateEmail(addBankModal.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // for close modal handler
  const closeBankModal = () => {
    setBankModal(false);
  };
  return (
    <Fragment>
      <Modal
        show={bankModal}
        setShow={setBankModal}
        className="modaldialog modal-Bank-styles"
        modalHeaderClassName={"header-Bank-Modal-close-btn"}
        modalFooterClassName="modal-bank-footer"
        size="lg"
        onHide={closeBankModal}
        ModalBody={
          <Fragment>
            {bankModal ? (
              <Fragment>
                <Row className="mt-2">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="Modal-Title-Bank">Add User</span>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Name<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="Name"
                      value={addBankModal.Name.value}
                      onChange={addBankModalValidateHandler}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Email<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="Email"
                      value={addBankModal.Email.value}
                      onChange={addBankModalValidateHandler}
                      onBlur={handlerEmail}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      User Role<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <Select
                      options={options}
                      value={selectedOption}
                      onChange={handleOptionChange}
                      isSearchable={true}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Contact<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="Contact"
                      value={addBankModal.Contact.value}
                      onChange={addBankModalValidateHandler}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <Button
                  text="Add User"
                  className="AddUser-btn"
                  icon={<i class="icon-users icon-bank-modal"></i>}
                />
                <Button
                  text="Discard"
                  className="Cancel-btn "
                  icon={<i class="icon-close icon-bank-modal"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default BankModal;
