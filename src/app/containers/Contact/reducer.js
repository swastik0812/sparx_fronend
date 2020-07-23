import * as actionTypes from "./action";

const initialState = {
  contacts: null,
  name: "Name",
  number: "Number",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SetContacts:
      return {
        ...state,
        contacts: action.value,
      };
    case actionTypes.SetName:
      return {
        ...state,
        name: action.value,
      };

    case actionTypes.SetNumber:
      return {
        ...state,
        number: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
