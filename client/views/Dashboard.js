import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";

const Dashboard = () => {
    const [ taskArr, setTaskArray ] = useState(() => []);
    useEffect(() => {
        fetch('/api/admintickets')
            .then(res => res.json())
            .then(data => {
                setTaskArray(() => data)
            })
    },[])
    console.log('this is task outside', taskArr)
    
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