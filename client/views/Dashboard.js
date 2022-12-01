import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import TicketCreator from "./TicketCreator"

const Dashboard = (props) => {
    const [ taskArr, setTaskArray ] = useState(() => []);

    const [showComponent, setShowComponent] = useState(false);

    const [isArchive, setView] = useState(true);

    // if is_admin is true, make fetch request to admintickets end point
    // if is_admin is false, make fetch request to usertickets end point with id in header
    const route = (props.userDetails.is_admin) ? '/api/admintickets' : '/api/usertickets';
    console.log('props in dashboard: ', props);

    useEffect(() => {
        fetch(route, {
            method: 'GET',
            headers: {
                'id': props.userDetails.id
            }
        })
        .then(res => res.json())
        .then(data => {
            setTaskArray(() => data)
        })
    },[])

    function renderPageAfterUpdate() {
        fetch(route, {
            method: 'GET',
            headers: {
                'id': props.userDetails.id
            }
        })
                .then(res => res.json())
                .then(data => {
                    setTaskArray(() => data)
        })
    }

    console.log('this is task outside', taskArr)
        
    const newTaskArr = taskArr.sort((a, b) => b.priority - a.priority);
    const tickets = [];
    const completed =[];
    for (let i = 0; i < newTaskArr.length; i++) {
        if (taskArr[i].status == 'completed') {
            completed.push(<Ticket taskId={taskArr[i].id} 
                userId={taskArr[i].user_id}
                taskTitle={taskArr[i].title}
                taskDesc={taskArr[i].description}
                taskStatus={taskArr[i].status}
                taskPriority={taskArr[i].priority} 
                firstName={taskArr[i].first_name}
                lastName={taskArr[i].last_name} 
                isAdmin={props.userDetails.is_admin}
                renderPageAfterUpdate={renderPageAfterUpdate}
                userDetails={props.userDetails} 
                />)
        } else {
            tickets.push(<Ticket taskId={taskArr[i].id} 
                                 userId={taskArr[i].user_id}
                                 taskTitle={taskArr[i].title}
                                 taskDesc={taskArr[i].description}
                                 taskStatus={taskArr[i].status}
                                 taskPriority={taskArr[i].priority} 
                                 firstName={taskArr[i].first_name}
                                 lastName={taskArr[i].last_name} 
                                 isAdmin={props.userDetails.is_admin}
                                 renderPageAfterUpdate={renderPageAfterUpdate}
                                 userDetails={props.userDetails} 
                        />)

        }
    }
    console.log(tickets)


    return (
        <div className = "dashboard">
            {
                isArchive == false ? (
                    <div> 
                        <div className='headContainer'>   <h1 className='dashName'>Archive</h1>
                            <button id = 'showDashboard' className = 'toggleDash' onClick ={() => setView(true)}> Show Dashboard </button>
                        </div>
                            {completed}
                    </div>
                ) : (
                    <div> 
                        <div className='headContainer'> 
                        <h1 className='dashName'> Dashboard</h1>
                    <button id = 'showArchive' className = 'toggleDash' onClick ={() => setView(false)}> Show Archive </button>
                    </div>
                    {tickets}
                    </div>
                )

            }
            { props.userDetails.is_admin === 0 &&
                <div>
                    <button className="newRequest" onClick={() => setShowComponent(true)}>New Request</button>
                    {showComponent && <TicketCreator userDetails = {props.userDetails} renderPageAfterUpdate={renderPageAfterUpdate} setShowComponent={setShowComponent}/>}
                </div>
            }
        </div>
    )

};

export default Dashboard;