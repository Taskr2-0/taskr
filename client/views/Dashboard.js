import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";

const Dashboard = (props) => {
    const [ taskArr, setTaskArray ] = useState(() => []);

    // if is_admin is true, make fetch request to admintickets end point
    // if (props.userDetails.is_admin === true) {
        useEffect(() => {
            fetch('/api/admintickets')
                .then(res => res.json())
                .then(data => {
                    setTaskArray(() => data)
                })
        },[])

    // }
    console.log('this is task outside', taskArr)

    // if is_admin is false, make fetch request to usertickets end point with id in header
    
    const tickets = [];
    for (let i = 0; i < taskArr.length; i++) {
        tickets.push(<Ticket taskId={taskArr[i].id} 
                             userId={taskArr[i].user_id}
                             taskTitle={taskArr[i].title}
                             taskDesc={taskArr[i].description}
                             taskStatus={taskArr[i].status}
                             taskPriority={taskArr[i].priority}   
                    />)
    }
    console.log(tickets)

    return (
        <div className = "dashboard">
            <h1>Dashboard</h1>
            {tickets}
        </div>
    )

};

export default Dashboard;