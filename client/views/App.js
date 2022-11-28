import React, { useState } from "react";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";

// will render either landing page or main page based on if user is logged in
const App = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(() => false);
    const [userDetails, setUserDetails] = useState({
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        is_admin: null
    });

    function logIn() {
        setIsLoggedIn(() => true);
    };
    
    function updateUser(userObject) {
        setUserDetails(userObject);
    };
    
    return (
        <div className="app">
            {isLoggedIn 
            ? <MainPage userDetails = {userDetails}/>
            : <LandingPage logIn = {logIn} updateUser = {updateUser}/>
            }

        </div>
    )
}

export default App;