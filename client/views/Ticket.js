import React from "react";
const Ticket = (props) => {
    function updateStatus(e) {
        const newStatus = e.target.value;
        console.log(newStatus);
        fetch('/api/admintickets', {
            method: 'PATCH',
            headers: { 'Content-Type' : 'Application/JSON' },
            body: JSON.stringify({
                newStatus: newStatus,
                ticketId: props.taskId
            }),
        }).then(() => {
            props.renderPageAfterUpdate();
        })
    }

    function deleteTicket() {
        // props.taskId 
        fetch('/api/usertickets', {
            method: 'DELETE',
            headers: { 'Content-Type' : 'Application/JSON' },
            body: JSON.stringify({
                ticketId: props.taskId
            }),
        }).then(() => {
            props.renderPageAfterUpdate();
        });
    }
    return (
        <div className="ticketCard">
            <h3 className="taskTitle">{props.taskTitle}</h3>
            <p className="taskCreator">Task Creator: {props.userDetails.first_name} {props.userDetails.last_name}</p>
            <div className="taskDesc">Task Description: {props.taskDesc}</div>
            <div className="taskStatus">Status: {props.taskStatus}</div>
            <div className="taskPriority">Priority: {props.taskPriority}</div>
            {
                props.isAdmin === 1 ? (
                    <div>
                        <button onClick={updateStatus} className="ticket-status pending-btn" value="pending" >Pending</button>
                        <button onClick={updateStatus} className="ticket-status inprogress-btn" value="inprogress" >In Progress</button>
                        <button onClick={updateStatus} className="ticket-status completed-btn" value="completed" >Completed</button>
                    </div>
                ) : (
                    <div>
                        <div> - </div>
                        <div> - </div>
                        <div> - </div>
                        <button className="delete-btn" onClick={deleteTicket}> DELETE </button>
                    </div>

                )
            }
        </div>
    )
};
export default Ticket;