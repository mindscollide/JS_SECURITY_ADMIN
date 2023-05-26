import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./UploadCustomerModal.css";

const UploadCustomerModal = ({
  ModalTitle,
  uploadCustomerModal,
  setUploadCustomerModal,
}) => {
  // for close modal handler
  const closeUploadCustomerModal = () => {
    setUploadCustomerModal(false);
  };

  const columns = [
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "100px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">User Role</label>,
      dataIndex: "userRole",
      key: "userRole",
      width: "100px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Contact</label>,
      dataIndex: "contact",
      key: "contact",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];
  return (
    <Fragment>
      <Modal
        show={uploadCustomerModal}
        setShow={setUploadCustomerModal}
        className="modaldialog modal-Upload-Customer-styles"
        modalHeaderClassName={"header-CustomerUpload-Modal-close-btn"}
        modalFooterClassName="modal-customerUpload-footer"
        size="lg"
        onHide={closeUploadCustomerModal}
        ModalBody={
          <Fragment>
            {uploadCustomerModal ? (
              <Fragment>
                <Row className="mt-2">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="Modal-Upload-Customer-Title">
                      Users List
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="table-scroller-upload-Customer"
                  >
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <span className="add-Customer-list-heading">
                          New Customers to Be Added
                        </span>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Table column={columns} className="UploadModal-table" />
                      </Col>
                    </Row>

                    <Row className="mt-1">
                      <Col lg={12} md={12} sm={12}>
                        <span className="add-Customer-list-heading">
                          Customers to be Updated
                        </span>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Table
                          column={columns}
                          className="UploadModalTwo-table"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={12} md={12} sm={12}>
                        <span className="add-Customer-list-heading">
                          Company Not Found
                        </span>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Table
                          column={columns}
                          className="Upload-Customer-Modal-table"
                        />
                      </Col>
                    </Row>
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
                  text="Complete Import"
                  className="Customer-Complete-Import-btn"
                  icon={<i class="icon-upload-cloud Upload-Customer-modal"></i>}
                />
                <Button
                  text="Cancel Import"
                  className="Customer-Cancel-Import-btn"
                  icon={<i class="icon-close Upload-Customer-modal"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default UploadCustomerModal;
