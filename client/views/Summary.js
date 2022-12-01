import React from "react";

// Summary is a presentational component that displays a summary of the Taskr app
const Summary = () => {

    return (
        <div className="summary">
            <h3>Taskr</h3>
            <p> <b>Taskr</b> is a task management help to facilitate better communication between the folks who need help and the folks who can provide it!
                Sign up a User or, if you have a verification code, as an Admin. <br>
                </br><br>
                </br>
                <strong>Users</strong> can create new tickets, view tickets they've created, keep up to date on
                the status of pending requests, and delete tickets for tasks they no longer need help with.<br>
                </br><br>
                </br> 
                <strong>Admins</strong> can view all tickets any user has created,
                see the author of a particular ticket, and update the status of a ticket when they have begun or completed work on the task. Keep your team apprised of what's
                getting done with <b>Taskr!</b>
            </p>
        </div>
    )

};

export default Summary;