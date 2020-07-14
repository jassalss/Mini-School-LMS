import React, { Component } from "react";
import { fetchClassNames } from "../../actions/index";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import ClassIcon from "@material-ui/icons/Class";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Link,
} from "@material-ui/core";
const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
});
class Teachers extends Component {
  state = { isAuthenticated: false, selectedClass: "" };
  componentDidMount() {
    var password = window.prompt("Please enter password");
    if (password === "amarjit007" || password === "Amarjit007") {
      this.setState({ isAuthenticated: true });
    }
    if (this.props.classNames.length === 0) {
      this.props.fetchClassNames();
    }
  }
  getClassesNames = () => {
    this.setState({ showClasses: true });
  };
  getOptions = (curr) => {
    this.setState({ selectedClass: curr, showClasses: false });
  };
  showTheList = () => {
    let array = this.props.classNames;
    if (array.length > 0) {
      return array.map((curr, index) => {
        return (
          <ListItem
            key={index}
            button
            onClick={() => {
              this.getOptions(curr);
            }}
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={curr} />
          </ListItem>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  };
  addLinksForHomeWork = () => {
    let seletedClass = this.state.selectedClass;
    if (seletedClass) {
      return (
        <Box mt={3}>
          <Box>
            <Link
              component={RouterLink}
              variant="h5"
              to={`addhomeWork/${seletedClass}`}
              color="secondary"
            >
              Add HomeWork
            </Link>
          </Box>
          <Box>
            <Link
              component={RouterLink}
              color="secondary"
              variant="h5"
              to={`classhomeWork/`}
            >
              Previous HomeWork
            </Link>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box mt={3}>
          <Box>
            <Link
              component={RouterLink}
              color="secondary"
              variant="h5"
              to={`classhomeWork/`}
            >
              Previous HomeWork
            </Link>
          </Box>
        </Box>
      );
    }
  };
  displayListOfClasses = () => {
    //const { classes } = this.props;
    return (
      <div>
        <Box m={1} p={1} width="100%" bgcolor="background.paper">
          <TextField
            onClick={this.getClassesNames}
            variant="outlined"
            color="secondary"
            value={this.state.selectedClass}
            autoComplete="class Name"
            required
            name="className"
            fullWidth
            id="className"
            label="class Name"
            autoFocus
          />
        </Box>
        <Box>
          <List
            component="nav"
            style={{ maxHeight: 400, overflow: "auto", width: "100%" }}
          >
            {this.state.showClasses ? this.showTheList() : ""}
          </List>
        </Box>
        <Box display="flex" justifyContent="center">
          {this.addLinksForHomeWork()}
        </Box>
      </div>
    );
  };
  mainRenderContent = () => {
    return (
      <Box width="100%">
        <Box mt={3} display="flex" justifyContent="center">
          <Typography variant="h5"> Select class</Typography>
        </Box>
        <Box>{this.displayListOfClasses()}</Box>
      </Box>
    );
  };
  afterAuthentication = () => {
    if (this.state.isAuthenticated) {
      return this.mainRenderContent();
    } else {
      return (
        <Typography variant="h6">
          {" "}
          Please enter correct password. Otherwise Go Back You are not teacher.
        </Typography>
      );
    }
  };
  render() {
    return this.afterAuthentication();
  }
}
const mapStateToProps = (state) => {
  return { classNames: Object.values(state.classesInfo.classNames) };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { fetchClassNames })
)(Teachers);
