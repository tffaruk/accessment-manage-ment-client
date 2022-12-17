export const userReducer = (state, action) => {
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
        users: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_USER": {
      return {
        ...state,
        users: state.users.map((user) => {
          return {
            ...user,
            expand: action.id === user.id ? action.expand : false,
          };
        }),
      };
    }
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "SINGLE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.id),
      };
    
    default:
      return state;
  }
};
