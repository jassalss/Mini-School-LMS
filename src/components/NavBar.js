import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import history from "../history";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/latestnews"
              >
                Latest News
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/teachers"
              >
                Teachers
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/students"
              >
                Students
              </MenuItem>
            </Menu>
          </Hidden>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push("/")}
          >
            GNPSS School
          </Typography>
          <Hidden smDown>
            <Button color="inherit" component={RouterLink} to="/latestnews">
              Latest News
            </Button>
            <Button color="inherit" component={RouterLink} to="/teachers">
              Teachers
            </Button>
            <Button color="inherit" component={RouterLink} to="/students">
              Students
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
