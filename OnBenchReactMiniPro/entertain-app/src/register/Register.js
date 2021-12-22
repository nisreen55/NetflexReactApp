import React, { useContext, useRef, useState } from 'react'
import './Register.css';
import axios from 'axios';
import MoviesDisplay from '../MoviesDisplay';
import {Link, Route, useHistory} from 'react-router-dom';
import Nav from '../Nav';
import { Context, UserContext, UserProvider } from '../UserContext';


  
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useContext(UserContext);
    const [name, setName] = useState();
    const { user, logout } = useContext(UserContext);

    const handleStart = () => {
        setEmail(emailRef.current.value);

        console.log("in reigister from cont "+name);

        console.log("in reigister before dis "+emailRef.current.value);
    }
    
    const handleFinish = async (e) => {
        console.log("password first "+ passwordRef.current.value)
        if (email != null && passwordRef.current.value !== "") {
            e.preventDefault();
        
            setPassword(passwordRef.current.value);
        
            console.log("password : " + passwordRef.current.value);
            const axiosPayLoad = await axios.post('http://localhost:8080/new'
                , {
                    "email": email,
                    "password": passwordRef.current.value
                }
            );
            const axiosData = axiosPayLoad.data;
        
            console.log("axiosdata: ", axiosData);
            if (
                axiosData.email === email &&
                email != null &&
                passwordRef.current.value != null &&
                axiosData.password === passwordRef.current.value
            ) {
                login(email);
                console.log("***in reigister logg " + name);

                console.log("from routing " + email);
                history.push('/movies')
                console.log("after routing " + email);
            }

        }
        else { 
           
                console.log("please enter username/pass")

        }
    }
    const renderMovies = () => {
        if (user.auth) {
          return (
            <div>
            <UserProvider >
                <MoviesDisplay />
            </UserProvider>
        </div>
          );
        }
        
   }
    
    return (
    <div>
        <div className="register">
            
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create account.
                </p>
                {
                    !email ? (
                        <div className="input">
                            <input className="in" type="email" placeholder="email address" ref={emailRef}
                               // onChange={e => .setl.setCurrentuser(e.target.value)}
                            />
                                <button className="register__button"
                                    onClick={handleStart}>Get Started</button>
                        </div>
                    ):(
                        <form className="input">
                            <input className="in" type="password" placeholder="password" ref={passwordRef} />
                            <button className="register__button"
                                    onClick={handleFinish}>Start
                            </button>
                        </form>
                    )
                }
            </div>
        </div>
            { renderMovies}
    </div>
    )
}
export default Register;
