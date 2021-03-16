import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import PostList from "./PostList";
import useReddit from "./useReddit";

function SubredditIndex({ match }) {
  const url = match.url;
  const { value, execute } = useReddit(url + ".json?raw_json=1", false);

  async function fetchNewSubreddit(newUrl) {
    execute(newUrl + ".json?raw_json=1");
  }

  useEffect(() => {
    fetchNewSubreddit(url);
  }, [url]);

  if (!value) return null;

  return (
    <MainLayout>
      <h1>r/{match.params.subreddit}</h1>
      <div>
        <PostList posts={value.data.children} />
      </div>
    </MainLayout>
  );
}

export default SubredditIndex;
