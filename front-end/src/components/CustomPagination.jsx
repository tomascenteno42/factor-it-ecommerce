import React from "react";

import { Pagination } from "react-bootstrap";

export const CustomPagination = (props) => {
  return (
    <Pagination className="bg-primary">
      <Pagination.Prev
        disabled={props.currentPage === 0}
        name="p"
        onClick={(e) => props.handlePagination(e)}
      />
      <Pagination.Item>{props.currentPage + 1}</Pagination.Item>

      <Pagination.Next
        disabled={props.currentPage === props.pages - 1}
        name="n"
        onClick={(e) => props.handlePagination(e)}
      />
    </Pagination>
  );
};
