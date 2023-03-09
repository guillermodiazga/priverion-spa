function login(username) {
  return {
    type: 'LOGIN',
    payload: username
  };
}

function logout() {
  return {
    type: 'LOGOUT'
  };
}

export { login, logout };