import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Teachers from "./Teachers/Teachers";
import history from "../history";
import { Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import LatestNews from "./LatestNews";
import Homepage from "./Homepage";
import AddHomeWork from "./Teachers/AddHomeWork";
import ClassHomeWorkList from "./ClassHomeWorkList";
import HomeWorkForClass from "./HomeWorkForClass";

const App = () => {
  return (
    <div>
      <CssBaseline />

      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/latestnews" exact component={LatestNews} />
          <Route
            path="/addhomeWork/:selectedClass"
            exact
            component={AddHomeWork}
          />
          <Route path="/students" exact component={ClassHomeWorkList} />
          <Route path="/teachers" exact component={Teachers} />
          <Route path="/classhomeWork" exact component={ClassHomeWorkList} />
          <Route
            path="/homeworkforoneclass/:className/:subjectName"
            exact
            component={HomeWorkForClass}
          />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
