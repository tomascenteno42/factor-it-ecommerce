export const setUserId = (id) => {
  if (id) {
    sessionStorage.setItem("USER ID", id);
  }
  return;
};

export const deleteUserId = () => {
  return sessionStorage.removeItem("USER ID");
};

export const getUserId = () => {
  const id = sessionStorage.getItem("USER ID");
  if (id) {
    return parseInt(id);
  }
  return null;
};

export const isLoggedIn = () => {
  return getUserId() !== null;
};

export const getCartId = () => {
  const id = sessionStorage.getItem("CART ID");
  if (id) {
    return parseInt(id);
  }
  return null;
};

export const setCartId = (id) => {
  if (id) {
    sessionStorage.setItem("CART ID", id);
  }
  return;
};

export const deleteCartId = () => {
  return sessionStorage.removeItem("CART ID");
};

export const cartCreated = () => {
  return getCartId() !== null;
};

export const getCurrentDate = () => {
  const date = new Date();
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const isPromotionalByDate = () => {
  const date = getCurrentDate();

  return date.month === 10;
};
