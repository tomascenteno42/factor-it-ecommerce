import { api } from "../../services/api";

export function fetchProducts(skip) {
  return async (dispatch) => {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    try {
      const { data } = await api.get(`/products?skip=${skip * 10}`);
      dispatch({
        type: "FETCH_PRODUCTS_SUCCESS",
        products: data.products,
        pages: data.pages,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_PRODUCTS_FAILURE",
        error: "There was an error loading the products",
      });
      throw error;
    }
  };
}
