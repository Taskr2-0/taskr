import React from "react";


const Ticket = (props) => {
    return (
        <div className="ticketCard">
            <h3 className="taskTitle">{props.taskTitle}</h3>
            <div className="taskDesc">Task Description: {props.taskDesc}</div>
            <div className="taskStatus">Status: {props.taskStatus}</div>
            <div className="taskPriority">Priority: {props.taskPriority}</div>
        </div>
    )

};

export default Ticket;