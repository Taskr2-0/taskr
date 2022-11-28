import React from "react";


const Header = (props) => {
    console.log('props: ', props)
    return (
        <div className="mainHeader">
            <h1>Hello, {props.userDetails.first_name}</h1>
        </div>
    )

};

export default Header;