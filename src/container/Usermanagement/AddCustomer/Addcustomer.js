import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import {
  Paper,
  TextField,
  Notification,
  Button,
  Loader,
  CustomUpload,
} from "../../../components/elements";
import { useSelector, useDispatch } from "react-redux";
import CustomerModal from "../../Pages/Modals/Add-Customer-Modal/Customermodal";
import UploadCustomerModal from "../../Pages/Modals/Upload-Customer-Modal/UploadCustomerModal";
import { validateEmail } from "../../../commen/functions/emailValidation";
import { useNavigate } from "react-router-dom";
import { downloadAddBankorCustomerReport } from "../../../store/actions/Download-Report";
import { getAllCorporate } from "../../../store/actions/Auth_Actions";
import { FileBulkUpload } from "../../../store/actions/Upload_Action";
import { corporateCreate } from "../../../store/actions/Security_Admin";
import { Upload } from "antd";
import "./Addcustomer.css";
import Select from "react-select";

const Addcustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, securitReducer, downloadReducer } = useSelector(
    (state) => state
  );
  console.log(auth, "auth");
  // customer modal States
  const [modalAddCustomer, setModalAddCustomer] = useState(false);

  //state for error message show on add a customer page
  const [errorShow, setErrorShow] = useState(false);

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  // Upload Customer modal states
  const [customerUpload, setCustomerUpload] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(false);

  let addBankSecurity = localStorage.getItem("bankID");

  // states For Corporates Category select Dropdown
  const [selectCorporate, setSelectCorporate] = useState([]);
  const [selectCorporateValue, setSelectCorporateValue] = useState([]);
  const [corporateValue, setCorporateValue] = useState({
    label: "",
    value: 0,
  });
  console.log(
    corporateValue,
    "corporateValuecorporateValuecorporateValuecorporateValue"
  );
  const [addCustomerState, setAddCustomerState] = useState({
    firstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    lastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    email: {
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

    Category: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporateID: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    rfqTimer: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    addCorporateFile: {
      value: 2,
      errorMessage: "",
      errorStatus: false,
    },
  });

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      let counterUploadFile = info.file.originFileObj;
      let ext = info.file.originFileObj.name.split(".").pop();
      if (ext === "xls" || ext === "xlsx") {
        dispatch(
          FileBulkUpload(navigate, counterUploadFile, setCustomerUpload)
        );
      }
    },
  };

  useEffect(() => {
    dispatch(getAllCorporate(navigate));
  }, []);

  const addCustomerValidationHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerState({
          ...addCustomerState,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setAddCustomerState({
        ...addCustomerState,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerState({
          ...addCustomerState,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setAddCustomerState({
        ...addCustomerState,
        lastName: { value: "", errorMessage: "", errorStatus: false },
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

    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setAddCustomerState({
          ...addCustomerState,
          email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setAddCustomerState({
        ...addCustomerState,
        email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  // download report in Add Bank user page
  const downloadReportAddCustomer = () => {
    let downloadCustomerReport = {
      FileTypeID: 2,
    };
    if (downloadCustomerReport.FileTypeID === 2) {
      setOpen({
        ...open,
        open: true,
        message: "Download Successfully",
      });
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Downloading Failed",
      });
    }
    dispatch(downloadAddBankorCustomerReport(downloadCustomerReport));
  };

  //reset handler for Activate in Add a Customer user
  const customerActivateResetHandler = () => {
    setAddCustomerState({
      ...addCustomerState,
      firstName: {
        value: "",
      },

      lastName: {
        value: "",
      },

      email: {
        value: "",
      },

      Contact: {
        value: "",
      },
      natureClient: {
        value: "",
      },
      Category: {
        value: "",
      },

      rfqTimer: {
        value: "",
      },
    });
    setSelectCorporateValue([]);
  };

  // onchange handler for corporate category select
  const selectCorporateHandler = async (selectedCategory) => {
    console.log(selectedCategory, "selectedCategoryselectedCategory");
    setSelectCorporateValue(selectedCategory);
    setCorporateValue({
      label: selectedCategory.label,
      value: selectedCategory.value,
    });
    setAddCustomerState({
      ...addCustomerState,
      corporateID: {
        value: selectedCategory.value,
        label: selectedCategory.label,
      },
    });
    let coperateDataApi = auth.allCorporates;
    try {
      if (
        Object.keys(coperateDataApi).length > 0 &&
        coperateDataApi !== undefined &&
        coperateDataApi !== null
      ) {
        coperateDataApi.map((corporateData, index) => {
          if (selectedCategory.label === corporateData.corporateName) {
            setAddCustomerState({
              ...addCustomerState,
              natureClient: {
                value: corporateData.natureofBusiness.name,
              },
              Category: {
                value: corporateData.corporateCategory.category,
              },
              rfqTimer: {
                value: corporateData.rfqTimers[0].rfqTimer,
              },
            });
          }
        });
      }
    } catch {
      console.log("error on selecting company Name");
    }
  };
  console.log("selectRoleValue", selectCorporateValue, addCustomerState);

  // Activate Button Handler when user hit button then error messages shown on field
  const activateCustomerHandler = (e) => {
    e.preventDefault();
    if (
      addCustomerState.firstName.value !== "" &&
      addCustomerState.lastName.value !== "" &&
      // addCustomerState.corporateValue.value !== "" &&
      // addCustomerState.corporateID.value !== "" &&
      addCustomerState.email.value !== "" &&
      addCustomerState.Contact.value !== ""
    ) {
      if (validateEmail(addCustomerState.email.value)) {
        let corporateData = {
          User: {
            FirstName: addCustomerState.firstName.value,
            Lastname: addCustomerState.lastName.value,
            Email: addCustomerState.email.value,
            ContactNumber: addCustomerState.Contact.value,
            LDAPAccount: "mindscollide.aun",
            UserRoleID: 2,
          },
          CorporateID: corporateValue.value,
        };

        const clearField = () => {
          setAddCustomerState({
            ...addCustomerState,
            firstName: {
              value: "",
            },
            lastName: {
              value: "",
            },
            email: {
              value: "",
            },
            Contact: {
              value: "",
            },
            natureClient: {
              value: "",
            },
            Category: {
              value: "",
            },
            rfqTimer: {
              value: "",
            },
          });
          setSelectCorporateValue([]);
        };

        let clearTextFieldData = clearField;
        console.log(corporateData);
        setErrorShow(false);
        setIsValidEmail(true);
        dispatch(corporateCreate(navigate, corporateData, clearTextFieldData));
      } else if (validateEmail(addCustomerState.email.value) === false) {
        setErrorShow(true);
        setIsValidEmail(false);
        setAddCustomerState({
          ...addCustomerState,
          email: {
            value: addCustomerState.email.value,
            errorMessage: "Email Should be In Valid Format",
            errorStatus: true,
          },
        });
      }
    } else {
      setErrorShow(true);
      setIsValidEmail(false);
      setAddCustomerState({
        ...addCustomerState,
        email: {
          value: addCustomerState.email.value,
          errorMessage: "Email Should be In Valid Format",
          errorStatus: true,
        },
      });
    }
  };

  // open modal on Plus icon
  const openModalPlusIcon = () => {
    setModalAddCustomer(true);
  };

  // for category Corporate in select drop down
  useEffect(() => {
    console.log(auth, "authauthauth");
    if (Object.keys(auth.allCorporates).length > 0) {
      let tem = [];
      auth.allCorporates.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.corporateName,
          value: data.corporateID,
        });
      });
      setSelectCorporate(tem);
    }
  }, [auth.allCorporates]);

  return (
    <>
      <section className="addCustomer-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <span className="Customer-add-user-label">Add a Customer user</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="addCustomer-paper">
              <Row className="mt-3">
                <Col lg={2} md={2} sm={12}>
                  <span className="labels-add-Customer">
                    First Name
                    <span className="addCustomer-aesterick-color">*</span>
                  </span>
                </Col>
                <Col lg={5} md={5} sm={12}>
                  <TextField
                    name="firstName"
                    className="add-customer-textfield"
                    value={addCustomerState.firstName.value}
                    onChange={addCustomerValidationHandler}
                    labelClass="d-none"
                  />
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p
                        className={
                          errorShow && addCustomerState.firstName.value === ""
                            ? "addCustomerErrorMessage"
                            : "addCustomerErrorMessage_hidden"
                        }
                      >
                        First Name is required
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={5} md={5} sm={12}></Col>
              </Row>

              <Row className="mt-1">
                <Col lg={2} md={2} sm={12}>
                  <span className="labels-add-Customer">
                    Last Name
                    <span className="addCustomer-aesterick-color">*</span>
                  </span>
                </Col>
                <Col lg={5} md={5} sm={12}>
                  <TextField
                    name="lastName"
                    className="add-customer-textfield"
                    value={addCustomerState.lastName.value}
                    onChange={addCustomerValidationHandler}
                    labelClass="d-none"
                  />
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p
                        className={
                          errorShow && addCustomerState.lastName.value === ""
                            ? "addCustomerErrorMessage"
                            : "addCustomerErrorMessage_hidden"
                        }
                      >
                        Last Name is required
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={5} md={5} sm={12}></Col>
              </Row>

              <Row className="mt-1">
                <Col lg={2} md={2} sm={12}>
                  <span className="labels-add-Customer">
                    Company Name
                    <span className="addCustomer-aesterick-color">*</span>
                  </span>
                </Col>
                <Col lg={5} md={5} sm={12}>
                  <span className="span-field">
                    <Select
                      name="corporateValue"
                      options={selectCorporate}
                      value={selectCorporateValue}
                      onChange={selectCorporateHandler}
                      className="react-select-customer-field"
                    />
                    <span
                      className="field-clickable-icon"
                      onClick={openModalPlusIcon}
                    >
                      <PlusLg />
                    </span>
                  </span>
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p
                        className={
                          errorShow && corporateValue.value === ""
                            ? "addCustomerErrorMessage"
                            : "addCustomerErrorMessage_hidden"
                        }
                      >
                        Company Name is required
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={5} md={5} sm={12}></Col>
              </Row>

              <Row className="mt-1">
                <Col lg={2} md={2} sm={12}>
                  <span className="labels-add-Customer">
                    Category
                    <span className="addCustomer-aesterick-color">*</span>
                  </span>
                </Col>
                <Col lg={5} md={5} sm={12}>
                  <TextField
                    name="Category"
                    value={addCustomerState.Category.value}
                    labelClass="d-none"
                    disable={true}
                    className="disabled-fields"
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
                    name="email"
                    className="add-customer-textfield"
                    value={addCustomerState.email.value}
                    onChange={addCustomerValidationHandler}
                    labelClass="d-none"
                  />
                  <Row>
                    <Col className="d-flex justify-content-start">
                      {(!isValidEmail &&
                        addCustomerState.email.value !== "" && (
                          <p
                            className={
                              errorShow &&
                              addCustomerState.email.errorMessage !== ""
                                ? "addCustomerErrorMessage"
                                : "addCustomerErrorMessage_hidden"
                            }
                          >
                            {addCustomerState.email.errorMessage}
                          </p>
                        )) || (
                        <p
                          className={
                            errorShow && addCustomerState.email.value === ""
                              ? "addCustomerErrorMessage"
                              : "addCustomerErrorMessage_hidden"
                          }
                        >
                          Email is Required
                        </p>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col lg={5} md={5} sm={12}></Col>
              </Row>

              <Row className="mt-1">
                <Col lg={2} md={2} sm={12}>
                  <span className="labels-add-Customer">
                    Contact
                    <span className="addCustomer-aesterick-color">*</span>
                  </span>
                </Col>
                <Col lg={5} md={5} sm={12}>
                  <TextField
                    name="Contact"
                    className="add-customer-textfield"
                    value={addCustomerState.Contact.value}
                    onChange={addCustomerValidationHandler}
                    labelClass="d-none"
                  />
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p
                        className={
                          errorShow && addCustomerState.Contact.value === ""
                            ? "addCustomerErrorMessage"
                            : "addCustomerErrorMessage_hidden"
                        }
                      >
                        Contact is required
                      </p>
                    </Col>
                  </Row>
                </Col>

                <Col lg={5} md={5} sm={12}></Col>
              </Row>

              <Row className="mt-1">
                <Col lg={2} md={2} sm={12}>
                  <span className="labels-add-Customer">
                    RFQ Timer
                    <span className="addCustomer-aesterick-color">*</span>
                  </span>
                </Col>
                <Col lg={5} md={5} sm={12}>
                  <TextField
                    labelClass="d-none"
                    value={addCustomerState.rfqTimer.value}
                    disable={true}
                    className="disabled-fields"
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
                  <TextField
                    disable={true}
                    labelClass="d-none"
                    className="disabled-fields"
                    value={addCustomerState.natureClient.value}
                  />
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
                <Col
                  lg={5}
                  md={5}
                  sm={12}
                  className="add-Customer-upload-download-col"
                >
                  <Upload showUploadList={false} {...props}>
                    <Button
                      className="add-Customer-uplaod-contact"
                      text={"Upload Your Contacts"}
                    />
                  </Upload>

                  <Button
                    onClick={downloadReportAddCustomer}
                    className="add-Customer-download-contact"
                    text="Download Excel Format"
                  />
                </Col>
                <Col lg={5} md={5} sm={12} />

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
                      onClick={activateCustomerHandler}
                      className="Active-btn-Add-Customer"
                    />
                    <Button
                      icon={<i className="icon-close icon-check-space"></i>}
                      text="Cancel"
                      onClick={customerActivateResetHandler}
                      className="Cancel-btn-Add-Customer"
                    />
                  </Col>
                </Row>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>

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
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {securitReducer.Loading || downloadReducer.Loading ? <Loader /> : null}
    </>
  );
};

export default Addcustomer;
