import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Paper, TextField, Button, Table } from "../../components/elements";
import "./NatureofBus.css";

const NatureofBus = () => {
  const [natureFields, setNatureFields] = useState({
    natureBusiness: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // validation for customer List
  const natureBusinessValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "natureBusiness" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setNatureFields({
          ...natureFields,
          natureBusiness: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "natureBusiness" && value === "") {
      setNatureFields({
        ...natureFields,
        natureBusiness: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  const resetNatureHandler = () => {
    setNatureFields({
      ...natureFields,

      natureBusiness: {
        value: "",
      },
    });
  };

  //Table columns for Nature of business
  const columns = [
    {
      title: <label className="bottom-table-header">Nature Of Business</label>,
      dataIndex: "natureOfBusiness",
      key: "natureOfBusiness",
      width: "400px",
      render: (text) => <label className="User-table-columns">{text}</label>,
    },

    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text, record) => {
        console.log("recordrecordrecord");
        return (
          <label
            className="Nature-Business-edit-column"
            // onClick={() => openModalEdit(record)}
          >
            <i className="icon-edit Nature-Business-editicon-color" />
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Delete</label>,
      dataIndex: "delete",
      key: "delete",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log("recordrecordrecord");
        return (
          <label
            className="Nature-Business-edit-column"
            // onClick={() => openModalEdit(record)}
          >
            <i className="icon-trash Nature-Business-editicon-color" />
          </label>
        );
      },
    },
  ];

  //Table data for nature of business
  const natureData = [
    {
      natureOfBusiness: "Testing Data",
    },
    {
      natureOfBusiness: "Testing Data Two",
    },
    {
      natureOfBusiness: "Testing Data Two",
    },
  ];
  return (
    <Fragment>
      <Container className="Nature-Business-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="Nature-Business-label">
                  Nature Of Business
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={11} md={11} sm={12}>
                <Paper className="Nature-Business-paper">
                  <Row className="mt-3">
                    <Col lg={4} md={4} sm={12}>
                      <label className="nature-label">Nature Of Business</label>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <TextField
                        placeholder="Nature Of Business"
                        labelClass="d-none"
                        name="natureBusiness"
                        value={natureFields.natureBusiness.value}
                        onChange={natureBusinessValidation}
                        className="textfields-Nature-Business-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12} />
                  </Row>

                  <Row className="mt-3">
                    <Col lg={8} md={8} sm={12} className="Nature-col-fields">
                      <Button
                        icon={
                          <i className="icon-add-circle icon-Nature-space"></i>
                        }
                        className="Nature-Add-btn"
                        text="Add"
                      />
                      <Button
                        icon={
                          <i className="icon-refresh icon-Nature-space"></i>
                        }
                        className="Nature-Reset-btn"
                        onClick={resetNatureHandler}
                        text="Reset"
                      />
                    </Col>
                    <Col lg={4} md={4} sm={12} />
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        column={columns}
                        rows={natureData}
                        pagination={false}
                        className="User-List-table"
                      />
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default NatureofBus;
