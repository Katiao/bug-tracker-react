import React, { useState, useEffect } from "react";

const url = "http://localhost:1337/articles";
const login_url = "http://localhost:1337/auth/local";

const loginInfo = {
  identifier: "ctsw",
  password: "123456",
};

//check if we have the jwt in the local storage, if we do, set up state equal to that, if no, empty string:
const getLocalStorage = () => {
  let jwt = localStorage.getItem("jwt");
  if (jwt) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return "";
  }
};

const UserPage = () => {
  const [jwt, setJwt] = useState(getLocalStorage());
  const [articles, setArticles] = useState([]);

  //AUTHORISATION FOR USER PAGE

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
    setJwt(loginResponse.jwt);
    console.log(loginResponse.jwt, "login response");
  };

  // FETCH ARTICLES FROM API

  /*  const getArticles = async () => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${loginResponse.jwt}`,
      },
    });
    const articles1 = await response.json();
    setArticles(articles1);
  }; */

  //call function to authenticate user and obtain jwt as soon as application loads:
  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //when jwt changes, store in local storage:
  useEffect(() => {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }, [jwt]);

  return (
    <>
      <h3>Articles</h3>
      {/* <ul>
        {articles.map((art) => {
          const { id, title, content } = art;
          return (
            <li key={id}>
              <h4>{title}</h4>
              <p>{content}</p>
            </li>
          );
        })}
    </ul> */}
    </>
  );
};

export default UserPage;
