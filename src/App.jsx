import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import _ from "lodash-es";
import ScrollMemory from "react-router-scroll-memory";
import { Provider as JotaiProvider } from "jotai";
import Frontpage from "./Frontpage";
import SubredditView from "./SubredditView";

function App() {
  return (
    <JotaiProvider>
      <Router>
        <ScrollMemory />
        <Switch>
          <Route path="/" exact component={Frontpage} />
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
    </JotaiProvider>
  );
}

export default App;
