import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getListOfHomeWork } from "../actions/index";
import { Box, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 400,
  },
});
class HomeWorkForClass extends Component {
  state = { page: 0, rowsPerPage: 5 };
  componentDidMount() {
    this.props.getListOfHomeWork(
      this.props.match.params.className,
      this.props.match.params.subjectName
    );
  }
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  makeNewRows = () => {
    return this.props.homeWorkObj.map((curr) => {
      return {
        HomeWorkName: curr.name,
        PostedDate: curr.dateposted,
        PostedTime: curr.timePosted,
        HomeWorkLink: (
          <Link href={curr.url} variant="body2" color="error" target="_blank">
            Click here for homework
          </Link>
        ),
      };
    });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };
  columns = [
    { id: "HomeWorkName", label: "HomeWork Name" },
    { id: "PostedDate", label: "Posted Date" },
    { id: "PostedTime", label: "Posted Time" },
    { id: "HomeWorkLink", label: "HomeWork Link" },
  ];
  makeTable = () => {
    let { classes } = this.props;
    if (!this.props.homeWorkObj) {
      return <div>Loading...!</div>;
    }
    let array = this.makeNewRows();
    if (array.length === 0) {
      return <Typography variant="h5">No HomeWork posted yet</Typography>;
    }
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {this.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {array
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {this.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="left">
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={this.props.homeWorkObj ? this.props.homeWorkObj.length : 5}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  };
  render() {
    let classNames = this.props.match.params.className;
    let subjectName = this.props.match.params.subjectName;
    return (
      <div>
        <Box mt={3} display="flex" alignItems="center" flexDirection="column">
          <Typography
            gutterBottom
            variant="h5"
          >{`Home work for ${classNames} class`}</Typography>
          <Typography
            gutterBottom
            variant="h5"
          >{`Subject: ${subjectName}`}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          {this.makeTable()}
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { homeWorkObj: state.classesInfo.homeWorkObj };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { getListOfHomeWork })
)(HomeWorkForClass);
