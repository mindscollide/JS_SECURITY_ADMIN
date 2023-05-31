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

//get all corporate in company dropdown
const getAllCorporates = {
  RequestMethod: "ServiceManager.GetAllCorporates",
};

// create Corporate User in securityAdmin
const createCorporateUserSecurityAdmin = {
  RequestMethod: "ServiceManager.CreateCorporateUser",
};

// create New Corporate in Security Admin
const createNewCorporateSecurityAdmin = {
  RequestMethod: "ServiceManager.CreateNewCorporate",
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
  getAllCorporates,
  createCorporateUserSecurityAdmin,
  createNewCorporateSecurityAdmin,
};
