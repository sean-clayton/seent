import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
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
        <ol className="flex flex-col gap-y-2">
          {comments?.data.children.map((comment) => (
            <li
              key={comment.data.id}
              className="p-2 border-gray-100 rounded-sm border-2"
            >
              <ReactMarkdown>{comment.data.body}</ReactMarkdown>
            </li>
          ))}
        </ol>
      </div>
    </MainLayout>
  );
}

export default PostThreadView;
