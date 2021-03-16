import React from "react";
import { Link } from "react-router-dom";

function PostListItem({ post }) {
  return (
    <li className="flex flex-col items-start my-2">
      <Link to={post.data.permalink}>{post.data.title}</Link>
      <Link className="text-xs" to={`/r/${post.data.subreddit}`}>
        r/{post.data.subreddit}
      </Link>
    </li>
  );
}

export default PostListItem;
