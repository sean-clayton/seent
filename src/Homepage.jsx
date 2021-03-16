import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";

function Homepage() {
  const [trendingData, setTrendingData] = useState(null);

  async function getTrendingSubreddits() {
    setTrendingData(
      await fetch("https://www.reddit.com/best.json?raw_json=1").then((res) =>
        res.json()
      )
    );
  }

  useEffect(() => {
    getTrendingSubreddits();
  }, []);

  return (
    <MainLayout>
      <h1>Howdy</h1>
      <ol>
        {trendingData?.data.children.map((post) => (
          <li key={post.data.id}>
            <Link to={post.data.permalink}>{post.data.title}</Link>
            <br />
            <Link to={`/r/${post.data.subreddit}`}>
              r/{post.data.subreddit}
            </Link>
          </li>
        ))}
      </ol>
    </MainLayout>
  );
}

export default Homepage;
