import React from "react";
import { Route, Switch } from "react-router-dom";
import PostThreadView from "./PostThreadView";
import SubredditIndex from "./SubredditIndex";

function SubredditView({ match }) {
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/:subreddit/`}
        component={SubredditIndex}
      />
      <Route
        path={`${match.url}/:subreddit/comments/:postId/`}
        component={PostThreadView}
      />
    </Switch>
  );
}

export default SubredditView;
