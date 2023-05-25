import React, { Fragment, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import Select from "react-select";
import "./Customermodal.css";

const CustomerModal = ({
  ModalTitle,
  customerModal,
  setCustomerModal,
  acceptHandler,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // add bank modal states
  const [addCustomerModal, setAddCustomerModal] = useState({
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
  const addCustomerModalValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerModal({
          ...addCustomerModal,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setAddCustomerModal({
        ...addCustomerModal,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerModal({
          ...addCustomerModal,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setAddCustomerModal({
        ...addCustomerModal,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerModal({
          ...addCustomerModal,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setAddCustomerModal({
        ...addCustomerModal,
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  // for close modal handler
  const customerCloseModal = () => {
    setCustomerModal(false);
  };
  return (
    <Fragment>
      <Modal
        show={customerModal}
        setShow={setCustomerModal}
        className="modaldialog modal-Bank-styles"
        modalHeaderClassName={"header-Bank-Modal-close-btn"}
        modalFooterClassName="modal-bank-footer"
        size="lg"
        onHide={customerCloseModal}
        ModalBody={
          <Fragment>
            {customerModal ? (
              <Fragment>
                <Row className="mt-2">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="Modal-Title-Bank">Add Company</span>
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
                      value={addCustomerModal.Name.value}
                      onChange={addCustomerModalValidateHandler}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Company Name<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="companyName"
                      value={addCustomerModal.companyName.value}
                      onChange={addCustomerModalValidateHandler}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Category<span className="aesterick-color">*</span>
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
                      Email<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField labelClass="d-none" />
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
                      value={addCustomerModal.Contact.value}
                      onChange={addCustomerModalValidateHandler}
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
                  text="Add"
                  className="AddUser-btn"
                  icon={<i class="icon-users icon-bank-modal"></i>}
                />
                <Button
                  text="Cancel"
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

export default CustomerModal;
