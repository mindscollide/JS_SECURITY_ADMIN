import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
  Notification,
} from "../../../components/elements";
import { Select, Spin } from "antd";
import CreateModal from "../../Pages/Modals/Create-User-Modal/CreateModal";
import AcceptModal from "../../Pages/Modals/Accept-User-Modal/AcceptModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewUserRequest,
  saveSecurityAdmin,
  getRejectUser,
} from "../../../store/actions/Security_Admin";
import { useNavigate } from "react-router-dom";
import "./PendingUser.css";

const Createuser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { securitReducer } = useSelector((state) => state);
  const [data, setData] = useState(null);
  const [rejectUserData, setRejectUserData] = useState(null);
  console.log(securitReducer, "aa");
  //modal for create user for reject
  const [createRejectModal, setCreateRejectModal] = useState(false);

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  // state for set data in create table
  const [requestUserRows, setRequestUserRows] = useState([]);

  //modal for accept user in create
  const [acceptModal, setAcceptModal] = useState(false);

  //open modal accept
  const openAcceptModal = async (userData) => {
    setData(userData);
    setAcceptModal(true);
  };

  // for rendering data in user request table
  useEffect(() => {
    if (
      securitReducer.userRequestList !== null &&
      securitReducer.userRequestList !== undefined &&
      securitReducer.userRequestList.length > 0 &&
      securitReducer.userRequestList !== ""
    ) {
      setRequestUserRows(securitReducer.userRequestList);
      setOpen({
        ...open,
        open: true,
        message: "Record Found",
      });
    } else {
      setRequestUserRows([]);
      setOpen({
        ...open,
        open: true,
        message: "No Record Found",
      });
    }
  }, [securitReducer.userRequestList]);

  console.log("requestRow", requestUserRows);

  useEffect(() => {
    let roleID = JSON.parse(localStorage.getItem("roleID"));
    dispatch(getNewUserRequest(navigate, roleID));
  }, []);

  // open modal reject
  const openRejectModal = async (userRejectData) => {
    console.log("userRejectData", userRejectData);
    setRejectUserData(userRejectData);
    setCreateRejectModal(true);
  };

  //const handler for proceed btn
  const proceedSaveHandler = () => {
    console.log(data, "Datadadadasd");
    let Data = {
      FirstName: data.firstname,
      Lastname: data.lastname,
      UserReferenceCode: 0,
      UserLDAPAccount: data.email,
      Email: data.email,
      ContactNumber: data.contactnumber,
      LDAPAccount: data.loginID,
      FailedAttemptCount: 3,
      UserRegistrationRequestID: data.userRegistrationRequestID,
      UserID: data.fK_UserID,
    };
    dispatch(saveSecurityAdmin(navigate, Data));
    setAcceptModal(false);
  };

  // column of create user
  const columnsCreate = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstname",
      key: "firstname",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastname",
      key: "lastname",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "fK_UserRoleID",
      key: "fK_UserRoleID",
      ellipsis: true,
      render: (text, record) => {
        if (record.fK_UserRoleID === 1) {
          return (
            <>
              <p className="user-role-status">Bank</p>
            </>
          );
        } else if (record.fK_UserRoleID === 2) {
          return (
            <>
              <p className="user-role-status">Cooperate</p>
            </>
          );
        } else if (record.fK_UserRoleID === 3) {
          return (
            <>
              <p className="user-role-status">Broker</p>
            </>
          );
        } else if (record.fK_UserRoleID === 4) {
          return (
            <>
              <p className="user-role-status">SystemAdmin</p>
            </>
          );
        } else if (record.fK_UserRoleID === 5) {
          return (
            <>
              <p className="user-role-status">SecurtyAdmin</p>
            </>
          );
        } else if (record.fK_UserRoleID === 6) {
          return (
            <>
              <p className="user-role-status">Auditor</p>
            </>
          );
        }
      },
    },
    {
      title: <label className="bottom-table-header">Accept</label>,
      dataIndex: "accept",
      key: "accept",
      ellipsis: true,
      align: "center",
      render: (text, data) => {
        console.log("dataddadat", data);
        return (
          <label onClick={() => openAcceptModal(data)}>
            <i className="icon-check icon-accept-column"></i>
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Reject</label>,
      dataIndex: "reject",
      key: "reject",
      ellipsis: true,
      align: "center",
      render: (text, rejectData) => {
        console.log("rejectDatarejectData", rejectData);
        return (
          <label onClick={() => openRejectModal(rejectData)}>
            <i className="icon-close icon-close-column"></i>
          </label>
        );
      },
    },
  ];

  return (
    <>
      <section className="create-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="create-user-label">Pending User Request</label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Paper className="span-table">
            <Col lg={12} md={12} sm={12} className="mt-3">
              {securitReducer.Spinner === true ? (
                <span className="edit-user-spinner">
                  <Spin size="large" />
                </span>
              ) : (
                <Table
                  column={columnsCreate}
                  rows={requestUserRows}
                  className="Createuser-table"
                  pagination={false}
                />
              )}
            </Col>
          </Paper>
        </Row>

        {securitReducer.Loading ? <Loader /> : null}
        <Notification
          setOpen={setOpen}
          open={open.open}
          message={open.message}
        />
      </section>

      {createRejectModal ? (
        <CreateModal
          modalReject={createRejectModal}
          setModalReject={setCreateRejectModal}
          rejectUserData={rejectUserData}
        />
      ) : null}

      {acceptModal ? (
        <AcceptModal
          modalAccept={acceptModal}
          setModalAccept={setAcceptModal}
          acceptHandler={proceedSaveHandler}
        />
      ) : null}
    </>
  );
};

export default Createuser;
