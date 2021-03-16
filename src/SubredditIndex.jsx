import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import PostList from "./PostList";

function SubredditIndex({ match }) {
  const [subredditInfo, setSubredditInfo] = useState(null);
  const url = match.url;

  async function getSubredditInfo() {
    setSubredditInfo(
      await fetch(`https://www.reddit.com${url}.json?raw_json=1`).then((res) =>
        res.json()
      )
    );
  }

  useEffect(() => {
    getSubredditInfo();
  }, [url]);

  return (
    <MainLayout>
      <h1>r/{match.params.subreddit}</h1>
      <div>
        {subredditInfo ? (
          <PostList posts={subredditInfo.data.children} />
        ) : null}
      </div>
    </MainLayout>
  );
}

export default SubredditIndex;
