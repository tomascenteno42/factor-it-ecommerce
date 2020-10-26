import { api } from "../../services/api";

export function createOrder(id, data) {
  return async (dispatch) => {
    dispatch({ type: "CREATE_ORDER_START" });
    try {
      const res = await api.post(`/cart/${id}/order`, { total: data });
      dispatch({ type: "CREATE_ORDER_SUCCESS", order: res.data });
    } catch (error) {
      dispatch({ type: "CREATE_ORDER_FAILURE" });
    }
  };
}
