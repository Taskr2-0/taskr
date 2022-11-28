import React , {useState} from "react";
import TicketCreator from "./TicketCreator";
import Header from "./Header";
import Dashboard from "./Dashboard";


const MainPage = (props) => {
    const [showComponent, setShowComponent] = useState(false);
    // console.log('this is show component', showComponent)

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
                <button className="newRequest" onClick={() => setShowComponent(true)}>New Request</button>
                {showComponent && <TicketCreator userDetails = {props.userDetails} setShowComponent = {setShowComponent}/>}
            </div>
        )
    }
};

export default MainPage;