import React, { Fragment, useEffect, useState, useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  Paper,
  TextField,
  Button,
  Notification,
  Table,
  Loader,
} from "../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin, Pagination } from "antd";
import {
  addNatureApi,
  updateNatureApi,
  viewNatureApi,
  deleteNatureApi,
} from "../../store/actions/Auth_Actions";
import "./NatureofBus.css";

const NatureofBus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log(auth, "authauthauth");

  const [totalRecords, setTotalRecord] = useState(0);

  let currentPageSize = localStorage.getItem("NatureBusinessSize")
    ? localStorage.getItem("NatureBusinessSize")
    : 50;
  let currentPage = localStorage.getItem("NatureBusinessPage")
    ? localStorage.getItem("NatureBusinessPage")
    : 1;

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const NatureBusiness = useRef(null);

  // state for enable nature on edit icon
  const [enableNature, setEnableNature] = useState(true);

  const [buttonState, setButtonState] = useState(false);

  const [editIcon, setEditIcon] = useState({
    name: "",
    pK_NatureOfBusiness: 0,
  });

  // state for table rows
  const [rows, setRows] = useState([]);

  const [natureFields, setNatureFields] = useState({
    natureBusiness: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });
  console.log(natureFields, "natureFieldsnatureFieldsnatureFields");
  // for enable name field
  const nameEnablerHandler = (data) => {
    setButtonState(true);
    console.log(data, "dataaaaa");
    setEditIcon({
      name: data.name,
      pK_NatureOfBusiness: data.pK_NatureOfBusiness,
    });
    setNatureFields({
      ...natureFields,
      natureBusiness: {
        value: data.name,
      },
    });
  };
  console.log(editIcon, "valueeeeeee");

  useEffect(() => {
    // dispatch view API in useEffect to render data in table
    let newDataRender = {
      PageNumber: 1,
      Length: 50,
    };

    dispatch(viewNatureApi(navigate, newDataRender));
  }, []);

  useEffect(() => {
    if (
      auth.viewNatureBusiness.length > 0 &&
      auth.viewNatureBusiness !== null &&
      auth.viewNatureBusiness !== undefined &&
      auth.viewNatureBusiness !== ""
    ) {
      setRows(auth.viewNatureBusiness);
      setOpen({
        ...open,
        open: true,
        message: "Record Found",
      });
    } else {
      setRows([]);
      setOpen({
        ...open,
        open: true,
        message: "No Record Found",
      });
    }
  }, [auth.viewNatureBusiness]);
  console.log("viewNatureBusinessviewNatureBusiness", rows);

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
    setButtonState(false);
    setNatureFields({
      ...natureFields,

      natureBusiness: {
        value: "",
      },
    });
  };

  // Hit update button to update value
  const updateNatureBusiness = () => {
    let updateNatureData = {
      PK_NatureOfBusiness: editIcon.pK_NatureOfBusiness,
      NatureOfBussiness: natureFields.natureBusiness.value,
    };

    let newNatureUpdateTable = {
      PageNumber: 1,
      Length: 50,
    };
    dispatch(updateNatureApi(navigate, updateNatureData, newNatureUpdateTable));
  };

  // HIT DELETE ICON IN TABLE
  const deleteIconOnClick = async (data) => {
    let newDeleteData = {
      PK_NatureOfBusiness: data.pK_NatureOfBusiness,
    };
    let newNatureDeleteTable = {
      PageNumber: 1,
      Length: 50,
    };

    await dispatch(
      deleteNatureApi(navigate, newDeleteData, newNatureDeleteTable)
    );
  };

  // hit add button nature of business
  const addNatureBusinessOnClick = async () => {
    let newNatureData = {
      NatureOfBussiness: natureFields.natureBusiness.value,
    };
    if (newNatureData.NatureOfBussiness !== "") {
      setOpen({
        ...open,
        open: true,
        message: "Record Add",
      });
    } else {
      setOpen({
        ...open,
        open: true,
        message: "No Record Add",
      });
    }
    let newNatureTable = {
      PageNumber: 1,
      Length: 50,
    };

    await dispatch(addNatureApi(navigate, newNatureData, newNatureTable));
  };

  //customer List Onchange for Pagination

  const NatureBusinessPagination = async (current, pageSize) => {
    let newDataRender = {
      PageNumber: current !== null ? parseInt(current) : 1,
      Length: pageSize !== null ? parseInt(pageSize) : 50,
    };
    localStorage.setItem("NatureBusinessSize", pageSize);
    localStorage.setItem("NatureBusinessPage", current);
    await dispatch(viewNatureApi(navigate, newDataRender));
  };

  //Table columns for Nature of business
  const columns = [
    {
      title: <label className="bottom-table-header">Nature Of Business</label>,
      dataIndex: "name",
      key: "name",
      width: "400px",
      render: (text) => <label className="Nature-table-columns">{text}</label>,
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
            onClick={() => nameEnablerHandler(record)}
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
        console.log("deleterecord");
        return (
          <label
            className="Nature-Business-edit-column"
            onClick={() => deleteIconOnClick(record)}
          >
            <i className="icon-trash Nature-Business-deleteicon-color" />
          </label>
        );
      },
    },
  ];

  return (
    <Fragment>
      <section className="Nature-Business-section">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <span className="Nature-Business-label">Nature Of Business</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="Nature-Business-paper">
              <Row className="mt-3">
                <Col lg={4} md={4} sm={12}>
                  <label className="nature-label">Nature Of Business</label>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <TextField
                    disable={false}
                    ref={NatureBusiness}
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
                  {buttonState === true ? (
                    <>
                      <Button
                        icon={
                          <i className="icon-refresh icon-Nature-space"></i>
                        }
                        className="Nature-update-btn"
                        onClick={updateNatureBusiness}
                        text={"Update"}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        icon={
                          <i className="icon-add-circle icon-Nature-space"></i>
                        }
                        className="Nature-Add-btn"
                        onClick={addNatureBusinessOnClick}
                        text="Add"
                      />
                    </>
                  )}
                  <Button
                    icon={<i className="icon-refresh icon-Nature-space"></i>}
                    className="Nature-Reset-btn"
                    onClick={resetNatureHandler}
                    text="Reset"
                  />
                </Col>
                <Col lg={4} md={4} sm={12} />
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  {auth.Spinner === true ? (
                    <span className="nature-Business-user-spinner">
                      <Spin size="large" />
                    </span>
                  ) : (
                    <Table
                      column={columns}
                      rows={rows}
                      pagination={false}
                      className="NatureBusiness-table"
                    />
                  )}
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Pagination
                    total={totalRecords}
                    onChange={NatureBusinessPagination}
                    current={currentPage !== null ? currentPage : 1}
                    showSizeChanger
                    pageSizeOptions={[30, 50, 100, 200]}
                    pageSize={currentPageSize !== null ? currentPageSize : 50}
                    className="PaginationStyle-naturebusiness"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
        <Notification
          setOpen={setOpen}
          open={open.open}
          message={open.message}
        />
        {auth.Loading ? <Loader /> : null}
      </section>
    </Fragment>
  );
};

export default NatureofBus;
