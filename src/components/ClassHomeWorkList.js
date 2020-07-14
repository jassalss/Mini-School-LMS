import React, { Component } from "react";
import { fetchClassNames, fetchSubjectNames } from "../actions/index";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Link,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import ClassIcon from "@material-ui/icons/Class";
import { Link as RouterLink } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
});
class ClassHomeWorkList extends Component {
  state = { showClasses: false, selectedSubject: "", selectedClass: "" };
  componentDidMount() {
    if (this.props.classNames.length === 0) {
      this.props.fetchClassNames();
      this.props.fetchSubjectNames();
    }
    if (this.props.subjectNames.length === 0) {
      this.props.fetchSubjectNames();
    }
  }
  getOptions = (curr) => {
    this.setState({ selectedClass: curr, showClasses: false });
  };

  getClassesNames = () => {
    this.setState({ showClasses: true });
  };
  handleRadioChange = (event) => {
    this.setState({ selectedSubject: event.target.value });
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
  linkForHomeWork = () => {
    let seletedClass = this.state.selectedClass;
    let selectSubject = this.state.selectedSubject;
    if (seletedClass && selectSubject) {
      return (
        <Box mt={3}>
          <Box>
            <Link
              component={RouterLink}
              variant="h5"
              to={`/homeworkforoneclass/${seletedClass}/${selectSubject}`}
              color="secondary"
            >
              Check Home Work
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
      </div>
    );
  };
  createRadioButtons = () => {
    let array = this.props.subjectNames;
    if (array) {
      return array.map((curr, index) => {
        return (
          <FormControlLabel
            value={curr}
            label={curr}
            key={index}
            control={<Radio required={true} />}
            name="subjectName"
            color="secondary"
          />
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  };
  render() {
    return (
      <div>
        <Box width="100%">
          <Box mt={3} display="flex" justifyContent="center">
            <Typography variant="h5"> Select class</Typography>
          </Box>
          <Box>{this.displayListOfClasses()}</Box>
          <Box>
            <Typography variant="h5"> Select Subject</Typography>
          </Box>
          <Box>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="Select Subject"
                name="sbjects"
                onChange={this.handleRadioChange}
                value={this.state.value}
              >
                {this.createRadioButtons()}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center">
            {this.linkForHomeWork()}
          </Box>
        </Box>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    classNames: Object.values(state.classesInfo.classNames),
    subjectNames: Object.values(state.classesInfo.subjectNames),
  };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { fetchClassNames, fetchSubjectNames })
)(ClassHomeWorkList);
