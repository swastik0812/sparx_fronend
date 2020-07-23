import * as actionTypes from "./action";

const initialState = {
  token: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SetToken:
      return {
        ...state,
        token: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
