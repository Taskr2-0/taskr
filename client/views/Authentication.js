import React, { useState, useEffect } from "react";
import Header from "./Header";

const Authentication = (props) => {
    const [ inputValues, setInputValues ] = useState({
        firstName: '',
        lastName: '', 
        password: '', 
        email: '', 
        phoneNum: '',
        isAdmin: 0,
        adminCode: ''
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
        // If SignUp details are rejected, the app does not redirect to the MainPage
        .then(res => res.json())
        .then(data => {
            if (data.status !== 400) {
                const { id, first_name, last_name, email, is_admin } = data;
                props.updateUser({
                    id: id,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    is_admin: is_admin,
                });
                props.logIn();
            }
            else console.log('INSUFFICIENT SIGNUP')
        })
        .then(() => {
            setInputValues({
            firstName: '',
            lastName: '', 
            password: '', 
            email: '', 
            phoneNum: '',
            isAdmin: 0,
            adminCode: ''
            });
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
            console.log('LOGIN DATA', data);
            if (!data.err && data.email !== '' && data.password !== '') {
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
    let code;
    function handleChange(e, updatedVal) {
        const updatedInputVal = { [updatedVal] : e.target.value }

        const updatedState = {
            ...inputValues,
            ...updatedInputVal,
        };
        setInputValues(updatedState);
    }


    // If user presses Sign Up button, render this form
    const signUpForm = <div className="authentication-form">
        <form >
            <input type="text" placeholder="First Name" onChange={(e) => handleChange(e, 'firstName')}/>
            <input type="text" placeholder="Last Name" onChange={(e) => handleChange(e, 'lastName')}/>
            <input type="password"  placeholder="Password" onChange={(e) => handleChange(e, 'password')}/>
            <input type="email"  placeholder="E-mail" onChange={(e) => handleChange(e, 'email')}/>
            <input type="tel" placeholder="Phone Number" onChange={(e) => handleChange(e, 'phoneNum')}/>
        {/* Drowndown Menu for isAdmin */}
            <select onChange={(e) => handleChange(e, 'isAdmin')}>
                <option value=""> --Please select an option-- </option>
                <option value={1}> Admin </option>
                <option value={0}> User </option>
            </select>
            <input type="code" placeholder="Enter Admin Code" className={inputValues.isAdmin == 1 ? '' : 'hideCode'} onChange={(e) => handleChange(e, 'adminCode')}/>
            <input id="signup-submit" type="submit" value="Create Account" onClick={(e) => handleSubmit(e)}/>
        </form>
    </div>
     

    // If the user presses login, render this form
    const loginForm = <div className="authentication-form" >
        <form>
            <input type="email" placeholder="E-mail" onChange={(e) => handleChange(e, 'email')}/>
            <input type="password" placeholder="Password"  onChange={(e) => handleChange(e, 'password')}/>
            <input id="login-submit" type="submit" value="Log In" onClick={(e) => handleSignin(e)}/>
        </form>
    </div>

    
    const renderView = (formView === 'login') ? loginForm : signUpForm;
    const signUpClass = (formView === 'signup') ? "auth-selected" : "";
    const logInClass = (formView === 'login') ? "auth-selected" : "";

    return (
     
     <div className="authentication">
            
            <div className="authentication-btns">
            <button id = 'signup' className={`auth-btn ${signUpClass}`} onClick={toggleForm}> Sign Up </button>
            <button id = 'login' className={`auth-btn ${logInClass}`} onClick={toggleForm}> Login </button>
            </div>
           {renderView}
     </div>
        
    )

};


export default Authentication;