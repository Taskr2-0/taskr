import React from "react";
import Summary from "./Summary";
import Authentication from "./Authentication";

const LandingPage = (props) => {

    return (
        <div className="landingPage">
            <Summary />
            <Authentication logIn = {props.logIn} updateUser = {props.updateUser}/>
        </div>
    )

};

export default LandingPage;
