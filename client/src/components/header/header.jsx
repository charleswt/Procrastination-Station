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

    // STRIPE FETCH //
    useEffect(() => {
        if(!Auth.checkExpiration){
            Auth.logout;
            alert(`Session Expired! Please login to save scores.`)
        } 
        const donateStripeButton = document.querySelector('#donateStripe');
        if (donateStripeButton) {
            donateStripeButton.addEventListener('click', () => {
                fetch("http://localhost:3001/create-checkout-session", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        items: [
                            { id: 1, quantity: 1 },
                        ]
                    })
                }).then(res => {
                    if (res.ok) return res.json();
                    return res.json().then(json => Promise.reject(json));
                }).then(({ url }) => {
                    window.location = url;
                }).catch(e => {
                    console.log(e.error);
                });
            });
        }
    }, []);

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
        document.body.style.overflowY = 'hidden';
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
        document.body.style.overflowY = 'auto';
    };

    {/**Animated text */}

    const [indexNum, setIndexNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const time = 2000; // amount of time between words
    const brand = ["Procrastination Station"]
    const [delta, setDelta] = useState(300 -Math.random() * 100) // how fast each letter is typed

    useEffect(()=> {
        let ticker= setInterval(()=>{
            tick();
        }, delta)

        return ()=>{ clearInterval(ticker)}
    }, [text])

    const tick = () => {
        let i = indexNum % brand.length;
        let fullText = brand[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length-1) : fullText.substring(0, text.length + 1)

        setText(updatedText);

        if (isDeleting){
            setDelta(prevDelta => prevDelta /2)
        }

        if (!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(time);
        } else if (isDeleting && updatedText === ''){
            setIsDeleting(false);
            setIndexNum(indexNum +1 );
            setDelta(500);
        }
    }

    const logoHome = () => {
        if (window.location.pathname === '/') {
            window.scrollTo(0, 0);
        } else {
            window.location.href = '/';
        }
    };

    return (
        <>
            <header>
                <img onClick={logoHome} src="../../../public/images/logo.webp" alt="logo" className="header-logo"/>
                        <p className='header-tag'>{text}</p>
                        <p id='donateStripe' className='header-donate header-elem-position'>Donate</p>
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