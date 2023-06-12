import React, { Fragment, useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
  Loader,
} from "../../../../components/elements";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import {
  getAllCorporateCategoryApi,
  getAllNature,
  getAssetType,
} from "../../../../store/actions/Auth_Actions";
import { useNavigate } from "react-router-dom";
import { newCorporateCreated } from "../../../../store/actions/Security_Admin";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import "./Customermodal.css";

const CustomerModal = ({
  ModalTitle,
  customerModal,
  setCustomerModal,
  acceptHandler,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log(auth, "authauth");
  const [selectedOption, setSelectedOption] = useState(null);

  // select for category in customer add modal
  const [customerModalSelect, setCustomerModalSelect] = useState([]);
  const [customerModalSelectValue, setCustomerModalSelectValue] = useState([]);

  // select for nature of client in customer add modal
  const [natureBusinessSelect, setNatureBusinessSelect] = useState([]);
  const [natureBusinessSelectValue, setNatureBusinessSelectValue] = useState(
    []
  );

  // select for get all assets type in customer add modal
  const [assetTypeSelect, setAssetTypeSelect] = useState([]);
  const [assetTypeSelectValue, setAssetTypeSelectValue] = useState([]);

  // state for addCompanyModal errorMessage handler
  const [errorShow, setErrorShow] = useState(false);

  // add bank modal states
  const [addCustomerModal, setAddCustomerModal] = useState({
    companyName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporateCategoryID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    rfqTimer: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    pK_NatureOfBusiness: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    // assetTypes: {
    //   value: "",
    //   errorMessage: "",
    //   errorStatus: false,
    // },

    userRole: 0,
  });

  // dispatch getAll corporate select dropdown Api
  useEffect(() => {
    dispatch(getAllCorporateCategoryApi(navigate));
    dispatch(getAllNature(navigate));
    // dispatch(getAssetType(navigate));
  }, []);

  //onchange handler of category select handler
  const selectNewCorporateChangeHandler = async (selectedOption) => {
    console.log(selectedOption, "selectedOptionselectedOption");
    setCustomerModalSelectValue(selectedOption);
    setAddCustomerModal({
      ...addCustomerModal,
      corporateCategoryID: {
        value: selectedOption.value,
        label: selectedOption.label,
      },
    });
  };

  //onchange handler for nature of business
  const selectNatureOfBusinessHandler = async (selectedNature) => {
    console.log("checkcheck", selectedNature);
    setNatureBusinessSelectValue(selectedNature);
    setAddCustomerModal({
      ...addCustomerModal,
      pK_NatureOfBusiness: {
        value: selectedNature.value,
        label: selectedNature.label,
      },
    });
  };

  //onChange handler for get all assets type
  const selectAllAssetsTypeHandler = async (selectedAssets) => {
    setAssetTypeSelectValue(selectedAssets);
    setAddCustomerModal({
      ...addCustomerModal,
      assetTypes: {
        value: selectedAssets.value,
        label: selectedAssets.label,
      },
    });
  };

  //add bank user security admin validate handler
  const addCustomerModalValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "rfqTimer" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerModal({
          ...addCustomerModal,
          rfqTimer: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "rfqTimer" && value === "") {
      setAddCustomerModal({
        ...addCustomerModal,
        rfqTimer: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerModal({
          ...addCustomerModal,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setAddCustomerModal({
        ...addCustomerModal,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "natureClient" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddCustomerModal({
          ...addCustomerModal,
          natureClient: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "natureClient" && value === "") {
      setAddCustomerModal({
        ...addCustomerModal,
        natureClient: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (addCustomerModal.Email.value !== "") {
      if (validateEmail(addCustomerModal.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // reset Handler for addComapny modal
  const handleAddCancelReset = () => {
    setAddCustomerModal({
      ...addCustomerModal,
      companyName: {
        value: "",
      },

      rfqTimer: {
        value: "",
      },
    });
    setAssetTypeSelectValue([]);
    setNatureBusinessSelectValue([]);
    setCustomerModalSelectValue([]);
  };

  //error show on input field when user hit Add btn
  const addHandler = () => {
    let userId = localStorage.getItem("userID");
    if (
      addCustomerModal.rfqTimer.value !== "" &&
      addCustomerModal.companyName.value !== "" &&
      addCustomerModal.pK_NatureOfBusiness.value !== "" &&
      addCustomerModal.corporateCategoryID.value !== ""
      // addCustomerModal.assetTypes.value !== ""
    ) {
      setErrorShow(false);
      let corporateNew = {
        FK_AssetTypeID: 1,
        RFQExpiryTimer: JSON.parse(addCustomerModal.rfqTimer.value),
        CorporateName: addCustomerModal.companyName.value,
        NatureOfBusinessID: addCustomerModal.pK_NatureOfBusiness.value,
        FK_CorporateCategoryID: addCustomerModal.corporateCategoryID.value,
        BankId: 1,
        UserID: JSON.parse(userId),
      };
      console.log(corporateNew);
      dispatch(newCorporateCreated(navigate, corporateNew, setCustomerModal));
    } else {
      setErrorShow(true);
    }
  };

  // for category Corporate modal in select drop down
  useEffect(() => {
    if (Object.keys(auth.getAllCategoryCorporate).length > 0) {
      let tem = [];
      auth.getAllCategoryCorporate.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.category,
          value: data.corporateCategoryID,
        });
      });
      setCustomerModalSelect(tem);
    }
  }, [auth.getAllCategoryCorporate]);

  // for nature of business modal in select drop down
  useEffect(() => {
    if (Object.keys(auth.natureOfBusiness).length > 0) {
      let tem = [];
      auth.natureOfBusiness.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.name,
          value: data.pK_NatureOfBusiness,
        });
      });
      setNatureBusinessSelect(tem);
    }
  }, [auth.natureOfBusiness]);

  // for all Asset type modal in select drop down
  // useEffect(() => {
  //   if (Object.keys(auth.allAssetType).length > 0) {
  //     let tem = [];
  //     auth.allAssetType.map((data, index) => {
  //       console.log(data, "datadatadatadatassssss");
  //       tem.push({
  //         label: data.assetName,
  //         value: data.assetTypeID,
  //       });
  //     });
  //     setAssetTypeSelect(tem);
  //   }
  // }, [auth.allAssetType]);

  // for close modal handler
  const customerCloseModal = () => {
    setCustomerModal(false);
  };
  return (
    <Fragment>
      <Modal
        show={customerModal}
        setShow={setCustomerModal}
        className="modaldialog modal-Bank-styles"
        modalHeaderClassName={"header-Bank-Modal-close-btn"}
        modalFooterClassName="modal-bank-footer"
        size="lg"
        onHide={customerCloseModal}
        ModalBody={
          <Fragment>
            {customerModal ? (
              <Fragment>
                <Row className="mt-1">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="Modal-Title-Bank">Add Company</span>
                  </Col>
                </Row>

                <Row className="mt-0">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Company Name<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="companyName"
                      value={addCustomerModal.companyName.value}
                      onChange={addCustomerModalValidateHandler}
                      labelClass="d-none"
                    />
                    <Row>
                      <Col className="d-flex justify-content-start">
                        <p
                          className={
                            errorShow &&
                            addCustomerModal.companyName.value === ""
                              ? "customerModalErrorMessage"
                              : "customerModalErrorMessage_hidden"
                          }
                        >
                          Company Name is required
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-1">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Category<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <Select
                      name="corporateCategoryID"
                      options={customerModalSelect}
                      value={customerModalSelectValue}
                      onChange={selectNewCorporateChangeHandler}
                      isSearchable={true}
                      labelClass="d-none"
                    />
                    <Row>
                      <Col className="d-flex justify-content-start">
                        <p
                          className={
                            errorShow &&
                            addCustomerModal.corporateCategoryID.value === ""
                              ? "customerModalErrorMessage"
                              : "customerModalErrorMessage_hidden"
                          }
                        >
                          Category is required
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-1">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      RFQ Timer<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name="rfqTimer"
                      value={addCustomerModal.rfqTimer.value}
                      onChange={addCustomerModalValidateHandler}
                      labelClass="d-none"
                    />
                    <Row>
                      <Col className="d-flex justify-content-start">
                        <p
                          className={
                            errorShow && addCustomerModal.rfqTimer.value === ""
                              ? "customerModalErrorMessage"
                              : "customerModalErrorMessage_hidden"
                          }
                        >
                          rfqTimer is required
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* <Row className="mt-1">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Asset Type<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <Select
                      name="assetTypes"
                      options={assetTypeSelect}
                      value={assetTypeSelectValue}
                      onChange={selectAllAssetsTypeHandler}
                      isSearchable={true}
                      labelClass="d-none"
                    />
                    <Row>
                      <Col className="d-flex justify-content-start">
                        <p
                          className={
                            errorShow &&
                            addCustomerModal.assetTypes.value === ""
                              ? "customerModalErrorMessage"
                              : "customerModalErrorMessage_hidden"
                          }
                        >
                          Asset Type is required
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row> */}

                <Row className="mt-1">
                  <Col lg={4} md={4} sm={12}>
                    <span className="labels-bank-modal">
                      Nature of Client<span className="aesterick-color">*</span>
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <Select
                      name="pK_NatureOfBusiness"
                      options={natureBusinessSelect}
                      value={natureBusinessSelectValue}
                      onChange={selectNatureOfBusinessHandler}
                      isSearchable={true}
                      labelClass="d-none"
                    />
                    <Row>
                      <Col className="d-flex justify-content-start">
                        <p
                          className={
                            errorShow &&
                            addCustomerModal.pK_NatureOfBusiness.value === ""
                              ? "customerModalErrorMessage"
                              : "customerModalErrorMessage_hidden"
                          }
                        >
                          Category is required
                        </p>
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
                  text="Add"
                  className="AddUser-btn"
                  onClick={addHandler}
                  icon={<i class="icon-users icon-bank-modal"></i>}
                />
                <Button
                  text="Cancel"
                  className="Cancel-btn"
                  onClick={handleAddCancelReset}
                  icon={<i class="icon-close icon-bank-modal"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
      {auth.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default CustomerModal;
