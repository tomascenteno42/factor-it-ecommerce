const initialState = {};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ORDER_START":
      return { ...state, isFetching: true };

    case "CREATE_ORDER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: action.order,
      };

    case "CREATE_ORDER_FAILURE":
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
};
