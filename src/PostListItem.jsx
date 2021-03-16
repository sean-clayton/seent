import React from "react";
import { Link } from "react-router-dom";
import SmartLink from "./SmartLink";

function PostListItem({ post }) {
  return (
    <li className="flex flex-col items-start my-2">
      <SmartLink href={post.data.url}>{post.data.title}</SmartLink>
      <div className="text-xs flex flex-row gap-1">
        <Link to={post.data.permalink}>{post.data.num_comments} comments</Link>
        <span>·</span>
        <Link to={`/r/${post.data.subreddit}`}>r/{post.data.subreddit}</Link>
      </div>
    </li>
  );
}

export default PostListItem;
