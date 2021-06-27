/* import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducers/users_reducer";

const login_url = "http://localhost:1337/auth/local";

const loginInfo = {
  identifier: "ctsw",
  password: "123456",
};

//check if we have the jwt in the local storage, if we do, set up state equal to that, if not, empty string:
const getLocalStorage = () => {
  let jwt = localStorage.getItem("jwt");
  if (jwt) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return "";
  }
};
//STATE
const initialState = {
  jwt: getLocalStorage(),
  articles: [],
};

//when jwt changes, store in local storage:

const UsersContext = React.createContext();

//wrap application in UsersProvider
export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Authorization for accessing user page / paid articles - obtain and set jwt in state:
  const login = async () => {
    const response = await fetch(login_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const loginResponse = await response.json();
    dispatch({ type: "NEW_JWT", payload: loginResponse.jwt });
    localStorage.setItem("jwt", JSON.stringify(loginResponse.jwt));
    //console.log(loginResponse.jwt, "login response");
  };

  //call function to authenticate use when app loads:
  //useEffect(() => {
  //login();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, []);

  return (
    //pass your functions here so that children have access to them:
    <UsersContext.Provider value={{ ...state, login, initialState }}>
      {children}
    </UsersContext.Provider>
  );
};
// This is my hook which ensures that I can use the context other components:
export const useUsersContext = () => {
  return useContext(UsersContext);
};
 */
