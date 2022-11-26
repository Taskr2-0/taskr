import React from "react";
import TicketCreator from "./TicketCreator";
import Header from "./Header";
import Dashboard from "./Dashboard";


const MainPage = () => {

    return (
        <div>
            <h1>This is main page</h1>
            <Header />
            <Dashboard />
            <TicketCreator />
        </div>
    )

};

export default MainPage;