import React from "react";
import { Link } from "react-router-dom";

function PostListItem({ post }) {
  return (
    <li className="flex flex-col items-start my-2">
      {post.data.domain.startsWith("self.") ? (
        <Link to={post.data.url}>{post.data.title}</Link>
      ) : (
        <a href={post.data.url}>{post.data.title}</a>
      )}
      <div className="text-xs flex flex-row gap-1">
        <Link to={post.data.permalink}>{post.data.num_comments} comments</Link>
        <span>·</span>
        <Link to={`/r/${post.data.subreddit}`}>r/{post.data.subreddit}</Link>
      </div>
    </li>
  );
}

export default PostListItem;
