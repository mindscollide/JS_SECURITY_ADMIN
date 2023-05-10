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
import { getNewUserRequest } from "../../../store/actions/Security_Admin";
import EditModal from "../../Pages/Modals/Edit-User-Modal/EditModal";
import "./Edituser.css";

const Edituser = ({ show, setShow, ModalTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //edit modal on js-security-admin
  const [editModalSecurity, setEditModalSecurity] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);

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
              <TextField className="text-fields-edituser" value="Login ID" />
              <TextField className="text-fields-edituser" value="First Name" />
              <TextField className="text-fields-edituser" value="Last Name" />
              <Select className="select-field-edit" placeholder="Select Role" />
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12}>
              <Select className="select-field-edit" placeholder="Select Role" />
              <Button
                icon={<i className="icon-search icon-search-space"></i>}
                text="Search"
                className="search-Edit-User-btn"
              />
              <Button
                icon={<i className="icon-refresh icon-reset-space"></i>}
                text="Reset"
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
