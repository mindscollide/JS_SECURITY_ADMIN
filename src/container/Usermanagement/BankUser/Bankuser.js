import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { Paper, TextField, Button, Loader } from "../../../components/elements";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BankModal from "../../Pages/Modals/Add-Banker-Modal/Bankuser-Modal";
import { validateEmail } from "../../../commen/functions/emailValidation";
import UploadAddModal from "../../Pages/Modals/Upload-AddBank-Modal/UploadAddModal";
import Select from "react-select";
import "./Bankuser.css";
import { createBank } from "../../../store/actions/Security_Admin";
import {
  allUserRole,
  allUserStatus,
} from "../../../store/actions/Auth_Actions";

const Bankuser = () => {
  const { auth, securitReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
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

  // show error message When user hit activate btn
  const activateHandler = () => {
    if (
      addBankUser.firstName.value !== "" &&
      addBankUser.lastName.value !== "" &&
      addBankUser.roleID.value !== "" &&
      addBankUser.ldapAccount.value !== "" &&
      addBankUser.email.value !== "" &&
      addBankUser.Contact.value !== ""
    ) {
      setErrorShow(false);
      let newData = {
        User: {
          FirstName: addBankUser.firstName.value,
          Lastname: addBankUser.lastName.value,
          Email: addBankUser.email.value,
          ContactNumber: addBankUser.Contact.value,
          LDAPAccount: addBankUser.ldapAccount.value,
          // LDAPAccount: `mindscollide.${addBankUser.Name.value.replace(
          //   " ",
          //   ""
          // )}`,
          UserRoleID: addBankUser.roleID.value,
        },
        BankId: 1,
      };
      dispatch(createBank(navigate, newData));
    } else {
      setErrorShow(true);
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
                        First Name<span className="aesterick-color">*</span>
                      </span>
                    </Col>
                    <Col lg={5} md={5} sm={12}>
                      <TextField
                        name={"firstName"}
                        value={addBankUser.firstName.value}
                        onChange={addBankUserValidateHandler}
                        labelClass="d-none"
                      />
                      <Row>
                        <Col className="d-flex justify-content-start">
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

                    <Col lg={4} md={4} sm={12}></Col>
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
                        onChange={addBankUserValidateHandler}
                        labelClass="d-none"
                      />
                      <Row>
                        <Col className="d-flex justify-content-start">
                          <p
                            className={
                              errorShow && addBankUser.ldapAccount.value === ""
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
                        value={addBankUser.email.value}
                        onChange={addBankUserValidateHandler}
                        onBlur={handlerEmail}
                        labelClass="d-none"
                      />
                      <Row>
                        <Col className="d-flex justify-content-start">
                          <p
                            className={
                              errorShow && addBankUser.email.value === ""
                                ? "bankErrorMessage"
                                : "bankErrorMessage_hidden"
                            }
                          >
                            Email is required
                          </p>
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
                    <Col lg={2} md={2} sm={12}>
                      <Button
                        text="Upload your contacts"
                        className="upload-btn"
                        onClick={openUploadModal}
                      />
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={12}
                      className="d-flex justify-content-end"
                    >
                      <Button
                        text={"download excel format"}
                        className="upload-btn"
                      />
                    </Col>
                    <Col lg={7} md={7} sm={12} />

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
                          onClick={activateHandler}
                          className="Active-btn"
                        />
                        <Button
                          icon={<i className="icon-close icon-check-space"></i>}
                          text="Cancel"
                          onClick={createResetHandler}
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
      {securitReducer.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default Bankuser;
