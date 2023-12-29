// src/redux/reducers.js

const initialState = {
    authenticatedUser: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {
          ...state,
          authenticatedUser: action.payload,
        };
      case 'LOGOUT_USER':
        return {
          ...state,
          authenticatedUser: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  