const _token = localStorage.getItem("token");

const authenticationLogIn = {
  _token: null,
  RequestMethod: "ServiceManager.Login",
};

const authenticationSignUp = {
  _token: null,
  RequestMethod: "ServiceManager.SignUp",
};

export { authenticationLogIn, authenticationSignUp };
