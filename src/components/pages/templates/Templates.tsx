import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IS_HEADER_COMPANY } from 'redux/reducers/config/app/app.slice';
import { TEMPLATES_DATA, TEMPLATES_RESPONSE } from 'redux/reducers/templates/templates.slice';
import { useSingleEffect, useUpdateEffect } from 'react-haiku';
import { DELETE_TEMPLATES_LIST, GET_TEMPLATES_LIST } from 'redux/actions/templates/templates.actions';
import MuiTable from 'components/common/muiTable/MuiTable';
import Title from 'components/common/pageTitle/Title';
import ActionMenuButton from 'components/common/actionMenuButton/ActionMenuButton';
import { Images } from 'helper/images';
import SearchBar from 'components/common/searchBar/SearchBar';
import LoadingSpinner from 'components/common/loadingSpinner/Loader';
import HomeIcon from '@mui/icons-material/Home';
import { PAGE_ROUTE, TEMPLATES_ROUTE } from 'routes/baseRoute';
import { GET_USER_PROFILE_DATA } from 'redux/reducers/auth/auth.slice';
import { ROLES } from 'helper/config';
import { API_URL } from 'helper/env';

interface TemplatesListprops {
  headerTitle?: boolean;
  companyInfoPage?: boolean;
  companyId?: string | number;
}

const Templates = (props: TemplatesListprops) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { headerTitle, companyInfoPage, companyId } = props;

  const headerCompany = useAppSelector(IS_HEADER_COMPANY);

  const templateList = useAppSelector(TEMPLATES_DATA);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const success = useAppSelector(TEMPLATES_RESPONSE);
  // React states
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    rowsPerPage: 10
  }); // pagination params state

  // Action Menu button states
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null
  });

  useSingleEffect(() => {
    dispatch(
      GET_TEMPLATES_LIST(
        userProfile?.data?.role === ROLES.MEMBER
          ? `${API_URL.TEMPLATES.MEMBER_JOB_TEMPLATE_LIST}`
          : userProfile?.data?.role === ROLES.ADMIN
          ? `${API_URL.TEMPLATES.ADMIN_JOB_TEMPLATE}`
          : `${API_URL.TEMPLATES.TEMPLATES_LIST}`,
        {
          ...tableFilters,
          company: userProfile?.data?.role === ROLES.MEMBER ? headerCompany : companyInfoPage ? companyId : ''
        },
        headerCompany
      )
    );
  });

  //   useEffect(() => {
  //     dispatch(defaultPageLoader());
  //   }, []);

  //fetch templates list when pagination change
  useUpdateEffect(() => {
    dispatch(
      GET_TEMPLATES_LIST(
        userProfile?.data?.role === ROLES.MEMBER
          ? `${API_URL.TEMPLATES.MEMBER_JOB_TEMPLATE_LIST}`
          : userProfile?.data?.role === ROLES.ADMIN
          ? `${API_URL.TEMPLATES.ADMIN_JOB_TEMPLATE}`
          : `${API_URL.TEMPLATES.TEMPLATES_LIST}`,
        {
          ...tableFilters,
          company: userProfile?.data?.role === ROLES.MEMBER ? headerCompany : companyInfoPage ? companyId : ''
        },
        headerCompany
      )
    );
  }, [tableFilters, success, headerCompany]);

  // useEffect(() => {
  //   // console.log('ss', DraftJobs)
  //   if (templateList) {
  //     let userData = [];
  //     // console.log("DraftJoblist == ", DraftJobs);
  //     templateList?.data?.results?.map((item, index) => {
  //       // item.template_name = item.title;
  //       item.title = item.template_name;
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
  //             to={`/templates/${item.id}`}
  //           >
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
  // }, [templateList]);

  //   const data = {
  //     columns: [
  //       {
  //         label: "Title",
  //         field: "title",
  //         sort: "asc",
  //         width: 500,
  //       },
  //       // {
  //       //   label: "Job",
  //       //   field: "job_title",
  //       //   sort: "asc",
  //       //   width: 500,
  //       // },

  //       {
  //         label: "Created",
  //         field: "created",
  //         sort: "asc",
  //         width: 500,
  //       },
  //       {
  //         label: "Modified",
  //         field: "modified",
  //         sort: "asc",
  //         width: 500,
  //       },
  //       // {
  //       //   label: "Status",
  //       //   field: "is_active",
  //       //   sort: "asc",
  //       //   width: 500,
  //       // },
  //       {
  //         label: "Action",
  //         field: "action",
  //         sort: "asc",
  //         width: 100,
  //       },
  //     ],
  //     rows: usersForRender,
  //   };

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
        field: 'template_name',
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
      templateList?.data?.results?.length > 0
        ? templateList?.data?.results?.map((item, index) => {
            return {
              template_name: item?.template_name ?? '',

              created: item?.created ?? '',

              modified: item?.modified ?? '',

              action: (
                <div>
                  <ActionMenuButton
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setAnchorEl={setAnchorEl}
                    anchorEl={anchorEl}
                    handleEdit={() => handleEdit(item)}
                    handleDelete={() => deleteHandler(item)}
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

  //set the edit mode
  const handleEdit = item => {
    console.log('item', item);
    setIsEditMode(true);

    setSelectedItem({ ...selectedItem, currentId: item?.id });

    navigate(`${PAGE_ROUTE.TEMPLATES}/${item.id}`);
  };

  const deleteHandler = item => {
    swal({
      title: 'Warning',
      text: 'Are you sure you want to delete this job template?',
      className: 'errorAlert',
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true
      },
      dangerMode: true
    }).then(willDelete => {
      if (willDelete !== 'Cancel') {
        dispatch(DELETE_TEMPLATES_LIST(item?.id));
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

  return (
    <>
      <div className={companyInfoPage === true ? 'card drop-shadow-none border z-[1] text-sm' : 'page-container'}>
        {/* <div className="savebtn Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`add/`}
                >
                  {" "}
                  Add Draft Job List{" "}
                </Link>
              </div> */}
        {headerTitle !== false && (
          <div className="flex-between">
            <Title title="Templates" customClass="page-title" />
            <div className="flex-between gap-[10px] font-sm leading-4 font-medium text-primary">
              <Link to="/">
                <HomeIcon color="disabled" />
              </Link>
              <span className="text-disable opacity-20">|</span>
              <Link to={TEMPLATES_ROUTE.HOME}>Templates</Link>
            </div>
          </div>
        )}
        <div className={`${companyInfoPage === true ? 'page-card mt-0' : 'page-card'}`}>
          <div className={`${companyInfoPage === true ? '' : 'p-[15px] '} flex-between flex-wrap pb-5`}>
            <SearchBar setTableFilters={setTableFilters} tableFilters={tableFilters} />
            {/* <Link to={`${WORKFLOW_ROUTE.HOME}/add`}>
              <button
                type="submit"
                // onClick={() => setOpenModal(true)}
                className="btn btn-primary btn-label bg-primary flex items-center px-[15px] py-[9px] max-w-[155px] w-full flex-center gap-2"
              >
                <AddIcon />
                <span className="btn-label">Add Workflow</span>
              </button>
            </Link> */}
          </div>
          {templateList?.loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <MuiTable
                loader={templateList?.loading}
                data={data}
                allData={templateList?.data}
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

export default Templates;
