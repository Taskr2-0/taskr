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

    let pendingClass, inProgressClass, completedClass, ticketCardStatus;

    if (props.taskStatus === 'pending') {
        pendingClass = "status-checked";
        inProgressClass = "";
        completedClass = "";
        ticketCardStatus = "ticketCardPending";
    } else if (props.taskStatus === 'inprogress') {
        pendingClass = "status-checked";
        inProgressClass = "status-checked";
        completedClass = "";
        ticketCardStatus = "ticketCardInProgress";
    } else if (props.taskStatus === 'completed') {
        pendingClass = "status-checked";
        inProgressClass = "status-checked";
        completedClass = "status-checked";
        ticketCardStatus = "ticketCardCompleted";
    }

    return (
        <div className={`ticketCard ${ticketCardStatus}`}>
            <h3 className="taskTitle">{props.taskTitle}</h3>
            <div className="taskDesc">Task Description: {props.taskDesc}</div>
            <div className="taskStatus">Status: {props.taskStatus}</div>
            <div className="taskPriority">Priority: {props.taskPriority}</div>
            {
                props.isAdmin === 1 ? (
                    <div className="ticket-status-btns">
                        <button onClick={updateStatus} className="ticket-status pending-btn" value="pending" >Pending</button>
                        <button onClick={updateStatus} className="ticket-status inprogress-btn" value="inprogress" >In Progress</button>
                        <button onClick={updateStatus} className="ticket-status completed-btn" value="completed" >Completed</button>
                    </div>
                ) : (
                    <>
                        <div className="status-bar-wrapper">
                            <div className={`status-bar ${pendingClass}`}> Pending Receipt </div>
                            <div className="status-string"></div>
                            <div className={`status-bar ${inProgressClass}`}> In Progress </div>
                            <div className="status-string"></div>
                            <div className={`status-bar ${completedClass}`}> Completed </div>
                        </div>
                        <button className="delete-btn" onClick={deleteTicket}> DELETE </button>
                    </>

                )
            }
        </div>
    )
};
export default Ticket;