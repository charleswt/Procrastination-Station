import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import '../../../public/css/style.css';

export default function Header() {
    const isLoggedIn = Auth.getToken();
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login] = useMutation(LOGIN_USER);
    const [signUp] = useMutation(ADD_USER);
    const [loginForm, setLogin] = useState(false);
    const [signupForm, setSignup] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleLoginFormSubmit = async event => {
        event.preventDefault();
        
            const { data } = await login({
                variables: { ...formState },
            });
            console.log(data)
            Auth.login(data.login.token);
        
    };

    const handleSignupFormSubmit = async event => {
        event.preventDefault();
            const { data } = await signUp({
                variables: { ...formState },
            });
             //when grabbing token from data make sure you are referencing resolvers in server utils
            Auth.login(data.addUser.token);
    };

    const toggleLogin = () => {
        setLogin(!loginForm);
    };

    const toggleSignup = () => {
        setSignup(!signupForm);
        setLogin(false);
    };

    useEffect(() => {
        if (loginForm || signupForm) {
            cardAnimation();
        }
    }, [loginForm, signupForm]);

    const cardAnimation = () => {
        const blurBack = document.querySelector(".blur-back");
        const loginCard = document.querySelector(".login-card");
      
        if (document.documentElement.clientWidth <= 700) {
          loginCard.style.top = "20%";
        } else {
          loginCard.style.top = "30%";
        }
        let blurAmount = 0;
        const targetBlur = 10;
        const duration = 1000;
        const interval = 10;
        const increment = (targetBlur - blurAmount) / (duration / interval);
        
        const blurInterval = setInterval(function () {
          blurAmount += increment;
          blurBack.style.backdropFilter = "blur(" + blurAmount + "px)";
      
          if (Math.abs(blurAmount - targetBlur) < Math.abs(increment)) {
            clearInterval(blurInterval);
          }
        }, interval);
    };

    const closeLogin = () => {
        setLogin(false);
        setSignup(false);
    };

    return (
        <>
            <header>
                <img src="./public/images/logo.webp" alt="logo" className="header-logo" />
                        <p className='header-tag'>Procrastination Station</p>
                        <p className='header-donate header-elem-position'>Donate</p>
                        {isLoggedIn ? ( 
                        <p className='header-login header-elem-position' onClick={Auth.logout}>Logout</p>
                    ) : ( 
                        <p className='header-login header-elem-position' onClick={toggleLogin}>Login</p>
                    )}
            </header>

            {loginForm &&
                <>
                    <div className="blur-back" onClick={closeLogin}></div>
                    <div className="login-card">
                        <p className='exit-btn' onClick={closeLogin}>X</p>
                        <div className="card-elem-pos">
                            <h2 className="loginout-title">Login</h2>

                            <p className="input-example">Username :</p>
                            <input className="loginout-input-style email-input"
                            placeholder="Your username"
                            name="username"
                            type="username"
                            value={formState.username}
                            onChange={handleChange}/>

                            <p className="input-example">Password :</p>    
                            <input className="loginout-input-style password-input"
                            placeholder="******"
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}/>
                            <button id="signIn" onClick={handleLoginFormSubmit}>Login</button>
                            <p>Don't have an account? <a id="signInForm" onClick={toggleSignup}>Sign Up</a></p>
                        </div>
                    </div>
                </>
            }
           
            {signupForm &&
            <>
                    <div className="blur-back" onClick={closeLogin}></div>
                    <div className="login-card">
                        <p className='exit-btn' onClick={closeLogin}>X</p>
                        <div className="card-elem-pos">
                            <h2 className="loginout-title">Sign Up</h2>

                            <p className="input-example">Username :</p>
                            <input className="loginout-input-style email-input"
                            placeholder="Your username"
                            name="username"
                            type="username"
                            value={formState.username}
                            onChange={handleChange}/>
                    
                            <p className="input-example">Password :</p>    
                            <input className="loginout-input-style password-input"
                            placeholder="******"
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}/>  
                            <button id="signUp" onClick={handleSignupFormSubmit}>Sign Up</button>
                        </div>
                    </div>
                    </>
            }
        </>
    );
}