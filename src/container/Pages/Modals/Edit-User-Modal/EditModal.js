import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { Select } from "antd";
import "./EditModal.css";

const EditModal = ({
  ModalTitle,
  modalEdit,
  setModalEdit,
  UpdateButtonOnClick,
}) => {
  // for close modal handler
  const closeEditModal = async () => {
    setModalEdit(false);
  };
  return (
    <Fragment>
      <Modal
        show={modalEdit}
        setShow={setModalEdit}
        className="modaldialog modal-Edit-styles"
        modalHeaderClassName={"header-Edit-Modal-close-btn"}
        modalFooterClassName="modal-footer-edit"
        ButtonTitle={ModalTitle}
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
                      value="mindscollide.aamir@hbl.com"
                      label={<small className="email-heading">Email</small>}
                      className="textfield-edit-modal"
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={6} md={6} sm={12}>
                    <label className="select-labels">Select Role</label>
                    <Select placeholder="Select Role" className="select-role" />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <label className="select-labels">Select Status </label>
                    <Select
                      placeholder="Select Status"
                      className="select-status"
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
