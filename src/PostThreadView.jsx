import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./MainLayout";

function PostThreadView({ match }) {
  const [[post, comments], setThreadData] = useState([null, null]);

  async function getThreadData() {
    setThreadData(
      await fetch(
        `https://www.reddit.com${match.url}.json?raw_json=1`
      ).then((res) => res.json())
    );
  }

  useEffect(() => {
    getThreadData();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-xl">{post?.data.children[0].data.title}</h1>
      <h2>
        <Link to={`/r/${match.params.subreddit}`}>
          r/{match.params.subreddit}
        </Link>
      </h2>
      <div>
        <ol>
          {comments?.data.children.map((comment) => (
            <li key={comment.data.id}>{comment.data.body}</li>
          ))}
        </ol>
      </div>
    </MainLayout>
  );
}

export default PostThreadView;
