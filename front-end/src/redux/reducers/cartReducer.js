const initialState = {};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CART_START":
      return { ...state, isFetching: true };

    case "CREATE_CART_SUCCESS":
      sessionStorage.setItem("CART ID", action.cart.id);
      return {
        ...state,
        isFetching: false,
        cart: action.cart,
      };

    case "CREATE_CART_FAILURE":
      return { ...state, isFetching: false, error: action.error };

    case "DELETE_CART_START":
      return { ...state, isFetching: true };

    case "DELETE_CART_SUCCESS":
      sessionStorage.removeItem("CART ID");
      return { ...state, isFetching: false };

    case "DELETE_CART_FAILURE":
      return { ...state, isFetching: false, error: action.error };

    case "GET_CART_START":
      return { ...state, isFetching: true };

    case "GET_CART_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: action.cart,
      };

    case "GET_CART_FAILURE":
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
};
