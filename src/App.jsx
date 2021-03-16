import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import _ from "lodash-es";
import Homepage from "./Homepage";
import SubredditView from "./SubredditView";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/r/" component={SubredditView} />
        <Route path="/subreddits/" />
        <Route path="/search/" />
        <Route path="/chat/" />
        <Route path="/message/" />
        <Route path="/submit/" />
        <Route path="/me/" />
        <Route path="/user/" />
        <Route path="/settings/" />
      </Switch>
    </Router>
  );
}

export default App;
