import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessageUserCount: "",
  NewUserCountData: 0,
  ResponseMessageUserRequest: "",
  NewUserRegistrationID: 0,
};

const securitReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Count State
    case actions.GET_NEW_USER_REQUEST_COUNT_INIT:
      return { ...state, Loading: true };
    case actions.GET_NEW_USER_REQUEST_COUNT_SUCCESS:
      console.log("getNewUserRequestsCount", action.response);
      return {
        ...state,
        Loading: false,
        NewUserCountData: action.response,
        ResponseMessageUserCount: action.message,
      };
    case actions.GET_NEW_USER_REQUEST_COUNT_FAIL:
      return {
        ...state,
        NewUserCountData: 0,
        ResponseMessageUserCount: action.message,
        Loading: false,
      };

    case actions.CLEARE_SECURITY_ADMIN_RESPONCE_MESSAGE:
      return {
        ...state,
        ResponseMessageUserCount: "",
      };

    case actions.GET_NEW_USER_REQUESTS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_NEW_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        NewUserRegistrationID: action.response,
        ResponseMessageUserRequest: action.message,
      };

    case actions.GET_NEW_USER_REQUESTS_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessageUserRequest: action.message,
      };

    default:
      return { ...state };
  }
};

export default securitReducer;
