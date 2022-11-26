import React from "react";


const Header = (props) => {

    return (
        <div className="mainHeader">
            <h1>Hello, {props.firstName}</h1>
        </div>
    )

};

export default Header;