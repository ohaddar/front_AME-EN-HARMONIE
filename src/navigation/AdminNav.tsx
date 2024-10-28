import React from "react";
import { Link } from "react-router-dom";

const AdminNav: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <Link to="blog" className="nav-link">
          ADD New Blog
        </Link>
        <Link to="feedback" className="nav-link">
          Feedbacks
        </Link>{" "}
        <Link to="test" className="nav-link">
          tests
        </Link>
      </div>
    </nav>
  );
};

export default AdminNav;
