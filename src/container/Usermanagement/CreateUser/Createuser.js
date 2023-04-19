import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table } from "../../../components/elements";
import { Select } from "antd";
import "./Create.css";

const Createuser = () => {
  const columnsCreate = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
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
      title: <label className="bottom-table-header">Accept</label>,
      dataIndex: "accept",
      key: "accept",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Reject</label>,
      dataIndex: "reject",
      key: "reject",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  const dataCreate = [
    {
      email: "Mindscollide.aamir@hbl.com",
      firstname: "Mohammad",
      lastname: "Aamir",
      role: "Data Entry - Business Team",
      accept: (
        <>
          <i className={"icon-check check-status"}></i>
        </>
      ),
      reject: <i className={"icon-close usercreate-cross-icon"}></i>,
    },
    {
      email: "Mindscollide.aamir@hbl.com",
      firstname: "Mohammad",
      lastname: "Aamir",
      role: "Data Entry - Business Team",
      accept: (
        <>
          <i className={"icon-check check-status"}></i>
        </>
      ),
      reject: <i className={"icon-close usercreate-cross-icon"}></i>,
    },
  ];

  return (
    <>
      <Container className="create-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="create-user-label">Create User</label>
          </Col>
        </Row>

        <Row className="mt-3">
          <span className="span-table">
            <Col lg={12} md={12} sm={12} className="mt-3">
              <Table
                column={columnsCreate}
                rows={dataCreate}
                className="Createuser-table"
                pagination={false}
              />
            </Col>
          </span>
        </Row>
      </Container>
    </>
  );
};

export default Createuser;
