export const token = () => {
  const bearer_token = window.localStorage.getItem("isLoggedIn");
  return "Bearer " + bearer_token;
};
