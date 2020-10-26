import { api } from "../../services/api";

export function createCart(data) {
  return async (dispatch) => {
    dispatch({ type: "CREATE_CART_START" });
    try {
      const res = await api.post("/cart", data);
      dispatch({ type: "CREATE_CART_SUCCESS", cart: res.data });
    } catch (error) {
      dispatch({ type: "CREATE_CART_FAILURE" });
    }
  };
}

export function deleteCart(id) {
  return async (dispatch) => {
    dispatch({ type: "DELETE_CART_START" });
    try {
      await api.delete(`/cart/${id}`);
      dispatch({ type: "DELETE_CART_SUCCESS" });
    } catch (error) {
      dispatch({ type: "DELETE_CART_FAILURE" });
    }
  };
}

export function getCartById(id) {
  return async (dispatch) => {
    dispatch({ type: "GET_CART_START" });
    try {
      const res = await api.get(`/cart/${id}`);
      dispatch({ type: "GET_CART_SUCCESS", cart: res.data });
    } catch (error) {
      dispatch({ type: "GET_CART_FAILURE" });
    }
  };
}
