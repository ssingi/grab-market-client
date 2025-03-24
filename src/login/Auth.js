// utils/auth.js
export const persistAuth = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("user");
};
