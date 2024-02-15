import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Paper,
  Loader,
} from "../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  reportDownloadAccessApi,
  reportDownloadStatusWiseApi,
  reportDownloadLastLoginApi,
  reportDownloadBankLoginApi,
} from "../../store/actions/Download-Report";
import { allUserRole, allUserStatus } from "../../store/actions/Auth_Actions";
import DatePicker from "react-multi-date-picker";
import "./Userreport.css";
import moment from "moment";

const Userreport = () => {
  const { auth, downloadReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());

  let reportBankId = localStorage.getItem("bankID");

  // state for select Status
  const [reportStatus, setReportStatus] = useState([]);
  const [reportStatusValue, setReportStatusValue] = useState([]);

  // state for disable the previous date from end date by selecting date from start date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    startDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    company: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    endDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    categoryID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    roleID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    statusID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    bankID: {
      value: reportBankId ? reportBankId : 1,
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

  //start date state of multi datepicker
  const changeDateStartHandler = (date) => {
    setStartDate(date);
    setEndDate(null);
    let newDate = moment(date).format("YYYY-MM-DD");
    setUserReport({
      ...userReport,
      startDate: {
        value: newDate,
      },
    });
    console.log(newDate, "changeDateStartHandler");
  };

  //end date state of multi datepicker
  const changeDateEndHandler = (date) => {
    setEndDate(date);
    let newEndDate = moment(date).format("YYYY-MM-DD");
    setUserReport({
      ...userReport,
      endDate: {
        value: newEndDate,
      },
    });
  };

  // download report handler
  const downloadExcelHandler = (e) => {
    let accessData = {
      LoginID: userReport.loginID.value,
      RoleID: userReport.roleID.value,
      FirstName: userReport.firstName.value,
      LastName: userReport.lastName.value,
      FromDate:
        userReport.startDate.value !== ""
          ? moment(userReport.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userReport.endDate.value !== ""
          ? moment(userReport.endDate.value).format("YYYYMMDD")
          : "",
      BankID: parseInt(userReport.bankID.value),
      StatusID: userReport.statusID.value,
    };
    dispatch(reportDownloadAccessApi(accessData));
  };

  const downloadStatusWiseReport = () => {
    let statusWiseData = {
      LoginID: userReport.loginID.value,
      RoleID: userReport.roleID.value,
      FirstName: userReport.firstName.value,
      LastName: userReport.lastName.value,
      FromDate:
        userReport.startDate.value !== ""
          ? moment(userReport.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userReport.endDate.value !== ""
          ? moment(userReport.endDate.value).format("YYYYMMDD")
          : "",
      BankID: parseInt(userReport.bankID.value),
      StatusID: userReport.statusID.value,
    };
    dispatch(reportDownloadStatusWiseApi(statusWiseData));
  };

  const downloadLastLoginReport = () => {
    let lastLoginData = {
      LoginID: userReport.loginID.value,
      RoleID: userReport.roleID.value,
      FirstName: userReport.firstName.value,
      LastName: userReport.lastName.value,
      FromDate:
        userReport.startDate.value !== ""
          ? moment(userReport.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userReport.endDate.value !== ""
          ? moment(userReport.endDate.value).format("YYYYMMDD")
          : "",
      BankID: parseInt(userReport.bankID.value),
      StatusID: userReport.statusID.value,
    };
    dispatch(reportDownloadLastLoginApi(lastLoginData));
  };

  const downloadBankLoginReport = () => {
    let bankUserData = {
      FirstName: userReport.firstName.value,
      LastName: userReport.lastName.value,
      FromDate:
        userReport.startDate.value !== ""
          ? moment(userReport.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userReport.endDate.value !== ""
          ? moment(userReport.endDate.value).format("YYYYMMDD")
          : "",
    };
    dispatch(reportDownloadBankLoginApi(bankUserData));
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

      startDate: {
        value: 0,
      },
      endDate: {
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
    setReportStatusValue([]);
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

  // onChange handler for edit select status
  const reportStatusHandler = async (selectStatus) => {
    console.log(selectStatus, "selectedStatusselectedStatus");
    setReportStatusValue(selectStatus);
    setUserReport({
      ...userReport,
      statusID: {
        value: selectStatus.value,
      },
    });
  };
  console.log("statusIDstatusID", reportStatusValue, userReport);

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

  // for userStatus in select dropdown
  useEffect(() => {
    if (Object.keys(auth.UserStatus).length > 0) {
      let tem = [];
      auth.UserStatus.map((data, index) => {
        console.log(data, "userStatususerStatus");
        tem.push({
          label: data.statusName,
          value: data.statusID,
        });
      });
      setReportStatus(tem);
    }
  }, [auth.UserStatus]);

  useEffect(() => {
    // on page refresh
    dispatch(allUserRole());
    dispatch(allUserStatus());
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
              <Row className="mb-2">
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
                    selected={startDate}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    value={userReport.startDate.value}
                    onPropsChange={setStartDateProps}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    showOtherDays={true}
                    onChange={(value) =>
                      changeDateStartHandler(value?.toDate?.().toString())
                    }
                    inputClass="date-picker-left"
                    placeholder="Start Date"
                  />
                  <label className="date-to">to</label>

                  <DatePicker
                    selected={endDate}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    value={userReport.endDate.value}
                    onPropsChange={setEndDateProps}
                    showOtherDays={true}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={
                      startDate
                        ? moment(startDate).add(1, "days").toDate()
                        : null
                    }
                    autoComplete="off"
                    onChange={(value) =>
                      changeDateEndHandler(value?.toDate?.().toString())
                    }
                    inputClass="date-picker-right"
                    placeholder="End Date"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={2} md={2} sm={12}>
                  <Select
                    name="statusID"
                    menuPosition="fixed"
                    options={reportStatus}
                    onChange={reportStatusHandler}
                    className="report-select-field-edit"
                    placeholder="Select Status"
                    value={reportStatusValue}
                  />
                </Col>

                <Col lg={10} md={10} sm={12} />
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
                        onClick={downloadExcelHandler}
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <Button
                        icon={
                          <i className="icon-download download-btn-icons"></i>
                        }
                        text="Login History"
                        className="report-btm-buttons"
                        onClick={downloadBankLoginReport}
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <Button
                        icon={
                          <i className="icon-download download-btn-icons"></i>
                        }
                        text="Status Wise"
                        className="report-btm-buttons"
                        onClick={downloadStatusWiseReport}
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <Button
                        icon={
                          <i className="icon-download download-btn-icons"></i>
                        }
                        text="Last Login"
                        className="report-btm-buttons"
                        onClick={downloadLastLoginReport}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
        {downloadReducer.Loading ? <Loader /> : null}
      </section>
    </>
  );
};

export default Userreport;
