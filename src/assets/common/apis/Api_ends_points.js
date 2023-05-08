// our base url or machine api
const baseURL = "http://192.168.18.241";

// our service URLs
const authenticationURL = ":12000/ERM_Auth";
const getNewUserRequestCountUrl = ":12001/SecurityAdmin";
const getNewUserRequest = ":12001/SecurityAdmin";
const saveUser = ":12001/SecurityAdmin";
const editUser = ":12001/SecurityAdmin";
const getAllUserList = ":12001/SecurityAdmin";
const saveUserRequest = ":12003/SystemAdmin";

//our Final Api
const authenticationAPI = baseURL + authenticationURL;

export { authenticationAPI };
