import './Login.css';
import {Link, Route, useHistory} from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { UserContext, UserProvider } from '../UserContext';
import axios from 'axios';
import MoviesDisplay from '../MoviesDisplay';
import Register from '../register/Register';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const { user, setUser } = useContext(UserContext);
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useContext(UserContext);
    const [name, setName] = useState();
      
    const handleFinish = async (e) => {
        if (emailRef.current.value != null &&  passwordRef.current.value != null) {
            e.preventDefault();
            setEmail(emailRef.current.value);
            console.log(emailRef.current.value);
            console.log("from context " + user);
            setPassword(passwordRef.current.value);
            console.log(passwordRef.current.value);
            const axiosPayLoad = await axios.post('http://localhost:8080/user'
                , {
                    "email": emailRef.current.value,
                    "password": passwordRef.current.value
                }
            );
            const axiosData = axiosPayLoad.data;
        
            console.log("axiosdata: ", axiosData);
            if (axiosData.email != null && axiosData.password != null
                && emailRef.current.value && passwordRef.current.value
                && axiosData.email == emailRef.current.value
                && axiosData.password == passwordRef.current.value
                ) {
                    login(emailRef.current.value);

                <Route exact path='/moviesdisplay'
                    component={() => <MoviesDisplay />}
                />
                history.push('/movies')
            }
            
        }
    }

    return (
        <div className="login">
            <div className="top">
            
            </div>
            <div className="container">
                <form class="form">
                    <h1>Sign In</h1>
                    <input className="inold" type="email" placeholder="Email or phone number" ref={emailRef}/>
                    <input className="inold" type="password" placeholder="Password" ref={passwordRef}/>
                                <button className="login__button"
                        onClick={ handleFinish } >
                        Sign In
                    </button>
                    <span className="sp">New to Netflex?
                        <b>Sign up now.</b>
                    </span>
                    <small>
                            This page is protected by Google reCAPTICHA to ensure you're not a bot.
                            <b>Learn more</b>.
                    </small>
                </form>
                
            </div>
            <div>
           
        </div>
        </div>
    )
}
export default Login;
