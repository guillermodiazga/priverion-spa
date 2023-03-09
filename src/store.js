import { createStore } from 'redux';

const initialState = {
  isLoggedIn: localStorage.token ? true : false,
  username: localStorage.username ?? ''
};
 
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, username: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, username: '' };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
