import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";


const App = (props) => {
    const userDefault = {
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        is_admin: null
    };

    // tracking user authentication info via state
    const [isLoggedIn, setIsLoggedIn] = useState(() => false);
    const [userDetails, setUserDetails] = useState();

    // On loading the app, if user is logged in, set state of user details according to database response
    useEffect(() => {
        fetch('/api')
        .then(res => res.json())
        .then(user => {
            setUserDetails(user);
            setIsLoggedIn(true);
        })
    }, []);

    // On loading the app, if the user is not logged in, set state of user details to null
    useEffect(() => {
        if(!isLoggedIn){
            fetch('/api/logout')
            setUserDetails({
                id: null,
                email: null,
                first_name: null,
                last_name: null,
                is_admin: null
            })
        }
    }, [isLoggedIn]);

    function logIn() {
        setIsLoggedIn(() => true);
    };

    function logOut(){
        setIsLoggedIn(() => false);
    }
    
    function updateUser(userObject) {
        setUserDetails(userObject);
    };
    
    // Will render either landing page or main page based on if user is logged in by checking state of isLoggedIn
    return (
        <div className="app">
            {isLoggedIn 
            ? <MainPage userDetails = {userDetails} logOut={logOut}/>
            : <LandingPage logIn = {logIn} updateUser = {updateUser}/>
            }

        </div>
    )
}

export default App;