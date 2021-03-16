import React from "react";
import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen min-w-full">
      <nav className="flex gap-1 p-1">
        <Link to="/">Frontpage</Link>
        <Link to="/r/all">All</Link>
        <Link to="/r/popular">Popular</Link>
      </nav>
      <main className="p-1">{children}</main>
    </div>
  );
}

export default MainLayout;
