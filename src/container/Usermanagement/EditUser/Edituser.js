import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, ModalFooter } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Modal,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import {
  getNewUserRequest,
  allUserList,
} from "../../../store/actions/Security_Admin";
import { allUserRole } from "../../../store/actions/Auth_Actions";
import EditModal from "../../Pages/Modals/Edit-User-Modal/EditModal";
import "./Edituser.css";

const Edituser = ({ show, setShow, ModalTitle }) => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //edit modal on js-security-admin
  const [editModalSecurity, setEditModalSecurity] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);

  //state for selectRole
  const [editSelectRole, setEditSelectRole] = useState([]);
  const [editSelectROleValue, setEditSelectRoleValue] = useState("");

  // state for userRole
  const [editStatusRole, setEditStatusRole] = useState([]);

  // state for edit user
  const [editUser, setEditUser] = useState({
    loginID: {
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
    selectStatus: 0,
  });

  //edit user security admin validate handler
  const editUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "loginID" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setEditUser({
          ...editUser,
          loginID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "loginID" && value === "") {
      setEditUser({
        ...editUser,
        loginID: { value: "", errorMessage: "", errorStatus: false },
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

  // onchange handler for edit select role
  const selectRoleHandler = async (selectedRole) => {
    console.log(selectedRole, "selectroleselectroleselectrole");
    setEditUser({
      ...editUser,
      roleID: {
        value: selectedRole.value,
      },
    });
  };

  // onChange handler for edit select status
  const selectStatusHandler = async (selectedStatus) => {
    console.log(selectedStatus, "selectedStatusselectedStatus");
    setEditUser({
      ...editUser,
      selectStatus: selectedStatus.value,
    });
  };

  //reset handler for edit user
  const resetHandler = () => {
    setEditUser({
      ...editUser,
      loginID: {
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
    });
    setEditSelectRoleValue("");
  };

  // open Update modal
  const openUpdateModal = async () => {
    setUpdateModal(true);
  };

  // open edit modal
  const openModalEdit = async () => {
    setEditModalSecurity(true);
  };

  //onClose modal
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const columns = [
    {
      title: <label className="bottom-table-header">LoginID</label>,
      dataIndex: "login",
      key: "login",
      width: "200px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstname",
      key: "firstname",
      width: "100px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastname",
      key: "lastname",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "role",
      key: "role",
      width: "200px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "status",
      key: "status",
      width: "120px",
      align: "right",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      width: "100px",
      align: "center",
      render: (text) => (
        <label className="edit-update-column" onClick={openModalEdit}>
          {text}
        </label>
      ),
    },
  ];

  const data = [
    {
      login: "Mindscollide.aamir@hbl.com",
      firstname: "Mohammad",
      lastname: "Aamir",
      role: "Data Entry - Business Team",
      status: (
        <>
          <i className={"icon-check check-status"}></i>
        </>
      ),
      edit: <i className={"icon-edit userEdit-edit-icon"}></i>,
    },
    {
      login: "Mindscollide.aamir@hbl.com",
      firstname: "Mohammad",
      lastname: "Aamir",
      role: "Data Entry - Business Team",
      status: (
        <>
          <i className={"icon-lock locked-status"}></i>
        </>
      ),
      edit: <i className={"icon-edit userEdit-edit-icon"}></i>,
    },
    {
      login: "Mindscollide.aamir@hbl.com",
      firstname: "Mohammad",
      lastname: "Aamir",
      role: "Data Entry - Business Team",
      status: (
        <>
          <i className={"icon-lock locked-status"}></i>
        </>
      ),
      edit: <i className={"icon-edit userEdit-edit-icon"}></i>,
    },
  ];

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

  useEffect(() => {
    // on page refresh
    dispatch(allUserList());
  }, []);

  useEffect(() => {
    dispatch(getNewUserRequest());
  }, []);

  const UpdateBtnHandle = () => {
    setEditModalSecurity(false);
    setUpdateModal(true);
  };
  return (
    <>
      <Container className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="edit-user-label">Edit User</label>
          </Col>
        </Row>

        <Paper className="span-edit-user">
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="text-field-column">
              <TextField
                name="loginID"
                className="text-fields-edituser"
                placeholder="Login ID"
                maxLength={100}
                value={editUser.loginID.value}
                onChange={editUserValidateHandler}
              />
              <TextField
                name="firstName"
                maxLength={100}
                className="text-fields-edituser"
                placeholder="First Name"
                value={editUser.firstName.value}
                onChange={editUserValidateHandler}
              />
              <TextField
                name="lastName"
                maxLength={100}
                className="text-fields-edituser"
                placeholder="Last Name"
                value={editUser.lastName.value}
                onChange={editUserValidateHandler}
              />
              <Select
                name="roleID"
                options={editSelectRole}
                className="select-field-edit"
                placeholder="Select Role"
                onChange={selectRoleHandler}

                // defaultValue={editSelectROleValue}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12}>
              <Select
                name="selectStatus"
                className="select-field-edit"
                placeholder="Select Status"
                options={editStatusRole}
                onChange={selectStatusHandler}
              />
              <Button
                icon={<i className="icon-search icon-search-space"></i>}
                text="Search"
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
              <Table
                column={columns}
                rows={data}
                className="Edituser-table"
                pagination={false}
              />
            </Col>
          </Row>
        </Paper>
      </Container>

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
                />
              </Col>
            </Row>
          </Fragment>
        }
      />

      {editModalSecurity ? (
        <EditModal
          modalEdit={editModalSecurity}
          setModalEdit={setEditModalSecurity}
          UpdateButtonOnClick={UpdateBtnHandle}
        />
      ) : null}
    </>
  );
};

export default Edituser;
