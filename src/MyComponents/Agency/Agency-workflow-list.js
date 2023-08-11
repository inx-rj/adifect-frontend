import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import swal from "sweetalert";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { WORKFLOW_level_DETAILS_RESET } from "../../constants/workflowslevel-constants";
import moment from "moment";
import { Frontend_URL } from "../../environment";
import { workflowlistAll } from "../../redux/actions/workflow-action";
import { workflowdelete } from "../../redux/actions/workflow-action";
import {
  workflowdeletelevel,
  workflowlistAlllevels,
} from "../../redux/actions/workflowslevel-action";
import { useOutletContext } from "react-router-dom";

export default function Agency_approval_workflow_dev() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [headerCompany, setHeaderCompany] = useOutletContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [usersForRender, setUsersForRender] = useState([]);
  const { levelData, loading: levelsLoading } = useSelector(
    (state) => state.workflowlevelReducer
  );
  const { success } = useSelector((state) => state.workflowDeleteReducer);

  const columns = [
    { id: "name", label: "Title" },
    { id: "company", label: "Company", align: "center" },
    { id: "is_active", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch({ type: WORKFLOW_level_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);
  const { workflowData } = useSelector((state) => state.workflowReducer);

  useEffect(() => {
    dispatch(workflowlistAll(headerCompany));
  }, [success, headerCompany]);

  useEffect(() => {
    let userData = [];

    workflowData?.map((item, index) => {
      item.name = item.name;

      item.company = item.company_name;
      item.is_active = (
        <div style={{ display: "flex" }}>
          {item.is_active ? (
            <div className="active_status">
              <i className="fa fa-check" aria-hidden="true"></i>{" "}
            </div>
          ) : (
            <div className="inactive_status">
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          )}
        </div>
      );
      item.action = (
        <div style={{ display: "flex" }}>
          <Link
            title="edit"
            className="EditBut editAdminButton"
            to={`/workflow/edit/${item.id}`}
          >
            {/* <img className="editicon" src="/img/editicon.png" alt="" />{" "} */}
            {item.assigned_job ? (
              <p className="editionEdit">View</p>
            ) : (
              <p className="editionEdit">Edit</p>
            )}
          </Link>
          <div style={{ display: "flex" }}>
            <Button
              title="delete"
              style={
                index % 2 === 0
                  ? { backgroundColor: "#FFFFFF" }
                  : { backgroundColor: "#ECF5FF" }
              }
              className="deletebutt"
            >
              {/* <img
                className="editicon"
                src="/img/delet.png"
                alt=""
                onClick={() => deleteHandler(item.id)}
              /> */}
              <p
                className="editiconDelete"
                onClick={() => deleteHandler(item.id)}
              >
                Delete
              </p>
            </Button>
          </div>
        </div>
      );
      userData.push(item);
    });

    let result = userData.filter(
      (item) => item.name.includes(search) || item.company_name.includes(search)
    );

    if (search) {
      setRows(result);
    } else {
      setRows(userData);
    }
  }, [workflowData, headerCompany, search]);

  // useEffect(() => {
  //   let userData = [];
  //   // console.log("levelData == ", levelData);
  //   workflowData?.map((item, index) => {
  //     item.name = item.name;

  //     var utc = null;
  //     if (item.modified) {
  //       utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
  //     }
  //     item.updated_at = utc;
  //     item.is_active = (
  //       <div style={{ display: "flex" }}>
  //         {item.is_active ? (
  //           <div className="active_status">
  //             <i className="fa fa-check" aria-hidden="true"></i>{" "}
  //           </div>
  //         ) : (
  //           <div className="inactive_status">
  //             <i className="fa fa-times" aria-hidden="true"></i>
  //           </div>
  //         )}
  //       </div>
  //     );
  //     item.action = (
  //       <div style={{ display: "flex" }}>
  //         <Link
  //           title="edit"
  //           className="EditBut editAdminButton"
  //           to={`/workflow/edit/${item.id}`}
  //         >
  //          {item.assigned_job ? (
  //             <p className="editionEdit">View</p>
  //           ) : (
  //             <p className="editionEdit">Edit</p>
  //           )}
  //           {/* <img className="editicon" src="/img/editicon.png" alt="" /> */}
  //         </Link>
  //         <div style={{ display: "flex" }}>
  //           <Button
  //             disabled={item.assigned_job}
  //             title="delete"
  //             className="deletebutt"
  //           >
  //             {" "}
  //             <p
  //               className="editiconDelete"
  //               onClick={() => deleteHandler(item.id)}
  //               style={{ color: item.assigned_job && "grey" }}
  //             >
  //               Delete
  //             </p>
  //             {/* <img
  //               className="editicon"
  //               src="/img/delet.png"
  //               alt=""
  //               onClick={() => deleteHandler(item.id)}
  //             />{" "} */}
  //           </Button>
  //         </div>
  //       </div>
  //     );
  //     userData.push(item);
  //   });
  //   setUsersForRender(userData);
  // }, [workflowData]);

  // const data = {
  //   columns: [
  //     {
  //       label: "Title",
  //       field: "name",
  //       // sort: "asc",
  //       width: 500,
  //     },
  //     // {
  //     //   label: "Job",
  //     //   field: "job_title",
  //     //   sort: "asc",
  //     //   width: 500,
  //     // },
  //     {
  //       label: "Status",
  //       field: "is_active",
  //       // sort: "asc",
  //       width: 500,
  //     },
  //     {
  //       label: "Action",
  //       field: "action",
  //       // sort: "asc",
  //       width: 100,
  //     },
  //   ],
  //   rows: usersForRender,
  // };

  const deleteHandler = (id) => {
    swal({
      title: "",
      text: "Are you sure you want to delete this workflow?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(workflowdelete(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        // setIsLoading(true);
      }
    });
    // if (window.confirm("Are you sure you want to delete this level?")) {
    //   dispatch(deletelevel(id));
    // }
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {JSON.stringify(workflowData)} */}
          <div className="Category_p WorkflowlistAgency">
            <div className="CategorylistName">
              <h1>Workflow List</h1>
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
                  to={`add/`}
                >
                  {" "}
                  <img
                    className="alladdimg"
                    src="/img/plusicon.png"
                  /> Workflow{" "}
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
          {/* <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1 Agencyworkflowpagetop">
              <div className="Status"></div>
              <div className="savebtnnew Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`add/`}
                >
                  {" "}
                  <img className="alladdimg" src="/img/plusicon.png" />
                  Workflow{" "}
                </Link>
              </div>
              <MDBDataTable
                style={{}}
                responsive
                striped
                bordered
                small
                data={data}
              />
            </div>
          </div> */}
        </>
      )}
    </>
  );
}
