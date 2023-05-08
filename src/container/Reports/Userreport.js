import React,{useState} from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table, Paper } from "../../components/elements";
import { Select } from "antd";
import DatePicker from "react-multi-date-picker";
import "./Userreport.css";

const Userreport = () => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      <Container className="report-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="report-user-label">User Reports</label>
          </Col>
        </Row>

        <Paper className="span-user-color">
          <Row className="mb-2">
            <Col lg={8} md={8} sm={12} className="report-text-field-column">
              <TextField className="text-fields-report" value="Login ID" />
              <Select
                className="report-select-field-edit"
                value="Select Role"
              />
              <TextField className="text-fields-report" value="First Name" />
              <TextField className="text-fields-report" value="Last Name" />
            </Col>

            <Col lg={4} md={4} sm={12} className="JS-Security-Datepicker">
              <DatePicker
                value={value}
                onChange={setValue}
                showOtherDays={true}
                inputClass="date-picker-left"
              />
              <label className="date-to">to</label>

              <DatePicker
                value={value}
                onChange={setValue}
                showOtherDays={true}
                inputClass="date-picker-right"
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
        </Paper>

        <Paper className="status-user-panel">
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
        </Paper>
      </Container>
    </>
  );
};

export default Userreport;
