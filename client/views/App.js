import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";

// will render either landing page or main page based on if user is logged in
const App = (props) => {
  const userDefault = {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    is_admin: null,
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => false);
  const [userDetails, setUserDetails] = useState(userDefault);

  useEffect(() => {
    if(!userDetails.id){
      fetch("/api")
      .then((res) => res.json())
      .then((user) => {
        setUserDetails(user);
        setIsLoggedIn(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setUserDetails({
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        is_admin: null,
      });
    }else {
      console.log('logged')
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
