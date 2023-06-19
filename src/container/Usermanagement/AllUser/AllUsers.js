import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, ModalFooter } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
  Modal,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select, Spin } from "antd";
import {
  editSecurityAdmin,
  allUserList,
} from "../../../store/actions/Security_Admin";
import { validateEmail } from "../../../commen/functions/emailValidation";
import {
  allUserRole,
  allUserStatus,
} from "../../../store/actions/Auth_Actions";
import EditModal from "../../Pages/Modals/Edit-User-Modal/EditModal";
import "./AllUsers.css";
import { ColumnsGap } from "react-bootstrap-icons";

const Alluser = ({ show, setShow, ModalTitle }) => {
  const { auth, securitReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  //edit modal on js-security-admin
  const [editModalSecurity, setEditModalSecurity] = useState(false);
  const [editUserStatusValue, setEditUserStatusValue] = useState({
    value: 0,
    label: "",
  });
  const [editUserRoleValue, setEditUserRoleValue] = useState({
    label: "",
    value: 0,
  });
  const [updateModal, setUpdateModal] = useState(false);

  //state for selectRole
  const [editSelectRole, setEditSelectRole] = useState([]);
  const [editSelectRoleValue, setEditSelectRoleValue] = useState([]);

  // state for select Status
  const [editSelectStatus, setEditSelectStatus] = useState([]);
  const [editSelectStatusValue, setEditSelectStatusValue] = useState([]);

  // state for edit user
  const [editUser, setEditUser] = useState({
    userLdapAccount: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    email: {
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
    roleID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    statusID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  const [modalEditState, setModalEditState] = useState({
    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    FirstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    LastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    ldapAccount: "",

    selectRole: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    selectStatus: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    userID: 0,
  });
  console.log("modalEditState", modalEditState);

  const onchangeModalTextFieldsHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setModalEditState({
          ...modalEditState,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setModalEditState({
        ...modalEditState,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setModalEditState({
          ...modalEditState,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setModalEditState({
        ...modalEditState,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setModalEditState({
          ...modalEditState,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setModalEditState({
        ...modalEditState,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  useEffect(() => {
    dispatch(allUserRole());
    dispatch(allUserStatus());
  }, []);

  //edit user security admin validate handler
  const editUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "userLdapAccount" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setEditUser({
          ...editUser,
          userLdapAccount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "userLdapAccount" && value === "") {
      setEditUser({
        ...editUser,
        userLdapAccount: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setEditUser({
          ...editUser,
          email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setEditUser({
        ...editUser,
        email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setEditUser({
        ...editUser,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setEditUser({
        ...editUser,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (editUser.email.value !== "") {
      if (validateEmail(editUser.email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // onchange handler for edit select role
  const selectRoleHandler = async (selectedRole) => {
    console.log(selectedRole, "selectroleselectroleselectrole");
    setEditSelectRoleValue(selectedRole);
    setEditUser({
      ...editUser,
      roleID: {
        value: selectedRole,
      },
    });
  };
  console.log("selectRoleValue", editSelectRoleValue, editUser);

  // onChange handler for edit select status
  const selectStatusHandler = async (selectedStatus) => {
    console.log(selectedStatus, "selectedStatusselectedStatus");
    setEditSelectStatusValue(selectedStatus);
    setEditUser({
      ...editUser,
      statusID: {
        value: selectedStatus,
      },
    });
  };
  console.log("statusIDstatusID", editSelectStatusValue, editUser);

  //reset handler for edit user
  const resetHandler = () => {
    setEditUser({
      ...editUser,
      email: {
        value: "",
      },
      userLdapAccount: {
        value: "",
      },

      firstName: {
        value: "",
      },

      lastName: {
        value: "",
      },

      roleID: {
        value: 0,
      },

      statusID: {
        value: 0,
      },
    });
    setEditSelectRoleValue([]);
    setEditSelectStatusValue([]);

    let data = {
      FirstName: "",
      LastName: "",
      UserLDAPAccount: "",
      Email: "",
      UserRoleID: 0,
      UserStatusID: 0,
      RequestingUserID: 0,
    };
    dispatch(allUserList(navigate, data));
  };

  // open Update modal
  const openUpdateModal = async () => {
    setUpdateModal(true);
  };

  // open edit modal
  const openModalEdit = async (record) => {
    let roleNew;
    let statusNew;
    console.log("recordrecordrecord", record);

    try {
      if (Object.keys(auth.UserRoleList && auth.UserStatus).length > 0) {
        await auth.UserRoleList.map((data, index) => {
          if (data.roleID === record.userRoleID) {
            roleNew = {
              label: data.roleName,
              value: data.roleID,
            };
          }
        });
        await auth.UserStatus.map((data, index) => {
          console.log(data, "datadatadatadata");
          console.log(record.userStatusID, "datadatadatadata");

          if (data.statusID === record.userStatusID) {
            statusNew = {
              label: data.statusName,
              value: data.statusID,
            };
          }
        });
      }
    } catch {
      console.log("error on role select edit");
    }

    try {
      if (Object.keys(roleNew && statusNew).length > 0) {
        console.log(roleNew && statusNew, record, "newnewnewnewnewnew");
        await setModalEditState({
          ...modalEditState,
          Email: {
            value: record.email,
            errorMessage: "",
            errorStatus: false,
          },
          ldapAccount: record.userLDAPAccount,
          FirstName: {
            value: record.firstName,
            errorMessage: "",
            errorStatus: false,
          },
          LastName: {
            value: record.lastName,
            errorMessage: "",
            errorStatus: false,
          },
          selectRole: {
            value: roleNew.value,
            label: roleNew.label,
            errorMessage: "",
            errorStatus: false,
          },
          selectStatus: {
            value: statusNew.value,
            label: statusNew.label,
            errorMessage: "",
            errorStatus: false,
          },
          userID: record.userID,
        });
      }
    } catch {
      console.log("error on state select edit");
    }
    console.log("openModalEdit", record);

    setEditModalSecurity(true);
  };

  //onClose modal
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const columns = [
    {
      title: <label className="bottom-table-header">LoginID</label>,
      dataIndex: "userLDAPAccount",
      key: "userLDAPAccount",
      width: "250px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "300px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      width: "150px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      width: "150px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "userRoleID",
      key: "userRoleID",
      width: "200px",
      render: (text, record) => {
        if (record.userRoleID === 1) {
          return (
            <>
              <p className="user-role-status">Bank</p>
            </>
          );
        } else if (record.userRoleID === 2) {
          return (
            <>
              <p className="user-role-status">Cooperate</p>
            </>
          );
        } else if (record.userRoleID === 3) {
          return (
            <>
              <p className="user-role-status">Broker</p>
            </>
          );
        } else if (record.userRoleID === 4) {
          return (
            <>
              <p className="user-role-status">SystemAdmin</p>
            </>
          );
        } else if (record.userRoleID === 5) {
          return (
            <>
              <p className="user-role-status">SecurtyAdmin</p>
            </>
          );
        } else if (record.userRoleID === 6) {
          return (
            <>
              <p className="user-role-status">Auditor</p>
            </>
          );
        }
      },
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      width: "120px",
      align: "center",
      render: (text, record) => {
        if (record.userStatusID === 1) {
          return (
            <>
              <i className="icon-check edit-user-enabled"></i>
              {/* <p>Enabled</p> */}
            </>
          );
        } else if (record.userStatusID === 2) {
          return (
            <>
              <i className="icon-block"></i>
              {/* <p>Disabled</p> */}
            </>
          );
        } else if (record.userStatusID === 3) {
          return (
            <>
              <i className="icon-lock"></i>
              {/* <p>{record.userStatusID}</p> */}
            </>
          );
        } else if (record.userStatusID === 4) {
          return (
            <>
              <i className="icon-close"></i>
              {/* <p>{record.userStatusID}</p> */}
            </>
          );
        } else if (record.userStatusID === 5) {
          return (
            <>
              <i className="icon-reply"></i>
              {/* <p>{record.userStatusID}</p> */}
            </>
          );
        } else if (record.userStatusID === 6) {
          return (
            <>
              <i className="icon-star"></i>
              {/* <p>{record.userStatusID}</p> */}
            </>
          );
        } else if (record.userStatusID === 7) {
          return (
            <>
              <i className="icon-trash"></i>
              {/* <p>{record.userStatusID}</p> */}
            </>
          );
        } else if (record.userStatusID === 8) {
          return (
            <>
              <i className="icon-share"></i>
              {/* <p>{record.userStatusID}</p> */}
            </>
          );
        } else if (record.userStatusID === 9) {
          return (
            <>
              <i className="icon-share"></i>
              {/* <p>{record.userStatusID}</p> */}
            </>
          );
        }
      },
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      width: "100px",
      align: "center",
      render: (text, record) => {
        console.log("recordrecordrecord");
        return (
          <label
            className="edit-update-column"
            onClick={() => openModalEdit(record)}
          >
            <i className="icon-edit edit-user-icon-color" />
          </label>
        );
      },
    },
  ];

  // for search btn all user list
  const onSearchBtnHit = () => {
    let data = {
      FirstName: editUser.firstName.value,
      LastName: editUser.lastName.value,
      UserLDAPAccount: editUser.userLdapAccount.value,
      Email: editUser.email.value,
      UserRoleID: editUser.roleID.value,
      UserStatusID: editUser.statusID.value,
      RequestingUserID: 0,
    };
    dispatch(allUserList(navigate, data));
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
      setEditSelectRole(tem);
    }
  }, [auth.UserRoleList]);

  // for userStatus in select dropdown
  useEffect(() => {
    if (Object.keys(auth.UserStatus).length > 0) {
      let tem = [];
      auth.UserStatus.map((data, index) => {
        console.log(data, "userStatususerStatus");
        tem.push({
          label: data.statusName,
          value: data.statusID,
        });
      });
      setEditSelectStatus(tem);
    }
  }, [auth.UserStatus]);

  useEffect(() => {
    if (
      securitReducer.allUserList !== null &&
      securitReducer.allUserList !== undefined &&
      securitReducer.allUserList.length > 0
    ) {
      setRows(securitReducer.allUserList);
    } else {
      setRows([]);
    }
  }, [securitReducer.allUserList]);

  console.log("roewwwww", rows);

  useEffect(() => {
    let data = {
      FirstName: "",
      LastName: "",
      UserLDAPAccount: "",
      Email: "",
      UserRoleID: 0,
      UserStatusID: 0,
      RequestingUserID: 0,
    };
    dispatch(allUserList(navigate, data));
  }, []);

  const UpdateBtnHandle = () => {
    setEditModalSecurity(false);
    setUpdateModal(true);
  };

  const HandleUpdateUser = () => {
    let Data = {
      UserRoleID: modalEditState.selectRole.value,
      UserStatusID: modalEditState.selectStatus.value,
      UserIdToEdit: modalEditState.userID,
    };
    dispatch(
      editSecurityAdmin(navigate, Data, setEditModalSecurity, setUpdateModal)
    );
  };

  //onChange for modaledit role state passing props in modal on bottom
  const SelectRoleEditModalChangeHandler = (selectValue) => {
    console.log(selectValue, "check");
    setModalEditState({
      ...modalEditState,
      selectRole: {
        value: selectValue.value,
        label: selectValue.label,
        errorMessage: "",
        errorStatus: false,
      },
    });
  };

  //onChange for modaledit userStatus state passing props in modal on bottom
  const SelectStatusEditModalChangeHandler = (selectStatus) => {
    console.log(selectStatus, "check");
    setModalEditState({
      ...modalEditState,
      selectStatus: {
        value: selectStatus.value,
        label: selectStatus.label,
        errorMessage: "",
        errorStatus: false,
      },
    });
  };
  console.log("editSelectRole", editSelectRole);

  console.log("editUsereditUser", editUser);

  return (
    <>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="edit-user-label">All User</label>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <Row>
                    <Col lg={3} md={3} sm={3}>
                      <TextField
                        name="userLdapAccount"
                        className="text-fields-edituser"
                        placeholder="Login ID"
                        maxLength={100}
                        value={editUser.userLdapAccount.value}
                        onChange={editUserValidateHandler}
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <TextField
                        name="firstName"
                        className="text-fields-edituser"
                        maxLength={100}
                        placeholder="First Name"
                        value={editUser.firstName.value}
                        onChange={editUserValidateHandler}
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <TextField
                        name="lastName"
                        maxLength={100}
                        className="text-fields-edituser"
                        placeholder="Last Name"
                        value={editUser.lastName.value}
                        onChange={editUserValidateHandler}
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <Select
                        name="roleID"
                        options={editSelectRole}
                        className="select-field-edit"
                        placeholder="Select Role"
                        onChange={selectRoleHandler}
                        value={editSelectRoleValue}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col lg={3} md={3} sm={12}>
                  <Select
                    name="statusID"
                    className="edit-user-select-status"
                    placeholder="Select Status"
                    options={editSelectStatus}
                    onChange={selectStatusHandler}
                    value={editSelectStatusValue}
                  />
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <TextField
                    name="email"
                    className="edit-user-loginID-Textfield"
                    placeholder="Email"
                    onBlur={handlerEmail}
                    maxLength={100}
                    value={editUser.email.value}
                    onChange={editUserValidateHandler}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Button
                    icon={<i className="icon-search icon-search-space"></i>}
                    text="Search"
                    onClick={onSearchBtnHit}
                    className="search-Edit-User-btn"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-reset-space"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-Edit-User-btn"
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col lg={12} md={12} sm={12}>
                  {securitReducer.Spinner === true ? (
                    <span className="edit-user-spinner">
                      <Spin size="large" />
                    </span>
                  ) : (
                    <Table
                      column={columns}
                      rows={rows}
                      scroll={{ x: true }}
                      className="Edituser-table"
                      pagination={true}
                    />
                  )}
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>

      <Modal
        show={updateModal}
        setShow={setUpdateModal}
        size="lg"
        className={"modaldialog modal-Update"}
        modalHeaderClassName="d-none"
        modalFooterClassName="modal-update-footer"
        onHide={closeUpdateModal}
        ModalBody={
          <Fragment>
            {updateModal ? (
              <Fragment>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <p className="update-modal-heading">
                      Are you sure want to update?
                    </p>
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
                  icon={<i className="icon-arrow-right"></i>}
                  text="Proceed"
                  className="Update-Proceed-btn"
                  onClick={HandleUpdateUser}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />

      {editModalSecurity ? (
        <EditModal
          modalEdit={editModalSecurity}
          modalEditState={modalEditState}
          setModalEditState={setModalEditState}
          setModalEdit={setEditModalSecurity}
          Role={editSelectRole}
          StatusData={editSelectStatus}
          UpdateButtonOnClick={UpdateBtnHandle}
          SelectRoleChangeHandler={SelectRoleEditModalChangeHandler}
          SelectStatusChangeHandler={SelectStatusEditModalChangeHandler}
          onChangeTextFieldHandler={onchangeModalTextFieldsHandler}
        />
      ) : null}

      {securitReducer.Loading ? <Loader /> : null}
    </>
  );
};

export default Alluser;
