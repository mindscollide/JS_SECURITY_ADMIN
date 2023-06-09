// our base url or machine api
const baseURL = "http://192.168.18.241";

// our service URLs
const authenticationPort = ":12000/ERM_Auth";
const securityAdmintPort = ":12001/SecurityAdmin";
const SystemAdminPort = ":12003/SystemAdmin";

//our Final Api
const authenticationAPI = baseURL + authenticationPort;
const securityAdminApi = baseURL + securityAdmintPort;
const SystemAdminApi = baseURL + SystemAdminPort;

export { authenticationAPI, securityAdminApi, SystemAdminApi };
