import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  SessionExpeireResponseMessage: "",
  Token: "",
  Refresh: "",
};

const downloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DOWNLOAD_ADD_BANK_EXCEL_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.DOWNLOAD_REPORT_INIT:
      return {
        ...state,
        Loading: false,
      };

    default:
      return { ...state };
  }
};

export default downloadReducer;
