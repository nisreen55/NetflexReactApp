import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import { Card } from "react-bootstrap";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewUserlist.css';

function ViewUserlist() {
    const [email, setEmail] = useState("");
    const [movie, setMovie] = useState([]);
    const { user, logout } = useContext(UserContext);
    const [umovieid, setUmovieid] = useState("");
    const [open, setOpen] = React.useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    function handleRemoveClick(mo) {
      setShowConfirm(false);
      handleDelUserList(mo);
    };

   useEffect(() => {
      async function axiosFetcher() {
        const axiosPayLoad = await axios.post('http://localhost:8080/userlist'
          , {"email": user.name   }
        );
        setMovie( axiosPayLoad.data);
        const axiosData = axiosPayLoad.data;
        console.log("axiosdata: ", axiosData);
      }
      axiosFetcher();
    } , []);
  
    const handleDelUserList = async ( mo) => {
      setEmail(user.name);
      setUmovieid(movie.movieid);
      const axiosPayLoad1 = await axios.post('http://localhost:8080/deleteuserlist'
        , {
          "email": user.name,
          "movieid":mo,
         
        }
      );
      const axiosData1 = axiosPayLoad1.data;
      console.log("axiosdata for user movies list : ", axiosData1);
      axiosFetcher();
    }
    async function axiosFetcher() {
      const axiosPayLoad = await axios.post('http://localhost:8080/userlist'
       , {"email": user.name   }
      );
      setMovie( axiosPayLoad.data);
      const axiosData = axiosPayLoad.data;
      console.log("axiosdata: ", axiosData);
    }
    const fetchData = movie.map((data, i) => {
      return (
        <Card className="m-4" key={data.movieid} style={{
          width: "20rem",
          backgroundcolor: "gray"
          }}>
          <CardContent>
            <Typography
              style={{ fontSize: 14 }}
              color="textSecondary"
              gutterBottom
            >
            My Movies
            </Typography>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}            >
              <Alert onClose={handleClose} severity="success">
                Record saved successfully!
              </Alert>
            </Snackbar>
            
            <Card.Body>
              <Card.Title>{data.movieid}</Card.Title>
              <Card.Text >{data.movietitle}</Card.Text>
              <Card.Text >{data.moviename}</Card.Text>
              <Card.Text >{data.movieoriginalname}</Card.Text>
              <Card.Text >{data.genres}</Card.Text>

              <button className="banner__button"
                size="small"
                onClick={() => handleRemoveClick(data.movieid)}>
                <DeleteOutlineIcon />
              </button>
            </Card.Body>
          </CardContent>
        </Card>
      );
    });
    return (
        <div>
        {fetchData}
      </div>
    )
}
export default ViewUserlist;
