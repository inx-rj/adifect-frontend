import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Button } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { CLEAR_JOBS, GET_JOBS_DETAILS, JOBS_DATA, JOBS_SUCCESS_MESSAGE } from 'redux/reducers/jobs/jobsList.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { GET_USER_PROFILE_DATA } from 'redux/reducers/auth/auth.slice';
import Title from 'components/common/pageTitle/Title';
import { useSingleEffect, useUpdateEffect } from 'react-haiku';
import {
  DELETE_JOB,
  GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST,
  GET_DETAIL_JOB_DATA
} from 'redux/actions/jobs/jobs.actions';
import BadgeUI from 'components/common/badge/BadgeUI';
import Filters from './Filters';
import LoadingSpinner from 'components/common/loadingSpinner/Loader';
import ActionMenuButton from 'components/common/actionMenuButton/ActionMenuButton';
import { ROLES } from 'helper/config';
import { IS_HEADER_COMPANY } from 'redux/reducers/config/app/app.slice';
import { Images } from 'helper/images';
import Slide from '@mui/material/Slide';
import SearchBar from 'components/common/searchBar/SearchBar';
import { MY_JOBS_ROUTE, PAGE_ROUTE } from 'routes/baseRoute';
import { API_URL } from 'helper/env';
import moment from 'moment';
import ApplyJobs from './ApplyJobs';

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore;
  return <Slide direction="left" ref={ref} {...props} />;
});

interface JobsListprops {
  headerTitle?: boolean;
  addJobs?: boolean;
  companyInfoPage?: boolean;
  companyId?: string | number;
}

