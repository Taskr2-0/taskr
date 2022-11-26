import React from "react";
import Summary from "./Summary";
import Authentication from "./Authentication";

const LandingPage = (props) => {

    return (
        <div>
            <h1>This is landing page</h1>
            <Summary />
            <Authentication logIn = {props.logIn} updateUser = {props.updateUser}/>
        </div>
    )

};

export default LandingPage;
