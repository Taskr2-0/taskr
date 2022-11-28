import React, { useState } from "react";


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
        <form>
            <button>X</button>
            <h3>New Task Request</h3>
            <label>Title: <input type="text" onChange={(e) => handleChange(e, 'title')} /></label>
            <label>Description: <input type="text" onChange={(e) => handleChange(e, 'description')} /></label>
            <label>Priority: </label>
                <select onChange={(e) => handleChange(e, 'priority')}>
                    <option value=""> --Please set priority-- </option>
                    <option value={0}> Low </option>
                    <option value={1}> Medium </option>
                    <option value={2}> High </option>

                </select>
            <input type="submit" onClick={(e) => handleSubmit(e)}/>

        </form>

    return (
        <div className="ticketCreator">
            <h4>This is ticket creator</h4>
            {ticketForm}
        </div>
    )

};

export default TicketCreator;