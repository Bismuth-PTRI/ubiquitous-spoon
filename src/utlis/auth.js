const auth = {};

auth.createAuthHeader = () => {
  const appJWTToken = localStorage.getItem('token');

  return `Bearer ${appJWTToken}`;
};

auth.logout = (props) => {
  localStorage.setItem('token', '');
  props.clearUser();
};

auth.silentRefreshTimer = async (token_expiry, username) => {
  const url = '/api/refresh_token';

  // Take the expiration time from the JWT - current time - 10 secs
  // refreshToken will be triggered every ~10 mins
  const intervalTime = token_expiry * 1000 - Date.now() - 10000;

  // Call /refresh_token 2min & 50sec after initial call
  setInterval(function () {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth.createAuthHeader(),
      },
      body: JSON.stringify({ username }),
    });
  }, intervalTime);
};

module.exports = auth;
