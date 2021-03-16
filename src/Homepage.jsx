import React, { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import PostList from "./PostList";

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
      {trendingData ? <PostList posts={trendingData.data.children} /> : null}
    </MainLayout>
  );
}

export default Homepage;
