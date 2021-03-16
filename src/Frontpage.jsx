import React, { useEffect } from "react";
import MainLayout from "./MainLayout";
import PostList from "./PostList";
import useReddit from "./useReddit";

function Frontpage() {
  const { value, execute } = useReddit("/best.json?raw_json=1");

  useEffect(() => {
    execute();
  }, []);

  if (!value) return null;

  return (
    <MainLayout>
      <PostList posts={value.data.children} />
    </MainLayout>
  );
}

export default Frontpage;
