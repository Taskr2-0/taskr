import React , {useState} from "react";
import TicketCreator from "./TicketCreator";
import Header from "./Header";
import Dashboard from "./Dashboard";


const MainPage = (props) => {
    return (
        <div className="mainPage">
            <Header userDetails = {props.userDetails}/>
            <Dashboard userDetails = {props.userDetails}/>
        </div>
    )
};

export default MainPage;