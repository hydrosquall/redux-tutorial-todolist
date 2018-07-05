import React from "react";
import { connect } from "react-redux";

import { setVisibilityFilter } from "../actions";

// Presentation only!
const Link = ({ active, children, onClick }) =>
  active ? (
    <span> {children} </span>
  ) : (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );

// Refer to current props
const mapStateToProps = (state, ownProps) => ({
  active: state.visibilityFilter === ownProps.filter
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});
const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

const Footer = ({ store }) => (
  <p>
    Show:{" "}
    <FilterLink filter="SHOW_ALL" store={store}>
      All
    </FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE" store={store}>
      Active
    </FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED" store={store}>
      Completed
    </FilterLink>
  </p>
);

export { Footer };
