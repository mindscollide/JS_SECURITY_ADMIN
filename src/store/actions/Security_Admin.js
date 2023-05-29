import {
  getNewUserRequestsCounts,
  getNewUserRequests,
  saveUserSecurityAdmin,
  editUserSecurityAdmin,
  getAllUserList,
  rejectUserRequestSecurityAdmin,
  createAddBankUser,
} from "../../commen/apis/Api_config";
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
  let token = JSON.parse(localStorage.getItem("token"));
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
      },
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

// for get new user requests

const getUserRequestInit = () => {
  return {
    type: actions.GET_NEW_USER_REQUESTS_INIT,
  };
};

const getUserRequestSuccess = (response, message) => {
  console.log(response, message);
  return {
    type: actions.GET_NEW_USER_REQUESTS_SUCCESS,
    response: response,
    message: message,
  };
};

const getUserRequestFail = (message) => {
  return {
    type: actions.GET_NEW_USER_REQUESTS_FAIL,
    message: message,
  };
};

//get new User Request
const getNewUserRequest = (userRoleID) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    RoleID: userRoleID,
  };
  return (dispatch) => {
    dispatch(getUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", getNewUserRequests.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken());
          dispatch(getNewUserRequest());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequests_01".toLowerCase()
                )
            ) {
              console.log(response.data.responseResult.userRequestList);
              dispatch(
                getUserRequestSuccess(
                  response.data.responseResult.userRequestList,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequests_02".toLowerCase()
                )
            ) {
              dispatch(getUserRequestFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequests_03".toLowerCase()
                )
            ) {
              dispatch(
                getUserRequestFail("Not authorized to view information")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetNewUserRequests_04".toLowerCase()
                )
            ) {
              dispatch(getUserRequestFail("Exception No Record Found"));
            }
          } else {
            dispatch(getUserRequestFail("Something went wrong"));
          }
        } else {
          dispatch(getUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getUserRequestFail("Something went wrong"));
      });
  };
};

// save User Security Admin

const saveUserInit = () => {
  return {
    type: actions.SAVE_USER_INIT,
  };
};

const saveUserSuccess = (response, message) => {
  return {
    type: actions.SAVE_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const saveUserFail = (message) => {
  return {
    type: actions.SAVE_USER_FAIL,
    message: message,
  };
};

const saveSecurityAdmin = (Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let roleID = JSON.parse(localStorage.getItem("roleID"));
  return (dispatch) => {
    dispatch(saveUserInit());
    let form = new FormData();
    form.append("RequestMethod", saveUserSecurityAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken());
          dispatch(saveSecurityAdmin());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveUser_01".toLowerCase()
                )
            ) {
              dispatch(saveUserFail("Invalid User Request"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveUser_02".toLowerCase()
                )
            ) {
              // if (response.data.responseResult.roleID === 4) {
              //   localStorage.setItem(
              //     "FirstName",
              //     response.data.responseResult.FirstName
              //   );
              //   localStorage.setItem(
              //     "Lastname",
              //     response.data.responseResult.Lastname
              //   );
              //   localStorage.setItem(
              //     "UserReferenceCode",
              //     response.data.responseResult.UserReferenceCode
              //   );
              //   localStorage.setItem(
              //     "UserLDAPAccount",
              //     response.data.responseResult.UserLDAPAccount
              //   );
              //   localStorage.setItem(
              //     "Email",
              //     response.data.responseResult.Email
              //   );
              //   localStorage.setItem(
              //     "ContactNumber",
              //     response.data.responseResult.ContactNumber
              //   );
              //   localStorage.setItem(
              //     "LDAPAccount",
              //     response.data.responseResult.LDAPAccount
              //   );
              //   localStorage.setItem(
              //     "FailedAttemptCount",
              //     response.data.responseResult.FailedAttemptCount
              //   );
              //   localStorage.setItem(
              //     "UserRegistrationRequestID",
              //     response.data.responseResult.UserRegistrationRequestID
              //   );
              //   localStorage.setItem(
              //     "UserID",
              //     response.data.responseResult.UserID
              //   );
              //   localStorage.setItem(
              //     "token",
              //     JSON.stringify(response.data.responseResult.token)
              //   );
              //   localStorage.setItem(
              //     "refreshToken",
              //     JSON.stringify(response.data.responseResult.refreshToken)
              //   );
              //   // navigate("/Js/Admin/");
              //   dispatch(
              //     saveUserSuccess(
              //       response.data.responseResult.responseMessage,
              //       "User Request Accepted and User Created Successfully"
              //     )
              //   );
              // } else {
              //   dispatch(saveUserFail("This is not authorized"));
              // }
              dispatch(
                saveUserSuccess(
                  response.data.responseResult.responseMessage,
                  "User Request Accepted and User Created Successfully"
                )
              );
              dispatch(getNewUserRequest(roleID));
              dispatch(getNewUserRequestsCount(roleID));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveUser_03".toLowerCase()
                )
            ) {
              dispatch(
                saveUserFail("No record updated. Refer to logs for details")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveUser_04".toLowerCase()
                )
            ) {
              dispatch(saveUserFail("Not authorized to perform action"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SaveUser_05".toLowerCase()
                )
            ) {
              dispatch(saveUserFail("Exception User not save"));
            }
          } else {
            dispatch(saveUserFail("Something went wrong"));
          }
        } else {
          dispatch(saveUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(saveUserFail("Something went wrong"));
      });
  };
};

