import React from "react";
import TicketCreator from "./TicketCreator";
import Header from "./Header";
import Dashboard from "./Dashboard";


const MainPage = (props) => {
    if (props.userDetails.is_admin) {
        return (
            <div className="mainPage">
                <Header userDetails = {props.userDetails}/>
                <Dashboard userDetails = {props.userDetails}/>
            </div>
        )

    } else {
        return (
            <div className="mainPage">
                <Header userDetails = {props.userDetails}/>
                <Dashboard userDetails = {props.userDetails}/>
                <TicketCreator userDetails = {props.userDetails}/>
            </div>
        )
    }
};

export default MainPage;