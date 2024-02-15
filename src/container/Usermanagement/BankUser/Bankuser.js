import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import {
  Paper,
  TextField,
  Button,
  Notification,
  Loader,
  CustomUpload,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BankModal from "../../Pages/Modals/Add-Banker-Modal/Bankuser-Modal";
import { validateEmail } from "../../../commen/functions/emailValidation";
import UploadAddModal from "../../Pages/Modals/Upload-AddBank-Modal/UploadAddModal";
import { downloadAddBankorCustomerReport } from "../../../store/actions/Download-Report";
import Select from "react-select";
import { Upload } from "antd";
import "./Bankuser.css";
import { createBank } from "../../../store/actions/Security_Admin";
import {
  allUserRole,
  allUserStatus,
} from "../../../store/actions/Auth_Actions";
import { FileBulkUpload } from "../../../store/actions/Upload_Action";

const Bankuser = () => {
  const { auth, securitReducer, downloadReducer } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let bankUserSecurity = localStorage.getItem("bankID");

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [tasksAttachments, setTasksAttachments] = useState({
    TasksAttachments: [],
  });

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  //state for allUserRole List Dropdown
  const [bankSelectRole, setBankSelectRole] = useState([]);
  const [bankSelectRoleValue, setBankSelectRoleValue] = useState([]);

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);

  //state for Bankmodal
  const [addBankModal, setAddBankModal] = useState(false);

  //state for BankUploadModal
  const [uplaodModal, setUploadModal] = useState(false);

  //state for Add Bank User
  const [addBankUser, setAddBankUser] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
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
    ldapAccount: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    roleID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    fileTypeId: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
  });

  useEffect(() => {
    dispatch(allUserRole());
  }, []);

  //add bank user security admin validate handler
  const addBankUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setAddBankUser({
        ...addBankUser,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setAddBankUser({
        ...addBankUser,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "ldapAccount" && value !== "") {
      // let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      // console.log("valueCheckvalueCheck", valueCheck);
      if (value !== "") {
        setAddBankUser({
          ...addBankUser,
          ldapAccount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "ldapAccount" && value === "") {
      setAddBankUser({
        ...addBankUser,
        ldapAccount: { value: "", errorMessage: "", errorStatus: false },
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

    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setAddBankUser({
          ...addBankUser,
          email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setAddBankUser({
        ...addBankUser,
        email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (addBankUser.email.value !== "") {
      if (validateEmail(addBankUser.email.value)) {
        setIsValidEmail(true);
        console.log("Email verified");
      } else {
        setIsValidEmail(false);
        setAddBankUser({
          ...addBankUser,
          email: {
            value: addBankUser.email.value,
            errorMessage: "Email Should be In Valid Format",
            errorStatus: true,
          },
        });
        console.log("Email Not Verified");
      }
    } else {
      setIsValidEmail(false);
      setAddBankUser({
        ...addBankUser,
        email: {
          value: addBankUser.email.value,
          errorMessage: "Email Should be In Valid Format",
          errorStatus: true,
        },
      });
      console.log("Email Not Verified");
    }
  };

  // onchange handler for edit select role
  const bankSelectRoleHandler = async (selectedRole) => {
    console.log(selectedRole, "selectroleselectroleselectrole");
    setBankSelectRoleValue(selectedRole);
    setAddBankUser({
      ...addBankUser,
      roleID: {
        value: selectedRole.value,
      },
    });
  };
  console.log("selectRoleValue", bankSelectRoleValue, addBankUser);

  //OPEN BANK MODAL
  const openBankModal = () => {
    setAddBankModal(true);
  };

  //open upload bank modal
  const openUploadModal = () => {
    setUploadModal(true);
  };

  const createResetHandler = () => {
    setAddBankUser({
      ...addBankUser,
      firstName: {
        value: "",
      },

      lastName: {
        value: "",
      },

      roleID: {
        value: "",
      },

      ldapAccount: {
        value: "",
      },

      email: {
        value: "",
      },

      Contact: {
        value: "",
      },
    });
    setBankSelectRoleValue([]);
  };

  // download report in Add Bank user page
  const downloadReportAddBank = async () => {
    let downloadReport = {
      FileTypeID: 1,
    };
    await dispatch(downloadAddBankorCustomerReport(downloadReport));

    if (downloadReport.FileTypeID === 1) {
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
  };

  // show error message When user hit activate btn
  const activateHandler = (e) => {
    e.preventDefault();
    if (
      addBankUser.firstName.value !== "" &&
      addBankUser.lastName.value !== "" &&
      addBankUser.roleID.value !== "" &&
      addBankUser.ldapAccount.value !== "" &&
      addBankUser.email.value !== "" &&
      addBankUser.Contact.value !== ""
    ) {
      if (validateEmail(addBankUser.email.value)) {
        setErrorShow(false);
        setIsValidEmail(true);
        let newData = {
          User: {
            FirstName: addBankUser.firstName.value,
            Lastname: addBankUser.lastName.value,
            Email: addBankUser.email.value,
            ContactNumber: addBankUser.Contact.value,
            LDAPAccount: addBankUser.ldapAccount.value,
            UserRoleID: addBankUser.roleID.value,
          },
          BankId: parseInt(bankUserSecurity),
        };
        const clearData = () => {
          setAddBankUser({
            ...addBankUser,
            firstName: {
              value: "",
            },

            lastName: {
              value: "",
            },

            roleID: {
              value: "",
            },

            ldapAccount: {
              value: "",
            },

            email: {
              value: "",
            },

            Contact: {
              value: "",
            },
          });
          setBankSelectRoleValue([]);
        };
        let clearFieldData = clearData;
        dispatch(createBank(navigate, newData, clearFieldData));
      } else if (validateEmail(addBankUser.email.value) === false) {
        setErrorShow(true);
        setIsValidEmail(false);
        setAddBankUser({
          ...addBankUser,
          email: {
            value: addBankUser.email.value,
            errorMessage: "Email Should be In Valid Format",
            errorStatus: true,
          },
        });
      }
    } else {
      setErrorShow(true);
      setIsValidEmail(false);
      setAddBankUser({
        ...addBankUser,
        email: {
          value: addBankUser.email.value,
          errorMessage: "Email is requried",
          errorStatus: true,
        },
      });
    }
  };

  // for userRoles in select drop down
  useEffect(() => {
    if (Object.keys(auth.UserRoleList).length > 0) {
      let tem = [];
      auth.UserRoleList.map((data, index) => {
        console.log(data, "datadatadatadata");
        tem.push({
          label: data.roleName,
          value: data.roleID,
        });
      });
      setBankSelectRole(tem);
    }
  }, [auth.UserRoleList]);

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
        dispatch(FileBulkUpload(navigate, counterUploadFile, setUploadModal));
      }
    },
  };

  return (
    <section className="Container_bank_user">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-start"
            >
              <span className="bank-user-label">Add a Bank user</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <Paper className="bankuser-paper">
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className="labels-add-bank">
                          First Name<span className="aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"firstName"}
                          value={addBankUser.firstName.value}
                          className="bankUser-textfield"
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                        />
                        <Row>
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            className="d-flex justify-content-start"
                          >
                            <p
                              className={
                                errorShow && addBankUser.firstName.value === ""
                                  ? "bankErrorMessage"
                                  : "bankErrorMessage_hidden"
                              }
                            >
                              First Name is required
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className="labels-add-bank">
                          Last Name<span className="aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"lastName"}
                          value={addBankUser.lastName.value}
                          className="bankUser-textfield"
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                        />
                        <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow && addBankUser.lastName.value === ""
                                  ? "bankErrorMessage"
                                  : "bankErrorMessage_hidden"
                              }
                            >
                              Last Name is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className="labels-add-bank">
                          LDAP Account<span className="aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"ldapAccount"}
                          value={addBankUser.ldapAccount.value}
                          className="bankUser-textfield"
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                        />
                        <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow &&
                                addBankUser.ldapAccount.value === ""
                                  ? "bankErrorMessage"
                                  : "bankErrorMessage_hidden"
                              }
                            >
                              LDAP Account is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-2">
                      <Col lg={2} md={2} sm={12}>
                        <span className="labels-add-bank">
                          User Role<span className="aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        {/* <span className="span-select"> */}
                        <Select
                          name="roleID"
                          options={bankSelectRole}
                          value={bankSelectRoleValue}
                          onChange={bankSelectRoleHandler}
                          isSearchable={true}
                          className="react-select-field"
                        />
                        {/* <span
                          className="select-clickable-icon"
                          onClick={openBankModal}
                        >
                          <PlusLg />
                        </span> */}
                        {/* </span> */}
                        <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow && addBankUser.roleID.value === ""
                                  ? "bankErrorMessage"
                                  : "bankErrorMessage_hidden"
                              }
                            >
                              Role is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-2">
                      <Col lg={2} md={2} sm={12}>
                        <span className="labels-add-bank">
                          Email<span className="aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name="email"
                          className="bankUser-textfield"
                          value={addBankUser.email.value}
                          onChange={addBankUserValidateHandler}
                          onBlur={() => {
                            handlerEmail();
                          }}
                          labelClass="d-none"
                        />
                        <Row>
                          <Col className="d-flex justify-content-start">
                            {(!isValidEmail &&
                              addBankUser.email.value !== "" && (
                                <p
                                  className={
                                    errorShow &&
                                    addBankUser.email.errorMessage !== ""
                                      ? "bankErrorMessage"
                                      : "bankErrorMessage_hidden"
                                  }
                                >
                                  {addBankUser.email.errorMessage}
                                </p>
                              )) || (
                              <p
                                className={
                                  errorShow && addBankUser.email.value === ""
                                    ? "bankErrorMessage"
                                    : "bankErrorMessage_hidden"
                                }
                              >
                                {addBankUser.email.errorMessage}
                              </p>
                            )}
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-2">
                      <Col lg={2} md={2} sm={12}>
                        <span className="labels-add-bank">
                          Contact<span className="aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"Contact"}
                          className="bankUser-textfield"
                          value={addBankUser.Contact.value}
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                        />
                        <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow && addBankUser.Contact.value === ""
                                  ? "bankErrorMessage"
                                  : "bankErrorMessage_hidden"
                              }
                            >
                              Contact is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-2">
                      <Col lg={2} md={2} sm={12}>
                        <span className="labels-add-bank">
                          File Upload<span className="aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col
                        lg={5}
                        md={5}
                        sm={12}
                        className="add-bank-upload-download-col"
                      >
                        <Upload showUploadList={false} {...props}>
                          <Button
                            className="add-bank-uplaod-contact"
                            text={"Upload Your Contacts"}
                          />
                        </Upload>

                        <Button
                          onClick={downloadReportAddBank}
                          text={"Download excel format"}
                          className="add-bank-download-contact"
                        />
                      </Col>
                      <Col lg={5} md={5} sm={12} />

                      <Row className="mt-3">
                        <Col
                          lg={9}
                          md={9}
                          sm={12}
                          className="active-cancel-btn-col"
                        >
                          <Button
                            icon={
                              <i className="icon-check icon-check-space"></i>
                            }
                            text="Activate"
                            onClick={activateHandler}
                            className="Active-btn"
                          />
                          <Button
                            icon={
                              <i className="icon-close icon-check-space"></i>
                            }
                            text="Cancel"
                            onClick={createResetHandler}
                            className="Cancel-btn"
                          />
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>
        </Col>
      </Row>
      {addBankModal ? (
        <BankModal bankModal={addBankModal} setBankModal={setAddBankModal} />
      ) : null}
      {uplaodModal ? (
        <UploadAddModal
          uploadAddModal={uplaodModal}
          setUploadAddModal={setUploadModal}
        />
      ) : null}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {securitReducer.Loading || downloadReducer.Loading ? <Loader /> : null}
    </section>
  );
};

export default Bankuser;
