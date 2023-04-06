import React from 'react'
import { Pagination, SxProps, Theme } from '@mui/material';

interface CustomPaginationPropsType {
    sx: SxProps<Theme>;
    count: number;
    rowsPerPage: number;
    onPageChange: (event: any, newPage: number) => void;
    [restProps: string]: any;
}

// MUI Pagination custom component
const CustomPagination = (props: CustomPaginationPropsType) => {
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

export default CustomPagination;