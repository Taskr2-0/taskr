import React, { useState } from "react";

const Authentication = (props) => {
    const [ inputValues, setInputValues ] = useState({
        firstName: '',
        lastName: '', 
        password: '', 
        email: '', 
        phoneNum: '',
        isAdmin: 0,
    });

    const [ formView, setFormView ] = useState('login');

    function toggleForm(e) {
        if (e.target.id === 'login') setFormView('login');
        else if (e.target.id === 'signup') setFormView('signup');
    } 

    // Sends a POST request to the '/api/signup' endpoint
    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type' : 'Application/JSON' },
            body: JSON.stringify(inputValues),
        })
        .then(() => {
            setInputValues({
            firstName: '',
            lastName: '', 
            password: '', 
            email: '', 
            phoneNum: '',
            isAdmin: 0,
        });
        props.logIn();
    });

    }

    // Send a POST request to the 'api/login' endpoint
    function handleSignin(e) {
        e.preventDefault();
        fetch('api/login', {
            method: 'POST',
            headers: { 'Content-Type' : 'Application/JSON' },
            body: JSON.stringify( {email: inputValues.email, password: inputValues.password})
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.err) {
                const {id, first_name, last_name, email, is_admin} = data;
                props.updateUser({
                    id: id,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    is_admin: is_admin,
                });
                props.logIn();
            };
        });
    };

    // Changes the state based on user input
    function handleChange(e, updatedVal) {
        const updatedInputVal = { [updatedVal] : e.target.value }
        const updatedState = {
            ...inputValues,
            ...updatedInputVal,
        };
        setInputValues(updatedState);
    }

 
    // If user presses Sign Up button, render this form
    const signUpForm = <form>
        <label> First Name: <input type="text" onChange={(e) => handleChange(e, 'firstName')}/></label>
        <label> Last Name: <input type="text" onChange={(e) => handleChange(e, 'lastName')}/></label>
        <label> Password: <input type="password"  onChange={(e) => handleChange(e, 'password')}/></label>
        <label> Email: <input type="email"  onChange={(e) => handleChange(e, 'email')}/></label>
        <label> Phone Number: <input type="tel" onChange={(e) => handleChange(e, 'phoneNum')}/></label>
      {/* Drowndown Menu for isAdmin */}
        <label> Type of User: </label>
        <select onChange={(e) => handleChange(e, 'isAdmin')}>
            <option value=""> --Please select an option-- </option>
            <option value={1}> Admin </option>
            <option value={0}> User </option>
        </select>
        <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)}/>
    </form>

    // If the user presses login, render this form
    const loginForm = <form>
        <label> Email: <input type="email"  onChange={(e) => handleChange(e, 'email')}/></label>
        <label> Password: <input type="password"  onChange={(e) => handleChange(e, 'password')}/></label>
        <input type="submit" value="Sign In" onClick={(e) => handleSignin(e)}/>
    </form>

    const renderView = (formView === 'login') ? loginForm : signUpForm;

    return (
        <div className="authentication">
            <button id = 'signup' onClick={toggleForm}> Sign Up </button>
            <button id = 'login' onClick={toggleForm}> Login </button>
            {renderView}
        </div>
    )

};

export default Authentication;