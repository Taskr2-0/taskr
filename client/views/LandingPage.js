import React from "react";
import Summary from "./Summary";
import Authentication from "./Authentication";

// LandingPage is a presentational component that renders if the user is not logged in. It displays Taskr Summary and the Authentication
// component, which provides Sign Up and Login fields.
const LandingPage = (props) => {

    return (
        <div className="landingPage">
            <Summary />
            <Authentication logIn = {props.logIn} updateUser = {props.updateUser}/>
        </div>
    )

};

export default LandingPage;
