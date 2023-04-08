import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table } from "../../components/elements";
import { Select } from "antd";
import "./Userreport.css";

const Userreport = () => {
  return (
    <>
      <Container className="report-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="report-user-label">User Reports</label>
          </Col>
        </Row>

        <div className="span-user-color">
          <Row className="mb-2">
            <Col lg={12} md={12} sm={12} className="report-text-field-column">
              <TextField
                className="text-fields-report "
                placeholder="Login ID"
              />
              <Select
                className="report-select-field-edit"
                placeholder="Select Role"
              />
              <TextField
                className="text-fields-report "
                placeholder="First Name"
              />
              <TextField
                className="text-fields-report "
                placeholder="Last Name"
              />
              <TextField
                className="text-fields-report"
                placeholder="Start Date"
              />
              <span className="date-to">To</span>
              <TextField
                className="text-fields-report"
                placeholder="End Date"
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center mt-3"
            >
              <Button
                icon={<i className="icon-refresh user-reset"></i>}
                text="Reset"
                className="user-report-reset"
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <label className="user-status-heading">Status</label>
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col lg={12} md={12} sm={12} className="report-btm-button-col">
              <Button
                icon={<i className="icon-download download-btn-icons"></i>}
                text="Access Detail"
                className="report-btm-buttons"
              />
              <Button
                icon={<i className="icon-download download-btn-icons"></i>}
                text="Login History"
                className="report-btm-buttons"
              />
              <Button
                icon={<i className="icon-download download-btn-icons"></i>}
                text="Status Wise"
                className="report-btm-buttons"
              />
              <Button
                icon={<i className="icon-download download-btn-icons"></i>}
                text="Last Login"
                className="report-btm-buttons"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Userreport;
