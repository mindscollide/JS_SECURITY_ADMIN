import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { Select } from "antd";
import "./CreateModal.css";

const CreateModal = ({ ModalTitle, modalReject, setModalReject }) => {
  // for close modal handler
  const closeRejectModal = () => {
    setModalReject(false);
  };
  return (
    <Fragment>
      <Modal
        show={modalReject}
        setShow={setModalReject}
        className="modaldialog modal-Reject-styles"
        modalHeaderClassName={"header-Reject-Modal-close-btn"}
        modalFooterClassName="modal-Reject-footer"
        size="lg"
        onHide={closeRejectModal}
        ModalBody={
          <Fragment>
            {modalReject ? (
              <Fragment>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-center"
                  >
                    <label className="edit-Reject-label">Edit User</label>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  ></Col>
                </Row>

                <Row className="mt-2">
                  <label>
                    <small className="Type-commet-heading">
                      Type your comment{" "}
                      <span className="required-color "> * </span>
                    </small>
                  </label>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="CreateModal textAreaDiv"
                  >
                    <TextField
                      type="text"
                      as={"textarea"}
                      className="textfield-Reject-modal"
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
              <Col lg={12} md={12} sm={12} className="footer-create-btn-col">
                <Button
                  icon={<i class="icon-refresh icon-right"></i>}
                  text="Update"
                  className="update-btn"
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

export default CreateModal;
