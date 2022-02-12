import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Drawers(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
      className={!props.open ? "active" : ""}
    >
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {props.currentUser.name && (
          <ListItem>
            <Link
              to="/account"
              className="ac-d"
              onClick={props.handleDrawerClose}
            >
              <img
                src={`${process.env.REACT_APP_APP_URL}/img/users/${props.currentUser.photo}`}
                alt="User photo"
                className="nav__user-img"
              />
              <span>{props.currentUser.name}</span>
            </Link>
          </ListItem>
        )}
        <ListItem button className="ac-d">
          <Link to="/" onClick={props.handleDrawerClose}>
            All tours
          </Link>
        </ListItem>
        <Divider />
        {props.currentUser.name && (
          <ListItem
            button
            onClick={() => {
              props.logoutHandler();
              props.handleDrawerClose();
            }}
            className="ac-d"
          >
            <button>Logout</button>
          </ListItem>
        )}
        {!props.currentUser.name && (
          <>
            <ListItem button className="ac-d">
              <Link to={"/login"} onClick={props.handleDrawerClose}>
                Log in
              </Link>
            </ListItem>
            <Divider />
            <ListItem className="ac-d">
              <Link to={"/signup"} onClick={props.handleDrawerClose}>
                Sign up
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}

{
  /* <nav className="mobNav">
  <nav className="nav ">
    <Link to="/" className="nav__el">
      All tours
    </Link>
    {currentUser.name && (
      <>
        <button className="nav__el" onClick={logoutHandler}>
          Logout
        </button>
        <Link to="/account" className="nav__el">
          <img
            src={`${process.env.REACT_APP_APP_URL}/img/users/${currentUser.photo}`}
            alt="User photo"
            className="nav__user-img"
          />
          <span>{currentUser.name}</span>
        </Link>
      </>
    )}
    {!currentUser.name && (
      <>
        <Link to={"/login"} className="nav__el">
          Log in
        </Link>
        <Link to={"/signup"} className="nav__el nav__el--cta">
          Sign up
        </Link>
      </>
    )}
  </nav>
</nav>; */
}

export default Drawers;
