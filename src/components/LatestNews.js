import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchLatestNews } from "../actions";
import { Typography, Box } from "@material-ui/core";
const useStyles = (theme) => ({});
class LatestNews extends Component {
  componentDidMount() {
    this.props.fetchLatestNews();
  }
  render() {
    return (
      <Box mt={5}>
        <Typography variant="h4" component="h2">
          {this.props.latestNews}
        </Typography>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return { latestNews: state.classesInfo.latestNews };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { fetchLatestNews })
)(LatestNews);
