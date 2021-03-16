import React from "react";
import { Remark } from "react-remark";
import a11yEmoji from "@fec/remark-a11y-emoji";
import gfm from "https://cdn.skypack.dev/remark-gfm";
import SmartLink from "./SmartLink";

const components = {
  p: (props) => <p className="my-2 text-sm" {...props} />,
  ol: (props) => <ol className="my-2 text-sm" {...props} />,
  ul: (props) => <ul className="my-2 text-sm" {...props} />,
  a: (props) => (
    <SmartLink {...props} className="underline font-bold text-blue-600" />
  ),
};

const remarkPlugins = [a11yEmoji, gfm];

function Markdown(props) {
  return (
    <Remark
      {...props}
      rehypeReactOptions={{ components }}
      remarkPlugins={remarkPlugins}
    />
  );
}

export default Markdown;
