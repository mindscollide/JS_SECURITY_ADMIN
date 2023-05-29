import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  isSignUp: false,
  UserRoleList: [],
  UserStatus: [],
  SessionExpeireResponseMessage: "",
  roles: [],
  Token: "",
  Refresh: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true };

    case actions.LOG_IN_SUCCESS:
      console.log(action, "LOG_IN_SUCCESSLOG_IN_SUCCESS");
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: "",
        Refresh: "",
      };

    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        Loading: false,
        isLoggedIn: true,
        ResponseMessage: action.message,
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_ROLE_LIST_INIT:
      return { ...state, Loading: true };

    case actions.GET_ALL_USER_ROLE_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        UserRoleList: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_ROLE_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        UserRoleList: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_USER_STATUS_SUCCESS:
      return {
        ...state,
        Loading: false,
        UserStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_FAIL:
      return {
        ...state,
        Loading: false,
        UserStatus: [],
        ResponseMessage: action.message,
      };

    case actions.SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        Token: "",
        Refresh: "",
        SessionExpeireResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
