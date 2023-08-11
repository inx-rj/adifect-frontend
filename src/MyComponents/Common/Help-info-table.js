import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useOutletContext } from "react-router-dom";
import Paper from "@mui/material/Paper";
import moment from "moment";

import { GetHelpCommonAction } from "../../redux/actions/Help-common-action";

export default function Help_info_table() {
  const dispatch = useDispatch();

  const [headerCompany] = useOutletContext();

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "name", label: "Subject" },
    { id: "modified", label: "Modified At", align: "center" },
    // { id: "is_active", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const { workflowData } = useSelector((state) => state.workflowAdminReducer);
  const { GetHelpCommon } = useSelector((state) => state.GetHelpCommonReducer);

  useEffect(() => {
    dispatch(GetHelpCommonAction());
  }, []);

  useEffect(() => {
    let userData = [];

    GetHelpCommon?.map((item, index) => {
      item.name = item.subject;

      var utc1 = null;
      if (item.created) {
        utc1 = moment(item.created).format("MM-DD-yyyy hh:mm a");
      }
      item.created_at = utc1;

      var utc = null;
      if (item.modified) {
        utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
      }

      item.updated_at = utc;

      item.action = (
        <div style={{ display: "flex" }}>
          <Link
            title="view"
            className="EditBut editAdminButton"
            to={`/help/view-message/${item.id}`}
          >
            {/* <img className="editicon" src="/img/editicon.png" alt="" />{" "} */}
            <p className="editionEdit">View</p>
          </Link>
        </div>
      );
      userData.push(item);
    });

    let result = userData.filter((item) => item.subject.includes(search));

    if (search) {
      setRows(result);
    } else {
      setRows(userData);
    }
  }, [GetHelpCommon, search]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p Workflowadmin">
            <div className="CategorylistName">
              <h1>Adifect Help Page</h1>
            </div>
          </div>

          <div className="Category_p Workflowadminadminlist">
            <div className="Workflowadminbtn">
              <input
                placeholder="Search"
                id="search"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="savebtnnew Categorybtn Workflowbtn1">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`/help/add`}
                >
                  {" "}
                  <img className="alladdimg" src="/img/plusicon.png" />
                  Help{" "}
                </Link>
              </div>
            </div>

            <Paper sx={{ mb: 2 }}>
              <div className="Category_p Categoryadminworkflownew">
                <TableContainer>
                  <Table size="small" aria-label="sticky table">
                    <TableHead>
                      <TableRow
                        style={{
                          backgroundColor: "#D0E3FF",
                        }}
                      >
                        {columns.map((column) => (
                          <TableCell
                            style={{
                              fontWeight: "900",
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows?.length > 0 &&
                        rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            return (
                              <TableRow
                                // hover
                                style={
                                  index % 2 === 0
                                    ? { backgroundColor: "#FFFFFF" }
                                    : { backgroundColor: "#ECF5FF" }
                                }
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      {rows.length < 1 && (
                        <div className="Category_p">
                          <TableRow
                            style={{
                              height: "50vh",
                            }}
                          >
                            No matching records found
                          </TableRow>
                        </div>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="Category_p workflowadiv">
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </Paper>
          </div>
        </>
      )}
    </>
  );
}
