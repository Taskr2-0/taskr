import React from "react";

// Tickets are rendered by the Dashboard component when client is logged in. Ticket renders conditionally based on if client is user or admin.
// If client is user, sees current status as a static div and an option to delete the ticket
// If client is admin, sees status as a clickable button that allows them to update the ticket's status
const Ticket = (props) => {

    // Lets admin update the status of a ticket by sending PATCH request to database to update ticket status based on client input
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
        }).then((data) => {
            console.log(data)
            props.renderPageAfterUpdate();
        })
    }

    // Lets (non-admin) user delete a ticket when they click on the delete button by sending a DELETE request to database
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

    // Conditionally sets class names of status divs so that they can be styled according to the ticket's current status.
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
            {/* If the user is an admin, they are going to see everyone's tickets, so we render the name of the ticket request */}
            {(props.isAdmin == 1) && <div className="taskAuthor">Requested By: {props.firstName} {props.lastName}</div>}
            <div className="taskDesc">Task Description: {props.taskDesc}</div>
            <div className="taskStatus">Status: {props.taskStatus}</div>
            <div className="taskPriority">Priority: {props.taskPriority}</div>
            {
                // If the client is an admin, ticket renders status divs as clickable buttons with event listeners that fire the updateStatus
                // function, so that clicking on the status updates the ticket status in the database
                props.isAdmin === 1 ? (
                    <div className="ticket-status-btns">
                        <button onClick={updateStatus} className="ticket-status pending-btn" value="pending" >Pending</button>
                        <button onClick={updateStatus} className="ticket-status inprogress-btn" value="inprogress" >In Progress</button>
                        <button onClick={updateStatus} className="ticket-status completed-btn" value="completed" >Completed</button>
                    </div>
                ) : (
                    // If the user is *not* an admin, the user sees divs (not buttons) styled based on the ticket's current status
                    <>
                        <div className="status-bar-wrapper">
                            <div className={`status-bar ${pendingClass}`}> Pending Receipt </div>
                            <div className="status-string"></div>
                            <div className={`status-bar ${inProgressClass}`}> In Progress </div>
                            <div className="status-string"></div>
                            <div className={`status-bar ${completedClass}`}> Completed </div>
                        </div>
                        {/* If the user is not an admin, sees a button allowing them to delete the ticket */}
                        <button className="delete-btn" onClick={deleteTicket}> DELETE </button>
                    </>

                )
            }
        </div>
    )
};
export default Ticket;