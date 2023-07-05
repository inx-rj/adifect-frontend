import ActionMenuButton from 'components/common/actionMenuButton/ActionMenuButton';
import LoadingSpinner from 'components/common/loadingSpinner/Loader';
import MuiTable from 'components/common/muiTable/MuiTable';
import Title from 'components/common/pageTitle/Title';
import SearchBar from 'components/common/searchBar/SearchBar';
import { Images } from 'helper/images';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_DRAFT_JOBS_LIST, GET_DRAFT_JOBS_LIST } from 'redux/actions/draftJobs/draftJobs.action';
import { DELETE_JOB } from 'redux/actions/jobs/jobs.actions';
import { IS_HEADER_COMPANY } from 'redux/reducers/config/app/app.slice';
import { DRAFT_JOBS_DATA, DRAFT_JOBS_RESPONSE } from 'redux/reducers/draftJobs/draftJobs.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import swal from 'sweetalert';
import HomeIcon from '@mui/icons-material/Home';

const DraftJobs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const headerCompany = useAppSelector(IS_HEADER_COMPANY);

  const draftJobs = useAppSelector(DRAFT_JOBS_DATA);
  const success = useAppSelector(DRAFT_JOBS_RESPONSE);
  // React states
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    rowsPerPage: 10
  }); // pagination params state
  //   useEffect(() => {
  //     dispatch(defaultPageLoader());
  //   }, []);

  // Action Menu button states
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null
  });

  useEffect(() => {
    // dispatch({ type: JOB_DETAILS_RESET });
    // dispatch({ type: DRAFT_JOB_lIST_RESET });
    // dispatch(DraftJoblist(headerCompany));
    dispatch(GET_DRAFT_JOBS_LIST(tableFilters, headerCompany));
  }, [success, headerCompany, tableFilters]);

  // useEffect(() => {
  // console.log('ss', draftJobs)
  //   if (draftJobs) {
  //     let userData = [];
  //     // console.log("DraftJoblist == ", draftJobs);
  //     draftJobs?.data?.results?.map((item, index) => {
  //       item.name = item.title;
  //       var utc = null;
  //       if (item.created) {
  //         //   utc = moment(item.created).format("MM-DD-yyyy hh:mm a");
  //       }
  //       item.created = utc;
  //       let utc1 = null;
  //       if (item.modified) {
  //         //   utc1 = moment(item.modified).format("MM-DD-yyyy hh:mm a");
  //       }
  //       item.modified = utc1;
  //       // item.is_active = (
  //       //   <div style={{ display: "flex" }}>
  //       //     {item.is_active ? (
  //       //       <div className="active_status">
  //       //         <i className="fa fa-check" aria-hidden="true"></i>{" "}
  //       //       </div>
  //       //     ) : (
  //       //       <div className="inactive_status">
  //       //         <i className="fa fa-times" aria-hidden="true"></i>
  //       //       </div>
  //       //     )}
  //       //   </div>
  //       // );
  //       item.action = (
  //         <div style={{ display: "flex" }}>
  //           <Link
  //             title="edit"
  //             className="EditBut editAdminButton"
  //             to={`/jobs/${item.id}`}
  //           >
  //             {" "}
  //             {/* <img className="editicon" src="/img/editicon.png" alt="" /> */}
  //             <p className="editionEdit">Edit</p>
  //           </Link>
  //           <div style={{ display: "flex" }}>
  //             <Button title="delete" className="deletebutt">
  //               {" "}
  //               {/* <img
  //                 className="editicon"
  //                 src="/img/delet.png"
  //                 alt=""
  //                 onClick={() => deleteHandler(item.id)}
  //               />{" "} */}
  //               <p
  //                 className="editiconDelete"
  //                 onClick={() => deleteHandler(item.id)}
  //               >
  //                 Delete
  //               </p>
  //             </Button>
  //           </div>
  //         </div>
  //       );
  //       userData.push(item);
  //     });
  //     setUsersForRender(userData);
  //   }
  // }, [draftJobs]);

  const deleteHandler = id => {
    swal({
      title: 'Warning',
      text: 'Are you sure you want to delete this draft job?',
      className: 'errorAlert',
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true
      },
      dangerMode: true
    }).then(willDelete => {
      if (willDelete !== 'Cancel') {
        dispatch(DELETE_JOB(id));
        swal({
          title: 'Successfully Complete',
          text: 'Successfully Deleted!',
          className: 'successAlert',
          icon: Images.Logo,
          buttons: {
            OK: false
          },
          timer: 1500
        });
        // setIsLoading(true);
      }
    });
    // if (window.confirm("Are you sure you want to delete this level?")) {
    //   dispatch(deletelevel(id));
    // }
  };

  //set the edit mode
  const handleEdit = item => {
    setIsEditMode(true);
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    navigate(`/jobs/${item.id}`);
  };

  //handle delete action
  const handleDelete = item => {
    swal({
      title: 'Warning',
      text: `Are you sure you want to remove this ${item?.title}?`,
      className: 'errorAlert',
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true
      },
      dangerMode: true
    }).then(willDelete => {
      if (willDelete !== 'Cancel') {
        console.log('delete');
        dispatch(DELETE_DRAFT_JOBS_LIST(item?.id)).then((r: void) => r);
      }
    });
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  // Row-Columns data
  const data = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Title
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'title',
        sort: 'asc',
        width: 100
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Created
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'created',
        sort: 'asc',
        width: 50
      },
      {
        id: 3,
        label: (
          <label className="flex items-center">
            Modified
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'modified',
        sort: 'asc',
        width: 50
      },
      {
        id: 4,
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 50
      }
    ],

    rows:
      draftJobs?.data?.results?.length > 0
        ? draftJobs?.data?.results?.map((item, index) => {
            return {
              tite: item.title ?? '',

              created: item.created ?? '',

              modified: item.modified ?? '',

              action: (
                <div>
                  <ActionMenuButton
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setAnchorEl={setAnchorEl}
                    anchorEl={anchorEl}
                    handleEdit={() => handleEdit(item)}
                    handleDelete={() => handleDelete(item)}
                    showDelete={true}
                    showEdit={true}
                    isEditMode={isEditMode}
                    item={{ id: item?.id, isActive: item?.is_active }}
                  />
                </div>
              )
            };
          })
        : []
  };

  return (
    <>
      {/* {JSON.stringify(workflowData)} */}
      <div className="page-container">
        <div className="flex-between">
          <Title title="Draft Jobs" customClass="page-title" />
          <div className="flex-between gap-[10px] font-sm leading-4 font-medium text-primary">
            <Link to="/">
              <HomeIcon color="disabled" />
            </Link>
            <span className="text-disable opacity-20">|</span>
            <Link to="/company">Draft Jobs</Link>
          </div>
        </div>
        <div className="page-card">
          <div className="flex-between flex-wrap p-[15px] pb-5">
            <SearchBar setTableFilters={setTableFilters} tableFilters={tableFilters} />
          </div>
          {draftJobs?.loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* <div className="savebtn Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`add/`}
                >
                  {" "}
                  Add Draft Job List{" "}
                </Link>
              </div> */}
              <MuiTable
                loader={draftJobs?.loading}
                data={data}
                allData={draftJobs?.data}
                tableFilters={tableFilters}
                setTableFilters={setTableFilters}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DraftJobs;
