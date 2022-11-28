import React, { useState } from "react";
import modalStyles from "../modalStyles.css"


const TicketCreator = (props) => {
    const [ inputValues, setInputValues ] = useState({
        user_id: Number(props.userDetails.id),
        title: '',
        description: '',
        status: 'pending',
        priority: 0
    })
    console.log(inputValues)

    function handleChange(e, updatedVal) {
        const updatedInputVal = { [updatedVal] : e.target.value }
        const updatedState = {
            ...inputValues,
            ...updatedInputVal,
        };
        setInputValues(updatedState);
    }

    // send a POST rquest to the '/api/usertickets' endpoint
    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/usertickets', {
            method: 'POST',
            headers: { 'Content-Type' : 'Application/JSON' },
            body: JSON.stringify(inputValues),
        })
        .then(() => {
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
            <button className="close-button" onClick={() => props.setShowComponent(false)}>X</button>
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