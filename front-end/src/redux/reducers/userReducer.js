const initialState = {
  data: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START":
      return { ...state, isFetching: true };

    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: action.users,
        pages: action.pages,
      };

    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error.message,
      };
    case "FETCH_USER_START":
      return { ...state, isFetching: true };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: action.user,
      };

    case "FETCH_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error.message,
      };

    default:
      return state;
  }
};