const AdminJobsList = (props: JobsListprops) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { headerTitle, addJobs, companyInfoPage, companyId } = props;
  //   const [headerCompany, setHeaderCompany] = useOutletContext();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate(`/jobs/add`);
  };

  const [anchorElInProgress, setAnchorElInProgress] = React.useState(null);
  const openMenuInProgress = Boolean(anchorElInProgress);
  const [orderingName, setOrderingName] = useState('All Jobs');
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const menuHandleSort = (event, name) => {
    handleCloseInProgressSort();
    setOrderingInProgress(name);
    setOrderingName(name);
  };

  const handleCloseInProgressSort = () => {
    setAnchorElInProgress(null);
  };

  const handleClickInProgressSort = event => {
    setAnchorElInProgress(event.currentTarget);
  };

  const menuOptions = [
    { id: 1, name: 'All Jobs' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Expired' },
    { id: 4, name: 'Completed' }
  ];

  const [usersForRender, setUsersForRender] = useState([]);

  // const { jobData, loading, success } = useSelector(
  //   (state) => state.jobReducer
  // );
  //   const {
  //     jobData,
  //     next,
  //     previous,
  //     count,
  //     loading: jobLoading,
  //   } = useSelector((state) => state.jobReducer);
  //   const { success } = useSelector((state) => state.jobDeleteReducer);
  const userData = useAppSelector(GET_USER_PROFILE_DATA);

  const jobData = useAppSelector(JOBS_DATA);
  console.log('jobs list', jobData);

  const ListofJobs = jobData?.JobsListsList?.data?.results?.data ?? jobData?.JobsListsList?.data?.results;

  const headerCompany = useAppSelector(IS_HEADER_COMPANY);

  const jobDetails = useAppSelector(GET_JOBS_DETAILS);
  const successMessage = useAppSelector(JOBS_SUCCESS_MESSAGE);
  const [isOpen, setIsOpen] = useState(false);

  // const [jobId, setJobId] = useState();
  const [title, setTitle] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [level, setLevel] = useState();
  const [job_type, setJobType] = useState();
  const [company_type, setCompanyType] = useState();
  const [orderingInProgress, setOrderingInProgress] = useState('All Jobs');
  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [jobvideoDocumentsThumbs, setJobDocumentsvideoThumbs] = useState([]);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobSamplevideoDocumentsThumbs, setJobSamplevideoDocumentsThumbs] = useState([]);
  const [jobvideoDocuments, setJobDocumentsvideo] = useState([]);
  const [additionalvideoJobDocuments, setAdditionalvideoJobDocuments] = useState([]);
  const [newJobDetails, setNewJobDetails] = useState(false);
  const [searchfeedback, setSearchfeedback] = useState('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState(0);
  // const [page, setPage] = useState(1);

  // const { loading } = useSelector((state) => state.loaderReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState<{
    currentTooltip: null | number;
    currentId: null | number;
  }>({
    currentTooltip: null,
    currentId: null
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSettingMode, setIsSettingMode] = useState(false);
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    rowsPerPage: 10
  });

  const [isPopupLoading, setIsPopupLoading] = useState(true);
  const [open5, setOpen5] = useState(false);
  const [jobID, setJobID] = useState();

  useSingleEffect(() => {
    const data = {
      page: 1,
      currentPage: currentPage,
      orderingInProgress: orderingInProgress
    };

    dispatch(
      GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST(
        userData?.data?.role === ROLES.MEMBER
          ? `${API_URL.JOBS.MEMBERS_JOBS_LIST}`
          : userData?.data?.role === ROLES.ADMIN
          ? `${API_URL.JOBS.JOBS_LIST}`
          : userData?.data?.role === ROLES.CREATOR
          ? `${API_URL.JOBS.CREATOR_AVAILABLE_JOBS}`
          : `${API_URL.JOBS.AGENCY_JOBS}`,
        {
          ...tableFilters,
          company:
            userData?.data?.role === ROLES.MEMBER && headerCompany ? headerCompany : companyInfoPage ? companyId : ''
        },
        orderingInProgress
      )
    );
  });

  useUpdateEffect(() => {
    const data = {
      page: currentPage,
      // currentPage: currentPage,
      orderingInProgress: orderingInProgress
    };
    // dispatch(LIST_ALL_JOBS(data));

    dispatch(
      GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST(
        userData?.data?.role === ROLES.MEMBER
          ? `${API_URL.JOBS.MEMBERS_JOBS_LIST}`
          : userData?.data?.role === ROLES.ADMIN
          ? `${API_URL.JOBS.JOBS_LIST}`
          : userData?.data?.role === ROLES.CREATOR
          ? `${API_URL.JOBS.CREATOR_AVAILABLE_JOBS}`
          : `${API_URL.JOBS.AGENCY_JOBS}`,
        // tableFilters
        {
          ...tableFilters,
          company:
            userData?.data?.role === ROLES.MEMBER && headerCompany ? headerCompany : companyInfoPage ? companyId : ''
        },
        orderingInProgress
      )
    );
  }, [successMessage, currentPage, headerCompany, orderingInProgress, tableFilters, searchfeedback]);
  const closePopup = () => {
    setIsOpen(false);
  };

  // Handle Pagination
  const pageHandler = gotopage => {
    setCurrentPage(gotopage);
    setTableFilters({ ...tableFilters, page: gotopage });
  };

  const handleClickOpen = item_id => {
    setIsPopupLoading(true);
    setTimeout(() => {
      setIsPopupLoading(false);
    }, 1200);
    console.log('call', item_id);
    setJobID(item_id);
    // dispatch({ type: JOB_DETAILS_RESET });
    // // const timer = setTimeout(() => {
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    // };

    // const checking = axiosPrivate
    //   .get(`${API_URL}jobs/${item_id}/`)
    //   .then((res) => {
    //     setJobId(res.data.id);
    //     setTitle(res.data.title);
    //     setJobDescription(res.data.description);
    //     setDeliveryDate(res.data.expected_delivery_date);
    //     setProposedPrice(res.data.price); // Fix Added
    //     setProposedDate(new Date(res.data.expected_delivery_date)); // Fix Added
    //     setOfferPrice(res.data.price);
    //     setTags(res.data.tags);
    //     setCategory(res.data.category);
    //     setSkills(res.data.skills);
    //     setIndustry(res.data.industry);
    //     setLevel(res.data.level);
    //     setJobType(res.data.get_jobType_details);
    //     setCompanyType(res.data.company_name);
    //     setuserdata(res.data.username);
    //     setJobAppliedId(res.data.job_applied_id);
    //     // jobAppliedId.current = res.data.job_applied_id;

    //     if (res.data.job_applied_status == "True") {
    //       const config = {
    //         headers: {
    //           "Content-type": "application/json",
    //           Authorization: `Bearer ${userData.token}`,
    //         },
    //       };
    //       const checking = axios
    //         .get(
    //           `${BACKEND_API_URL}job-applied/${res.data.job_applied_id}/`,
    //           config
    //         )
    //         .then((res) => {
    //           setUpdateProposal(true);
    //           // if (res.data.image) {
    //           //   setFiles(res.data.image);
    //           // }
    //           // if (formSampleUrls) {
    //           //   setFormSampleUrls(res.data.sample_work_url);
    //           // }
    //           setquestion(res.data.question);
    //           setcoverletter(res.data.cover_letter);
    //           if (res.data.proposed_price) {
    //             setlink(res.data.proposed_price);
    //           }
    //           // setdeliverydatevalue(res.data.proposed_due_date)
    //         })
    //         .catch({});
    //     }

    //     const created = moment(res.data.created).format("MM-DD-YYYY");
    //     setcreateddate(created);
    //     let arrJobDocuments = [];
    //     let arrvideoJobDocuments = [];
    //     let arrAdditionalJobDocuments = [];
    //     let arrAdditionalvideoJobDocuments = [];
    //     let arrJobDocumentsThumbs = [];
    //     let arrvideoJobDocumentsThumbs = [];
    //     let arrAdditionalJobDocumentsThumbs = [];
    //     let arrvideoAdditionalJobDocumentsThumbs = [];
    //     if (res.data.images.length > 0) {
    //       for (let i = 0; i < res.data.images.length; i++) {
    //         if (res.data.images[i].is_video == false) {
    //           // console.log(jobDetails.images[i].job_images)
    //           arrJobDocuments.push(res.data.images[i].job_images);
    //           arrAdditionalJobDocuments.push(
    //             res.data.images[i].work_sample_images
    //           );
    //           arrJobDocumentsThumbs.push(
    //             res.data.images[i].job_images_thumbnail
    //           );
    //           arrAdditionalJobDocumentsThumbs.push(
    //             res.data.images[i].work_sample_thumbnail
    //           );
    //           setJobDocuments(arrJobDocuments.filter((x) => x !== null));
    //           setAdditionalJobDocuments(
    //             arrAdditionalJobDocuments.filter((x) => x !== null)
    //           );
    //           setJobDocumentsThumbs(
    //             arrJobDocumentsThumbs.filter((x) => x !== null)
    //           );
    //           setJobSampleDocumentsThumbs(
    //             arrAdditionalJobDocumentsThumbs.filter((x) => x !== null)
    //           );
    //         } else {
    //           arrvideoJobDocuments.push(res.data.images[i].job_images);
    //           arrAdditionalvideoJobDocuments.push(
    //             res.data.images[i].work_sample_images
    //           );
    //           arrvideoJobDocumentsThumbs.push(
    //             res.data.images[i].job_images_thumbnail
    //           );
    //           arrvideoAdditionalJobDocumentsThumbs.push(
    //             res.data.images[i].work_sample_thumbnail
    //           );
    //           setJobDocumentsvideo(
    //             arrvideoJobDocuments.filter((x) => x !== null)
    //           );
    //           setAdditionalvideoJobDocuments(
    //             arrAdditionalvideoJobDocuments.filter((x) => x !== null)
    //           );
    //           setJobDocumentsvideoThumbs(
    //             arrvideoJobDocumentsThumbs.filter((x) => x !== null)
    //           );
    //           setJobSamplevideoDocumentsThumbs(
    //             arrvideoAdditionalJobDocumentsThumbs.filter((x) => x !== null)
    //           );
    //         }
    //       }
    //     }

    //     const start = res.data.expected_delivery_date;
    //     let today = new Date().toISOString().slice(0, 10);
    //     const diffInMs = new Date(start) - new Date(today);
    //     const diffIndeliveryDays = diffInMs / (1000 * 60 * 60 * 24);
    //     const diffInHours = diffInMs / (1000 * 60 * 60);

    //     const selectTime = new Date();
    //     selectTime.setHours(24, 0, 0, 0);
    //     const currentTime = new Date();

    //     const result1 = selectTime.getTime() - currentTime.getTime();

    //     const result2 = result1 / (1000 * 60 * 60);

    //     const resultHours = Math.floor(result2);
    //     if (diffIndeliveryDays < 1 && diffIndeliveryDays > 0) {
    //       setdeliveryhoursvalue(resultHours);
    //       setdeliveryhours(true);
    //       setdeliverydatevalue(false);
    //     } else if (diffIndeliveryDays > 1) {
    //       setdeliverydata(diffIndeliveryDays);
    //       setdeliveryhours(false);
    //       setdeliverydatevalue(true);
    //     } else if (diffIndeliveryDays < 0) {
    //       setdeliveryhours(false);
    //       setdeliverydatevalue(false);
    //     } else {
    //       setdeliveryhours(false);
    //       setdeliverydatevalue(false);
    //     }

    //     const current1 = new Date(res.data.expected_delivery_date);
    //     const current2 = new Date(res.data.expected_delivery_date);
    //     const current3 = new Date(res.data.expected_delivery_date);

    //     // it adds 1 day to the current date
    //     current1.setDate(current1.getDate() + 1);
    //     current2.setDate(current2.getDate() + 2);
    //     current3.setDate(current3.getDate() - 1);
    //     const coverter1 = moment(current1).format("MM-DD-YYYY");
    //     const coverter2 = moment(current2).format("MM-DD-YYYY");
    //     const coverter3 = moment(current3).format("MM-DD-YYYY");
    //     setdateadd1(coverter1);
    //     setdateadd2(coverter2);
    //     setdateadd3(coverter3);

    //     const per10 = 10;
    //     const per20 = 20;
    //     const per30 = 30;
    //     const n = Number(res.data.price);

    //     const percentage10 = n + (n / 100) * per10;
    //     const percentage20 = n + (n / 100) * per20;
    //     const percentage30 = n + (n / 100) * per30;

    //     set10value(percentage10);
    //     set20value(percentage20);
    //     set30value(percentage30);
    //   });
    // .catch((err) => {});
    // }, 100);

    setOpen5(true);

    // return () => clearTimeout(timer);
  };

  //Open Job openup based on Id
  const openPopup = item_id => {
    dispatch(GET_DETAIL_JOB_DATA(item_id));

    setNewJobDetails(true);

    setIsOpen(!isOpen);
  };

  //open details page
  const handleOpen = item => {
    navigate(`${PAGE_ROUTE.MY_JOBS}/details/${item.id}`);
  };

  //set the edit mode
  const handleEdit = item => {
    setIsEditMode(true);
    navigate(`${PAGE_ROUTE.MY_JOBS}/${item.id}`);
  };

  // Delete Job
  const deleteHandler = id => {
    swal({
      title: 'Warning',
      text: 'Are you sure you want to delete this job?',
      className: 'errorAlert',
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true
      },
      dangerMode: true
      // timer: 1500,
    }).then(willDelete => {
      if (willDelete !== 'Cancel') {
        dispatch(DELETE_JOB(id)).then(r => r);
      }
    });
    // if (window.confirm("Are you sure you want to delete this job?")) {
    //   dispatch(deleteJob(id));
    // }
  };

  useEffect(() => {
    if (jobData?.JobsListsList) {
      let numberPages = Math.ceil(jobData?.JobsListsList?.data?.count / 6);
      setPages(numberPages);
    }
  }, [jobData?.JobsListsList, headerCompany, searchfeedback, orderingInProgress]);

  useEffect(() => {
    if (jobDetails?.details) {
      setTitle(jobDetails?.details?.title);
      setJobDescription(jobDetails?.details?.description);
      setJobDocuments(jobDetails?.details?.images);
      setDeliveryDate(jobDetails?.details?.expected_delivery_date);
      setOfferPrice(jobDetails?.details?.price);
      setTags(jobDetails?.details?.tags);
      setCategory(jobDetails?.details?.category);
      setSkills(jobDetails?.details?.skills);
      setIndustry(jobDetails?.details?.industry);
      setLevel(jobDetails?.details?.level);
      setJobType(jobDetails?.details?.get_jobType_details);
      setCompanyType(jobDetails?.details?.company_name);

      let arrJobDocuments = [];
      let arrvideoJobDocuments = [];
      let arrAdditionalJobDocuments = [];
      let arrAdditionalvideoJobDocuments = [];
      let arrJobDocumentsThumbs = [];
      let arrvideoJobDocumentsThumbs = [];
      let arrAdditionalJobDocumentsThumbs = [];
      let arrvideoAdditionalJobDocumentsThumbs = [];
      // alert("Okay")
      // console.log("res.data.images -- ", jobDetails?.details?.images);
      if (jobDetails?.details?.images.length > 0) {
        for (let i = 0; i < jobDetails?.details?.images.length; i++) {
          if (jobDetails?.details?.images[i].is_video == false) {
            console.log(jobDetails?.details?.images[i].job_images);
            arrJobDocuments.push(jobDetails?.details?.images[i].job_images);
            arrAdditionalJobDocuments.push(jobDetails?.details?.images[i].work_sample_images);
            arrJobDocumentsThumbs.push(jobDetails?.details?.images[i].job_images_thumbnail);
            arrAdditionalJobDocumentsThumbs.push(jobDetails?.details?.images[i].work_sample_thumbnail);
            setJobDocuments(arrJobDocuments.filter(x => x !== null));
            setAdditionalJobDocuments(arrAdditionalJobDocuments.filter(x => x !== null));
            setJobDocumentsThumbs(arrJobDocumentsThumbs.filter(x => x !== null));
            setJobSampleDocumentsThumbs(arrAdditionalJobDocumentsThumbs.filter(x => x !== null));
          } else {
            arrvideoJobDocuments.push(jobDetails?.details?.images[i].job_images);
            arrAdditionalvideoJobDocuments.push(jobDetails?.details?.images[i].work_sample_images);
            arrvideoJobDocumentsThumbs.push(jobDetails?.details?.images[i].job_images);
            arrvideoAdditionalJobDocumentsThumbs.push(jobDetails?.details?.images[i].work_sample_thumbnail);
            setJobDocumentsvideo(arrvideoJobDocuments.filter(x => x !== null));
            setAdditionalvideoJobDocuments(arrAdditionalvideoJobDocuments.filter(x => x !== null));
            setJobDocumentsvideoThumbs(arrvideoJobDocumentsThumbs.filter(x => x !== null));
            setJobSamplevideoDocumentsThumbs(arrvideoAdditionalJobDocumentsThumbs.filter(x => x !== null));
          }
        }
      }

      setJobDocuments(arrJobDocuments.filter(x => x !== null));
      setJobDocumentsvideo(arrvideoJobDocuments.filter(x => x !== null));
      setAdditionalJobDocuments(arrAdditionalJobDocuments.filter(x => x !== null));
      setAdditionalvideoJobDocuments(arrAdditionalvideoJobDocuments.filter(x => x !== null));
      setJobDocumentsThumbs(arrJobDocumentsThumbs.filter(x => x !== null));
      setJobDocumentsvideoThumbs(arrvideoJobDocumentsThumbs.filter(x => x !== null));
      setJobSampleDocumentsThumbs(arrAdditionalJobDocumentsThumbs.filter(x => x !== null));
      setJobSamplevideoDocumentsThumbs(arrvideoAdditionalJobDocumentsThumbs.filter(x => x !== null));
      setNewJobDetails(false);
    }
  }, [jobDetails?.details, newJobDetails]);

  return (
    <>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          {headerTitle !== false && (
            <div className="pb-5">
              <Title title="Jobs List" />
            </div>
          )}
          <div
            className={
              companyInfoPage === true ? 'card drop-shadow-none border z-[1] text-sm' : 'bg-white p-5 rounded-xl'
            }
          >
            <div className="w-full ">
              {/* <div className="Fresh">
                <h1>
                  Hello {userData.user.first_name} {userData.user.last_name}
                </h1>
              </div> */}
              <div
                className={`flex items-center justify-between ${userData?.data?.role !== ROLES.CREATOR ? 'mb-5' : ''}`}
              >
                <div className="flex gap-4">
                  {/* <input
                      className="input-style max-w-[300px]"
                      type="text"
                      value={searchfeedback}
                      placeholder="Search job"
                      onChange={(e) => setSearchfeedback(e.target.value)}
                    /> */}
                  {
                    // userData?.data?.role !== ROLES.MEMBER ||
                    userData?.data?.role !== ROLES.CREATOR && (
                      <SearchBar setTableFilters={setTableFilters} tableFilters={tableFilters} />
                    )
                  }
                  {/* <img className="newSearchLogoPp" src="/img/newSearchIcon.png" /> */}
                </div>
                {userData?.data?.role !== ROLES.MEMBER && userData?.data?.role !== ROLES.CREATOR && (
                  <div className="w-[115px] ml-auto">
                    <h6 className="cursor-pointer flex gap-2" onClick={handleClickInProgressSort}>
                      <img src={Images.Sort} alt="" /> {orderingName}
                    </h6>{' '}
                    <Menu
                      id="long-menu"
                      //   MenuProps={menuProps}
                      anchorEl={anchorElInProgress}
                      keepMounted
                      open={openMenuInProgress}
                      onClose={handleCloseInProgressSort}
                    >
                      {menuOptions.map(option => (
                        <MenuItem className="agencyjobtp" key={option.id} onClick={e => menuHandleSort(e, option.name)}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                )}
                {addJobs !== false && userData?.data?.role !== ROLES.CREATOR && (
                  <div>
                    <Link className="btn btn-primary" to={`/jobs/add`}>
                      {' '}
                      {/* Create a Job{" "} */}
                      Add Jobs
                    </Link>
                  </div>
                )}
              </div>
              {/* {isLoading || job_detail_loading ? (
            <LoadingSpinner />
          ) : ( */}
              {/* {isLoading ? (
            <LoadingSpinner />
          ) : jobLoading ? (
            <LoadingSpinner />
          ) : ( */}
              <>
                <div className="w-full flex gap-4">
                  {/* <input type="button" value="Click to Open Popup" onClick={togglePopup} /> */}
                  <Dialog
                    className="job-custom_popup fixed z-50 inset-0"
                    open={isOpen}
                    // @ts-ignore;
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={closePopup}
                    aria-describedby="alert-dialog-slide-description "
                  >
                    {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent>
                      <div className="Topallpage">
                        <div className="MarketingDetails-popup ContentDiv border-radius">
                          <div className="Marketingcamaign">
                            <div className="CategorylistName">
                              <div className="jobdesadminjoblist1">
                                {/* <h2>{jobDetails?.details?.title}</h2> */}
                                <Title customClass="truncate " title={jobDetails?.details?.title} />
                              </div>
                              {/* <div className="FreshBtn">
                                  <Link
                                    className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                                    to={`/jobs/apply/${jobId}`}
                                  >
                                    {" "}Submit{" "}
                                  </Link>
                                </div> */}
                            </div>

                            <p className="duedate duedate_sec my-3 text-[#d14f4f] font-bold text-base">
                              Due on: {jobDetails?.details?.expected_delivery_date}
                            </p>
                            <div className="jobdetailsInProgress">
                              {/* <Link className="jobdetailsInProgressBtn" to="#">
                                In Progress
                              </Link> */}
                              {/** Check for condition Admin user pending */}
                              {jobDetails?.details?.hired_users == '' ? (
                                <>
                                  <BadgeUI variant="review" customClass="max-w-max text-sm font-semibold">
                                    Unassigned
                                  </BadgeUI>
                                </>
                              ) : (
                                <>
                                  <BadgeUI variant="progress" customClass="max-w-max text-sm font-semibold">
                                    In Progress
                                  </BadgeUI>
                                </>
                              )}
                            </div>
                            <p className="INvehicula flex-none order-2 flex-grow-0 w-full text-base text-[(rgba(0_0_0_0.7))]">
                              {jobDetails?.details?.description}
                            </p>
                            <h5 className="ProvidedTitle text-[#000] font-bold my-4">Provided Media:</h5>
                            {(jobDocuments?.length > 0 || jobvideoDocuments?.length > 0) && (
                              <>
                                <h6 className="text-base font-bold text-[#000]">Job Documents</h6>
                              </>
                            )}

                            <div className="mediaimg Providedmediaimg flex gap-2">
                              {jobDocuments?.map((item, index) => (
                                <div key={index}>
                                  <a
                                    //   index_item={index}
                                    target="_blank"
                                    href={`${item}`}
                                    // href={item}
                                  >
                                    <div key={index}>
                                      <img className="" src={`${jobDocumentsThumbs[index]}`} alt="" />
                                    </div>
                                  </a>
                                </div>
                              ))}

                              {jobvideoDocuments?.map((item, index) => (
                                <div key={index}>
                                  <video className="videounderagency" controls>
                                    <source src={`${jobvideoDocumentsThumbs[index]}`} type="video/mp4" />
                                  </video>
                                </div>
                              ))}
                            </div>

                            {/* {jobDocuments?.length < 1 && <div>N/A</div>} */}
                            {(additionalJobDocuments?.length > 0 || additionalvideoJobDocuments?.length > 0) && (
                              <>
                                <h6 className="text-base font-bold text-[#000]">Additional Job Documents</h6>
                              </>
                            )}

                            <div className="mediaimg Providedmediaimg flex gap-2">
                              {additionalJobDocuments?.map((item, index) => {
                                return (
                                  <div key={index}>
                                    <a
                                      //   index_item={index}
                                      target="_blank"
                                      href={`${item}`}
                                      // href={item}
                                    >
                                      <div key={index}>
                                        <img className="" src={`${jobSampleDocumentsThumbs[index]}`} alt="" />
                                      </div>
                                    </a>
                                  </div>
                                );
                              })}

                              {additionalvideoJobDocuments?.map((item, index) => (
                                <div key={index}>
                                  <video className="videounderagency" controls>
                                    <source src={`${jobSamplevideoDocumentsThumbs[index]}`} type="video/mp4" />
                                  </video>
                                </div>
                              ))}
                            </div>

                            {/* {additionalJobDocuments?.length < 1 && <div>N/A</div>} */}
                            {/* <div className="mediaimg">
                            {jobDetails?.images?.map((item, index) => (
                              <div key={index}>
                                {item.job_images
                                  ?.slice(
                                    ((item.job_images.lastIndexOf("/") - 1) >>>
                                      0) +
                                      2
                                  )
                                  .split(".")
                                  .pop()
                                  .match(/(jpg|jpeg|png|gif)$/i) && (
                                  <a
                                    index_item={index}
                                    target="_blank"
                                    href={`${item?.job_images}`}
                                  >
                                    <li key={index}>
                                      <img
                                        className=""
                                        src={`${item?.job_images}`}
                                        alt=""
                                      />
                                    </li>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                          {jobDetails?.images?.map((item, index) => (
                            <div key={index}>
                              {!item.job_images
                                ?.slice(
                                  ((item.job_images.lastIndexOf("/") - 1) >>>
                                    0) +
                                    2
                                )
                                .split(".")
                                .pop()
                                .match(/(jpg|jpeg|png|gif)$/i) && (
                                <p className="mt-3 f-16" key={index}>
                                  <img
                                    className="mr-2"
                                    src="/img/Document.png"
                                    alt=""
                                  />
                                  <a
                                    index_item={index}
                                    // href={item.job_images}
                                    href={`${item?.job_images}`}
                                    target="_blank"
                                    download
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span>
                                      {item.job_images?.slice(
                                        ((item.job_images.lastIndexOf("/") -
                                          1) >>>
                                          0) +
                                          2
                                      )}
                                    </span>
                                  </a>
                                </p>
                              )}
                            </div>
                          ))}
                          {!jobDetails?.images?.length && <>N/A</>} */}
                          </div>
                          <hr className="b-top w-full  my-5 h-2 " />

                          <div className="max-w-[460px] w-full">
                            <div className="grid grid-cols-2 my-3">
                              <div className="flex gap-3">
                                <h5 className="text-base font-semibold">Job Type: </h5>
                                <p className="fixedpriceDetail">{jobDetails?.details?.get_jobType_details}</p>
                              </div>
                              <div className="flex gap-3">
                                <h5 className="text-base font-semibold">Industry: </h5>
                                <p className="fixedpriceDetail">{jobDetails?.details?.industry?.industry_name}</p>
                              </div>
                            </div>
                            {jobDetails?.details?.price && (
                              <>
                                <div className="flex gap-3 my-3">
                                  <h5 className="text-base font-semibold">Budget: </h5>
                                  <p className="text-base font-semibold">${jobDetails?.details?.price}</p>
                                </div>
                                <div className="flex gap-3 my-3">
                                  <h5 className="text-base font-semibold">Level: </h5>
                                  <p className="text-base font-semibold">{jobDetails?.details?.level?.level_name}</p>
                                </div>
                              </>
                            )}
                          </div>
                          <hr
                            className="b-top w-full my-5 h-2 "
                            // float: left bg-[#2472fc];
                          />

                          <div className="flex gap-3 my-3">
                            <h5 className="text-base font-semibold">Company: </h5>
                            <p className="fixedpriceDetail CompanyNameIn text-[#2472fc] text-base max-w-[500px]">
                              {jobDetails?.details?.company_name ? jobDetails?.details?.company_name : 'N/A'}
                            </p>
                          </div>
                          <hr className="b-top  my-5 h-2 " />
                          {jobDetails?.details?.skills?.length > 0 && (
                            <>
                              <div className="Skill Budget-Title flex items-baseline gap-2">
                                <h5 className="skillsjobde mb-4 text-base font-semibold">Skills:</h5>
                                <div className="Skill mt-2 flex flex-wrap gap-2">
                                  {jobDetails?.details?.skills?.map((item, index) => (
                                    <div key={index}>
                                      <BadgeUI variant="primary" customClass="max-w-max text-sm font-semibold">
                                        {item?.skill_name}
                                        {/* <Link to="#">{item.skill_name}</Link> */}
                                      </BadgeUI>
                                    </div>
                                  ))}
                                  {jobDetails?.details?.skills?.length < 1 && (
                                    <>
                                      <h3 className="text-[#A0A0A0] text-base font-semibold">N/A</h3>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                          {jobDetails?.details?.tags?.length > 0 && (
                            <>
                              <div className="Skill Budget-Title flex items-baseline gap-2">
                                <h5 className="skillsjobde mb-4 mt-4 flex flex-wrap gap-2">Tags:</h5>
                                <div className="Skill mt-2 flex flex-wrap gap-2">
                                  {jobDetails?.details?.tags?.split(',')?.map((tag, index) => (
                                    <div key={index}>
                                      <BadgeUI variant="primary" customClass="max-w-max text-sm font-semibold">
                                        {tag}
                                      </BadgeUI>
                                    </div>
                                  ))}
                                  {jobDetails?.details?.tags?.length < 1 && (
                                    <>
                                      <h3 className="text-[#A0A0A0] text-base font-semibold">N/A</h3>
                                    </>
                                  )}
                                </div>

                                {/* {tags.split(",")?.map((tag, index) => (
                                <li key={index}>
                                  <Link to="#">{tag}</Link>
                                </li>
                              ))} */}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={closePopup}>Close</Button>
                    </DialogActions>
                  </Dialog>

                  {/* {isOpen && (
                  <>
                    <div className="job-popup-box" id="popup-box">
                      <div className="job-blocker" onClick={closePopup}></div>
                      <div className="job-box">
                        {/* <span className="close-icon" onClick={closePopup}>x</span> */}
                  {/* {JSON.stringify(jobDetails)} 
                        

                      </div>
                    </div>
                  </>
                )} */}
                  <div className="">
                    <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                      {ListofJobs?.map((item, index) => {
                        return (
                          <div className="border border-1 rounded-xl">
                            <div className="w-full p-5 flex gap-5">
                              <>
                                {item?.image_url !== '' ? (
                                  <img
                                    className="h-[75px] w-[75px] border border-none rounded-xl"
                                    src={item?.image_url?.split(',')[0]}
                                    alt=""
                                  />
                                ) : (
                                  <div className="bg-gray-100 h-[75px] max-w-[75px] w-full border border-none rounded-xl"></div>
                                )}
                              </>
                              <div className="w-full max-w-[calc(100% - 75px)] ">
                                <div className="flex gap-4 justify-between">
                                  <div className="flex gap-4 items-center">
                                    <Link to={`${PAGE_ROUTE.MY_JOBS}/details/${item.id}`}>
                                      <Title customClass="truncate " title={item.title} />
                                    </Link>
                                    {item?.level?.level_name && (
                                      <BadgeUI variant="primary">{item?.level?.level_name}</BadgeUI>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <div className="submitcreatorlist">
                                      <>
                                        {(userData?.data?.role === ROLES.MEMBER &&
                                          userData?.data?.user_level === 1 &&
                                          userData?.data?.user_level === 1 &&
                                          item?.job_applied_status == 'False') ||
                                          (userData?.data?.role === ROLES.CREATOR && (
                                            <button
                                              type="button"
                                              className="btn btn-primary Smalldev border-radius applynowbtn_M"
                                              onClick={() => handleClickOpen(`${item?.id}`)}
                                            >
                                              Apply Now
                                            </button>
                                          ))}
                                      </>
                                      {item?.id == jobID && (
                                        <>
                                          <ApplyJobs
                                            setOpen5={setOpen5}
                                            open5={open5}
                                            isPopupLoading={isPopupLoading}
                                            jobsId={item?.id}
                                          />
                                        </>
                                      )}
                                    </div>
                                    <ActionMenuButton
                                      selectedItem={selectedItem}
                                      setSelectedItem={setSelectedItem}
                                      setAnchorEl={setAnchorEl}
                                      anchorEl={anchorEl}
                                      handleView={() => openPopup(item?.id)}
                                      handleEdit={() => handleEdit(item)}
                                      // handleSetting={() =>
                                      //   handleSetting(item)
                                      // }
                                      handleDelete={() => deleteHandler(item?.id)}
                                      handleOpen={() => handleOpen(item)}
                                      // showSetting={
                                      //   userProfile?.data?.role ===
                                      //   ROLES.ADMIN
                                      // }
                                      showEdit={
                                        item?.is_edit ||
                                        (userData?.data?.role !== ROLES.CREATOR &&
                                          userData?.data?.role == ROLES.MEMBER &&
                                          userData?.data?.user_level === 1 &&
                                          userData?.data?.user_level === 1)
                                      }
                                      showView={
                                        userData?.data?.role == ROLES.MEMBER &&
                                        userData?.data?.user_level === 1 &&
                                        userData?.data?.user_level === 1
                                          ? true
                                          : false
                                      }
                                      showDelete={
                                        userData?.data?.role !== ROLES.CREATOR &&
                                        userData?.data?.role == ROLES.MEMBER &&
                                        userData?.data?.user_level === 1 &&
                                        userData?.data?.user_level === 1
                                      }
                                      showOpen={userData?.data?.role !== ROLES.CREATOR}
                                      isEditMode={isEditMode}
                                      item={{
                                        id: item?.id,
                                        isActive: item?.is_active
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="text-base font-medium text-[#A0A0A0] break-all my-3">
                                  {item?.description?.length > 300
                                    ? item?.description?.substring(0, 300) + '...'
                                    : item?.description}
                                </div>
                                <div className="flex gap-2 my-2">
                                  <span className="text-base font-medium text-[#A0A0A0]">Skills: </span>
                                  <div className="flex flex-wrap gap-2">
                                    {item.skills?.length > 0 ? (
                                      item.skills?.map((item, index) => (
                                        <BadgeUI variant="primary" key={index}>
                                          {item?.skill_name}
                                        </BadgeUI>
                                      ))
                                    ) : (
                                      <>N/A</>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2 my-2">
                                  <span className="text-base font-medium text-[#A0A0A0]">Tags: </span>

                                  <div className="flex flex-wrap gap-2">
                                    {item.tags?.length > 0
                                      ? item.tags?.split(',')?.map((item, index) => (
                                          <BadgeUI variant="primary" key={index}>
                                            {item}
                                          </BadgeUI>
                                        ))
                                      : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {!ListofJobs?.length && (
                    <div className=" ">
                      <h2 className="text-lg font-bold text-center p-5">NO DATA FOUND</h2>
                    </div>
                  )}

                  {/* <div className="w-full max-w-[308px]">
                    <div className="grid grid-cols-1 gap-4">
                      <Filters />
                    </div>
                  </div> */}
                </div>
              </>
            </div>
            {pages > 1 && (
              <div className="adminjobpagination adminpagintionpage flex justify-end pt-6">
                <Stack spacing={2}>
                  <Pagination
                    page={currentPage}
                    shape="rounded"
                    size="large"
                    count={pages}
                    onChange={(e, page) => {
                      pageHandler(page);
                    }}
                    color="primary"
                  />
                </Stack>
              </div>
            )}
          </div>
        </>
      )}

      {/* {pages > 1 && (
            <div className="adminjobpagination">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage == 1}
                  onClick={() => goToPrevPage(currentPage - 1)}
                />
                {[...Array(pages).keys()].map((x) => (
                  <>
                    <LinkContainer
                      key={x + 1}
                      to={`/jobs/list?page=${x + 1}`}
                      onClick={() => pageHandler(x + 1)}
                    >
                      <Pagination.Item active={x + 1 === currentPage}>
                        {x + 1}
                      </Pagination.Item>
                    </LinkContainer>
                  </>
                ))}
                <Pagination.Next
                  disabled={currentPage == pages}
                  onClick={() => goToNextPage(currentPage + 1)}
                />
              </Pagination>
            </div>
          )} */}
      {/* <div className="Topallpage"></div> */}
      {/* </>
      )} */}
    </>
  );
};

export default AdminJobsList;
