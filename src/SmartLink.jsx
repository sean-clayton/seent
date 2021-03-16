import React from "react";
import { Link } from "react-router-dom";

function SmartLink({ href, ...props }) {
  const hostnameIsReddit = href.startsWith("/")
    ? false
    : new URL(href).hostname === "www.reddit.com";

  const isInternal = href.startsWith("/") || hostnameIsReddit;
  const url = href.startsWith("/")
    ? href
    : hostnameIsReddit
    ? href.split("reddit.com")[1]
    : href;
  return isInternal ? (
    <Link to={url} {...props} />
  ) : (
    <a href={url} {...props} />
  );
}

export default SmartLink;
