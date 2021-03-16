import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";

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
      <h1>{match.params.subreddit}</h1>
      <div>
        <ol>
          {subredditInfo?.data.children.map((post) => (
            <li key={post.data.id}>
              <Link to={post.data.permalink}>{post.data.title}</Link>
            </li>
          ))}
        </ol>
      </div>
    </MainLayout>
  );
}

export default SubredditIndex;
