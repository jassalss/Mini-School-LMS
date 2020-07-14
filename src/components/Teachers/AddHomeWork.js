import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
  fetchSubjectNames,
  uploadHomeWork,
  resetUploader,
} from "../../actions/index";
import {
  TextField,
  Container,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core/";
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class AddHomeWork extends Component {
  state = { value: "", fileNeedsToUpload: "" };
  handleRadioChange = (event) => {
    this.setState({ value: event.target.value });
  };
  componentDidMount() {
    if (this.props.subjectNames.length === 0) {
      this.props.fetchSubjectNames();
    }
  }
  uploadTheHomeWork = (e) => {
    e.preventDefault();
    let className = e.target.className.value;
    let homeWorkName = e.target.homeWork.value;
    let subjectName = e.target.subjectName.value;
    let fileToUpload = this.state.fileNeedsToUpload;
    var today = new Date();
    var date =
      today.getFullYear() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + "-" + time;
    homeWorkName = homeWorkName + "-" + dateTime;
    this.props.uploadHomeWork({
      className,
      subjectName,
      fileToUpload,
      homeWorkName,
    });
  };
  isValidUrl = (string) => {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }

    return true;
  };
  handleUploadClick = (e) => {
    this.setState({ fileNeedsToUpload: e.target.files[0] });
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
    const { classes } = this.props;
    let uploadedURL = this.props.homeworkUploaded;
    if (this.isValidUrl(uploadedURL)) {
      if (
        window.confirm("Press Ok, to Check home work, otherwise press Cancel")
      ) {
        window.open(this.props.homeworkUploaded, "_blank");
      }
      window.location.reload();
    }

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add Home Work
            </Typography>
            <form className={classes.form} onSubmit={this.uploadTheHomeWork}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="class Name"
                    required
                    name="className"
                    variant="outlined"
                    fullWidth
                    id="className"
                    label="class Name"
                    value={this.props.match.params.selectedClass}
                    color="secondary"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Home Work Name"
                    name="homeWork"
                    color="secondary"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel color="secondary" component="legend">
                      Subjects
                    </FormLabel>
                    <RadioGroup
                      aria-label="Subjects"
                      name="sbjects"
                      onChange={this.handleRadioChange}
                      value={this.state.value}
                    >
                      {this.createRadioButtons()}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <input
                    accept="image/*"
                    name="homeWorkfile"
                    multiple
                    type="file"
                    required
                    onChange={this.handleUploadClick}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subjectNames: Object.values(state.classesInfo.subjectNames),
    homeworkUploaded: state.classesInfo.homeworkUploaded,
  };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { fetchSubjectNames, uploadHomeWork, resetUploader })
)(AddHomeWork);
