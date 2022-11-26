import React from "react";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";

// will render either landing page or main page based on if user is logged in
const App = () => {

    return (
        <div>
            <h1>This is App component</h1>
            <LandingPage />
            <MainPage />
        </div>
    )
}

export default App;