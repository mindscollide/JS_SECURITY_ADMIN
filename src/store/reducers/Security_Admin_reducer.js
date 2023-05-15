import * as actions from "../action_types";

const initialState = {
  ResponseMessage: "",
  Loading: false,
  ResponseMessageUserCount: "",
  NewUserCountData: 0,
  userRequestList: [],
  allUserList: [],
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
        userRequestList: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_NEW_USER_REQUESTS_FAIL:
      return {
        ...state,
        Loading: false,
        userRequestList: [],
        ResponseMessage: action.message,
      };

    case actions.SAVE_USER_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.SAVE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.SAVE_USER_FAIL:
      return {
        ...state,
        Loading: false,
      };

    case actions.EDIT_USER_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.EDIT_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.EDIT_USER_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_LIST_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_USER_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        allUserList: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        allUserList: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default securitReducer;
