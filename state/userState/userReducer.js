export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading:true,
        error:false
      };
      case "FETCHING_SUCCESS":
        return {
          ...state,
          loading:false,
          users:action.payload,
          error:false
        };
        case "FETCHING_FAILED":
        return {
          ...state,
          loading:false,
          error:true
        };

    default:
      return state;
  }
};
