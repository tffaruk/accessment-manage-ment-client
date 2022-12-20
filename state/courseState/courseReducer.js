export const courseReducer = (state, action) => {
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
        courses: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_COURSE": {
      return {
        ...state,
        courses: state.courses.map((course) => {
          return {
            ...course,
            expand: action.id === course._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_COURSE": {
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    }
    case "UPDATE_COURSE":
      return {
        ...state,
        tools: state.tools.map((tool) => {
          if (action.id === tool._id) {
            return {
              ...tool,
              name: action.payload.name,
              prize: action.payload.prize,
              organization: action.payload.organization,
            };
          } else {
            return {
              ...tool,
              name: tool.name,
              prize: tool.prize,
              organization: tool.organization,
            };
          }
        }),
      };
    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== action.id),
      };
    default:
      return state;
  }
};
