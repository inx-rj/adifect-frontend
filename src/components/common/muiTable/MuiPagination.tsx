import React from 'react'
import { Pagination, SxProps, Theme } from '@mui/material';

interface PaginationPropsType {
    sx: SxProps<Theme>;
    count: number;
    rowsPerPage: number;
    onPageChange: (event: any, newPage: number) => void;
    [restProps: string]: any;
}

// MUI Pagination custom component
const MuiPagination = (props: PaginationPropsType) => {
    // De-structuring of 'props'
    const { sx, count, rowsPerPage, onPageChange, ...restProps } = props;

    return (
        <Pagination
            sx={sx}
            count={Math.ceil(count / rowsPerPage)}
            onChange={onPageChange}
            {...restProps}
        />
    )
}

export default MuiPagination;