import axios from './axios';
import React, { useContext, useEffect, useState } from 'react';
import requests from './requests';
import { UserContext } from './UserContext';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);
    const [email, setEmail] = useState("");
    const [umovieid, setUmovieid] = useState("");
    const { user, logout } = useContext(UserContext);
   
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflexOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length -1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const handleUserList = async (e) => {
        e.preventDefault();
        setEmail(user.name);
        setUmovieid(movie.movieid);
        console.log(" banner , movie name :" + movie?.id);
        console.log("user is:" + user.name);
        
        const axiosPayLoad1 = await axios.post('http://localhost:8080/newuserlist'
            , {
                "email": user.name,
                "movieid": movie?.id,
                "movieurl": "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}",
                "movietitle": movie?.title,
                "moviename": movie?.name,
                "movieoriginalname": movie?.originalname,
            }
        );
        const axiosData1 = axiosPayLoad1.data;
        console.log("axiosdata for user movies list : ", axiosData1);
        console.log("movie url : ", movie?.backdrop_path);
    }
  
    return (
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                }}>
                <div className="banner__contents">
                    <h1 className="banner__title">{movie?.title || movie?.name || movie?.oroginal_name}</h1>
                    <div  className="banner__buttons" >
                    {/*<button
                           
                            className="banner__button" backgroundcolor="gray"
                            >Play
                        </button>*/}
                        <button
                           
                        className="banner__button"
                        onClick={handleUserList}
                            >Add To List
                        </button>
                    </div>
                    <h1 className="banner__description">
                        {truncate(movie?.overview, 150)}
                    </h1>
                </div>
            </header>
    )
}
export default Banner
