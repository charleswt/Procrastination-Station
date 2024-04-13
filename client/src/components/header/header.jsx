import React, { useState, useEffect } from 'react';
import '../../../public/css/style.css';

export default function Header() {

    // signin

    const [loginState, setLoginState] = useState({ username: '', password: '' });
    

    // signup


    // modal open/close/change and animation
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    const toggleLogin = () => {
        setLogin(!login);
    };  

    const toggleSignup = () => {
        setSignup(!signup);
        setLogin(false);
    };    

    useEffect(() => {
        if (login || signup) {
            cardAnimation();
        }
    }, [login, signup]);

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

                


            {/* TOMPORARY FOR DESIGN */}
            <header>
                <img src="./public/images/logo.webp" alt="logo" className="header-logo" />
                <div className='header-flex-direction'>
                        <p className='header-tag header-elem-position'>Procrastination Station</p>
                        <p className='header-donate header-elem-position'>Donate</p>
                        <p className='header-login header-elem-position' onClick={toggleLogin}>Login</p>
                </div>
            </header>


                    
                        {/* FOR ACTUAL USE */}
            {/* <header>
            {isLoggedIn ? ( 
                        <button onClick={toggleLogout}>Logout</button>
                    ) : ( 
                        <button onClick={toggleLogin}>Login</button>
                    )}
            </header> */}

            {login &&
                <>
                    <div className="blur-back" onClick={closeLogin}></div>
                    <div className="login-card">
                        <p className='exit-btn' onClick={closeLogin}>X</p>
                        <div className="card-elem-pos">
                            <h2 className="loginout-title">Login</h2>

                            <p className="input-example">Username :</p>
                            <input type="text" className="loginout-input-style email-input"></input>

                            <p className="input-example">Password :</p>
                            <input type="text" className="loginout-input-style password-input"></input>
                            <button id="signIn">Login</button>
                            <p>Don't have an account? <a id="signInForm" onClick={toggleSignup}>Sign Up</a></p>
                        </div>
                    </div>
                </>
            }
           
            {signup &&
                <> 
                    <div className="blur-back" onClick={closeLogin}></div>
                    <div className="login-card">
                        <p className='exit-btn' onClick={closeLogin}>X</p>
                        <div className="card-elem-pos">
                            <h2 className="loginout-title">Sign Up</h2>

                            <p className="input-example">Username :</p>
                            <input type="text" className="loginout-input-style email-input"></input>
                    
                            <p className="input-example">Password :</p>    
                            <input type="text" className="loginout-input-style password-input"></input>  
                            <button id="signUp">Sign Up</button>
                        </div>
                    </div>
                </> 
            }
        </>
    );
}