const authenticationLogIn = {
  RequestMethod: "ServiceManager.Login",
};

const authenticationSignUp = {
  RequestMethod: "ServiceManager.SignUp",
};

const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};

const getNewUserRequestsCounts = {
  RequestMethod: "ServiceManager.GetNewUserRequestsCount",
};

const getNewUserRequests = {
  RequestMethod: "ServiceManager.GetNewUserRequests",
};

const saveUserSecurityAdmin = {
  RequestMethod: "ServiceManager.SaveUser",
};

const editUserSecurityAdmin = {
  RequestMethod: "ServiceManager.EditUser",
};

const getAllUserList = {
  RequestMethod: "ServiceManager.GetAllUsersList",
};

const allUserRolesList = {
  RequestMethod: "ServiceManager.RoleList",
};

const getAllUserStatus = {
  RequestMethod: "ServiceManager.GetAllUserStatus",
};

const rejectUserRequestSecurityAdmin = {
  RequestMethod: "ServiceManager.RejectUserRequest",
};

const createAddBankUser = {
  RequestMethod: "ServiceManager.CreateBankUser",
};

export {
  authenticationLogIn,
  authenticationSignUp,
  authenticationRefreshToken,
  getNewUserRequestsCounts,
  getNewUserRequests,
  saveUserSecurityAdmin,
  editUserSecurityAdmin,
  getAllUserList,
  allUserRolesList,
  getAllUserStatus,
  createAddBankUser,
  rejectUserRequestSecurityAdmin,
};
