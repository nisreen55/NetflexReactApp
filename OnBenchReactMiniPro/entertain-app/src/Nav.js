import React, {  useContext, useState } from 'react';
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import netflex from './img/netflex.jpg';
import netflixlogo from './img/netflix-logo.jpg';
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';
import './Nav.css';

const useStyles = makeStyles((theme) => ({
    bkcolor: {
      backgroundColor: "black",
    },
    grow: {
      flexGrow: 1,
      backgroundColor: "black",
      display: "flex",
      alignitems: "center",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }));

function Nav() {
  const [show, handleShow] = useState(false);

  const classes = useStyles();
  const [addProjectEl, setAddProjectEl] = React.useState(null);
  const [logoutEl, setLogoutEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [aboutEl, setAboutEl] = React.useState(false);
  const isMenuOpen = Boolean(addProjectEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { user, logout } = useContext(UserContext);

  const handleAddProjectMenuOpen = (event) => {
    setAddProjectEl(event.currentTarget);
    console.log("Printing from handleProfile : ", addProjectEl);
  };

  const handleMobileMenuClose = () => {
    //setMobileMoreAnchorEl(null);
  };
    
  const handleMenuClose = () => {
    setAddProjectEl(null);
    handleMobileMenuClose();
  };
    
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
    
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={addProjectEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
          
    </Menu>
  );
    
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
          
          
      <MenuItem onClick={handleAddProjectMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );
    
   const renderList = () => {
     if (user.auth) {
       return (
         <div className="topNavBarLinks">
            <div className="topNavBarContainer">
                <Link to='/viewuserlist' style={{ color: "white" }}>
                  <span className="toplink">View List</span>
                </Link>
                <Link to='/moviesdisplay' style={{ color: "white" }}>
                  <span className="toplink">Movies</span>
                </Link>
                <Link to='/logout' style={{ color: "white" }}>
                  <span className="toplink"  onClick={logout}>Logout</span>
                </Link>
           </div>
        </div>
       );
     }
     else { 
      return (
        <div className="topNavBarLinks">
          <Link to='/login' style={{ color: "white" }}><span className="toplink">Login</span> </Link>
          <Link to='/register' style={{ color: "white" }}><span className="toplink">Register</span>                 </Link>
        </div>
      );
     }
}
  return (
      <div>
        <div className={`nav ${show && "nav__black"}`}>
      </div>
      <div className={classes.grow}>
        <AppBar  position="static"  className={classes.bkcolor} >
          <Toolbar>
            <br />
            <div className="topNavBarLeft">
              <img src={netflex} width="150px" height="50px" alt="" />
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}    />
            </div>
            <div className="topNavBarContainer">
              {renderList()}
              <div><h6>Hello, {user.name}!</h6></div>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleAddProjectMenuOpen}
                color="inherit"      >
                <img
                  className="topLogoImg"
                  src={netflixlogo}
                  width="60px"
                  height="60px"
                  alt=""
                />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"   >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      </div>
    )
}
export default Nav
