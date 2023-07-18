import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table, Paper } from "../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { allUserRole } from "../../store/actions/Auth_Actions";
import DatePicker from "react-multi-date-picker";
import "./Userreport.css";

const Userreport = () => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());

  const [startDateProps, setStartDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  const [endDateProps, setEndDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  // state for select Role
  const [selectRoleReport, setSelectRoleReport] = useState([]);
  const [selectRoleValueReport, setSelectRoleValueReport] = useState([]);

  //state for userReports fields
  const [userReport, setUserReport] = useState({
    loginID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    firstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    lastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    roleID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  // onchange handler for user report
  const userReportHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "loginID" && value !== "") {
      console.log(value, "loginIDloginIDloginID");
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setUserReport({
          ...userReport,
          loginID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "loginID" && value === "") {
      setUserReport({
        ...userReport,
        loginID: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setUserReport({
          ...userReport,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setUserReport({
        ...userReport,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setUserReport({
          ...userReport,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setUserReport({
        ...userReport,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //reset handler
  const resetHandler = () => {
    setUserReport({
      ...userReport,
      loginID: {
        value: "",
      },
      firstName: {
        value: "",
      },
      lastName: {
        value: "",
      },

      roleID: {
        value: 0,
      },
    });
    setStartDateProps({
      ...startDateProps,
      value: "",
    });

    setEndDateProps({
      ...endDateProps,
      value: "",
    });
    setSelectRoleValueReport([]);
  };

  // onchange handler for user Report select role
  const reportSelectRoleHandler = async (selectedRole) => {
    setSelectRoleValueReport(selectedRole);
    setUserReport({
      ...userReport,
      roleID: {
        value: selectedRole,
      },
    });
  };

  useEffect(() => {
    if (Object.keys(auth.UserRoleList).length > 0) {
      let tem = [];
      auth.UserRoleList.map((data, index) => {
        console.log(data, "datadatadatadata");
        tem.push({
          label: data.roleName,
          value: data.roleID,
        });
      });
      setSelectRoleReport(tem);
    }
  }, [auth.UserRoleList]);

  useEffect(() => {
    // on page refresh
    dispatch(allUserRole());
  }, []);

  return (
    <>
      <section className="report-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="report-user-label">User Reports</label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-user-color">
              <Row className="mb-5">
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    name="loginID"
                    maxLength={100}
                    value={userReport.loginID.value}
                    onChange={userReportHandler}
                    className="text-fields-report"
                    placeholder="Login ID"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <Select
                    name="roleID"
                    menuPosition="fixed"
                    options={selectRoleReport}
                    onChange={reportSelectRoleHandler}
                    className="report-select-field-edit"
                    placeholder="Select Role"
                    value={selectRoleValueReport}
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    maxLength={100}
                    name="firstName"
                    value={userReport.firstName.value}
                    onChange={userReportHandler}
                    className="text-fields-report"
                    placeholder="First Name"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    maxLength={100}
                    name="lastName"
                    value={userReport.lastName.value}
                    onChange={userReportHandler}
                    className="text-fields-report"
                    placeholder="Last Name"
                  />
                </Col>

                <Col lg={4} md={4} sm={12} className="JS-Security-Datepicker">
                  <DatePicker
                    {...startDateProps}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    onPropsChange={setStartDateProps}
                    showOtherDays={true}
                    inputClass="date-picker-left"
                    placeholder="Start Date"
                  />
                  <label className="date-to">to</label>

                  <DatePicker
                    {...endDateProps}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    onPropsChange={setEndDateProps}
                    showOtherDays={true}
                    inputClass="date-picker-right"
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
                    onClick={resetHandler}
                    className="user-report-reset"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col lg={12} md={12} sm={12}>
            <Paper className="status-user-panel">
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <label className="user-status-heading">Status</label>
                </Col>
              </Row>

              <Row className="mt-3 mb-3">
                <Col lg={12} md={12} sm={12}>
                  <Row>
                    <Col lg={3} md={3} sm={3}>
                      <Button
                        icon={
                          <i className="icon-download download-btn-icons"></i>
                        }
                        text="Access Detail"
                        className="report-btm-buttons"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <Button
                        icon={
                          <i className="icon-download download-btn-icons"></i>
                        }
                        text="Login History"
                        className="report-btm-buttons"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <Button
                        icon={
                          <i className="icon-download download-btn-icons"></i>
                        }
                        text="Status Wise"
                        className="report-btm-buttons"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <Button
                        icon={
                          <i className="icon-download download-btn-icons"></i>
                        }
                        text="Last Login"
                        className="report-btm-buttons"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Userreport;
