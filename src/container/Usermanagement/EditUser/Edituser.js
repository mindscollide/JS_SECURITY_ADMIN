import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table } from "../../../components/elements";
import { Select } from "antd";
import "./Edituser.css";

const Edituser = () => {
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
      width: "150px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
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
  ];

  return (
    <>
      <Container className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="edit-user-label">Edit User</label>
          </Col>
        </Row>

        <div className="span-edit-user">
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="text-field-column">
              <TextField
                className="text-fields-edituser"
                placeholder="Login ID"
              />
              <TextField
                className="text-fields-edituser"
                placeholder="First Name"
              />
              <TextField
                className="text-fields-edituser"
                placeholder="Last Name"
              />
              <Select className="select-field-edit" placeholder="Select Role" />
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12}>
              <Select className="select-field-edit" placeholder="Select Role" />
              <Button
                icon={<i className="icon-search icon-search-space"></i>}
                text="Search"
                className="search-btn"
              />
              <Button
                icon={<i className="icon-refresh icon-reset-space"></i>}
                text="Reset"
                className="reset-btn"
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
        </div>
      </Container>
    </>
  );
};

export default Edituser;
