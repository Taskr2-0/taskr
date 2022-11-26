import React, { useState } from "react";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";

// will render either landing page or main page based on if user is logged in
const App = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(() => false);

    function logIn() {
        setIsLoggedIn(() => true);
    }

    return (
        <div>
            <h1>This is App component</h1>

            {isLoggedIn 
            ? <MainPage />
            : <LandingPage logIn = {logIn}/>
            }

        </div>
    )
}

export default App;