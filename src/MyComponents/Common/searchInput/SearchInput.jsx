import { Box } from '@mui/material';
import React from 'react';

const SearchInput = ({ searchVal, handleFilterChange, ...props }) => {
    return (
        <Box
            sx={{
                "& input": {
                    width: "335px",
                    height: "49px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "0 11px",
                },
            }}
        >
            <input
                className="form-control form-control-sm ml-0 my-1"
                type="search"
                placeholder="Search"
                name="search"
                aria-label="Search"
                value={searchVal}
                onChange={handleFilterChange}
                {...props}
            />
        </Box>
    )
}

export default SearchInput;
