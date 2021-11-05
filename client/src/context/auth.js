import React, { useReducer, createContext } from "react";

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatach] = useReducer(authReducer, { user: null });

  function login(userData) {
    dispatach({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    dispatach({
      type: "LOGOUT",
    });
  }

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
