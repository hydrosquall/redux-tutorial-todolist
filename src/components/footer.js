import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === "all" ? "" : filter}
    activeStyle={{
      textDecoration: "none",
      color: "black"
    }}
  >
    {children}
  </Link>
);

const Footer = ({ store }) => (
  <p>
    Show:{" "}
    <FilterLink filter="all" store={store}>
      All
    </FilterLink>{" "}
    <FilterLink filter="completed" store={store}>
      Active
    </FilterLink>{" "}
    <FilterLink filter="active" store={store}>
      Completed
    </FilterLink>
  </p>
);

FilterLink.propTypes = {
  filter: PropTypes.oneOf(["all", "completed", "active"]).isRequired,
  children: PropTypes.node.isRequired
};

export { Footer };
