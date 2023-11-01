export const getCookie = (cookie_name) => {
  const cookies = document.cookie.split(";");
  const cookies_length = cookies.length;

  for (let i = 0; i < cookies_length; i++) {
    const current_cookie = cookies[i].split("=");
    if (current_cookie[0].replace(" ", "") === cookie_name)
      return current_cookie[1];
  }
};
