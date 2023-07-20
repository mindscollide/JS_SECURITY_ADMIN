import * as actions from "../action_types";
import axios from "axios";
import { downloadReportSecurityApi } from "../../commen/apis/Api_config";
import { RefreshToken } from "./Auth_Actions";
import { downloadReportApi } from "../../commen/apis/Api_ends_points";

const downloadAddBankUserInit = () => {
  return {
    type: actions.DOWNLOAD_ADD_BANK_EXCEL_INIT,
  };
};

// for Download Report Loader
const loaderReport = (response) => {
  return {
    type: actions.DOWNLOAD_REPORT_INIT,
    action: response,
  };
};

// For Download Report Something Went wrong
const SomeThingWentWrong = (response) => {
  return {
    type: actions.SOME_THING_WENT_WRONG,
    action: response,
  };
};

const downloadAddBankorCustomerReport = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downloadReportSecurityApi.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    console.log("downloadCorporateLoginReports");
    dispatch(downloadAddBankUserInit());
    axios({
      method: "post",
      url: downloadReportApi,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("ReportApiReportApi", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(downloadAddBankorCustomerReport(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("downloadAddBankorCustomerReport", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "download-security-reports.xlsx");
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadAddBankorCustomerReport", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export { downloadAddBankorCustomerReport };
