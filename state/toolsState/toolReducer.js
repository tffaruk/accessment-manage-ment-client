export const toolReducer = (state, action) => {
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
        tools: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "EXPAND_TOOL": {
      return {
        ...state,
        tools: state.tools.map((tool) => {
          return {
            ...tool,
            expand: action.id === tool._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_TOOL": {
      return {
        ...state,
        tools: [...state.tools, action.payload],
      };
    }
    case "DELETE_TOOL":
      return {
        ...state,
        tools: state.tools.filter((tool) => tool._id !== action.id),
      };

    default:
      return state;
  }
};
