import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import MainLayout from "./MainLayout";
import Markdown from "./Markdown";
import SmartLink from "./SmartLink";

function PostThreadView({ match }) {
  const [[postData, comments], setThreadData] = useState([null, null]);
  const post = postData?.data.children[0];

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

  if (!post || !comments) return null;

  return (
    <MainLayout>
      <h1 className="text-xl">
        <SmartLink href={post.data.url}>{post.data.title}</SmartLink>
      </h1>
      <h2>
        <Link to={`/r/${match.params.subreddit}`}>
          r/{match.params.subreddit}
        </Link>
      </h2>
      {post.data.selftext ? (
        <article className="my-4">
          <Markdown>{post.data.selftext}</Markdown>
        </article>
      ) : null}
      <div>
        <Comments comments={comments.data.children} />
      </div>
    </MainLayout>
  );
}

export default PostThreadView;
