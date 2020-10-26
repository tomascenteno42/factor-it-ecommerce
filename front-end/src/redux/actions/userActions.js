import { api } from "../../services/api";

export function fetchUsers(skip) {
  return async (dispatch) => {
    dispatch({ type: "FETCH_USERS_START" });
    try {
      const { data } = await api.get(`/user/all?skip=${skip * 10}`);
      dispatch({
        type: "FETCH_USERS_SUCCESS",
        users: data.users,
        pages: data.pages,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_USERS_FAILURE",
        error: "There was an error loading the users",
      });
      throw error;
    }
  };
}

export function getUserById(id) {
  return async (dispatch) => {
    dispatch({ type: "FETCH_USER_START" });
    try {
      const { data } = await api.get(`/user/${id}`);
      dispatch({
        type: "FETCH_USER_SUCCESS",
        user: data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_USER_FAILURE",
        error: "There was an error loading the users",
      });
      throw error;
    }
  };
}