const clearSecurityAdminMessage = () => {
  return {
    type: actions.CLEARE_SECURITY_ADMIN_RESPONCE_MESSAGE,
  };
};

// edit User Security Admin
const editUserInit = () => {
  return {
    type: actions.EDIT_USER_INIT,
  };
};

const editUserSuccess = (response, message) => {
  return {
    type: actions.EDIT_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const editUserFail = (message) => {
  return {
    type: actions.EDIT_USER_FAIL,
    message: message,
  };
};

const editSecurityAdmin = (Data, setEditModalSecurity, setUpdateModal) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let data = {
    FirstName: "",
    LastName: "",
    UserLDAPAccount: "",
    Email: "",
    UserRoleID: 0,
    UserStatusID: 0,
    RequestingUserID: 0,
  };
  return (dispatch) => {
    dispatch(editUserInit());
    let form = new FormData();
    form.append("RequestMethod", editUserSecurityAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken());
          dispatch(editSecurityAdmin(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_EditUser_01".toLowerCase()
                )
            ) {
              dispatch(
                editUserSuccess(
                  response.data.responseResult.responseMessage,
                  "User updated successfully"
                )
              );
              setEditModalSecurity(false);
              setUpdateModal(false);
              dispatch(allUserList(data));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_EditUser_02".toLowerCase()
                )
            ) {
              dispatch(editUserFail("Unable to update user. Please try later"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_EditUser_03".toLowerCase()
                )
            ) {
              dispatch(editUserFail("No changes were made"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_EditUser_04".toLowerCase()
                )
            ) {
              dispatch(
                editUserFail("Unable to get current details of the User")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_EditUser_05".toLowerCase()
                )
            ) {
              dispatch(editUserFail("Not authorized to perform action"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_EditUser_06".toLowerCase()
                )
            ) {
              dispatch(editUserFail("Exception Something went wrong"));
            }
          } else {
            dispatch(editUserFail("Something went wrong"));
          }
        } else {
          dispatch(editUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(editUserFail("Something went wrong"));
      });
  };
};

// getAllUserList
const allUserInit = () => {
  return {
    type: actions.GET_ALL_USER_LIST_INIT,
  };
};

const allUserSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_USER_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const allUserFail = (message) => {
  return {
    type: actions.GET_ALL_USER_LIST_FAIL,
    message: message,
  };
};

const allUserList = (Data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  // console.log(token, "token");

  return (dispatch) => {
    dispatch(allUserInit());
    let form = new FormData();
    form.append("RequestMethod", getAllUserList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken());
          dispatch(allUserList(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_01".toLowerCase()
                )
            ) {
              dispatch(
                allUserSuccess(
                  response.data.responseResult.allUsers,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_02".toLowerCase()
                )
            ) {
              dispatch(allUserFail("No users found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_03".toLowerCase()
                )
            ) {
              dispatch(allUserFail("Not authorized to perform action"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllUsersList_04".toLowerCase()
                )
            ) {
              dispatch(allUserFail("Exception No User List Found"));
            }
          } else {
            dispatch(allUserFail("Something went wrong"));
          }
        } else {
          dispatch(allUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(allUserFail("Something went wrong"));
      });
  };
};

// get Reject User Request

const rejectedUserInit = () => {
  return {
    type: actions.GET_REJECT_USER_INIT,
  };
};

const rejectedUserSuccess = (response, message) => {
  return {
    type: actions.GET_REJECT_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const rejectedUserFail = (message) => {
  return {
    type: actions.GET_REJECT_USER_FAIL,
    message: message,
  };
};

const getRejectUser = (rejectedData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let roleID = JSON.parse(localStorage.getItem("roleID"));
  return (dispatch) => {
    dispatch(rejectedUserInit());
    let form = new FormData();
    form.append("RequestMethod", rejectUserRequestSecurityAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(rejectedData));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken());
          dispatch(getRejectUser());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_01".toLowerCase()
                )
            ) {
              dispatch(rejectedUserFail("invalid request data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_02".toLowerCase()
                )
            ) {
              dispatch(
                rejectedUserSuccess(
                  response.data.responseResult.responseMessage,
                  "user rejected"
                )
              );
              dispatch(getNewUserRequest(roleID));
              dispatch(getNewUserRequestsCount(roleID));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_03".toLowerCase()
                )
            ) {
              dispatch(rejectedUserFail("user not rejected"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_04".toLowerCase()
                )
            ) {
              dispatch(rejectedUserFail("invalid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_RejectUserRequest_05".toLowerCase()
                )
            ) {
              dispatch(rejectedUserFail("Exception No User Rejected"));
            }
          } else {
            dispatch(rejectedUserFail("Something went wrong"));
          }
        } else {
          dispatch(rejectedUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(rejectedUserFail("Something went wrong"));
      });
  };
};

// Create Add Bank User
const createBankUserInit = () => {
  return {
    type: actions.CREATE_BANK_USER_INIT,
  };
};

const createBankUserSuccess = (response, message) => {
  return {
    type: actions.CREATE_BANK_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const createBankUserFail = (message) => {
  return {
    type: actions.CREATE_BANK_USER_FAIL,
    message: message,
  };
};

const createBank = (newData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(createBankUserInit());
    let form = new FormData();
    form.append("RequestMethod", createAddBankUser.RequestMethod);
    form.append("RequestData", JSON.stringify(newData));
    axios({
      method: "post",
      url: securityAdminApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken());
          dispatch(createBank(newData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_01".toLowerCase()
                )
            ) {
              dispatch(
                createBankUserSuccess(
                  response.data.responseResult.responseMessage,
                  "user created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_02".toLowerCase()
                )
            ) {
              dispatch(createBankUserFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_03".toLowerCase()
                )
            ) {
              dispatch(createBankUserFail("Not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_04".toLowerCase()
                )
            ) {
              dispatch(createBankUserFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_05".toLowerCase()
                )
            ) {
              dispatch(createBankUserFail("user not created"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_06".toLowerCase()
                )
            ) {
              dispatch(createBankUserFail("User’s Email Already exsists"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_07".toLowerCase()
                )
            ) {
              dispatch(createBankUserFail("Not a Valid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_CreateBankUser_08".toLowerCase()
                )
            ) {
              dispatch(createBankUserFail("Exception Something Wrong"));
            }
          } else {
            dispatch(createBankUserFail("Something went wrong"));
          }
        } else {
          dispatch(createBankUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(createBankUserFail("Something went wrong"));
      });
  };
};

export {
  getNewUserRequestsCount,
  clearSecurityAdminMessage,
  saveSecurityAdmin,
  getNewUserRequest,
  allUserList,
  editSecurityAdmin,
  getRejectUser,
  createBank,
};
