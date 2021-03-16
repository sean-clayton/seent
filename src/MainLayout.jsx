import React from "react";
import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <main className="min-h-screen min-w-full">
      <nav>
        <Link to="/r/all">All</Link>
        <br />
        <Link to="/r/popular">Popular</Link>
      </nav>
      {children}
    </main>
  );
}

export default MainLayout;
