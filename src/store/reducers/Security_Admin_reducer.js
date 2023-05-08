import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessageUserCount: "",
  NewUserCountData: 0,
};

const securitReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Count State
    case actions.GET_NEW_USER_REQUEST_COUNT_INIT:
      return { ...state, Loading: true };
    case actions.GET_NEW_USER_REQUEST_COUNT_SUCCESS:
      console.log("getNewUserRequestsCount",action.response)
      return {
        ...state,
        NewUserCountData: action.response,
        ResponseMessageUserCount: action.message,
        Loading: false,
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
    default:
      return { ...state };
  }
};

export default securitReducer;
