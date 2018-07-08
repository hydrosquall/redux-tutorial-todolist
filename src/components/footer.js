import React from "react";

import FilterLink from "./filterlink";

const Footer = () => (
  <p>
    Show: <FilterLink filter="all">All</FilterLink>{" "}
    <FilterLink filter="completed">Active</FilterLink>{" "}
    <FilterLink filter="active">Completed</FilterLink>
  </p>
);

export { Footer };
