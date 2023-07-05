import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { listAllCompanies } from "../../redux/actions/company-actions";
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';

import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IN_HOUSE_USER_LIST, IN_HOUSE_USER_SUCCESS } from 'redux/reducers/inHouseUser/inHouseUser.slice';
import { SKILLS_LIST } from 'redux/reducers/skills/skills.slice';
import { LEVELS_LIST } from 'redux/reducers/levels/levels.slice';
import { INDUSTRY_LIST } from 'redux/reducers/industries/industries.slice';
import { GET_USER_PROFILE_DATA } from 'redux/reducers/auth/auth.slice';
import { IS_HEADER_COMPANY } from 'redux/reducers/config/app/app.slice';
import { COMPANY_LIST } from 'redux/reducers/companyTab/companyTab.slice';
import { GET_JOBS_DETAILS } from 'redux/reducers/jobs/jobsList.slice';
import { SET_WORKFLOW_LIST_DATA, WORKFLOW_LIST } from 'redux/reducers/workFlow/workFlow.slice';
import { SET_TEMPLATES_LOADING, TEMPLATES_DETAILS, TEMPLATES_RESPONSE } from 'redux/reducers/templates/templates.slice';
import axiosPrivate from 'api/axios';
import { API_URL } from 'helper/env';
import { ROLES } from 'helper/config';
import { GET_TEMPLATES_DETAILS, UPDATE_TEMPLATES_LIST } from 'redux/actions/templates/templates.actions';
import { GET_IN_HOUSE_USER_LIST } from 'redux/actions/inHouseUser/inHouseUser.actions';
import LoadingSpinner from 'components/common/loadingSpinner/Loader';
import { Add, BorderColorOutlined, CloseOutlined, FileUploadOutlined } from '@mui/icons-material';
import { GET_DAM_MEDIA_COLLECTION_VIEW } from 'redux/actions/media/Dam.actions';
import { DAM_DATA, DAM_SUCCESS } from 'redux/reducers/media/dam.slice';
import { useSingleEffect, useUpdateEffect } from 'react-haiku';
import { ADD_SKILL_SET_LIST, GET_ALL_SKILLS_LIST, GET_SKILLS_LIST } from 'redux/actions/skills/skills.action';
import { GET_LEVELS_LIST } from 'redux/actions/levels/levels.action';
import { GET_INDUSTRY_LIST } from 'redux/actions/industries/industries.actions';
import { GET_COMPANY_LIST } from 'redux/actions/companyTab/companyTab.actions';
import { TablePaginationType } from 'helper/types/muiTable/muiTable';
import { Images } from 'helper/images';
import { TEMPLATES_ROUTE } from 'routes/baseRoute';
import { isEmpty } from 'helper/utility/customFunctions';
import MuiAutoComplete from 'components/common/muiAutocomplete/MuiAutoComplete';
import { GET_WORKFLOW_LIST } from 'redux/actions/workFlow/workFlow.actions';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const EditTemplate = () => {
  const { templateId } = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [sampledam, setsampledam] = useState(false);
  const [dam, setdam] = useState(false);
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    rowsPerPage: 10,
    search: ''
  });

  const [searchType, setSearchType] = useState('');
  // const { loading } = useSelector((state) => state.loaderReducer);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  const [files, setFiles] = useState([]);

  const imageMimeType = /image\/(svg|eps|png|jpg|jpeg|gif)/i;

  const moveit = useAppSelector(DAM_SUCCESS);

  const Collectionviewdata = useAppSelector(DAM_DATA);

  const inHouseUserList = useAppSelector(IN_HOUSE_USER_LIST);

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  useSingleEffect(() => {
    dispatch(GET_TEMPLATES_DETAILS(templateId));
    dispatch(GET_SKILLS_LIST(tableFilters));
  });

  const maxImageFileSize = 10000000;

  const [fileGallery, setFileGallery] = useState([]);
  const [divid, setdivid] = useState('4');
  const [show, setShow] = useState(false);
  const [textchange, settextchange] = useState(false);
  const [showdraft, setShowdraft] = useState(true);
  // const [showtemplate, setShowtemplate] = useState(true);
  const [imgUrl, setImgUrl] = useState('');
  const [taskid, settaskid] = useState('');
  const [sampleimgUrl, setsampleImgUrl] = useState('');
  const [samplemediafile, setexistingsamplemediafile] = useState([]);
  const [samplemediafile1, setexistingsamplemediafile1] = useState([]);
  const [openVault, setOpenVault] = useState(false);
  const [openVault1, setOpenVault1] = useState(false);
  const [mediafile, setexistingmediafile] = useState([]);

  const {
    getRootProps: getRootfileProps,
    getInputProps: getInputfileProps,
    isDragActive,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/svg+xml': [],
      'image/gif': []
    },
    onDrop: useCallback(
      acceptedFiles => {
        // console.log(acceptedFiles[0]);
        if (!acceptedFiles[0].type.match(imageMimeType)) {
          swal({
            title: 'Error',
            text: 'Image type is not valid',
            className: 'errorAlert',
            icon: Images.ErrorLogo,
            buttons: { OK: false },
            timer: 1500
          });
        } else if (acceptedFiles[0].size > maxImageFileSize) {
          swal({
            title: 'Error',
            text: 'Max file size allowed is 10mb',
            className: 'errorAlert',
            icon: Images.ErrorLogo,
            buttons: { OK: false },
            timer: 1500
          });
        } else {
          setFiles([
            ...files,
            ...acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                title: file.name
              })
            )
          ]);
        }
      },
      [files]
    )
  });

  const [inputData, setInputData] = useState({
    title: '',
    due_date: ''
  });
  const [taskDueDate, setTaskDueDate] = useState(new Date());
  const [itemData, setItemData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleDelte = id => {
    const upDateItem = itemData.filter((elem, index) => {
      return index !== id;
    });
    setItemData(upDateItem);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, tasks: null });

    if (e.key === 'Enter') {
      handleSubmit(e);
    }
    // console.log(inputData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputData.title && taskDueDate) {
      const coverter = new Date(taskDueDate).toLocaleString().slice(0, 10);
      setItemData([...itemData, { title: inputData.title, due_date: coverter }]);
      setInputData({ title: '', due_date: '' });
    } else {
    }
  };

  const handleInputChangeAutocompleteUsers = e => {
    // console.log(e.target.value);
    // if (e.target.value !== "") {
    //   setIsOpenUser(true);
    // } else {
    //   setIsOpenUser(false);
    // }
    setErrors({ ...errors, inHouseUser: null });
  };

  const changeHandlerInHouseUsers = (e, v) => {
    setInHouseUser(v);
    setErrors({ ...errors, inHouseUser: null });
  };

  const handleKeyDownInHouseUsers = e => {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === 'Tab') return;
    // setIsOpenApprovers(true);
    if (e.key !== 'Enter') return;
    // if (!value.trim()) return;
    e.target.value = '';
  };

  const { getRootProps: getRootGalleryProps, getInputProps: getInputGalleryProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/svg+xml': [],
      'image/gif': []
    },
    onDrop: useCallback(
      acceptedFiles => {
        if (!acceptedFiles[0].type.match(imageMimeType)) {
          swal({
            title: 'Error',
            text: 'Image type is not valid',
            className: 'errorAlert',
            icon: Images.ErrorLogo,
            buttons: { OK: false },
            timer: 1500
          });
        } else if (acceptedFiles[0].size > maxImageFileSize) {
          swal({
            title: 'Error',
            text: 'Max file size allowed is 10mb',
            className: 'errorAlert',
            icon: Images.ErrorLogo,
            buttons: { OK: false },
            timer: 1500
          });
        } else {
          setFileGallery([
            ...fileGallery,
            ...acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                title: file.name
              })
            )
          ]);
        }
      },
      [fileGallery]
    )
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const removeFile = file => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  //  const yesterday = new Date(
  //   new Date().getTime() + 24  60  60 * 1000
  // ).toDateString();

  const yesterday = new Date(new Date().setDate(new Date().getDate() + 1)).toDateString();

  const coverter = new Date(yesterday).toLocaleString().slice(0, 10);

  const threeDay = new Date(new Date().setDate(new Date().getDate() + 4)).toDateString();

  const coverter1 = new Date(threeDay).toLocaleString().slice(0, 10);

  const sevenDay = new Date(new Date().setDate(new Date().getDate() + 8)).toDateString();

  const coverter2 = new Date(sevenDay).toLocaleString().slice(0, 10);

  const removesampleFile = file => () => {
    const newfileGallery = [...fileGallery];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setFileGallery(newfileGallery);
  };
  const handleClickOpenDam = () => {
    setOpenVault(true);
    localStorage.setItem('damon', 'on');
  };

  const handleClickOpenDam1 = () => {
    setOpenVault1(true);
    localStorage.setItem('damon', 'on');
  };

  const thumbs = files.map(file => (
    <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]" key={file.name}>
      <div className="removeimgdevpage" style={thumbInner}>
        <img className="img-upload-item" src="/img/assertgallery.png" />
        <button onClick={removeFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
      </div>
    </div>
  ));

  const thumbs1 = fileGallery.map(file => (
    <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]" key={file.name}>
      <img className="img-upload-item" src="/img/assertgallery.png" />
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removesampleFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
      </div>
    </div>
  ));

  const [title, setTitle] = useState();
  const [description, setDescription] = useState('');
  const [jobDocuments, setJobDocuments] = useState<any>();
  const [deliveryDate, setDeliveryDate] = useState<Date | string>(new Date());
  const [price, setPrice] = useState<any>();
  const [tags, setTags] = useState<any>([]);
  const [category, setCategory] = useState('');
  const [status, setstatus] = useState<number | string>();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState(null);
  const [level, setlevel] = useState(null);
  const [tasks, settasks] = useState(null);
  const [taskvalue, settaskvalue] = useState(false);
  const [draft, setdraft] = useState(false);
  const [post, setpost] = useState('');
  const [job_type, setJobType] = useState('0');
  const [imageChanged, setImageChanged] = useState(false);
  const [templatename, setTemplatename] = useState<any>();
  const [fileExtension, setFileExtension] = useState<any>();
  const [fileNameDisplay, setFileNameDisplay] = useState<any>();
  // const [company_type, setCompanyType] = useState();
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [company, setCompany] = useState(null);

  const [addedSkill, setAddedSkill] = useState(false);

  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };
  const [editFileExtension, setEditFileExtension] = useState<any>();
  const [editJobDocuments, setEditJobDocuments] = useState<any>();
  const [fileSampleExtension, setFileSampleExtension] = useState<any>();
  const [jobSampleDocuments, setJobSampleDocuments] = useState<any>();
  const [editJobSampleDocuments, setEditJobSampleDocuments] = useState<any>();
  const [editFileSampleExtension, setEditFileSampleExtension] = useState<any>();
  const [selectedSampleFile, setSelectedSampleFile] = useState();
  const [formSampleUrls, setFormSampleUrls] = useState<any>(['']);
  const [fileNameSampleDisplay, setFileNameSampleDisplay] = useState<any>();
  const [isShown, setIsShown] = useState(false);
  const [isShowntask, setIsShowntask] = useState(false);
  const [removeJobSampleDocuments, setRemoveJobSampleDocuments] = useState([]);
  const [formUrls, setFormUrls] = useState<any>(['']);
  // const [editFileNameDisplay, setEditFileNameDisplay] = useState();
  const [removeJobDocuments, setRemoveJobDocuments] = useState([]);
  const [removetaskDocuments, setRemovetaskDocuments] = useState([]);
  // const [relatedJobsChange, setRelatedJobsChange] = useState(false);
  const [imageSampleChanged, setImageSampleChanged] = useState(false);
  const [isRelatedToPrevJob, setIsRelatedToPrevJob] = useState(false);

  const [isBudgetNotRequired, setIsBudgetNotRequired] = useState<any>(false);
  const [inHouseUser, setInHouseUser] = useState([]);

  const [errors, setErrors] = useState({
    title: null,
    description: null,
    price: null,
    tags: null,
    jobDocuments: null,
    category: null,
    deliveryDate: null,
    skills: null,
    job_type: null,
    formImgUrls: null,
    formsampleImgUrls: null,
    formUrls: null,
    formSampleUrls: null,
    template: null,
    tasks: null,
    inHouseUser: null,
    company: null,
    level: null
  });
  const [selectedFile, setSelectedFile] = useState();

  const imgRef = useRef(null);
  const imgSampleRef = useRef(null);
  const drop = useRef(null);
  const dropSample = React.useRef(null);

  // const [preview, setPreview] = useState();
  const headerCompany = useAppSelector(IS_HEADER_COMPANY);
  const jobDetails = useAppSelector(GET_JOBS_DETAILS);
  const companyData = useAppSelector(COMPANY_LIST);
  const userData = useAppSelector(GET_USER_PROFILE_DATA);
  const WorkFlowData = useAppSelector(WORKFLOW_LIST);
  const skillsData = useAppSelector(SKILLS_LIST);
  const levelsData = useAppSelector(LEVELS_LIST);
  const templateDetails = useAppSelector(TEMPLATES_DETAILS);
  const successAgencyInHouseUsers = useAppSelector(IN_HOUSE_USER_SUCCESS);
  const success = useAppSelector(TEMPLATES_RESPONSE);
  // const { industriesData } = useAppSelector(INDUSTRY_LIST);

  const [showText, setShowText] = useState(false);
  const onClickInclude = () => setShowText(current => !current);

  const [showText1, setShowText1] = useState(false);
  const onClickInclude1 = () => setShowText1(current => !current);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const handleClicktask = event => {
    // 👇️ toggle shown state
    setIsShowntask(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [isfiles, setisfiles] = useState(false);
  const [issamplefiles, setissamplefiles] = useState(false);

  const handleClickfiles = event => {
    setisfiles(current => !current);
  };

  const handleClicksamplefiles = event => {
    setissamplefiles(current => !current);
  };

  // const handlechange = (event, option) => {
  //   if (option) {
  //     settaskvalue(option.id);
  //   } else {
  //     settaskvalue();
  //   }
  // };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  const [mediafile1, setexistingmediafile1] = useState([]);

  const [draftid, setdraftid] = useState();
  const [isOpenSkill, setIsOpenSkill] = useState(false);

  useUpdateEffect(() => {
    dispatch(GET_COMPANY_LIST(tableFilters));
    window.scrollTo(0, 0);
  }, [success]);

  useEffect(() => {
    handleClickOpen3();
    const handler = () => {
      setIsOpen(false);
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen3(false);
      setIsOpen4(false);
      setIsOpen5(false);
      setIsOpen6(false);
      setIsOpen7(false);
      setIsOpen8(false);
      setIsOpen9(false);
      setIsOpen10(false);
      setIsOpenUser(false);
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [addedSkill]);

  const menuProps = {
    variant: 'menu',
    disableScrollLock: true
  };

  // const [duedate, setduedate] = useState();
  const handleDiv = id => {
    if (id === '1') {
      setdivid('1');
      setDeliveryDate(yesterday);
    } else if (id === '2') {
      setdivid('2');
      setDeliveryDate(threeDay);
    } else if (id === '3') {
      setdivid('3');
      setDeliveryDate(sevenDay);
    } else if (id === '4') {
      setdivid('4');
    }
  };

  useEffect(() => {
    let useimage = localStorage.getItem('useimage');
    dispatch(GET_DAM_MEDIA_COLLECTION_VIEW(useimage));
  }, []);

  useEffect(() => {
    let asset = localStorage.getItem('asset');
    if (asset == 'fileasset') {
      setexistingmediafile(Collectionviewdata?.data);
      setisfiles(true);
    } else if (asset == 'sampleasset') {
      setexistingsamplemediafile(Collectionviewdata?.data);
      setissamplefiles(true);
    }
  }, [moveit]);

  useEffect(() => {
    if (dam === true) {
      setexistingmediafile1(Collectionviewdata?.data);
      setisfiles(true);
    }
  }, [moveit]);

  useEffect(() => {
    if (sampledam === true) {
      setexistingsamplemediafile1(Collectionviewdata?.data);
      setissamplefiles(true);
    }
  }, [moveit]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('useimage');
      localStorage.removeItem('asset');
    }, 1500);
  }, []);

  // useEffect(() => {
  //   let asset = localStorage.getItem("asset");
  //   if (asset == "fileasset") {
  //     setexistingmediafile(Collectionviewdata?.data);
  //     setisfiles(true);
  //   } else if (asset == "sampleasset") {
  //     setexistingsamplemediafile(Collectionviewdata?.data);
  //     setissamplefiles(true);
  //   }
  //   // localStorage.removeItem("useimage");
  //   // localStorage.removeItem("asset")
  // }, [moveit]);

  const removedamFile = file => () => {
    const newdamGallery = [...mediafile];
    newdamGallery.splice(newdamGallery.indexOf(file), 1);
    setexistingmediafile(newdamGallery);
    console.log(mediafile);
  };

  const removedamFile1 = file => () => {
    const newdamGallery1 = [...mediafile1];
    newdamGallery1.splice(newdamGallery1.indexOf(file), 1);
    setexistingmediafile1(newdamGallery1);
  };

  const removesampledamFile = file => () => {
    const newsampledamGallery = [...samplemediafile];
    newsampledamGallery.splice(newsampledamGallery.indexOf(file), 1);
    setexistingsamplemediafile(newsampledamGallery);
  };

  const removesampledamFile1 = file => () => {
    const newsampledamGallery1 = [...samplemediafile1];
    newsampledamGallery1.splice(newsampledamGallery1.indexOf(file), 1);
    setexistingsamplemediafile1(newsampledamGallery1);
  };

  const handleCloseDam = () => {
    setOpenVault(false);
    localStorage.setItem('dam', JSON.stringify(false));
    localStorage.removeItem('damon');
  };

  const handleCloseDam1 = () => {
    setOpenVault1(false);
    localStorage.setItem('dam', JSON.stringify(false));
    localStorage.removeItem('damon');
  };

  const existingMedia = mediafile?.map(file => (
    <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]" key={file.id}>
      <img className="img-upload-item" src="/img/assertgallery.png" />
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removedamFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
        <div>
          <span className="thumbDesignWButton">Vault</span>
        </div>
      </div>
    </div>
  ));

  const existingMedia1 = mediafile1?.map(file => (
    <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]" key={file.id}>
      <img className="img-upload-item" src="/img/assertgallery.png" />
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removedamFile1(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
        <div>
          <span className="thumbDesignWButton">Vault</span>
        </div>
      </div>
    </div>
  ));

  const existingsampleMedia = samplemediafile?.map(file => (
    <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]" key={file.id}>
      <img className="img-upload-item" src="/img/assertgallery.png" />
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removesampledamFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
        <div>
          <span className="thumbDesignWButton">Vault</span>
        </div>
      </div>
    </div>
  ));

  const existingsampleMedia1 = samplemediafile1?.map(file => (
    <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]" key={file.id}>
      <img className="img-upload-item" src="/img/assertgallery.png" />
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removesampledamFile1(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
        <div>
          <span className="thumbDesignWButton">Vault</span>
        </div>
      </div>
    </div>
  ));

  const saveDamDataHandler = () => {
    setdam(true);
    setsampledam(false);
    setOpenVault(false);
    localStorage.removeItem('damon');
    let useimage = localStorage.getItem('useimage');
    dispatch(GET_DAM_MEDIA_COLLECTION_VIEW(useimage));
    setexistingmediafile1(Collectionviewdata?.data);
  };

  const saveDamDataHandler1 = () => {
    setsampledam(true);
    setdam(false);
    setOpenVault1(false);
    let useimage = localStorage.getItem('useimage');
    dispatch(GET_DAM_MEDIA_COLLECTION_VIEW(useimage));
    setexistingsamplemediafile1(Collectionviewdata?.data);
  };

  useUpdateEffect(() => {
    dispatch(GET_TEMPLATES_DETAILS(templateId));
  }, [templateId]);

  useEffect(() => {
    if (templateId) {
      setShow(true);
      // console.log("templateDetails - ", templateDetails);
      // setShowdraft(false);
      settextchange(true);
      // dispatch(GET_TEMPLATES_DETAILS(templateId));
      if (templateDetails?.details) {
        dispatch(GET_IN_HOUSE_USER_LIST(templateDetails?.details.company));

        if (templateDetails?.details.is_house_member) {
          setIsBudgetNotRequired(true);
          if (templateDetails?.details?.house_member?.length > 0) {
            const houseMembersList = [];
            for (let index = 0; index < templateDetails?.details?.house_member?.length; index++) {
              houseMembersList.push(
                inHouseUserList?.inHouseUserList?.data?.results?.find(
                  item => item.id == templateDetails?.details?.house_member[index]
                )
              );
            }
            setInHouseUser(houseMembersList);
          }
          setPrice('');
          setlevel(null);
          setJobType('0');
        } else {
          setPrice(templateDetails?.details.price);
          setlevel(templateDetails?.details.level?.id);
          setJobType(templateDetails?.details.job_type);
        }

        if (templateDetails?.details?.status != 0) {
          setShowdraft(false);
        }
        setTitle(templateDetails?.details?.title);
        setDescription(templateDetails?.details?.description);
        // setFiles(templateDetails?.details?.images);
        // setJobSampleDocuments(templateDetails?.details?.images)
        setDeliveryDate(templateDetails?.details?.expected_delivery_date);
        setSkills(templateDetails?.details?.skills);
        setindustryname(templateDetails?.details?.industry);
        setdivid(templateDetails?.details?.due_date_index);
        const success = axiosPrivate.get(`${API_URL.DRAFT_JOBS.DRAFT_JOBS_LIST}`).then(res => {
          if (userData?.data?.role === ROLES.ADMIN) {
            axiosPrivate.get(`${API_URL.WORKFLOW.ADMIN}?company=${templateDetails?.details?.company}`).then(res => {
              dispatch(SET_WORKFLOW_LIST_DATA(res?.data?.data || res?.data));
              setapivalue(res.data?.data?.results);
            });
          } else {
            const success = axiosPrivate
              .get(`${API_URL.WORKFLOW.WORKFLOW_LIST}?company=${templateDetails?.details?.company}`)
              .then(response => {
                dispatch(SET_WORKFLOW_LIST_DATA(response?.data?.data || response?.data));
                setapivalue(response.data?.data?.results);
              });
          }
        });
        setworkflowdata({
          id: templateDetails?.details?.workflow,
          name: templateDetails?.details?.workflow_name
        });
        // dispatch(getRelatedJobs(templateDetails?.details?.company));
        setRelatedJobs(templateDetails?.details?.related_jobs);
        setcompanyvalue({
          name: templateDetails?.details?.company_name,
          id: templateDetails?.details?.company
        });
        // setItemData(templateDetails?.details?.jobtasks_job);
        setTemplatename(templateDetails?.details?.template_name);
        if (templateDetails?.details?.get_jobType_details == 'Fixed') {
          setJobType('0');
        }
        if (templateDetails?.details?.get_jobType_details == 'Hourly') {
          setJobType('1');
        }
        // if (templateDetails?.details?.images[0]?.work_sample_image_name) {
        //   setissamplefiles(true);
        // }

        // if (templateDetails?.details?.images[0]?.job_image_name) {
        //   setisfiles(true);
        // }

        // if (templateDetails?.details?.jobtasks_job[0]) {
        //   setIsShowntask(true);
        // }

        if (templateDetails?.details?.image_url) {
          setisfiles(true);
          let newArray = templateDetails?.details?.image_url.split(',');
          setFormUrls(newArray);
        }
        if (templateDetails?.details?.sample_work_url) {
          setissamplefiles(true);
          let newArray = templateDetails?.details?.sample_work_url.split(',');
          setFormSampleUrls(newArray);
        }
        if (templateDetails?.details?.related_jobs?.length > 0) {
          setIsRelatedToPrevJob(true);
        }
        // setTags(templateDetails?.details?.tags);
        if (templateDetails?.details?.tags) {
          const tagsList = templateDetails?.details?.tags?.split(',');
          if (tagsList) {
            setTags(tagsList);
          }
        }
        if (templateDetails?.details?.images) {
          let newImages = templateDetails?.details?.images;
          newImages = newImages.filter(item => item);
          setJobDocuments(newImages);
          let fileext = [];
          let s = [];
          let b = [];
          for (var i = 0; i < templateDetails?.details?.images.length; i++) {
            fileext.push(
              templateDetails?.details?.images[i].job_images?.slice(
                ((templateDetails?.details?.images[i].job_images.lastIndexOf('.') - 1) >>> 0) + 2
              )
            );
            s.push(
              templateDetails?.details?.images[i].job_images?.slice(
                ((templateDetails?.details?.images[i].job_images.lastIndexOf('/') - 1) >>> 0) + 2
              )
            );
            b.push(templateDetails?.details?.images[i].job_images);
          }
          b = b.filter(item => item);
          s = s.filter(item => item);
          fileext = fileext.filter(item => item);
          imgRef.current = b;
          setFileNameDisplay(s);
          setFileExtension(fileext);
        }
        if (templateDetails?.details?.images) {
          let newImages = templateDetails?.details?.images;
          newImages = newImages.filter(item => item);
          setJobSampleDocuments(newImages);
          let fileext1 = [];
          let s1 = [];
          let b1 = [];
          for (var i = 0; i < templateDetails?.details?.images.length; i++) {
            fileext1.push(
              templateDetails?.details?.images[i].work_sample_images?.slice(
                ((templateDetails?.details?.images[i].work_sample_images?.lastIndexOf('.') - 1) >>> 0) + 2
              )
            );
            s1.push(
              templateDetails?.details?.images[i].work_sample_images?.slice(
                ((templateDetails?.details?.images[i].work_sample_images?.lastIndexOf('/') - 1) >>> 0) + 2
              )
            );
            b1.push(templateDetails?.details?.images[i].work_sample_images);
          }
          imgSampleRef.current = b1;
          setFileNameSampleDisplay(s1);
          setFileSampleExtension(fileext1);
        }
      }
      // setEditFileNameDisplay([]);
      setEditFileSampleExtension([]);
      setEditFileExtension([]);
    } else {
      // const success = api.get(`${BACKEND_API_URL}job-draft`).then((res) => {
      //   const success = api
      //     .get(
      //       `${BACKEND_API_URL}agency/works-flow/?company=${res.data.company}`
      //     )
      //     .then((res) => {
      //       setapivalue(res.data);
      //     });
      //   setdraftid(res.data.id);
      //   if (res.data.id) {
      //     setShow(true);
      //     setTitle(res.data.title);
      //     setDescription(res.data.description);
      //     setworkflowdata(res.data.workflow);
      //     setDeliveryDate(res.data.expected_delivery_date);
      //     setPrice(res.data.price);
      //     setSkills(res.data.skills);
      //     setJobType(res.data.job_type);
      //     setindustryname(res.data.industry);
      //     dispatch(getRelatedJobs(res.data.company));
      //     setRelatedJobs(res.data?.related_jobs);
      //     setcompanyvalue(res.data?.company);
      //     setItemData(res.data.jobtasks_job);
      //     setTemplatename(res.data.template_name);
      //     setlevel(res.data.level?.id);
      //     setdivid(res.data.due_date_index);
      //     if (res.data.related_jobs) {
      //       // setShow(true);
      //     }
      //     if (res.data.jobtasks_job[0]) {
      //       setIsShowntask(true);
      //     }
      //     if (res.data?.tags) {
      //       const tagsList = res.data?.tags?.split(",");
      //       if (tagsList) {
      //         setTags(tagsList);
      //       }
      //     }
      //     if (res.data.image_url) {
      //       setisfiles(true);
      //       let newArray = res.data.image_url.split(",");
      //       setFormUrls(newArray);
      //     }
      //     if (res.data.sample_work_url) {
      //       setissamplefiles(true);
      //       let newArray = res.data.sample_work_url.split(",");
      //       setFormSampleUrls(newArray);
      //     }
      //     if (res.data.related_jobs?.length > 0) {
      //       setIsRelatedToPrevJob(true);
      //     }
      //     if (res.data?.images) {
      //       // setisfiles((current) => !current);
      //       let newImages = res.data?.images;
      //       newImages = newImages.filter((item) => item);
      //       setJobDocuments(newImages);
      //       let fileext = [];
      //       let s = [];
      //       let b = [];
      //       for (var i = 0; i < res.data?.images.length; i++) {
      //         fileext.push(
      //           res.data?.images[i].job_images?.slice(
      //             ((res.data?.images[i].job_images.lastIndexOf(".") - 1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         console.log(fileext);
      //         s.push(
      //           res.data?.images[i].job_images?.slice(
      //             ((res.data?.images[i].job_images.lastIndexOf("/") - 1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         b.push(res.data?.images[i].job_images);
      //       }
      //       console.log(s);
      //       b = b.filter((item) => item);
      //       s = s.filter((item) => item);
      //       fileext = fileext.filter((item) => item);
      //       imgRef.current = b;
      //       // console.log("imgRefcurrent", imgRef.current);
      //       setFileNameDisplay(s);
      //       setFileExtension(fileext);
      //     }
      //     if (res.data.images[0].work_sample_image_name) {
      //       setissamplefiles(true);
      //     }
      //     if (res.data.images[0].job_image_name) {
      //       setisfiles(true);
      //     }
      //     if (res.data?.images) {
      //       // setisfiles((current) => !current);
      //       let newImages = res.data.images;
      //       newImages = newImages.filter((item) => item);
      //       setJobSampleDocuments(newImages);
      //       let fileext1 = [];
      //       let s1 = [];
      //       let b1 = [];
      //       for (var i = 0; i < res.data.images.length; i++) {
      //         fileext1.push(
      //           res.data?.images[i].work_sample_images?.slice(
      //             ((res.data?.images[i].work_sample_images?.lastIndexOf(".") -
      //               1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         s1.push(
      //           res.data?.images[i].work_sample_images?.slice(
      //             ((res.data?.images[i].work_sample_images?.lastIndexOf("/") -
      //               1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         b1.push(res.data.images[i].work_sample_images);
      //       }
      //       // console.log("s--", s);
      //       imgSampleRef.current = b1;
      //       // console.log("imgRefcurrent", imgRef.current);
      //       setFileNameSampleDisplay(s1);
      //       setFileSampleExtension(fileext1);
      //     }
      //   }
      // });
    }
    // setEditFileNameDisplay([]);
    setEditFileSampleExtension([]);
    setEditFileExtension([]);
  }, [success, successAgencyInHouseUsers, templateDetails]);

  useEffect(() => {
    axiosPrivate
      .get(`${API_URL.COMPANY.COMPANY_LIST}?is_active=1`)
      .then(res => {
        const responseDestructredData = { ...res?.data?.data };
        // console.log({ res, responseDestructredData }, 'Res Company');

        // To append company data of selected workflow details
        if (isEmpty(responseDestructredData?.results?.find(e => e.company_id === templateDetails?.details?.company))) {
          responseDestructredData?.results?.push({
            id: templateDetails?.details?.company,
            name: templateDetails?.details?.company_name
          });
        }
        console.log({ res, results: responseDestructredData?.results });
        setcompanydata(responseDestructredData?.results);
      })
      .catch(err => {});

    axiosPrivate
      .get(`${API_URL.WORKFLOW.WORKFLOW_LIST}?company=${templateDetails?.details?.company}`)
      .then(response => {
        const destructuredWorkflowData = { ...response?.data?.data };

        if (isEmpty(destructuredWorkflowData?.results?.find(e => e?.id === templateDetails?.details?.workflow))) {
          destructuredWorkflowData?.results?.push({
            id: templateDetails?.details?.workflow,
            name: templateDetails?.details?.workflow_name
          });
        }
      })
      .catch(error => {});
  }, [templateDetails, templateId]);

  useUpdateEffect(() => {
    setcompanydata(
      companyData?.companyList?.data?.results?.map(company => {
        return {
          id: company?.id,
          name: company?.name
        };
      })
    );
    if (WorkFlowData?.workFlowList?.data?.results?.length) {
      setapivalue(
        WorkFlowData?.workFlowList?.data?.results?.map(workflow => {
          return {
            id: workflow?.id,
            name: workflow?.name
          };
        })
      );
    }
  }, [companyData?.companyList?.data?.results, WorkFlowData?.workFlowList?.data?.results]);

  //fetch company list when pagination change
  useUpdateEffect(() => {
    if (userProfile?.data?.role === ROLES.ADMIN) {
      if (searchType === 'companySearch') {
        dispatch(GET_COMPANY_LIST(tableFilters, `${API_URL.COMPANY.ADMIN}`));
      } else if (searchType === 'workflowCompanySearch') {
        dispatch(GET_WORKFLOW_LIST(tableFilters, `${API_URL.WORKFLOW.ADMIN}`));
      }
    } else {
      if (searchType === 'companySearch') {
        dispatch(GET_COMPANY_LIST(tableFilters, `${API_URL.COMPANY.COMPANY_LIST}`));
      } else if (searchType === 'workflowCompanySearch') {
        dispatch(GET_WORKFLOW_LIST(tableFilters, `${API_URL.WORKFLOW.WORKFLOW_LIST}`));
      }
    }
  }, [tableFilters, userProfile.data?.role]);

  useEffect(() => {
    // dispatch(listAllCategories());
    dispatch(GET_ALL_SKILLS_LIST());
    dispatch(GET_LEVELS_LIST(tableFilters));
    dispatch(GET_INDUSTRY_LIST(tableFilters));
    dispatch(GET_COMPANY_LIST(tableFilters));
  }, [addedSkill]);

  // useEffect(() => {
  //   dispatch(getRelatedJobs());
  // }, [title]);

  useEffect(() => {
    const success = axiosPrivate.get(`${API_URL.TEMPLATES.TEMPLATES_LIST}`).then(res => {
      settemplatevalue(res.data?.data?.results);
    });

    const tasks = axiosPrivate.get(`${API_URL.JOBS.JOB_TASK}`).then(res => {
      settasks(res?.data?.data?.results);
    });

    const industry = axiosPrivate.get(`${API_URL.INDUSTRY.INDUSTRY_LIST}`).then(res => {
      setindustryvalue(res.data?.data?.results);
    });
  }, []);

  const downloadFile = (blob, fileNameDownload, v) => {
    if (v === 'add') {
      // console.log("blob--", blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileNameDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
    if (v === 'edit') {
      // console.log("blobedit--", blob);
      const file = new Blob([blob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(file);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileNameDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  const downloadSampleFile = (blob, fileNameSampleDownload, v) => {
    if (v === 'add') {
      // console.log("blob--", blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileNameSampleDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
    if (v === 'edit') {
      // console.log("blobedit--", blob);
      const file = new Blob([blob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(file);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileNameSampleDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const [Workflowdata, setworkflowdata] = useState(null);
  const [Workflowvalue, setworkflowvalue] = useState(null);
  const [companydata, setcompanydata] = useState([]);
  const [companyvalue, setcompanyvalue] = useState(null);
  const [templatedata, settemplatedata] = useState('1');
  const [templatevalue, settemplatevalue] = useState(null);
  const [industryvalue, setindustryvalue] = useState(null);
  const [industryname, setindustryname] = useState(null);
  const [apivalue, setapivalue] = useState(null);

  const handleClickOpen3 = () => {};

  const removeDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == 'icon') {
      const s = jobDocuments.filter((item, index) => index !== e);
      const s1 = imgRef.current.filter((item, index) => index !== e);
      setJobDocuments(s);
      imgRef.current = s1;
      return;
    }
    if (v == 'image') {
      // console.log("e2--", e);
      const s = jobDocuments.filter((item, index) => index !== e);
      setJobDocuments(s);
      return;
    }
    if (v == 'data') {
      // console.log("e3--", e);
      // const s = jobDocuments.filter((item, index) => index !== e);
      // setJobDocuments(s);
      setJobDocuments(jobDocuments.filter((el, i) => i !== e));
      setFileExtension(fileExtension.filter((el, i) => i !== e));
      setFileNameDisplay(fileNameDisplay.filter((el, i) => i !== e));
      return;
    }
  };
  const removeSampleDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == 'icon') {
      const s = jobSampleDocuments.filter((item, index) => index !== e);
      const s1 = imgSampleRef.current.filter((item, index) => index !== e);
      setJobSampleDocuments(s);
      imgSampleRef.current = s1;
      return;
    }
    if (v == 'image') {
      // console.log("e2--", e);
      const s = jobSampleDocuments.filter((item, index) => index !== e);
      setJobSampleDocuments(s);
      return;
    }
    if (v == 'data') {
      // console.log("e3--", e);
      // const s = jobDocuments.filter((item, index) => index !== e);
      // setJobDocuments(s);
      setJobSampleDocuments(jobSampleDocuments.filter((el, i) => i !== e));
      setFileSampleExtension(fileSampleExtension.filter((el, i) => i !== e));
      setFileNameSampleDisplay(fileNameSampleDisplay.filter((el, i) => i !== e));
      return;
    }
  };
  const removeEditDocument = (e, v) => {
    setImageChanged(true);
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == 'icon') {
      setEditJobDocuments(editJobDocuments.filter((el, i) => i !== e));
      setEditFileExtension(editFileExtension.filter((el, i) => i !== e));
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      const s1 = imgRef.current.filter((item, i) => i !== e);
      imgRef.current = s1;
      // console.log("imgRef--", imgRef);
      // console.log("editFileExtension --", editFileExtension);
      return;
    }
    if (v == 'image') {
      setEditJobDocuments(editJobDocuments.filter((el, i) => i !== e));
      const s1 = imgRef.current.filter((item, i) => i !== e);
      imgRef.current = s1;
      setEditFileExtension(editFileExtension.filter((el, i) => i !== e));
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      // setSelectedFile(selectedFile.filter((el, i) => i !== e));
      return;
    }
  };
  const removeEditSampleDocument = (e, v) => {
    setImageSampleChanged(true);
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == 'icon') {
      setEditJobSampleDocuments(editJobSampleDocuments.filter((el, i) => i !== e));
      setEditFileSampleExtension(editFileSampleExtension.filter((el, i) => i !== e));
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      const s1 = imgSampleRef.current.filter((item, i) => i !== e);
      imgSampleRef.current = s1;

      // console.log("imgRef--", imgRef);
      // console.log("editFileExtension --", editFileExtension);
      return;
    }
    if (v == 'image') {
      setEditJobSampleDocuments(editJobSampleDocuments.filter((el, i) => i !== e));
      const s1 = imgSampleRef.current.filter((item, i) => i !== e);
      imgSampleRef.current = s1;
      setEditFileSampleExtension(editFileSampleExtension.filter((el, i) => i !== e));
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      // setSelectedFile(selectedFile.filter((el, i) => i !== e));
      return;
    }
  };

  const removeNewDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    // setJobDocuments(jobDocuments.filter((el, i) => i !== e));
    const s1 = imgRef.current.filter((item, i) => i !== e);
    imgRef.current = s1;
    setFileExtension(fileExtension.filter((el, i) => i !== e));
    return;
  };
  const removeNewSampleDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    // setJobDocuments(jobSampleDocuments.filter((el, i) => i !== e));
    const s1 = imgSampleRef.current.filter((item, i) => i !== e);
    imgSampleRef.current = s1;
    setFileSampleExtension(fileSampleExtension.filter((el, i) => i !== e));
    return;
  };

  const onSelectFile = e => {
    let imageList = [];
    let previewImages = [];
    let fileext = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.target.files[i].name.split('.').at(-1);
      const allowedFileTypes = ['eps'];

      if (!e.target.files[i].type.match(imageMimeType) && !allowedFileTypes.includes(fileExtension)) {
        swal({
          title: 'Error',
          text: 'Image type is not valid',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        // return;
        // } else if (!e.target.files[i].type.match(imageMimeType)) {
        //   swal({
        //     title: "Error",
        //     text: "Image type is not valid1",
        //     className: "errorAlert",
        //     icon: "/img/ErrorAlert.png",
        //     buttons: {OK: false},
        //     timer: 1500,
        //   });
        // return;
      } else if (e.target.files[i]?.size > maxImageFileSize) {
        swal({
          title: 'Error',
          text: 'Max file size allowed is 10mb',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        // return;
      } else {
        setImageChanged(true);
        previewImages.push(URL.createObjectURL(e.target.files[i]));
        imageList.push(e.target.files[i]);
        fileext.push(e.target.files[i]?.name?.slice(((e.target.files[i]?.name.lastIndexOf('.') - 1) >>> 0) + 2));
      }
    }
    // if (!templateId) {
    //   // setJobDocuments(imageList);
    //   setFileExtension(fileext);
    // } else {
    //   setEditJobDocuments(imageList);
    //   setEditFileExtension(fileext);
    // }
    // setSelectedFile(previewImages);
    // imgRef.current = imageList;
    // return;
  };

  const maxImageFileSizeSampleDocs = 5000000;

  const onSelectSampleFile = e => {
    let imageSampleList = [];
    let previewSampleImages = [];
    let fileSampleext = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.target.files[i].name.split('.').at(-1);
      const allowedFileTypes = ['eps'];

      if (!e.target.files[i].type.match(imageMimeType) && !allowedFileTypes.includes(fileExtension)) {
        swal({
          title: 'Error',
          text: 'Image type is not valid',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        // return;
        // if (!e.target.files[i].type.match(imageMimeType)) {
        //   swal({
        //     title: "Error",
        //     text: "Image type is not valid",
        //     className: "errorAlert",
        //     icon: "/img/ErrorAlert.png",
        //     buttons: {OK: false},
        //     timer: 1500,
        //   });
        //   // return;
      } else if (e.target.files[i]?.size > maxImageFileSizeSampleDocs) {
        swal({
          title: 'Error',
          text: 'Max file size allowed is 5mb',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        // return;
      } else {
        setImageSampleChanged(true);
        previewSampleImages.push(URL.createObjectURL(e.target.files[i]));
        imageSampleList.push(e.target.files[i]);
        fileSampleext.push(e.target.files[i]?.name?.slice(((e.target.files[i]?.name.lastIndexOf('.') - 1) >>> 0) + 2));
      }
    }
    // if (!templateId) {
    //   setJobSampleDocuments(imageSampleList);
    //   setFileSampleExtension(fileSampleext);
    // } else {
    //   setEditJobSampleDocuments(imageSampleList);
    //   setEditFileSampleExtension(fileSampleext);
    // }
    // setSelectedSampleFile(previewSampleImages);
    // imgSampleRef.current = imageSampleList;
  };
  const validateSubmit = (e, data) => {
    // console.log(data);
    e.preventDefault();
    // Urls Validation
    let isValidUrl: any = '';
    let newFormValues = formUrls;
    setFormUrls(newFormValues);
    if (formUrls) {
      if (formUrls != '') {
        isValidUrl =
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      }
    }
    // SampleUrls Validation
    let isValidSampleUrl: any = '';
    let newFormSampleValues = formSampleUrls.filter(n => n);
    setFormSampleUrls(newFormSampleValues);
    if (formSampleUrls) {
      for (let i = 0; i < formSampleUrls.length; i++) {
        if (formSampleUrls[i] != '') {
          isValidSampleUrl = formSampleUrls[i].match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
        }
      }
    }

    const tempErrors: any = {
      // title: validations.title(title),
      // // price: validations.price(price),
      // // formUrls: isValidUrl == null && "Please check the url(s) and try again",
      // formSampleUrls:
      //   isValidSampleUrl == null && "Please check the url(s) and try again",
      // // jobDocuments: validations.jobImages(jobDocuments),
      // // category: validations.category(category),
      // deliveryDate: validations.deliveryDate(deliveryDate),
      // description: validations.description(description),
      // job_type: !job_type && "Please select a job type",
      // skills: skills.length === 0 && "Skill is required",
      // tags: tags.length === 0 && "Please provide atleast one tag",
      // level: !level && "Please select an level",
      company: !companyvalue && 'please select an company',
      template: !templatename && isShown && 'Please select a template',
      inHouseUser: isBudgetNotRequired && inHouseUser?.length < 1 && 'Please select a user',
      tasks: !inputData.title && isShowntask && itemData.length === 0 && 'Please provide a tasks '
    };
    setErrors(tempErrors);
    // if (Object.values(tempErrors).filter((value) => value).length) {
    //   setTimeout(function () {
    //     $("#error_move").attr("id", "");
    //     $(".error").first().attr("id", "error_move");
    //     $(window).scrollTop($("#error_move").position().top);
    //   }, 500);

    //   // console.log(
    //   //   "..values",
    //   //   Object.values(tempErrors).filter((value) => value)
    //   // );
    //   return;
    // }

    submitHandler(data);
  };

  const submitHandler = async data => {
    const formData = new FormData();
    //     let tempErrors = {
    //       template: "",
    //     };

    //  if (isShown) {
    //   if (templatename) {
    //     tempErrors = {
    //     template : "please enter template name"
    //     }
    //   }
    //  }

    //  const isError = Object.values(tempErrors).every(
    //   (x) => x == null || x == ""
    // );

    // console.log("check");
    if (templateId) {
      if (files) {
        for (const key of Object.keys(files)) {
          formData.append('image', files[key]);
        }
      }
    } else {
      if (files) {
        for (const key of Object.keys(files)) {
          formData.append('image', files[key]);
        }
      }
    }
    // }
    // console.log("removeJobDocuments---____", removeJobDocuments);
    if (removeJobDocuments) {
      for (const key of Object.keys(removeJobDocuments)) {
        formData.append('remove_image', removeJobDocuments[key]);
      }
    }

    if (removetaskDocuments) {
      for (const key of Object.keys(removetaskDocuments)) {
        formData.append('task_id', removetaskDocuments[key]);
      }
    }

    if (mediafile) {
      {
        mediafile.map(item => {
          const idget = item.id;
          formData.append('dam_images', idget);
        });
      }
    }

    if (mediafile1) {
      {
        mediafile1.map(item => {
          const idget = item.id;
          formData.append('dam_images', idget);
        });
      }
    }

    if (isBudgetNotRequired) {
      formData.append('is_house_member', isBudgetNotRequired);

      if (inHouseUser?.length > 0) {
        for (var i = 0; i < inHouseUser.length; i++) {
          formData.append('house_member', inHouseUser[i].id ? inHouseUser[i].id : inHouseUser[i]);
        }
      }
    }

    if (samplemediafile) {
      {
        samplemediafile.map(item => {
          const idget = item.id;
          formData.append('dam_sample_images', idget);
        });
      }
    }

    if (samplemediafile1) {
      {
        samplemediafile1.map(item => {
          const idget = item.id;
          formData.append('dam_sample_images', idget);
        });
      }
    }
    formData.append('job_template_id', templateId);
    // console.log("removeJobDocuments---____", removeJobDocuments);
    if (removeJobSampleDocuments) {
      for (const key of Object.keys(removeJobSampleDocuments)) {
        formData.append('remove_image', removeJobSampleDocuments[key]);
      }
    }
    formData.append('title', title);
    formData.append('company', companyvalue?.id);
    // formData.append("tasks_due_date", date);
    formData.append('tasks', JSON.stringify(itemData));
    formData.append('description', description);
    formData.append('due_date_index', divid);
    // if (isShown) {
    //   setstatus("0");
    //   formData.append("status", status);
    // } else {
    // }
    if (isShown && data == 'post') {
      formData.append('status', JSON.stringify(1));
    } else if (data == 'post') {
      formData.append('status', JSON.stringify(2));
    } else if (data == 'draft') {
      formData.append('status', JSON.stringify(0));
    }
    formData.append(
      'expected_delivery_date',
      // new Date(deliveryDate).format("YYYY-MM-DD")
      new Date(deliveryDate).toISOString().slice(0, 10)
    );
    for (var i = 0; i < skills.length; i++) {
      formData.append('skills', skills[i].id ? skills[i].id : skills[i]);
    }
    // if (isRelatedToPrevJob) {
    //   if (relatedJobs) {
    //     for (var i = 0; i < relatedJobs.length; i++) {
    //       formData.append(
    //         "related_jobs",
    //         relatedJobs[i].id ? relatedJobs[i].id : relatedJobs[i]
    //       );
    //     }
    //   } else {
    //     formData.append("relatedJobs", relatedJobs);
    //   }
    // } else {
    //   formData.append("relatedJobs", null);
    // }

    if (templateId) {
      if (fileGallery) {
        for (const key of Object.keys(fileGallery)) {
          formData.append('sample_image', fileGallery[key]);
        }
      }
    } else {
      if (fileGallery) {
        for (const key of Object.keys(fileGallery)) {
          formData.append('sample_image', fileGallery[key]);
        }
      }
    }

    if (formUrls) {
      setFormUrls(formUrls.filter(item => item));
      formData.append('image_url', formUrls);
    }
    if (formSampleUrls) {
      setFormSampleUrls(formSampleUrls.filter(item => item));
      formData.append('sample_work_url', formSampleUrls);
    }

    if (industry) {
      formData.append('industry', industry);
    }
    if (level && !isBudgetNotRequired) {
      formData.append('level', level);
    }
    if (job_type && !isBudgetNotRequired) {
      formData.append('job_type', job_type);
    }
    if (price && !isBudgetNotRequired) {
      formData.append('price', price);
    }
    formData.append('tags', tags);
    if (templatename) {
      formData.append('template_name', templatename);
    }
    if (industryname != null) {
      formData.append('industry', industryname);
    }

    formData.append('user', JSON.stringify(userData?.data.id));

    if (Workflowdata != null) {
      formData.append('workflow', Workflowdata?.id);
    }

    // if (templateId && data == "post") {
    dispatch(UPDATE_TEMPLATES_LIST(templateId, formData))
      .then(res => {
        swal({
          title: 'Successfully Complete',
          text: 'Successfully Created',
          className: 'successAlert',
          icon: Images.Logo,
          buttons: { OK: false },
          timer: 1500
        });
        dispatch(SET_TEMPLATES_LOADING(true));
        navigate(`${TEMPLATES_ROUTE.HOME}`);
      })
      .catch(err => {
        // console.log("ERRRRRR", err.response.data);
        swal({
          title: 'Error',
          text: err.response.data.message,
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        dispatch(SET_TEMPLATES_LOADING(true));
      });

    //   // if (imageChanged) {
    // } else if (templateId && data == "draft") {
    //   // console.log("DRAFTTTT");
    //   const create_job = await axios
    //     .put(`${BACKEND_API_URL}jobs/${templateId}/`, formData, config)
    //     .then((res) => {
    //       swal({
    //         title: "Successfully Complete",
    //         text: "Successfully Created",
    //         className: "successAlert",
    //         icon: "/img/SuccessAlert.png",
    //         buttons: {OK: false},
    //         timer: 1500,
    //       });
    //       navigate(`/draft-jobs`);
    //     })
    //     .catch((err) => {
    //       swal({
    //         title: "Error",
    //         text: err.response.data.message,
    //         className: "errorAlert",
    //         icon: "/img/ErrorAlert.png",
    //         buttons: {OK: false},
    //         timer: 1500,
    //       });
    //     });
    // } else {
    //   const update_job = await axios
    //     .post(`${BACKEND_API_URL}jobs/`, formData, config)
    //     .then((res) => {
    //       // console.log("POSTTTT");
    //       swal({
    //         title: "Successfully Complete",
    //         text: "Successfully Created",
    //         className: "successAlert",
    //         icon: "/img/SuccessAlert.png",
    //         buttons: {OK: false},
    //         timer: 1500,
    //       });
    //       navigate(`/jobs/list`);
    //     })
    //     .catch((err) => {
    //       swal({
    //         title: "Error",
    //         text: "Template Already Exists",
    //         className: "errorAlert",
    //         icon: "/img/ErrorAlert.png",
    //         buttons: {OK: false},
    //         timer: 1500,
    //       });
    //     });
    // }
    setImageChanged(false);
  };

  const changeHandler = (e, v) => {
    setSkills(v);
    // setIsOpenSkill(false);
  };

  const changeRelatedJobHandler = (e, v) => {
    setRelatedJobs(v);
  };

  function handleKeyDownRelatedJobs(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setRelatedJobs([...relatedJobs, value]);
    e.target.value = '';
  }

  const toDay = new Date().toISOString().substring(0, 10);
  function handleKeyDownSkills(e) {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === 'Tab') return;
    setIsOpenSkill(true);
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;

    const filteredCurrentSkills = skills?.filter(str =>
      str.skills_name.toLowerCase().includes(value?.toLowerCase().trim())
    );

    const filteredDatabaseSkills = skillsData?.skillsList?.data?.results?.map(str => {
      // console.log("str", str);
      if (str.skill_name.toLowerCase() == value.toLowerCase().trim()) {
        return true;
      }
      return false;
    });
    //     str.skill_name.toLowerCase() == value.toLowerCase()
    // );
    if (filteredDatabaseSkills?.length > 0 && filteredCurrentSkills?.length > 0) {
      swal({
        title: 'Notice',
        text: 'Skill already exists',
        className: 'noticeAlert',
        icon: '/img/NoticeAlert.png',
        buttons: { OK: false },
        timer: 1500
      });
      return;
    }
    for (var i = 0; i < skillsData?.skillsList?.data?.results?.length; i++) {
      if (skillsData?.skillsList?.data?.results[i].skill_name.toLowerCase().indexOf(value.toLowerCase().trim()) > -1) {
        // changeHandler(e, value);
        // setSkills([...skills, value]);
        e.target.value = '';
        return;
      }
    }
    setSkills([...skills, value]);
    const skillData = {
      skill_name: value,
      is_active: true
    };
    // dispatch(ADD_SKILL_SET_LIST(skillData));
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    // };

    dispatch(ADD_SKILL_SET_LIST(skillData))
      .then(res => {
        // console.log("keys", res);
        setAddedSkill(true);
        setAddedSkill(false);
        const addedSkill = skillsData?.skillsList?.data?.results.filter(item => item?.id === value);
        // setSkills([...skills, res.data]);
      })
      .catch(error => {
        console.log('error', error);
      });
    e.target.value = '';
  }

  function removeSkill(index) {
    setSkills(skills.filter((el, i) => i !== index));
  }

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;

    const filteredTags = tags.filter(str => str.toLowerCase() == value.toLowerCase());

    if (filteredTags.length > 0) {
      swal({
        title: 'Notice',
        text: 'Tag already added',
        className: 'noticeAlert',
        icon: '/img/NoticeAlert.png',
        buttons: { OK: false },
        timer: 1500
      });
      return;
    }

    setTags([...tags, value]);
    e.target.value = '';
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  function removeSkillPopup(index) {
    setIsOpenSkill(false);
  }

  function removeImageDocuments(document_id) {
    setRemoveJobDocuments([...removeJobDocuments, document_id]);
  }

  function removetaskdetailDocuments(document_id) {
    setRemovetaskDocuments([...removetaskDocuments, document_id]);
    const success = axiosPrivate.delete(`${API_URL.JOBS.JOB_TASK}${document_id}/`).then(res => {
      // console.log(res);
    });
  }

  function removeImageSampleDocuments(document_id) {
    setRemoveJobSampleDocuments([...removeJobSampleDocuments, document_id]);
  }

  const handleInputChangeAutocomplete = (event, newInputValue) => {
    // setSkills(newInputValue);
    if (newInputValue.length > 0) {
      setIsOpenSkill(true);
    } else {
      setIsOpenSkill(false);
    }
  };

  // const filterOptions = createFilterOptions({
  //   matchFrom: "start",
  //   stringify: (option) => option.skill_name,
  // });

  // const filterOptionsUsers = createFilterOptions({
  //   matchFrom: "start",
  //   stringify: (option) => option.user_full_name,
  // });

  let addFormFieldsUrls = () => {
    if (formUrls.length < 10) {
      setFormUrls([...formUrls, ' ']);
    }
  };

  let removeFormFieldsUrls = i => {
    let newFormValues = [...formUrls];
    newFormValues.splice(i, 1);
    setFormUrls(newFormValues);
  };

  let handleChangeUrls = e => {
    let isValidImgUrl: any = '';
    if (imgUrl != '') {
      isValidImgUrl = imgUrl.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (isValidImgUrl) {
        setFormUrls([...formUrls, imgUrl]);
        // console.log("test Url ", isValidImgUrl);
        setImgUrl('');
      } else {
        // setImgUrl("");
        const tempErrors: any = {
          formImgUrls: isValidImgUrl == null && 'Please check the url(s) and try again'
        };
        setErrors(tempErrors);
      }
    } else {
      setImgUrl('');
      const tempErrors: any = {
        formImgUrls: isValidImgUrl == null && 'Please check the url(s) and try again'
      };
      setErrors(tempErrors);
    }
  };

  let handleChangesampleUrls = e => {
    let sampleurl: any = '';
    if (sampleimgUrl != '') {
      if (
        (sampleurl = sampleimgUrl.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        ))
      ) {
        setFormSampleUrls([...formSampleUrls, sampleimgUrl]);
        // console.log("test Url ", sampleurl);
        setsampleImgUrl('');
      } else {
        setsampleImgUrl('');
        // console.log("test Url els4e", sampleurl);
        const tempErrors: any = {
          formsampleImgUrls: sampleurl == null && 'Please check the url(s) and try again'
        };
        // console.log("tempErrors", tempErrors);
        setErrors(tempErrors);
      }
    } else {
      setsampleImgUrl('');
      const tempErrors: any = {
        formsampleImgUrls: sampleurl === null && 'Please check the url(s) and try again'
      };
      setErrors(tempErrors);
    }
  };

  let addFormFieldsSampleUrls = () => {
    if (formSampleUrls.length < 10) {
      setFormSampleUrls([...formSampleUrls, '']);
    }
  };

  let removeFormFieldsSampleUrls = i => {
    let newFormValues = [...formSampleUrls];
    newFormValues.splice(i, 1);
    setFormSampleUrls(newFormValues);
  };

  // DRAG AND DROP FUNCTIONALITY

  React.useEffect(() => {
    drop.current?.addEventListener('dragover', handleDragOver);
    drop.current?.addEventListener('drop', handleDrop);

    return () => {
      drop.current?.removeEventListener('dragover', handleDragOver);
      drop.current?.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleWorkflowChange = (e, value) => {
    setworkflowdata(value);
    // setErrors({ ...errors, workflow: null });
  };

  //search workflow associated with selected company
  const handleWorkFlowCompanySearch = (e, value) => {
    setTableFilters({
      ...tableFilters,
      search: value ?? ''
    });
    setSearchType('workflowCompanySearch');
  };

  //search company
  const handleCompanySearch = (e, value) => {
    setTableFilters({
      ...tableFilters,
      search: value ?? ''
    });
    setSearchType('companySearch');
  };

  const getvalue = (e, value) => {
    setcompanyvalue(value);
    setErrors({ ...errors, company: null });
    // console.log(e.target.value);
    if (value == null) {
      setworkflowdata(null);
      setInHouseUser([]);
    }
    if (value !== null) {
      dispatch(GET_IN_HOUSE_USER_LIST(value?.company_id));

      // dispatch(getRelatedJobs(e.target.value));
      setShow(true);
      if (userData?.data?.role === ROLES.ADMIN) {
        axiosPrivate.get(`${API_URL.WORKFLOW.ADMIN}?company=${value?.company_id}`).then(res => {
          // console.log(res.data);
          setapivalue(res.data?.data);
        });
      } else {
        axiosPrivate.get(`${API_URL.WORKFLOW.WORKFLOW_LIST}?company=${value?.company_id}`).then(res => {
          // console.log(res.data);
          setapivalue(res.data?.data);
        });
      }
    } else {
      setShow(false);
    }
  };

  const gettemplate = e => {
    // console.log(e.target.value);
    settemplatedata(e.target.value);
    if (e.target.value == 1) {
      setlevel(null);
      // setJobType("");
      setPrice('');
      setindustryname(null);
      // setDeliveryDate();
      setDescription('');
      setSkills([]);
      setTags([]);
      // setTemplatename();
      setisfiles(false);
      setissamplefiles(false);
    } else {
      axiosPrivate.get(`${API_URL.TEMPLATES.TEMPLATES_LIST}${e.target.value}/`).then(res => {
        setlevel(res.data.level?.id);
        setJobType(res.data?.job_type);
        setPrice(res.data.price);
        setindustryname(res.data.industry);
        setDeliveryDate(res.data.expected_delivery_date);
        setDescription(res.data?.description);
        setSkills(res.data?.skills);
        // setTemplatename(res.data?.template_name);
        if (res.data?.tags) {
          const tagsList = res.data?.tags?.split(',');
          if (tagsList) {
            setTags(tagsList);
          }
        }

        if (res.data.image_url) {
          setisfiles(true);

          let newArray = res.data.image_url.split(',');
          setFormUrls(newArray);
        }
        if (res.data.sample_work_url) {
          setissamplefiles(true);
          let newArray = res.data.sample_work_url.split(',');
          setFormSampleUrls(newArray);
        }
        if (res.data.related_jobs?.length > 0) {
          setIsRelatedToPrevJob(true);
        }
        if (res.data?.images) {
          setisfiles(true);
          let newImages = res.data?.images;
          newImages = newImages.filter(item => item);
          setJobDocuments(newImages);
          let fileext = [];
          let s = [];
          let b = [];
          for (var i = 0; i < res.data?.images.length; i++) {
            fileext.push(
              res.data?.images[i].job_images?.slice(((res.data?.images[i].job_images.lastIndexOf('.') - 1) >>> 0) + 2)
            );
            // console.log(fileext);
            s.push(
              res.data?.images[i].job_images?.slice(((res.data?.images[i].job_images.lastIndexOf('/') - 1) >>> 0) + 2)
            );
            b.push(res.data?.images[i].job_images);
          }
          // console.log(s);
          b = b.filter(item => item);
          s = s.filter(item => item);
          fileext = fileext.filter(item => item);
          imgRef.current = b;
          // console.log("imgRefcurrent", imgRef.current);
          setFileNameDisplay(s);
          setFileExtension(fileext);
        }

        if (res.data?.images) {
          setissamplefiles(true);
          let newImages = res.data.images;
          newImages = newImages.filter(item => item);
          setJobSampleDocuments(newImages);
          let fileext1 = [];
          let s1 = [];
          let b1 = [];
          for (var i = 0; i < res.data.images.length; i++) {
            fileext1.push(
              res.data?.images[i].work_sample_images?.slice(
                ((res.data?.images[i].work_sample_images?.lastIndexOf('.') - 1) >>> 0) + 2
              )
            );
            s1.push(
              res.data?.images[i].work_sample_images?.slice(
                ((res.data?.images[i].work_sample_images?.lastIndexOf('/') - 1) >>> 0) + 2
              )
            );
            b1.push(res.data.images[i].work_sample_images);
          }
          // console.log("s--", s);
          imgSampleRef.current = b1;
          // console.log("imgRefcurrent", imgRef.current);
          setFileNameSampleDisplay(s1);
          setFileSampleExtension(fileext1);
        }
      });
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    let imageList = [];
    let previewImages: any = [];
    let fileext = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.dataTransfer.files[i].name.split('.').at(-1);
      const allowedFileTypes = ['eps'];

      if (!e.dataTransfer.files[i].type.match(imageMimeType) && !allowedFileTypes.includes(fileExtension)) {
        swal({
          title: 'Error',
          text: 'Image type is not valid',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
      } else if (e.dataTransfer.files[i]?.size > maxImageFileSize) {
        swal({
          title: 'Error',
          text: 'Max file size allowed is 10mb',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        // return;
      } else {
        setImageChanged(true);
        previewImages.push(URL.createObjectURL(e.dataTransfer.files[i]));
        imageList.push(e.dataTransfer.files[i]);
        fileext.push(
          e.dataTransfer.files[i]?.name?.slice(((e.dataTransfer.files[i]?.name.lastIndexOf('.') - 1) >>> 0) + 2)
        );
      }
    }
    if (!templateId) {
      // setJobDocuments(imageList);
      setFileExtension(fileext);
    } else {
      setEditJobDocuments(imageList);
      setEditFileExtension(fileext);
    }
    setSelectedFile(previewImages);
    // imgRef.current = imageList;
  };

  React.useEffect(() => {
    imgRef.current = jobDocuments;
  }, [jobDocuments]);

  React.useEffect(() => {
    dropSample.current?.addEventListener('dragover', handleDragOverSample);
    dropSample.current?.addEventListener('drop', handleDropSample);

    return () => {
      dropSample.current?.removeEventListener('dragover', handleDragOverSample);
      dropSample.current?.removeEventListener('drop', handleDropSample);
    };
  }, []);

  const handleDragOverSample = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropSample = e => {
    e.preventDefault();
    e.stopPropagation();
    // const { files } = e.dataTransfer;
    // console.log(e.dataTransfer.files);
    let imageSampleList = [];
    let previewSampleImages: any = [];
    let fileSampleext = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.dataTransfer.files[i].name.split('.').at(-1);
      const allowedFileTypes = ['eps'];

      if (!e.dataTransfer.files[i].type.match(imageMimeType) && !allowedFileTypes.includes(fileExtension)) {
        swal({
          title: 'Error',
          text: 'Image type is not valid',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        // return;
      } else if (!e.dataTransfer.files[i].type.match(imageMimeType)) {
        swal({
          title: 'Error',
          text: 'Image type is not valid',
          className: 'errorAlert',
          icon: Images.ErrorLogo,
          buttons: { OK: false },
          timer: 1500
        });
        // return;
      } else if (e.dataTransfer.files[i]?.size > maxImageFileSize) {
        swal({
          title: 'Error',
          text: 'Max file size allowed is 10mb',
          className: 'errorAlert',
          icon: Images.ErrorLogo,

          buttons: { OK: false },
          timer: 1500
        });
        // return;
      } else {
        setImageChanged(true);
        previewSampleImages.push(URL.createObjectURL(e.dataTransfer.files[i]));
        imageSampleList.push(e.dataTransfer.files[i]);
        fileSampleext.push(
          e.dataTransfer.files[i]?.name?.slice(((e.dataTransfer.files[i]?.name.lastIndexOf('.') - 1) >>> 0) + 2)
        );
      }
    }
    if (!templateId) {
      // setJobSampleDocuments(imageSampleList);
      setFileSampleExtension(fileSampleext);
    } else {
      setEditJobSampleDocuments(imageSampleList);
      setEditFileSampleExtension(fileSampleext);
    }
    setSelectedFile(previewSampleImages);
    // imgRef.current = imageSampleList;
    // }
  };

  const handleKeyDownTasks = e => {
    e.preventDefault();
    // console.log("eee");
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, tasks: null });

    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="page-container">
        {/* {JSON.stringify(errors)} */}

        <div className="">
          <h1 className="text-2xl font-bold text-black">What Service Are You Looking For?</h1>
        </div>

        <div className="" onClick={removeSkillPopup}>
          <div className="page-card card">
            <div className="w-full max-w-[560px]">
              <div className="pb-5">
                <h1 className="text-2xl font-bold text-[#1b4ea8]">Job Details</h1>
              </div>
              <div className={errors.title ? 'input-fields-wrapper error ' : ' input-fields-wrapper '}>
                <h4 className="flex gap-1 text-lg text-black font-bold mb-1">Job Title</h4>
                <input
                  className="input-style bg-[rgb(249_251_252)]"
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={e => {
                    // setTitle(e.target.value);
                    setErrors({ ...errors, title: null });
                  }}
                  value={title}
                />
                <span
                  className="text-[#D14F4F] flex justify-end"
                  style={{
                    color: '#D14F4F',
                    opacity: errors.title ? 1 : 0
                  }}
                >
                  {errors.title ?? 'valid'}
                </span>
              </div>
              <div className={errors.company ? 'input-fields-wrapper error my-4' : 'input-fields-wrapper my-4'}>
                <h4 className="flex gap-1 text-lg text-black font-bold mb-1">Company</h4>{' '}
                <div className="styled-select Companyname Companyname_1">
                  <MuiAutoComplete
                    placeholder="Select Company"
                    filterList={companydata ?? []}
                    selectedOption={companyvalue}
                    setSearchText={setSearchText}
                    // setSelectedOption={setcompanyvalue}
                    handleChange={getvalue}
                    handleSearchChange={handleCompanySearch}
                    searchText={searchText}
                    label={''}
                    // disabled={!showbutton}
                    customClass={
                      // "rounded outline-none focus:border-theme hover:border-none"
                      `${
                        companyvalue == '' || companyvalue == null
                          ? 'text-[#939393] hover:border-[#939393] '
                          : 'text-[#000]'
                      } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`
                    }
                  />

                  <span
                    className="text-[#D14F4F] flex justify-end"
                    style={{
                      color: '#D14F4F',
                      opacity: errors.company ? 1 : 0
                    }}
                  >
                    {errors.company ?? 'valid'}
                  </span>
                </div>
              </div>
              {show ? (
                <>
                  <div className="text-content ">
                    <h4 className="text-lg text-black font-bold mb-1 ">Approval Workflow ?</h4>{' '}
                    <div className="input-fields-wrapper">
                      <MuiAutoComplete
                        placeholder="Select Workflow"
                        filterList={apivalue ?? []}
                        selectedOption={Workflowdata}
                        setSearchText={setSearchText}
                        // setSelectedOption={setcompanyvalue}
                        handleChange={handleWorkflowChange}
                        handleSearchChange={handleWorkFlowCompanySearch}
                        searchText={searchText}
                        label={''}
                        // disabled={!showbutton}
                        customClass={
                          // "rounded outline-none focus:border-theme hover:border-none"
                          `${
                            Workflowdata == '' || Workflowdata == null
                              ? '!text-[#939393] hover:border-[#939393] '
                              : 'text-[#000] '
                          } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`
                        }
                      />
                    </div>
                  </div>

                  <div className="input-fields-wrapper mb-2 ">
                    <h4 className="text-lg text-black font-bold mb-1">Select Job Template</h4>{' '}
                    <div className="">
                      <Select
                        className={`${
                          companyvalue === 'null' ? '!text-[#939393] hover:border-[#939393] ' : 'text-[#000] '
                        } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                        open={isOpen7}
                        onOpen={() => {
                          setIsOpen7(true);
                        }}
                        onClose={() => {
                          setIsOpen7(false);
                        }}
                        value={templatedata}
                        onChange={gettemplate}
                        // MenuProps={menuProps}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="1">Select Template</MenuItem>
                        {templatevalue?.results?.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item?.template_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className={'input-fields-wrapper mb-2'}>
                    <h4 className="text-lg text-black font-bold">Industry</h4>{' '}
                    <div className="styled-select Companyname">
                      <Select
                        className={`${
                          industryname === 'null' ? '!text-[#939393] hover:border-[#939393] ' : 'text-[#000] '
                        } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                        open={isOpen2}
                        onOpen={() => {
                          setIsOpen2(true);
                        }}
                        onClose={() => {
                          setIsOpen2(false);
                        }}
                        // MenuProps={menuProps}
                        value={industryname}
                        onChange={e => {
                          setindustryname(e.target.value);
                          // setErrors({ ...errors, level: null });
                        }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={null}>Select Industry</MenuItem>
                        {industryvalue?.map(item =>
                          item.is_active ? (
                            <MenuItem key={item.id} value={item.id}>
                              {item?.industry_name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                      <div className="diverrors44">
                        {/* <span
                            style={{
                              color: "#D14F4F",
                              opacity: errors.level ? 1 : 0,
                            }}
                          >
                            {errors.level ?? "valid"}
                          </span> */}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              <div className={errors.description ? 'input-fields-wrapper error' : 'input-fields-wrapper '}>
                <h4 className="text-lg text-black font-bold mb-1">Describe Your Job</h4>
                <p className="text-sm my-2 text-[#474e55]">
                  This could include dimensions, colors, how you plan to use it, or anything else that the content
                  creator needs to know in order to meet your expectations.
                </p>
                <textarea
                  className="h-[180px] input-style bg-[rgb(249_251_252)] custom-scrollbar"
                  placeholder=""
                  maxLength={4000}
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                    setErrors({ ...errors, description: null });
                  }}
                />
                <p className="flex justify-end text-sm">
                  <span
                    style={{
                      color: description?.length === 4000 && '#D14F4F'
                    }}
                  >
                    {description?.length ?? 0}
                    /4000
                  </span>
                </p>

                <span
                  className="Ag_E"
                  style={{
                    color: '#D14F4F',
                    opacity: errors.description ? 1 : 0
                  }}
                >
                  {errors.description ?? 'valid'}
                </span>
              </div>{' '}
              {/* <div
                  className="related-jobs-check-box"
                  // style={{ display: "flex" }}
                >
                  {show ? (
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value={isRelatedToPrevJob}
                      checked={isRelatedToPrevJob}
                      onClick={() => setIsRelatedToPrevJob(!isRelatedToPrevJob)}
                    />
                  ) : (
                    <input type="checkbox" disabled="true" name="vehicle1" />
                  )}

                  <label htmlFor="vehicle1">
                    {" "}
                    Is this related to a previous job?
                  </label>
                </div>
                {isRelatedToPrevJob && (
                  <div className="text-content Skills">
                    <h4 className="Related_newRelated">
                      Related Jobs (if applicable)
                    </h4>
                    <div className="Marketing- mt-2-">
                      <div className="skills-input-container">
                        <Autocomplete
                          multiple
                          // disabled={!title}
                          id="tags-outlined"
                          // options={
                          //   Array.isArray(relatedJobsList)
                          //     ? relatedJobsList.filter(
                          //         (item) => item.id != templateId
                          //       )
                          //     : relatedJobsList
                          // }
                          options={
                            relatedJobsList &&
                            Array.isArray(relatedJobsList) &&
                            relatedJobsList.filter(
                              (item) => item.id != templateId
                            )
                          }
                          getOptionLabel={(option) => option.title}
                          onChange={(e, v) => {
                            changeRelatedJobHandler(e, v);
                            setErrors({ ...errors, relatedJobs: null });
                          }}
                          value={relatedJobs ?? []}
                          inputProps={{ "aria-label": "Without label" }}
                          filterSelectedOptions
                          hiddenLabel="true"
                          onKeyDown={handleKeyDownRelatedJobs}
                          renderInput={({ inputProps, ...rest }) => (
                            <TextField
                              {...rest}
                              placeholder="Company previous jobs"
                              inputProps={{ ...inputProps, readOnly: true }}
                            />
                          )}
                          // renderInput={(params) => (
                          //   <TextField
                          //     {...params}
                          //     fullWidth
                          //     placeholder="Type something"
                          //   />
                          // )}
                          isOptionEqualToValue={(option, value) =>
                            value === undefined ||
                            value === "" ||
                            option.id === value.id
                          }
                        />
                      </div>
                    </div>
                  </div>
                )} */}
              <div className={errors.skills ? 'error-style mb-4 ' : 'mb-4'}>
                <h4 className=" text-lg text-black font-bold mb-1 mt-3">Skills Needed</h4>
                <div className="mt-2-">
                  <div className="skills-input-container">
                    {/* {JSON.stringify(skills)} */}
                    <Autocomplete
                      className="bg-[rgb(249_251_252)] rounded w-full h-12"
                      value={skills ?? []}
                      multiple
                      id="tags-outlined"
                      // onInputChange={handleInputChangeAutocomplete}
                      options={
                        // skillsData?.skillsList?.data?.results?.filter(
                        //   (item) => item.is_active
                        // ) ?? []
                        skillsData?.skillsList?.data?.results
                          ?.filter(item => item.is_active)
                          ?.map(it => {
                            return {
                              skills_name: it?.skill_name,
                              id: it?.id
                            };
                          }) ?? []
                      }
                      getOptionLabel={option => option?.skills_name}
                      // onChange={(event, value) => setSkills(value)}
                      onChange={(e, v) => {
                        changeHandler(e, v);
                        setErrors({ ...errors, skills: null });
                      }}
                      // filterSelectedOptions
                      noOptionsText={'Press enter to add this skill and select again'}
                      onKeyDown={handleKeyDownSkills}
                      autoHighlight={true}
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Type something"
                          className="bg-[rgb(249_251_252)] rounded w-full h-12 mb-1"
                        />
                      )}
                    />

                    {/* <Autocomplete
                          multiple
                          id="tags-outlined"
                          open={isOpenSkill}
                          onInputChange={handleInputChangeAutocomplete}
                          filterOptions={filterOptions}
                          options={skillsData.filter((item) => item.is_active)}
                          getOptionLabel={(option) => option.skill_name}
                          // onChange={(event, value) => setSkills(value)}
                          onChange={(e, v) => {
                            changeHandler(e, v);
                            setErrors({ ...errors, skills: null });
                          }}
                          defaultValue={skills ?? []}
                          inputProps={{ "aria-label": "Without label" }}
                          filterSelectedOptions
                          noOptionsText={
                            "Press enter to add this skill and select again"
                          }
                          hiddenLabel="true"
                          // open={false}
                          onKeyDown={handleKeyDownSkills}
                          autoHighlight={true}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              placeholder="Type something"
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            value === undefined ||
                            value === "" ||
                            option.id === value.id
                          }
                        /> */}
                  </div>
                </div>
                <div className="diverrors44">
                  <span
                    style={{
                      color: '#D14F4F',
                      opacity: errors.skills ? 1 : 0
                    }}
                  >
                    {errors.skills ?? 'valid'}
                  </span>
                </div>
              </div>
              {/* < */}
            </div>

            <div className="border-t-4"></div>
            <div className="w-full max-w-[560px] pb-5">
              <div className="py-5">
                <h1 className="text-2xl font-bold text-[#1b4ea8]">Files and Assets</h1>
              </div>
              <div className="switch_Agency">
                <div className="flex gap-4 mb-4">
                  <label className="switch">
                    {isfiles && (
                      <>
                        {' '}
                        <input type="checkbox" checked={true} onClick={handleClickfiles} />
                      </>
                    )}
                    {!isfiles && (
                      <>
                        {' '}
                        <input type="checkbox" checked={false} onClick={handleClickfiles} />
                      </>
                    )}

                    <span className="slider round"></span>
                  </label>
                  <h4 className="text-lg text-black font-semibold">
                    Files and Assets <span className="text-base text-[#A0A0A0]">Optional</span>
                  </h4>
                </div>
              </div>

              {isfiles && (
                <>
                  {' '}
                  <div className="text-content addjobseditdev">
                    {/* <h4 className="Attachment_new1">
                          Your Assets
                          <span className="optional-A">Optional</span>
                        </h4> */}
                    <p className="uptext-A">
                      Only upload files and artwork that you own the copyright for, or that you have permission to use
                      and distribute for commercial work.
                    </p>
                    {/* <h4 className="Attachment_new1">Attachment</h4> */}
                    <div className="flex border border-1 rounded">
                      <div className="border-r w-full max-w-[35%] flex-center">
                        <div className="text-center p-5">
                          <div
                            className="newimgdrp"
                            // {...getRootfileProps({ style })}
                          >
                            <input
                              {...getInputfileProps()}
                              // imgExtension={[
                              //   ".jpg",
                              //   ".gif",
                              //   ".png",
                              //   ".gif",
                              // ]}
                              // maxfilesize={5242880}
                            />

                            <p className="text-base font-bold text-[#1B4EA8]" style={{ color: '#1B4EA8' }}>
                              <span className="text-base font-bold">
                                {' '}
                                <FileUploadOutlined></FileUploadOutlined>
                                Upload Files
                              </span>
                            </p>
                          </div>
                          <p className="text-sm font-bold text-[#71757b] my-2">or</p>
                          <div className="browsevauleButton">
                            <button className="btn btn-primary mx-auto" onClick={handleClickOpenDam}>
                              Browse Vault
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full p-5">
                        <div className="assertSelectedArea">
                          <div>
                            <h5 className="text-base font-bold text-black">Selected Assets</h5>
                            <aside className="flex flex-row flex-wrap mt-4">
                              {thumbs}
                              {existingMedia} {existingMedia1}
                              {jobDocuments && (
                                <>
                                  {templateId ? (
                                    <>
                                      {jobDocuments?.map((item, index) => (
                                        <>
                                          {item?.job_image_name && (
                                            <>
                                              <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]">
                                                <div className="removeimgdevpage" style={thumbInner}>
                                                  <img className="img-upload-item" src="/img/assertgallery.png" />
                                                  <button
                                                    onClick={() => {
                                                      removeDocument(index, 'data');
                                                      removeImageDocuments(item?.id);
                                                    }}
                                                  >
                                                    <img src="/img/assertbin.png" />
                                                  </button>
                                                  {item?.job_image_name}
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </>
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {jobDocuments?.map((item, index) => (
                                        <>
                                          {item?.job_image_name && (
                                            <>
                                              <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]">
                                                <div className="removeimgdevpage" style={thumbInner}>
                                                  <img className="img-upload-item" src="/img/assertgallery.png" />
                                                  <button
                                                    onClick={() => {
                                                      removeDocument(index, 'data');
                                                      removeImageDocuments(item?.id);
                                                    }}
                                                  >
                                                    <img src="/img/assertbin.png" />
                                                  </button>
                                                  {item?.job_image_name}
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </>
                                      ))}
                                    </>
                                  )}
                                </>
                              )}
                            </aside>
                          </div>
                          {/* {JSON.stringify(errors.formImgUrls)} */}
                          {formUrls.map((element, index) => (
                            <div className="form-inline" key={index}>
                              {element && (
                                <div className="assertDustbinLink">
                                  <img className="linkicon" src="/img/asserLink.png" />
                                  <a className="adifecttesturl">{element}</a>
                                  <img
                                    className="assertbinLogo2"
                                    src="/img/assertbin.png"
                                    onClick={() => removeFormFieldsUrls(index)}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          {showText && (
                            <>
                              <div className="form-section">
                                <p>Link must be publically accessible</p>
                              </div>
                              <div className={errors.formImgUrls ? 'flex gap-2 error-style' : 'flex gap-2 '}>
                                <input
                                  className="input-style"
                                  type="text"
                                  value={imgUrl}
                                  placeholder="Enter URL"
                                  onChange={e => {
                                    setImgUrl(e.target.value);
                                    setErrors({
                                      ...errors,
                                      formImgUrls: null
                                    });
                                  }}
                                />
                                <div className="cursor-pointer">
                                  <a
                                    onClick={e => {
                                      // addFormFieldsUrls();
                                      handleChangeUrls(e);
                                    }}
                                    className="btn btn-outline"
                                  >
                                    Use
                                  </a>
                                </div>
                              </div>
                            </>
                          )}
                          <div className={errors.formImgUrls ? 'flex gap-2 error-style' : 'flex gap-2 '}>
                            <span
                              className="formurslsjobapply"
                              style={{
                                color: '#D14F4F',
                                opacity: errors.formUrls ? 1 : 0
                              }}
                            >
                              {errors.formImgUrls ? errors.formImgUrls : ''}
                            </span>
                          </div>
                          <div className="cursor-pointer my-3">
                            <a onClick={onClickInclude} className="text-base font-semibold text-[#2472fc]">
                              <Add></Add>
                              Include a URL
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
                    <input
                      multiple
                      type="file"
                      // onChange={(e) => {
                      //   onSelectFile(e);
                      //   setErrors({ ...errors, jobDocuments: null });
                      // }}
                      id="upload"
                      hidden
                    />
                  </div>
                </>
              )}

              <div className="switch_Agency">
                <div className="flex gap-4">
                  <label className="switch">
                    {issamplefiles && (
                      <>
                        {' '}
                        <input type="checkbox" checked={true} onClick={handleClicksamplefiles} />
                      </>
                    )}
                    {!issamplefiles && (
                      <>
                        {' '}
                        <input type="checkbox" checked={false} onClick={handleClicksamplefiles} />
                      </>
                    )}
                    <span className="slider round"></span>
                  </label>
                  <h4 className="text-lg text-black font-semibold">
                    Samples of Work You Like
                    <span className="text-base text-[#A0A0A0]">Optional</span>
                  </h4>
                </div>
              </div>

              {issamplefiles && (
                <>
                  {' '}
                  <div className="text-content addjobseditdev">
                    {/* <h4 className="Attachment_new1">
                              <span className="optional-A">Optional</span>
                            </h4> */}
                    <p className="uptext-A">
                      This is to help the content creator understand the type of work you like. This doesn’t need to be
                      work that you own the copyright for, but Adifect will only store it for 30 days after the
                      completion of this job and will not use it for any other purposes.
                    </p>
                    {/* <h4 className="Attachment_new1">Attachment</h4> */}
                    <div className="flex border border-1 rounded">
                      <div className="border-r w-full max-w-[35%] flex-center">
                        <div className="text-center p-5">
                          <div
                            className="newimgdrp"
                            // {...getRootGalleryProps({ style })}
                          >
                            <input
                              {...getInputGalleryProps()}
                              // imgExtension={[
                              //   ".jpg",
                              //   ".gif",
                              //   ".png",
                              //   ".gif",
                              // ]}
                              // maxfilesize={5242880}
                            />

                            <p className="text-base font-bold text-[#1B4EA8]" style={{ color: '#1B4EA8' }}>
                              <span className="text-base font-bold">
                                {' '}
                                <FileUploadOutlined />
                                Upload Files
                              </span>
                            </p>
                          </div>
                          <p className="text-sm font-bold text-[#71757b] my-2">or</p>
                          <div className="browsevauleButton">
                            <button className="btn btn-primary mx-auto" onClick={handleClickOpenDam1}>
                              Browse Vault
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full p-5">
                        <div className="assertSelectedArea">
                          <div>
                            <h5 className="text-base font-bold text-black">Selected Assets</h5>
                            <aside className="flex flex-row flex-wrap mt-4">
                              {thumbs1}
                              {existingsampleMedia}
                              {existingsampleMedia1}
                              {jobSampleDocuments && (
                                <>
                                  {templateId ? (
                                    <>
                                      {jobSampleDocuments?.map((item, index) => (
                                        <>
                                          {item?.work_sample_image_name && (
                                            <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]">
                                              <div className="removeimgdevpage" style={thumbInner}>
                                                <img className="img-upload-item" src="/img/assertgallery.png" />
                                                <button
                                                  onClick={() => {
                                                    removeSampleDocument(index, 'data');
                                                    removeImageSampleDocuments(item?.id);
                                                  }}
                                                >
                                                  <img src="/img/assertbin.png" />
                                                </button>
                                                {item?.work_sample_image_name}
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {jobSampleDocuments?.map((item, index) => (
                                        <>
                                          {item?.work_sample_image_name && (
                                            <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]">
                                              <div className="removeimgdevpage" style={thumbInner}>
                                                <img className="img-upload-item" src="/img/assertgallery.png" />
                                                <button
                                                  onClick={() => {
                                                    removeSampleDocument(index, 'data');
                                                    removeImageSampleDocuments(item?.id);
                                                  }}
                                                >
                                                  <img src="/img/assertbin.png" />
                                                </button>
                                                {item?.work_sample_image_name}
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      ))}
                                    </>
                                  )}
                                </>
                              )}
                            </aside>
                          </div>

                          {/* {JSON.stringify(errors.formImgUrls)} */}
                          {formSampleUrls.map((element, index) => (
                            <div className="form-inline" key={index}>
                              {element && (
                                <div className="assertDustbinLink">
                                  <img className="linkicon" src="/img/asserLink.png" />
                                  <a className="adifecttesturl">{element}</a>
                                  <img
                                    className="assertbinLogo2"
                                    src="/img/assertbin.png"
                                    onClick={() => removeFormFieldsSampleUrls(index)}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          {showText1 && (
                            <>
                              <div className="form-section">
                                <p>Link must be publically accessible</p>
                              </div>
                              <div className={errors.formsampleImgUrls ? 'flex gap-2 error-style' : 'flex gap-2 '}>
                                <input
                                  className="input-style"
                                  type="text"
                                  value={sampleimgUrl}
                                  placeholder="Enter URL"
                                  onChange={e => {
                                    setsampleImgUrl(e.target.value);
                                    setErrors({
                                      ...errors,
                                      formsampleImgUrls: null
                                    });
                                  }}
                                />
                                <div className="cursor-pointer">
                                  <a
                                    onClick={e => {
                                      handleChangesampleUrls(e);
                                    }}
                                    className="btn btn-outline"
                                  >
                                    Use
                                  </a>
                                </div>
                              </div>
                            </>
                          )}
                          <div
                            className={
                              errors.formsampleImgUrls ? 'enterUrlLinkButton-error error' : 'enterUrlLinkButton-error'
                            }
                          >
                            <span
                              className="formurjobapply"
                              style={{
                                color: '#D14F4F',
                                opacity: errors.formSampleUrls ? 1 : 0
                              }}
                            >
                              {errors.formsampleImgUrls ? errors.formsampleImgUrls : ''}
                            </span>
                          </div>
                          <div className="cursor-pointer my-3">
                            <a onClick={onClickInclude1} className="text-base font-semibold text-[#2472fc]">
                              <Add></Add>
                              Include a URL
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <aside style={thumbsContainer}>{thumbs1}</aside> */}
                    <input
                      multiple
                      type="file"
                      // onChange={(e) => {
                      //   onSelectFile(e);
                      //   setErrors({ ...errors, jobDocuments: null });
                      // }}
                      id="upload"
                      hidden
                    />
                  </div>
                </>
              )}
            </div>
            <div className="border-t-4"></div>
            <div className="w-full max-w-[560px] pb-5">
              <div className="py-5">
                <h1 className="text-2xl font-bold text-[#1b4ea8]">Tasks</h1>

                <div className="switch_Agency">
                  <div className="flex gap-4">
                    <label className="switch">
                      {isShowntask && (
                        <input type="checkbox" checked={true} onClick={handleClicktask} id="handleClickTaskInput" />
                      )}

                      {!isShowntask && (
                        <>
                          <input type="checkbox" checked={false} onClick={handleClicktask} />
                        </>
                      )}

                      <span className="slider round"></span>
                    </label>
                    <h4 className="text-lg text-black font-semibold">
                      This job contains multiple tasks <span className="text-base text-[#A0A0A0]">Optional</span>
                    </h4>
                  </div>
                </div>

                {/* {JSON.stringify(itemData)} */}
                {isShowntask && (
                  <div className="container containerPad">
                    <div className="shwo_data my-3">
                      {itemData?.map((elem, index) => {
                        return (
                          <div key={index}>
                            <h3 className="flex justify-between gap-2">
                              <div className="flex justify-between gap-3 max-w-[560px] w-full">
                                <span className="task_title text-base font-medium  break-all">{elem.title}</span>
                                <span className="task_due_date text-base font-bold text-[#2472fc] max-w-[95px] w-full">
                                  {elem.due_date}
                                </span>
                              </div>
                              <button
                                className="flex align-top"
                                onClick={() => {
                                  handleDelte(index);
                                  removetaskdetailDocuments(elem?.id);
                                }}
                              >
                                <CloseOutlined />
                              </button>
                            </h3>
                          </div>
                        );
                      })}
                    </div>
                    <div className={errors.tasks ? ' containerPad12 error ' : ' containerPad12  '}>
                      <input
                        className="tastsinput input-style"
                        type="text"
                        name="title"
                        placeholder="Enter task and date"
                        value={inputData.title}
                        onChange={handleChange}
                        // onKeyDown={handleChange}
                        onKeyPress={event => {
                          if (event.key === 'Enter') {
                            handleSubmit(event);
                          }
                        }}
                      />
                      {/* <button
                          className="saveTaskJobAddEditbtn"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Save Task
                        </button> */}
                      <span
                        className="multipleA"
                        style={{
                          color: '#D14F4F',
                          opacity: errors.tasks ? 1 : 0
                        }}
                      >
                        {errors.tasks ?? 'valid'}
                      </span>
                      <br />
                      <div className="flex justify-between">
                        <div className="App_date">
                          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <label className="taskDueDate">
                              <DatePicker
                                mask="__-__-____"
                                label=""
                                value={taskDueDate}
                                inputFormat="MM-dd-yyyy"
                                formatDate={(taskDueDate) =>
                                  new Date(new Date()).format("DD-MM-YYYY")
                                }
                                name="due_date"
                                // inputFormat="MM-dd-yyyy"
                                minDate={new Date()}
                                onChange={(newValue) => {
                                  setTaskDueDate(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField variant="standard" {...params} />
                                )}
                              />
                            </label>
                          </LocalizationProvider> */}
                          {/* <input
                          name="due_date"
                          type="date"
                          value={inputData.due_date}
                          onChange={handleChange}
                        />  */}
                        </div>
                        <button
                          className="text-[#2472fc] text-base font-semibold"
                          onClick={handleSubmit}
                          id="adddataButtonHandler"
                        >
                          {/* <img src="/img/plus.png" /> */}
                          <BorderColorOutlined fontSize="small" color="primary" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t-4"></div>
            <div className="w-full max-w-[560px] pb-5">
              <div className={errors.price ? 'text-content   error' : 'text-content '}>
                <h2
                  className="text-2xl font-bold text-[#1b4ea8]"
                  style={{
                    color: '#1b4ea8',
                    fontSize: '24px',
                    margin: '22px 0px'
                  }}
                >
                  Budget and Timeline
                </h2>

                <div className="switch_Agency">
                  <div className="flex gap-4">
                    <label className="switch">
                      <input
                        type="checkbox"
                        value={isBudgetNotRequired}
                        checked={isBudgetNotRequired}
                        onClick={() => setIsBudgetNotRequired(!isBudgetNotRequired)}
                      />
                      <span className="slider round"></span>
                    </label>

                    <h4 className="text-lg text-black font-semibold">
                      Budget not required - Internal Project Management Only
                    </h4>
                  </div>
                </div>

                {!isBudgetNotRequired && (
                  <>
                    <h4 className="text-lg text-black font-semibold">Job Pricing Type</h4>

                    <div className="job_pricing-type" style={{ margin: '16px 0px 0px 0px' }}>
                      <div className="double_toogle_button">
                        <ToggleButtonGroup
                          className={
                            job_type == '0'
                              ? 'first_toogle_button fixed_toogle_button firstjobPricingTypebtn'
                              : 'fixed_toogle_button firstjobPricingTypebtn'
                          }
                          // className="fixed_toogle_button"
                          color="info"
                          value={job_type}
                          // exclusive
                          // onChange={handleChange}
                          onClick={() => setJobType('0')}
                          aria-label="Platform"
                        >
                          <ToggleButton value={0}>Fixed</ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                          className={
                            job_type == '1'
                              ? 'second_toogle_button fixed_toogle_button secondjobPricingTypebtn'
                              : 'fixed_toogle_button secondjobPricingTypebtn'
                          }
                          // className="hourly_toogle_button"
                          color="info"
                          // value={alignment}
                          // exclusive
                          // onChange={handleChange}
                          onClick={() => setJobType('1')}
                          aria-label="Platform"
                        >
                          <ToggleButton value={1}>Hourly</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                      {/* <button className="fixed_button">Fixed</button>
                      <button className="Hourly_button">Hourly</button> */}
                    </div>
                  </>
                )}
              </div>

              {!isBudgetNotRequired && (
                <>
                  <div className={errors.level ? ' mt-4 error' : ' mt-4'}>
                    <h4 className="text-lg text-black font-semibold">Experience Level</h4>{' '}
                    <div className="styled-select Companyname">
                      <Select
                        className={`${
                          companyvalue === 'null' ? 'text-[#939393] hover:border-[#939393] ' : 'text-[#000]'
                        } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1
                        }`}
                        open={isOpen10}
                        onOpen={() => {
                          setIsOpen10(true);
                        }}
                        onClose={() => {
                          setIsOpen10(false);
                        }}
                        // MenuProps={menuProps}
                        value={level}
                        onChange={e => {
                          setlevel(e.target.value);
                          setErrors({ ...errors, level: null });
                        }}
                        placeholder="Select Level"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="null">Select Level</MenuItem>
                        {levelsData?.levelsList?.data?.results?.map(item =>
                          item.is_active ? (
                            <MenuItem key={item.id} value={item.id}>
                              {item.level_name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                      <div className="diverrors44 diverrors5">
                        <span
                          style={{
                            color: '#D14F4F',
                            opacity: errors.level ? 1 : 0
                          }}
                        >
                          {errors.level ?? 'valid'}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* <div
                  className={
                    errors.price ? "text-content   error" : "text-content "
                  }
                >
                  <h4 className="Attachment_Price_new_4">Offer Price</h4>
                  <div className="pricename">
                    <input
                      className="offerpricenewclass"
                      type="number"
                      onKeyDown={blockInvalidChar}
                      // pattern="[0-9]"
                      value={price}
                      placeholder="Price"
                      onChange={(e) => {
                        setPrice(e.target.value.replace(/[^0-9.]/g, ""));
                        setErrors({ ...errors, price: null });
                      }}
                    />
                    <span className="pricetag pricetag_A pricetag_A21">$</span>
                  </div>
                  <div className="Price_A">
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.price ? 1 : 0,
                      }}
                    >
                      {errors.price ?? "valid"}
                    </span>
                  </div>
                </div> */}

              {isBudgetNotRequired && (
                <div className="selectUserProjectManagement my-4">
                  <h4 className="text-lg text-black font-semibold">Select User(s)</h4>
                  {/* eslint-disable-next-line */}
                  <Autocomplete
                    disabled={!companyvalue}
                    value={inHouseUser ?? []}
                    // name="inHouseUser"
                    // value={approvers}
                    multiple
                    id="tags-outlined"
                    // open={isOpenUser}
                    onInputChange={handleInputChangeAutocompleteUsers}
                    // filterOptions={filterOptionsUsers}
                    options={inHouseUserList?.inHouseUserList?.data?.results ?? []}
                    getOptionLabel={option => option?.user_full_name}
                    // onChange={(event, value) => setSkills(value)}
                    onChange={(e, v) => {
                      changeHandlerInHouseUsers(e, v);
                    }}
                    // defaultValue={skills ?? []}
                    // inputValue={skills}
                    // inputProps={{
                    //   "aria-label": "Without label",
                    // }}
                    filterSelectedOptions
                    // noOptionsText={
                    //   "Press enter to add this skill and select again"
                    // }
                    // hiddenLabel="true"
                    onKeyDown={handleKeyDownInHouseUsers}
                    autoHighlight={true}
                    renderInput={params => (
                      <TextField
                        {...params}
                        fullWidth
                        placeholder={!companyvalue ? 'Select a company first' : 'Type something'}
                      />
                    )}
                    isOptionEqualToValue={
                      (option, value) => value === undefined || value === '' || option.id === value.id
                      // option.value == value.value
                    }
                  />
                  <div className="diverrors44 diverrors5">
                    <span
                      style={{
                        color: '#D14F4F',
                        opacity: errors.inHouseUser ? 1 : 0
                      }}
                    >
                      {errors.inHouseUser ?? 'valid'}
                    </span>
                  </div>
                </div>
              )}

              {/* <h4 className="duedatetext">Due Date</h4>
                <div
                  className="main_date"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    float: "left",
                  }}
                >
                  <div
                    id="1"
                    onClick={() => handleDiv("1")}
                    className={divid == 1 ? "first_date activ3" : "first_date"}
                  >
                    <h1>24 Hours</h1>
                    <p>{coverter}</p>
                  </div>

                  <div
                    className={
                      divid == 2 ? "second_date activ3" : "second_date "
                    }
                    onClick={() => handleDiv("2")}
                  >
                    <h1>3 Day</h1>
                    <p>{coverter1}</p>
                  </div>
                  <div
                    className={divid == 3 ? "third_date activ3" : "third_date"}
                    onClick={() => handleDiv("3")}
                  >
                    <h1>7 Day</h1>
                    <p>{coverter2}</p>
                  </div>
                  <div
                    className={
                      divid == 4 ? "fourth_date activ4" : "fourth_date"
                    }
                    onClick={() => handleDiv("4")}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <label className="lastdatesec">
                        <DatePicker
                          mask="__-__-____"
                          label=""
                          value={deliveryDate}
                          inputFormat="MM-dd-yyyy"
                          formatDate={(deliveryDate) =>
                            new Date(new Date()).format("DD-MM-YYYY")
                          }
                          // inputFormat="MM-dd-yyyy"
                          minDate={new Date()}
                          onChange={(newValue) => {
                            setDeliveryDate(newValue);
                            setdivid("4");
                          }}
                          renderInput={(params) => (
                            <TextField variant="standard" {...params} />
                          )}
                        />
                      </label>
                    </LocalizationProvider>
                  </div>
                </div> */}
              <div className={errors.tags ? 'error' : ' '}>
                <h4 className="text-lg text-black font-bold mb-1">Tags</h4>
                <div className="Marketing  Marketing_2 display-f">
                  <div className="tags-input-container">
                    {tags?.map((tag, index) => (
                      <div className="tag-item" key={index}>
                        <span className="text">{tag}</span>
                        <span className="close" onClick={() => removeTag(index)}>
                          <svg
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconOutlinedColorDefault css-i4bv87-MuiSvgIcon-root"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="CancelIcon"
                          >
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                          </svg>
                        </span>
                      </div>
                    ))}
                    <input
                      onKeyDown={handleKeyDown}
                      onChange={e => {
                        setErrors({ ...errors, tags: null });
                      }}
                      type="text"
                      className="tags-input"
                      placeholder="Type something"
                    />
                  </div>
                </div>
                <div className="diverrors44">
                  <span
                    style={{
                      color: '#D14F4F',
                      opacity: errors.tags ? 1 : 0
                    }}
                  >
                    {errors.tags ?? 'valid'}
                  </span>
                </div>
              </div>
              {/* <div className="switch_Agency">
                  <div className="Observers1">
                    <label className="switch">
                      <input type="checkbox" onClick={handleClick} />
                      <span className="slider round"></span>
                    </label>

                    {!textchange && <h4>Save as Template</h4>}

                    {textchange && <h4>Save as New Template</h4>}
                  </div>
                </div>
                {isShown && (
                  <div
                    className={
                      errors.template
                        ? "istoggle_Shown error "
                        : "istoggle_Shown  "
                    }
                  >
                    <p className="Templatetext">
                      This will save everything except the Offer Price, Due
                      Date, and Previous Job
                    </p>
                    <input
                      className="Templatesave"
                      type="text"
                      // placeholder="Please enter title"
                      onChange={(e) => {
                        setTemplatename(e.target.value);
                        setErrors({ ...errors, template: null });
                      }}
                    />
                    <span
                      className="errordiv4141"
                      style={{
                        color: "#D14F4F",
                        opacity: errors.template ? 1 : 0,
                      }}
                    >
                      {errors.template ?? "valid"}
                    </span>
                  </div>
                )} */}
            </div>
            <div className="text-content mt-4">
              <div className="flex justify-between">
                <div className=" flex gap-4">
                  <Link to={TEMPLATES_ROUTE.HOME} className="btn btn-outline w-full max-w-[160px]">
                    Cancel
                  </Link>
                  <div className="">
                    <button
                      type="button"
                      onClick={e => {
                        validateSubmit(e, 'post');
                        setstatus(2);
                      }}
                      className="btn btn-primary w-full max-w-[160px]"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {showdraft && (
                  <>
                    {' '}
                    <div className="buttomjobbtn draftButt">
                      <button
                        type="button"
                        onClick={e => {
                          validateSubmit(e, 'draft');
                          setstatus(0);
                        }}
                        className="btn btn-outline w-full max-w-[160px]"
                      >
                        Save draft
                      </button>
                    </div>{' '}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Dialog className="BrowseVaultDialogMedia media" open={openVault} onClose={handleCloseDam}>
          <DialogTitle className="profileImgHeadingAnew">
            <div className="Ajobshare">
              <span className="closebuttonsec" onClick={handleCloseDam}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </DialogTitle>
          <div className="dialogcontent_and_actions_new">
            <DialogContent className="ChangeEmailAContent">{/* <Media /> */}</DialogContent>
            <DialogActions>
              <div className="sharebuttonjobcontent">
                <div className="cancelButtonnewWithSave">
                  <button onClick={handleCloseDam} className="canceButtonnewPop">
                    Cancel
                  </button>
                  <button onClick={saveDamDataHandler} className="shareNewPopPublic">
                    Attach files
                  </button>
                </div>
              </div>
            </DialogActions>
          </div>
        </Dialog>

        <Dialog className="BrowseVaultDialogMedia media" open={openVault1} onClose={handleCloseDam1}>
          <DialogTitle className="profileImgHeadingAnew">
            <div className="Ajobshare">
              <span className="closebuttonsec" onClick={handleCloseDam1}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </DialogTitle>
          <div className="dialogcontent_and_actions_new">
            <DialogContent className="ChangeEmailAContent">{/* <Media /> */}</DialogContent>
            <DialogActions>
              <div className="sharebuttonjobcontent">
                <div className="cancelButtonnewWithSave">
                  <button onClick={handleCloseDam1} className="canceButtonnewPop">
                    Cancel
                  </button>
                  <button onClick={saveDamDataHandler1} className="shareNewPopPublic">
                    Attach files
                  </button>
                </div>
              </div>
            </DialogActions>
          </div>
        </Dialog>
      </div>
      {/* )} */}
    </>
  );
};

export default EditTemplate;
