import React , {useState} from "react";
import TicketCreator from "./TicketCreator";
import Header from "./Header";
import Dashboard from "./Dashboard";

// Main page is a presentational component that renders if the user is logged in.
// It displays the Header component which greets the user, and the Dashboard component which fetches and displays the appropriate help tickets.
const MainPage = (props) => {
    return (
        <div className="mainPage">
            <Header userDetails = {props.userDetails} logOut={props.logOut}/>
            <Dashboard userDetails = {props.userDetails}/>
        </div>
    )
};

export default MainPage;