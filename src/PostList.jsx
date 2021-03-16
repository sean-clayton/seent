import React from "react";
import PostListItem from "./PostListItem";

function PostList({ posts }) {
  return (
    <ol>
      {posts.map((post) => (
        <PostListItem key={post.data.id} post={post} />
      ))}
    </ol>
  );
}

export default PostList;
