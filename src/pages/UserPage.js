import React, { useState, useEffect } from "react";
require("dotenv").config();

const url = "http://localhost:1337/articles";
const login_url = "http://localhost:1337/auth/local";

const loginInfo = {
  identifier: process.env.REACT_APP_STRAPI_IDENTIFIER,
  password: process.env.REACT_APP_STRAPI_PASSWORD,
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

const UserPage = () => {
  //state management:
  const [jwt, setJwt] = useState(getLocalStorage());
  const [articles, setArticles] = useState([]);

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
    setJwt(loginResponse.jwt);
    console.log(loginResponse.jwt, "login response");
  };
  // Fetch articles from API once jwt obtained:
  const getArticles = async () => {
    console.log(jwt, "state");
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const articles1 = await response.json();
    console.log(articles1, "articles");
    setArticles(articles1);
  };
  //call function to authenticate user and obtain jwt as soon as application loads:
  useEffect(() => {
    login();
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //when jwt changes, store in local storage:
  useEffect(() => {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }, [jwt]);

  return (
    <>
      <h3>Articles - paid access</h3>
      <ul>
        {articles.map((art) => {
          const { id, title, content } = art;
          return (
            <li key={id}>
              <h4>{title}</h4>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserPage;
