import React, { useState } from "react";
import modalStyles from "../modalStyles.scss"

// TicketCreator is rendered by Dashboard when the user clicks the "newRequest" button. It shows a field that user can fill out
// and submit to send a POST request to add a new ticket to the database, and then requests the database to send back the new ticket collection,
// prompting a rerender of the dashboard to include the newly created ticket.
const TicketCreator = (props) => {

    // State to track user inputs into ticket creator form
    const [ inputValues, setInputValues ] = useState({
        user_id: Number(props.userDetails.id),
        title: '',
        description: '',
        status: 'pending',
        priority: 0
    })
    // console.log(inputValues)

    // Updates inputValues state according to user input into ticket creator form, using event listeners attached to each input field
    function handleChange(e, updatedVal) {
        const updatedInputVal = { [updatedVal] : e.target.value }
        const updatedState = {
            ...inputValues,
            ...updatedInputVal,
        };
        setInputValues(updatedState);
    }

    // Sends a POST rquest to the '/api/usertickets' endpoint when user clicks submit
    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/usertickets', {
            method: 'POST',
            headers: { 'Content-Type' : 'Application/JSON' },
            body: JSON.stringify(inputValues),
        })
        .then(() => {
            // Defined in parent component Dashboard, renderPageAfterUpdate() sends a fetch request for new ticket data so that state can be updated
            props.renderPageAfterUpdate();
            setInputValues({
                user_id: '',
                title: '',
                description: '',
                status: '',
                priority: '',
            });
        });
    };

    const ticketForm = 
        <form className="modal">
            <div className="modal-content">
                    {/* Clicking the red X sets parent component Dashboard's showComponent state to false, unmounting the TicketCreator component */}
                    <button className="close-button" onClick={() => props.setShowComponent(false)}>❌</button>
                    <h3 className="modal-header">New Task Request</h3>
            <input className="enter-title" placeholder="Enter Title" type="text" onChange={(e) => handleChange(e, 'title')} />
            <textarea className="enter-description" placeholder="Enter Description" type="text" onChange={(e) => handleChange(e, 'description')} />
            <select className="priority" onChange={(e) => handleChange(e, 'priority')}>
                <option value=""> --Please set priority-- </option>
                <option value={0}> Low </option>
                <option value={1}> Medium </option>
                <option value={2}> High </option>
            </select>
            <input className="submit-button" type="submit" onClick={(e) => handleSubmit(e)}/>
            </div>
        </form>

    return (
        <div className="ticketCreator">
            {ticketForm}
        </div>
    )

};

export default TicketCreator;