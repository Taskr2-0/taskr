import React from "react";

// Headers is a presentational component rendered by MainPage.
// It greets the logged in user.
const Header = (props) => {
    console.log('props: ', props)
    return (
        <div className="mainHeader">
            <h1>Hello, {props.userDetails.first_name}</h1>
            <button id="logout" onClick={props.logOut}>Log out</button>
        </div>
    )

};

export default Header;