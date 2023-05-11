import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  LabelDisplayedRowsArgs,
  Box,
} from "@mui/material";
import CustomPagination from "./MuiPagination";
import { OnChangeFiledValueType, UseStateType } from "helper/types";
import {
  TableDataResponseType,
  TablePaginationType,
  TableRowColType,
} from "helper/types/muiTable/muiTable";
import LoadingSpinner from "../loadingSpinner/Loader";

interface MuiTablePropsType {
  loader: boolean;
  data: TableRowColType;
  allData: TableDataResponseType;
  paginationData: TablePaginationType;
  setPaginationData: UseStateType<TablePaginationType>;
  [restProps: string]: any;
}

const MuiTable = (props: MuiTablePropsType) => {
  // De-structuring of 'props'
  // debugger;
  const {
    loader,
    data,
    allData,
    paginationData,
    setPaginationData,
    ...restProps
  } = props;

  // Constans
  const selectRowsOptions = [10, 20, 50, 100]; // Options of the rows per page select field

  // To set selected page number when the page is changed
  const handlePageChange = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | null
      | React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPaginationData({
      ...paginationData,
      page: newPage,
    });
  };

  // To set value when the number of rows per page is changed
  const handleChangeRowsPerPage = ({ target: { value } }) => {
    setPaginationData({
      ...paginationData,
      rowsPerPage: parseInt(value, 10),
      page: 1,
    });
  };

  // To customize the displayed rows label
  const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
    return `Showing ${from}-${to} of ${count} rows`;
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
      }}
    >
      {loader && (
        <Box className="w-full [&>.spinner-container-bg]:backdrop-blur-sm [&>.spinner-container-bg]:bg-white/30">
          <LoadingSpinner />
        </Box>
      )}
      <TableContainer sx={{ maxHeight: "668px" }}>
        <Table
          stickyHeader
          sx={{
            "&.MuiTable-root .MuiTableHead-root .MuiTableCell-head": {
              background: "rgba(227, 227, 227)",
              whiteSpace: "nowrap",
            },
            "& .MuiTableCell-body": {
              whiteSpace: "nowrap",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {data.columns.map((arrEle, index) => (
                <TableCell
                  sx={{ px: 3.125, py: 1.25, minWidth: arrEle.width }}
                  width={arrEle.width}
                  key={`${arrEle.id}_${index}`}
                  // sortDirection={orderBy === arrEle.id ? order : none}
                >
                  {arrEle.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* // slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
            {data.rows.length > 0 &&
              data?.rows?.map((items, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "& .MuiTableCell-root:first-child": {
                        maxWidth: "300px",
                      },
                    }}
                  >
                    {Object.values(items).map((val, valIndex) => (
                      <TableCell sx={{ px: 3.125, py: 1.25, color: "#71757B" }}>
                        {val}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            {!loader && data.rows.length < 1 && (
              <TableRow
                className="w-full"
                sx={{
                  display: "block",
                  height: "50vh",
                  px: 3.125,
                  pt: 2,
                  whiteSpace: "nowrap",
                }}
              >
                No matching records found
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        sx={{
          "&.MuiTablePagination-root": {
            "& .MuiTablePagination-toolbar": {
              p: "34px 25px 30px",
              "& .MuiTablePagination-spacer": {
                display: "none",
              },
              "& .MuiTablePagination-select ": {
                border: "1px solid rgba(113, 117, 123, 0.2)",
                borderRadius: "5px",
                textAlign: "center",
                padding: "0.5rem 2rem 0.5rem 1rem",
              },
              "& .MuiTablePagination-actions": { marginLeft: "auto" },
            },
          },
        }}
        labelRowsPerPage=""
        labelDisplayedRows={labelDisplayedRows}
        rowsPerPageOptions={selectRowsOptions}
        page={paginationData.page - 1}
        count={allData?.count}
        rowsPerPage={paginationData.rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={(subProps) => {
          return (
            <CustomPagination
              {...subProps}
              sx={{
                "&.MuiTablePagination-actions": {
                  "& .Mui-selected": {
                    backgroundColor: "#2472FC",
                    color: "white",
                  },
                  "& .MuiButtonBase-root": {
                    // "&.MuiPaginationItem-previousNext": {
                    //   backgroundColor: "#2472FC",
                    //   opacity: "0.1",
                    //   "&.MuiPaginationItem-root": { color: "#71757B" }
                    // },
                    "&.MuiPaginationItem-root": {
                      width: 45,
                      height: 45,
                      borderRadius: 1.25,
                      border: "none",
                      "&.MuiPaginationItem-previousNext": {
                        background: "#e2ecff",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#00000014",
                        "&.MuiPaginationItem-root": { color: "#71757B" },
                      },
                    },
                  },
                },
              }}
              variant="outlined"
              shape="rounded"
              color="primary"
              page={subProps.page + 1}
            />
          );
        }}
      />
    </Card>
  );
};

export default MuiTable;
