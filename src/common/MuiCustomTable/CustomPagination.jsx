import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

// MUI Pagination custom component
const CustomPagination = (props) => {
  // De-structuring of 'props'
  const { sx, count, rowsPerPage, onPageChange, ...restProps } = props;

  return (
    <Pagination
      sx={sx}
      count={Math.ceil(count / rowsPerPage)}
      onChange={onPageChange}
      {...restProps}
    />
  );
};

export default CustomPagination;
