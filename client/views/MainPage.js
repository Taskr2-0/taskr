import React , {useState} from "react";
import TicketCreator from "./TicketCreator";
import Header from "./Header";
import Dashboard from "./Dashboard";


const MainPage = (props) => {
    const [showComponent, setShowComponent] = useState(false);
    // console.log('this is show component', showComponent)

    return (
        <div className="mainPage">
            <Header userDetails = {props.userDetails}/>
            <Dashboard userDetails = {props.userDetails}/>
            <button className="newRequest" onClick={() => setShowComponent(true)}>New Request</button>
            {/* <TicketCreator userDetails = {props.userDetails}/> */}
            {showComponent && <TicketCreator userDetails = {props.userDetails}/>}

        </div>
    )

};

export default MainPage;