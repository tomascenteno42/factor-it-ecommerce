import { api } from "../../services/api";

export function fetchCartProducts(id) {
  return async (dispatch) => {
    dispatch({ type: "FETCH_CART_PRODUCTS_START" });
    try {
      const { data } = await api.get(`/cart/${id}/products`);
      dispatch({ type: "FETCH_CART_PRODUCTS_SUCCESS", products: data });
    } catch (error) {
      dispatch({
        type: "FETCH_CART_PRODUCTS_FAILURE",
        error: "There was an error loading the cart",
      });
      throw error;
    }
  };
}

export function addProductToCart(cart_id, product_id, data) {
  return async (dispatch) => {
    dispatch({ type: "ADD_TO_CART_START" });

    try {
      const res = await api.post(`/cart/${cart_id}/products/${product_id}`, {
        quantity: data,
      });
      dispatch({ type: "ADD_TO_CART_SUCCESS", product: res.data });
    } catch (error) {
      dispatch({ type: "ADD_TO_CART_FAILURE" });
    }
  };
}

export function updateProductFromCart(cart_id, product_id, quantity) {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_PRODUCT_START" });

    try {
      const res = await api.patch(`/cart/${cart_id}/products/${product_id}`, {
        quantity,
      });
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS", products: res.products });
    } catch (error) {
      dispatch({ type: "UPDATE_PRODUCT_FAILURE", error });
    }
  };
}

export function deleteProductFromCart(cart_id, product_id) {
  return async (dispatch) => {
    dispatch({ type: "DELETE_CART_PRODUCT_START" });

    try {
      await api.delete(`/cart/${cart_id}/products/${product_id}`);
      dispatch({ type: "DELETE_CART_PRODUCT_SUCCESS", product_id });
    } catch (error) {
      dispatch({ type: "DELETE_CART_PRODUCT_FAILURE", error });
    }
  };
}
