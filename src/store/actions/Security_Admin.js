import { getNewUserRequestsCounts } from "../../commen/apis/Api_config";
import * as actions from "../action_types";

import axios from "axios";
import { RefreshToken } from "./Auth_Actions";
import { securityAdminApi } from "../../commen/apis/Api_ends_points";
// GET NEW YOUSER REQUEST COUNT LIST
// iniciate
const getNewUserRequestCountInit = () => {
  return {
    type: actions.GET_NEW_USER_REQUEST_COUNT_INIT,
  };
};
// success
const getNewUserRequestCountSuccess = (response, message) => {
  return {
    type: actions.GET_NEW_USER_REQUEST_COUNT_SUCCESS,
    response: response,
    message: message,
  };
};
// fail
const getNewUserRequestCountFail = (message) => {
  return {
    type: actions.GET_NEW_USER_REQUEST_COUNT_FAIL,
    message: message,
  };
};

const getNewUserRequestsCount = (roleID) => {
  // let userID = localStorage.getItem("userID");
  // let email = localStorage.getItem("UserEmail");
  // let data = { UserID: JSON.parse(userID), Email: email };
  let token = JSON.parse(localStorage.getItem("token"))
  let Data = {
    RoleID: roleID,
  };
  console.log("RoleIDRoleID", Data);
  return (dispatch) => {
    dispatch(getNewUserRequestCountInit());
    let form = new FormData();
    form.append("RequestMethod", getNewUserRequestsCounts.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      }
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken());
          dispatch(getNewUserRequestsCount());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequestsCount_01".toLowerCase()
                )
            ) {
              dispatch(
                getNewUserRequestCountSuccess(
                  response.data.responseResult.userRequestCount,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequestsCount_02".toLowerCase()
                )
            ) {
              dispatch(getNewUserRequestCountFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequestsCount_03".toLowerCase()
                )
            ) {
              dispatch(
                getNewUserRequestCountFail("Not authorized to view information")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequestsCount_04".toLowerCase()
                )
            ) {
              dispatch(getNewUserRequestCountFail("Exception No Count Found"));
            }
          } else {
            dispatch(getNewUserRequestCountFail("Something went wrong"));
          }
        } else {
          dispatch(getNewUserRequestCountFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getNewUserRequestCountFail("Something went wrong"));
      });
  };
};
const clearSecurityAdminMessage = () => {
  return {
    type: actions.CLEARE_SECURITY_ADMIN_RESPONCE_MESSAGE,
  };
};

export { getNewUserRequestsCount, clearSecurityAdminMessage };
