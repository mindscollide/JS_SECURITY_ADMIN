import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./UploadAddModal.css";
import { useDispatch, useSelector } from "react-redux";

const UploadAddModal = ({ ModalTitle, uploadAddModal, setUploadAddModal }) => {
  const { uploadReducer } = useSelector((state) => state);
  console.log("statestatestate", uploadReducer);
  // for close modal handler
  const closeUploadModal = () => {
    setUploadAddModal(false);
  };

  const [excelData, setexcelData] = useState([]);
  console.log(excelData, "excelDataexcelData");
  useEffect(() => {
    if (
      Object.keys(uploadReducer.uploadDocumentsList.invalidUsers).length > 0
    ) {
      let temp = [];
      uploadReducer.uploadDocumentsList.invalidUsers.map((data, index) => {
        console.log("datadatadata", data);
        temp.push(data);
      });
      setexcelData(temp);
      console.log("excelDataexcelDataexcelData", excelData);
    }
  }, []);

  const columns = [
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      width: "100px",
      render: (text, record) => (
        <label className="issue-date-column">{`${record.firstName} ${record.lastName}`}</label>
      ),
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
      dataIndex: "contactnumber",
      key: "contactnumber",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];
  return (
    <Fragment>
      <Modal
        show={uploadAddModal}
        setShow={setUploadAddModal}
        className="modaldialog modal-Upload-styles"
        modalHeaderClassName={"header-BankUpload-Modal-close-btn"}
        modalFooterClassName="modal-bankUpload-footer"
        size="lg"
        onHide={closeUploadModal}
        ModalBody={
          <Fragment>
            {uploadAddModal ? (
              <Fragment>
                <Row className="mt-2">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="Modal-Upload-Bank-Title">Users List</span>
                  </Col>
                </Row>

                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="table-scroller-uplaod"
                  >
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <span className="add-user-list-heading">
                          New Users to Be Added
                        </span>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <Table
                          column={columns}
                          rows={excelData}
                          className="UploadModal-table"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={12} md={12} sm={12}>
                        <span className="add-user-list-heading">
                          Users to be Updated
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
                        <span className="add-user-list-heading">
                          Company Not Found
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
                  className="Complete-Import-btn"
                  icon={<i class="icon-upload-cloud Upload-Bank-modal"></i>}
                />
                <Button
                  text="Cancel Import"
                  onClick={closeUploadModal}
                  className="Cancel-Import-btn"
                  icon={<i class="icon-close Upload-Bank-modal"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default UploadAddModal;
