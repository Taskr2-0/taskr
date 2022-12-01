import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";

// App is the top level component. On mounting, it checks if the user is logged in and updates state accordingly.
// If the user is not logged in, it renders the LandingPage component.
// If the user is logged in, it renders the MainPage component.
const App = (props) => {
  const userDefault = {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    is_admin: null,
  };

  // Creates state to track user authentication info
  const [isLoggedIn, setIsLoggedIn] = useState(() => false);
  const [userDetails, setUserDetails] = useState();

  // On loading the app, if user is logged in, set state of user details according to database response
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((user) => {
        console.log('user: ', user);
        setUserDetails(user);
        setIsLoggedIn(true);
      });
  }, []);

  // If the user is not logged in or whenver user is logged out, set state of user details to null
  useEffect(() => {
    if (!isLoggedIn) {
      setUserDetails({
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        is_admin: null,
      });
    }
  }, [isLoggedIn]);

  function logIn() {
    setIsLoggedIn(() => true);
  }

  function logOut() {
    fetch("/api/logout");
    setIsLoggedIn(() => false);
  }

  function updateUser(userObject) {
    setUserDetails(userObject);
  }

  // Will render either landing page or main page based on if user is logged in by checking state of isLoggedIn
  return (
    <div className="app">
      {isLoggedIn ? (
        <MainPage userDetails={userDetails} logOut={logOut} />
      ) : (
        <LandingPage logIn={logIn} updateUser={updateUser} />
      )}
    </div>
  );
};

export default App;
