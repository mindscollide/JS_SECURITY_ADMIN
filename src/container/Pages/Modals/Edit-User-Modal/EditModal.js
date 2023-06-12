import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
// import { Select } from "antd";
import Select from "react-select";
import "./EditModal.css";

const EditModal = ({
  modalEdit,
  modalEditState,
  setModalEditState,
  setModalEdit,
  Role,
  StatusData,
  UpdateButtonOnClick,
  SelectRoleChangeHandler,
  SelectStatusChangeHandler,
  onChangeTextFieldHandler,
}) => {
  // for close modal handler
  const closeEditModal = async () => {
    setModalEdit(false);
  };

  console.log("editSelectRole", Role);
  return (
    <Fragment>
      <Modal
        show={modalEdit}
        setShow={setModalEdit}
        className="modaldialog modal-Edit-styles"
        modalHeaderClassName={"header-Edit-Modal-close-btn"}
        modalFooterClassName="modal-footer-edit"
        // ButtonTitle={ModalTitle}
        size="lg"
        onHide={closeEditModal}
        ModalTitle={
          <Fragment>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <label className="Modal-Title-Heading">Edit User</label>
              </Col>
            </Row>
          </Fragment>
        }
        ModalBody={
          <Fragment>
            {modalEdit ? (
              <Fragment>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    {/* <label className="email-heading">Email</label> */}
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <TextField
                      name="Email"
                      value={modalEditState.Email.value}
                      label={<small className="email-heading">Email</small>}
                      onChange={onChangeTextFieldHandler}
                      className="textfield-edit-modal"
                      // disable={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <TextField
                      value={modalEditState.ldapAccount}
                      label={
                        <small className="email-heading">LDAP Account</small>
                      }
                      className="textfield-fname-lname"
                      disable={true}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col lg={6} md={6} sm={12}>
                    <TextField
                      name="FirstName"
                      placeholder="First Name"
                      className="textfield-fname-lname"
                      onChange={onChangeTextFieldHandler}
                      label={
                        <small className="email-heading">First Name</small>
                      }
                      value={modalEditState.FirstName.value}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <TextField
                      name="LastName"
                      placeholder="Last Name"
                      className="textfield-fname-lname"
                      onChange={onChangeTextFieldHandler}
                      label={<small className="email-heading">Last Name</small>}
                      value={modalEditState.LastName.value}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col lg={6} md={6} sm={12}>
                    <label className="select-labels">Select Role</label>
                    <Select
                      placeholder="Select Role"
                      className="select-role"
                      value={modalEditState.selectRole}
                      options={Role}
                      onChange={SelectRoleChangeHandler}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <label className="select-labels">Select Status </label>
                    <Select
                      value={modalEditState.selectStatus}
                      placeholder="Select Status"
                      className="select-status"
                      options={StatusData}
                      onChange={SelectStatusChangeHandler}
                    />
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="footer-btn-col">
                <Button
                  icon={<i class="icon-refresh icon-right"></i>}
                  text="Update"
                  className="update-btn"
                  onClick={UpdateButtonOnClick}
                />
                <Button
                  icon={<i class="icon-close icon-right"></i>}
                  text="Discard"
                  className="discard-btn"
                  onClick={closeEditModal}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default EditModal;
