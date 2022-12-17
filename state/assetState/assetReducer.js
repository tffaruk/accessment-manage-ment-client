export const assetReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCHING_SUCCESS":
      return {
        ...state,
        loading: false,
        assets: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
