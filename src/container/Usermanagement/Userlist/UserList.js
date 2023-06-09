import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  Paper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../../commen/functions/emailValidation";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Spin } from "antd";
import "./UserList.css";
import { useEffect } from "react";
import { getAllCorporateApi } from "../../../store/actions/CorporateActions";
import { searchCorporateUsers } from "../../../store/actions/SearchCorporateActions";

const Userlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { CorporateReducer, SearchReducer } = useSelector((state) => state);
  console.log("SearchReducerSearchReducer", SearchReducer);

  console.log("CorporateReducerCorporateReducer", CorporateReducer);
  const [excelData, setexcelData] = useState([]);
  //state for customer list fields
  const [userListFields, setUserListFields] = useState({
    FirstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    LastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    companyName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporateCategoryID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  useEffect(() => {
    let newCorporateData = {
      CorporateID: 1,
    };
    dispatch(getAllCorporateApi(navigate, newCorporateData));
  }, []);

  useEffect(() => {
    console.log(
      "excelDataexcelDataexcelData",
      CorporateReducer.GetAllCorporateUser
    );

    if (Object.keys(CorporateReducer.GetAllCorporateUser).length > 0) {
      console.log(
        "excelDataexcelDataexcelData",
        CorporateReducer.GetAllCorporateUser
      );

      let temp = [];
      CorporateReducer.GetAllCorporateUser.map((data, index) => {
        console.log("datadatadata", data);
        temp.push(data);
      });
      setexcelData(temp);
      console.log("excelDataexcelDataexcelData", excelData);
    }
  }, [CorporateReducer.GetAllCorporateUser]);

  const handleSearchClick = () => {
    let searchData = {
      FirstName: userListFields.FirstName.value,
      LastName: userListFields.LastName.value,
      Email: userListFields.Email.value,
      CompanyName: userListFields.companyName.value,
      CategoryID: 0,
    };

    dispatch(searchCorporateUsers(navigate, searchData));
  };

  useEffect(() => {
    if (Object.keys(SearchReducer.SearchCorporateUser).length > 0) {
      setexcelData(SearchReducer.SearchCorporateUser);
    } else {
      setexcelData([]);
    }
  }, [SearchReducer.SearchCorporateUser]);

  useEffect(() => {
    let searchData = {
      FirstName: "",
      LastName: "",
      Email: "",
      CompanyName: "",
      CategoryID: 0,
    };
    dispatch(searchCorporateUsers(navigate, searchData));
  }, []);
  // validation for customer List
  const customerListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setUserListFields({
        ...userListFields,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setUserListFields({
        ...userListFields,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setUserListFields({
        ...userListFields,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setUserListFields({
          ...userListFields,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setUserListFields({
        ...userListFields,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (userListFields.Email.value !== "") {
      if (validateEmail(userListFields.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // reset value on reset Button Hit
  const resetBtnHandler = () => {
    setUserListFields({
      ...userListFields,
      FirstName: {
        value: "",
      },
      LastName: {
        value: "",
      },
      companyName: {
        value: "",
      },
      Email: {
        value: "",
      },
    });
    let newCorporateData = {
      CorporateID: 1,
    };
    dispatch(getAllCorporateApi(navigate, newCorporateData));
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "200px",
      render: (text) => <label className="User-table-columns">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Company</label>,
      dataIndex: "company",
      key: "company",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "statusId",
      key: "statusId",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Creation Date Time</label>,
      dataIndex: "creationDate",
      key: "creationDate",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  return (
    <>
      <section className="user-List-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="user-List-label">Customer User List</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Paper className="user-List-paper">
                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="First Name"
                        name="FirstName"
                        value={userListFields.FirstName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Last Name"
                        name="LastName"
                        value={userListFields.LastName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Company Name"
                        name="companyName"
                        value={userListFields.companyName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={12}>
                      <TextField
                        placeholder="Email"
                        name="Email"
                        onBlur={handlerEmail}
                        value={userListFields.Email.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={12}>
                      <Select
                        name="corporateCategoryID"
                        placeholder="Category"
                        className="select-user-list-fontsize"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="user-list-col-fields"
                    >
                      <Button
                        icon={<i className="icon-search icon-check-space"></i>}
                        className="User-Search-btn"
                        text="Search"
                        onClick={handleSearchClick}
                      />
                      <Button
                        icon={<i className="icon-refresh icon-check-space"></i>}
                        className="User-Reset-btn"
                        onClick={resetBtnHandler}
                        text="Reset"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        column={columns}
                        rows={excelData}
                        scroll={{ x: true }}
                        pagination={true}
                        className="User-List-table"
                      />
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      {CorporateReducer.Loading ? <Loader /> : null}
      {SearchReducer.Loading ? <Loader /> : null}
    </>
  );
};

export default Userlist;
