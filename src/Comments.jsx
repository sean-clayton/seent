import React from "react";
import Markdown from "./Markdown";

function MoreComments() {
  return (
    <button className="p-1 font-bold self-start text-xs text-blue-700">
      Load more comments
    </button>
  );
}

function Comments({ comments }) {
  return (
    <ol className="flex flex-col gap-y-2">
      {comments.map((comment) => {
        if (comment.kind === "more")
          return <MoreComments key={comment.data.id} />;

        return (
          <li key={comment.data.id}>
            <Comment comment={comment} />
          </li>
        );
      })}
    </ol>
  );
}

function Comment({ comment }) {
  return (
    <div className="p-2 border-gray-200 rounded-sm border-2">
      <Markdown>{comment.data.body}</Markdown>
      {comment.data.replies !== "" ? (
        <div className="mt-2">
          <Comments comments={comment.data.replies.data.children} />
        </div>
      ) : null}
    </div>
  );
}

export default Comments;
