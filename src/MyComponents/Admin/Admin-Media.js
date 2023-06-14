import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { BACKEND_API_URL } from "../../environment";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { Alert, Form, Modal, ProgressBar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createMedia } from "../../redux/actions/media-actions";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { useDropzone } from "react-dropzone";
import { ConstructionOutlined } from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment/moment";
import Select from "@mui/material/Select";
// import Movemedia from "./MovefolderDam";
// import Movemedia from "../Frontend/MovefolderDam";
// import Media_datatable from "./Media-datatable";
import Admin_Movemedia from "./Admin-movefolderdam";
// import Media_datatable from "../Frontend/Media-datatable";
import Admin_Media_datatable from "./Admin-Tableview";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import $ from "jquery";
import Box from "@mui/material/Box";
import { validations } from "../../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { listAllAdminCompanies } from "../../redux/actions/company-actions";
import {
  SuperAdminlistAllDam,
  SuperAdminlistAllROOTDam,
  SuperAdmingetdamDetailswithid,
  SuperAdminDAMParentPost,
  SuperAdminlistAllDamImages,
  SuperAdmingetdamImageswithid,
  SuperAdminDAMParentPostCollection,
  SuperAdminDAMPost,
  SuperAdminDAMCollectionPost,
  SuperAdminlistAllCollectionDAM,
  SuperAdmingetdamCollectionDetailswithid,
  SuperAdminlistAllRootImages,
  SuperAdminDAMParentCollection,
  SuperAdmincollectionfilespost,
  SuperAdmindeletedam,
  SuperAdminFavorites,
  SuperAdminTitleupdate,
  SuperAdmindeleteCollection,
  SuperAdminCollectionView,
  SuperAdminDAMMovePost,
  SuperAdminDamMoveMultiple,
  SuperAdminDamcopypost,
  SuperAdminRenamefolder,
  SuperAdminDamMutipledelete,
  SuperAdminDamSearch,
  SuperAdminDamSearchfolder,
  SuperAdminDamMoveCollectioninside,
  SuperAdminDamFilterFavourateCount,
  SuperAdminDamFilterFavourateCountID,
  SuperAdminlistAllMostUsedcount,
  SuperAdminlistAllParentFilter,
  SuperAdmindamShare,
  SuperAdminlistCompanies,
  SuperAdminlistCompaniesID,
  SuperAdminCountCompanies,
  SuperAdminCountCompaniesID,
  SuperAdminDamDataDetails,
} from "../../redux/actions/Admin-dam-action";

import { DamIDReducer } from "../../redux/reducers/Dam-reducer";
import { listAllCompanies } from "../../redux/actions/Workflow-company-action";

import { element, elementType } from "prop-types";
import { listAllSkills } from "../../redux/actions/skill-actions";
import { id } from "date-fns/locale";
import { ADMIN_DAM_ID_RESET } from "../../constants/Admin-dam-constant";
import * as FileSaver from "file-saver";

// import { json } from "stream/consumers";

function Admin_Media(currentFolder) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { parentid } = useParams();

  /****** Right Click Start ******/
  useEffect(() => {
    const handler = () => {
      setContextMenu(null);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const [rootid, setrootid] = useState();
  const [progress, setProgress] = React.useState(10);
  const [circularprogressshow, setcircularprogressshow] = useState(true);
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const { companiesData, loading: companyLoading } = useSelector(
    (state) => state.companyAdminReducer
  );

  const [addedSkill, setAddedSkill] = useState(false);
  const [skillsMove, setSkillsMove] = useState();
  const [isShown, setIsShown] = useState(false);
  const [deleteicontext, setdeleteicontext] = useState(false);
  const [hidecheck, sethidecheck] = useState(true);
  const [FavFolder, setfavfolder] = useState(true);
  const [tags, setTags] = useState([]);
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [deletevaluesingle, setdeletevaluesingle] = useState();
  const [companyvalue, setcompanyvalue] = useState(null);
  const [companydataupdate, setcompanydataupdate] = useState(null);
  const [collectionShowIdData, setCollectionShowIdData] = useState();
  const [skills, setSkills] = useState([]);
  const [comapnyChange, setCompanyChange] = React.useState(false);

  const { skillsData } = useSelector((state) => state.skillReducer);

  const { DamCompany, success: companylistall } = useSelector(
    (state) => state.SuperAdminCompanyreducer
  );

  const { DamIdCompanylist, success: companycountlist } = useSelector(
    (state) => state.SuperAdminCompanyCountreducer
  );

  const { success: damrenameupdate } = useSelector(
    (state) => state.SuperAdmindamrenamereducer
  );

  function checkAge(age) {
    return age == 100;
  }

  const { DamIdCompany, success: companylistall1 } = useSelector(
    (state) => state.SuperAdminCompanyIDreducer
  );

  const handleInputChangeAutocomplete = (event, newInputValue) => {
    if (newInputValue.length > 0) {
      setIsOpenSkill(true);
    } else {
      setIsOpenSkill(false);
    }
  };

  function handleKeyDownSkills(e) {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    setIsOpenSkill(true);
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    const filteredCurrentSkills = skills.filter((str) =>
      str.skill_name.toLowerCase().includes(value.toLowerCase().trim())
    );
    // console.log("filteredCurrentSkills", filteredCurrentSkills);
    const filteredDatabaseSkills = skillsData.filter((str) => {
      if (str.skill_name.toLowerCase() === value.toLowerCase().trim()) {
        return true;
      }
    });
    // console.log("filteredDatabaseSkills", filteredDatabaseSkills);
    if (filteredDatabaseSkills.length > 0 && filteredCurrentSkills.length > 0) {
      swal({
        title: "Notice",
        text: "Skill already exists",
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      return;
    }
    for (var i = 0; i < skillsData.length; i++) {
      if (
        skillsData[i].skill_name
          .toLowerCase()
          .indexOf(value.toLowerCase().trim()) > -1
      ) {
        // changeHandler(e, value);
        // setSkills([...skills, value]);
        e.target.value = "";
        return;
      }
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userDataFromStore.token}`,
      },
    };

    axios
      .post(
        `${BACKEND_API_URL}skills/`,
        {
          skill_name: value,
          is_active: true,
        },
        config
      )
      .then((res) => {
        // console.log("keys", res);
        setAddedSkill(true);
        setAddedSkill(false);
        const addedSkill = skillsData.filter((item) => item.id === value);
        // setSkills([...skills, res.data]);
      });
    e.target.value = "";
  }

  useEffect(() => {
    dispatch(listAllSkills());
  }, [addedSkill]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.skill_name,
  });

  const changeHandler = (e, v) => {
    setSkills(v);
  };

  const handleClickShowMediaTable = () => {
    if (damjobshow == false) {
      if (parentid) {
        navigate(`/admin-media-datatable/${parentid}`);
      } else {
        navigate(`/admin-media-datatable`);
      }
    } else {
      setIsShown(true);
    }

    if (parentid == undefined) {
      sethidefolder(true);
      dispatch(SuperAdminlistAllROOTDam());
      dispatch(SuperAdminlistAllDamImages());
      dispatch(SuperAdminlistAllCollectionDAM());
      setLastElemenetChk();
    } else if (parentid) {
      setParentidvalue(parentid);
      sethidefolder(false);
      setLastElemenetChk(parentid);
      dispatch(SuperAdminlistAllDam(parentid));
      dispatch(SuperAdmingetdamImageswithid(parentid));
      dispatch(SuperAdmingetdamDetailswithid(parentid));
      dispatch(SuperAdminDAMParentCollection(parentid));
      dispatch(SuperAdminlistAllMostUsedcount(parentid));
      const myname = JSON.parse(localStorage.getItem("name"));
      const idget = JSON.parse(localStorage.getItem("id"));
      const myparentid = JSON.parse(localStorage.getItem("parentid"));
      localStorage.setItem("name", JSON.stringify(myname));
      localStorage.setItem("myid", JSON.stringify(idget));
      localStorage.setItem("parentid", JSON.stringify(myparentid));
      setTimeout(() => {
        setState(myname);
        setStateid(idget);
        setStateparentid(myparentid);
        setlocalname(JSON.parse(localStorage.getItem("name")));
        // setlocalid(JSON.parse(localStorage.getItem("id"))),
        setlocalparentid(JSON.parse(localStorage.getItem("parentid")));
        return;
      }, 200);

      setTimeout(() => {
        setlocalid(JSON.parse(localStorage.getItem("id")));
      }, 200);
    }
  };

  const [users, setUsers] = useState([]);
  const [companylist, setcompanylist] = useState([]);
  const [companylistnull, setcompanylistnull] = useState([]);

  const { companyData, success: stagesLoading } = useSelector(
    (state) => state.agencyCompanyReducer
  );

  const [yourfilter, setyourfilter] = useState(true);
  const [total, settotal] = useState([]);
  const [companylistid, setcompanylistid] = useState([]);
  const [sortby, setsortby] = useState("");
  const [showprogressheader, setshowprogressheader] = useState([]);

  const { DamIdCompanydatalist, success: Companycountdatavlue } = useSelector(
    (state) => state.CompanyCountIDreducer
  );

  // const handleBeforeUnload = (e) => {
  //   let lengthstore = [];
  //   e.preventDefault();
  //   {
  //     inputRef.current?.length && (
  //       <>
  //         {inputRef.current?.map((file, index) =>
  //           lengthstore.push(file?.progress2)
  //         )}
  //       </>
  //     );
  //   }
  //   for (let key in lengthstore) {
  //     if (inputRef.current?.length && lengthstore[key] != 100) {
  //       if (lengthstore[key] != 100) {
  //         const message =
  //           "Are you sure you want to leave? All provided data will be lost.";
  //         e.returnValue = message;
  //         return message;
  //       } else {
  //         window.location.reload();
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (e.target.checked) {
      if (name === "allSelect") {
        settotal([
          "Your Favorites",
          "Photo",
          "Videos",
          "Collections",
          "Folders",
        ]);
        setyourfilter(false);
      } else {
        settotal([...total, name]);
        setyourfilter(false);
      }
    } else {
      if (name === "allSelect") {
        settotal([]);
        setisfiles(true);
      } else {
        settotal(total.filter((el, i) => el !== name));
      }
    }
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const handlecollectionfilter = (e, id) => {
    const { name, checked } = e.target;
    if (companylistid.includes(id)) {
      setcompanylistid(companylistid.filter((el, i) => el !== id));
    } else {
      setcompanylistid([...companylistid, id]);
      setyourfilter(false);
    }
  };

  const [companyshow, setcompanyshow] = useState(true);
  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    if (sortby == "new") {
      params += "ordering=-created";
      setcount([]);
      setisfiles(false);
    } else if (sortby == "old") {
      params += "ordering=created";
      setcount([]);
      setisfiles(false);
    } else if (sortby == "mostused") {
      params += "ordering=-dam_media__job_count";
      setcount([]);
      setisfiles(false);
    }
    if (total.includes("Your Favorites")) {
      params += "&is_favourite=true";
      companyparams += "&favourite=true";
      setcount([]);
      setisfiles(false);
    }
    if (total.includes("Photo")) {
      params += "&photos=1";
      companyparams += "&photos=1";
      setisfiles(false);
      setcount([]);
    }
    if (total.includes("Folders")) {
      companyparams += "&folders=1";
      if (total.includes("Videos")) {
        params += "&folders=1";
      } else if (total.includes("Photo")) {
        params += "&folders=1";
      } else if (total.includes("Your Favorites")) {
        params += "&folders=1";
      } else if (total.includes("Collections")) {
        params += "&folders=1";
      } else if (total.includes("allSelect")) {
        params += "&folders=1";
      } else {
        params += "&type=1";
      }
    }
    if (total.includes("Videos")) {
      params += "&videos=1";
      companyparams += "&videos=1";
      setisfiles(false);
      setcount([]);
    }
    if (total.includes("Collections")) {
      companyparams += "&collections=1";
      if (total.includes("Videos")) {
        params += "&collections=1";
      } else if (total.includes("Photo")) {
        params += "&collections=1";
      } else if (total.includes("Your Favorites")) {
        params += "&collections=1";
      } else if (total.includes("Folders")) {
        params += "&collections=1";
      } else if (total.includes("allSelect")) {
        params += "&collections=1";
      } else {
        params += "&type=2";
      }
      setisfiles(false);
      setcount([]);
    }
    if (total.includes("allSelect")) {
      params += "is_favourite=true";
      params += "&type=3";
      params += "&is_video=true";
      params += "&type=2";
      params += "&folders=1";
      companyparams += "&folders=1";
      companyparams += "&videos=1";
      companyparams += "&photos=1";
      companyparams += "&favourite=true";
      companyparams += "&collections=1";
      setisfiles(false);
      setcount([]);
    }

    if (companylistid.length) {
      params += `&company=${companylistid}`;
      setisfiles(false);
      setcompanyshow(false);
      if (parentid || jobshow) {
        if (jobshow) {
          dispatch(SuperAdminCountCompaniesID(jobshow, companylistid));
        } else {
          dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
        }
      } else {
        dispatch(SuperAdminCountCompanies(companylistid));
      }
    } else if (!companylistid.length) {
      setcompanyshow(true);
      dispatch(SuperAdminDamFilterFavourateCountID(params));
    } else {
      if (
        !total.includes("Photo") &&
        !sortby &&
        !total.includes("Your Favorites") &&
        !total.includes("Videos") &&
        !total.includes("Collections")
      ) {
        setisfiles(true);
      }
    }

    if (parentid || jobshow) {
      if (jobshow) {
        dispatch(SuperAdminlistAllParentFilter(params, jobshow));
      } else {
        dispatch(SuperAdminlistAllParentFilter(params, parentid));
      }
    } else {
      dispatch(SuperAdminDamFilterFavourateCountID(params));
    }

    if (companyparams) {
      if (parentid) {
        dispatch(SuperAdminlistCompaniesID(parentid, companyparams));
      } else {
        dispatch(SuperAdminlistCompanies(companyparams));
      }
    } else {
      if (parentid) {
        dispatch(SuperAdminlistCompaniesID(parentid));
      } else {
        dispatch(SuperAdminlistCompanies());
      }
    }
  }, [total, sortby, companylistid, damrenameupdate]);

  useEffect(() => {
    let jobshow = localStorage.getItem("damon");
    if (jobshow == "on") {
      setdamjobshow(true);
    }
  }, []);

  useEffect(() => {
    dispatch(listAllAdminCompanies());
  }, []);

  useEffect(() => {
    let arrJobPrevDocuments = [];
    let prev_files = JSON.parse(localStorage.getItem("prev_vault"));
    if (prev_files != null) {
      prev_files?.map((file) => arrJobPrevDocuments.push(file.id));
    }
    setcount(arrJobPrevDocuments);
  }, []);

  const getvalue1 = (e) => {
    if (e.target.value == null) {
    } else {
      setsearchfolder(e.target.value);
      if (parentid) {
        dispatch(SuperAdminDamSearch(e.target.value, parentid));
        dispatch(SuperAdminDamSearchfolder(e.target.value, parentid));
      } else {
        dispatch(SuperAdminDamSearch(e.target.value, ""));
        dispatch(SuperAdminDamSearchfolder(e.target.value, ""));
      }
    }
    setsearchvalue(e.target.value);
  };

  useEffect(() => {
    const handler = () => {
      setFileContextMenu(null);
      setFileVideoContextMenu(null);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    dispatch(listAllSkills());
  }, []);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    if (fileContextMenu) {
      setFileContextMenu(
        fileContextMenu === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
          : null
      );
    } else if (folderContextMenu) {
      setFolderContextMenu(
        folderContextMenu === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
          : null
      );
    } else if (CollectionContextMenu) {
      setCollectionContextMenu(
        CollectionContextMenu === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
          : null
      );
    } else if (fileVideoContextMenu) {
      setFileVideoContextMenu(
        fileVideoContextMenu === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
          : null
      );
    } else {
      setContextMenu(
        contextMenu === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
          : null
      );
    }
  };
  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const [errors1, setErrors] = useState({
    folderName: null,
    CollectionName: null,
  });

  /****** Right Click End ******/
  const { success: deleteloader } = useSelector(
    (state) => state.SuperAdminDamDeleteReducer
  );
  const { success: deleteCollectionloader } = useSelector(
    (state) => state.SuperAdminCollectionDelete
  );

  const { success: Collectionfilessucess } = useSelector(
    (state) => state.SuperAdminCollectionfilespostreducer
  );

  const { success: moveon } = useSelector(
    (state) => state.SuperAdminPostDamReducer
  );
  const { loading: moveonbro } = useSelector(
    (state) => state.SuperAdminPostDamReducer
  );
  const { success: moveit } = useSelector(
    (state) => state.SuperAdminCollectionviewreducer
  );

  const { success: reducertitleupdate } = useSelector(
    (state) => state.SuperAdminTitlereducer
  );
  const { success: moveparent } = useSelector(
    (state) => state.SuperAdminPostDamParentReducer
  );

  const [showprogress, setshowprogress] = useState(false);
  const [showprogressdata, setshowprogressdata] = useState(false);

  const { loading: getdatawhere } = useSelector(
    (state) => state.SuperAdminPostDamParentReducer
  );

  useEffect(() => {
    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("20");
      }
    }, 1000);

    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("30");
      } else if (moveon && showprogress && progress == "100") {
        setProgress("100");
      }
    }, 2000);

    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("40");
      } else if (moveon && showprogress && progress == "100") {
        setProgress("100");
      }
    }, 3000);

    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("50");
      } else if (moveon && showprogress && progress == "100") {
        setProgress("100");
      }
    }, 4000);

    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("60");
      } else if (moveon && showprogress && progress == "100") {
        setProgress("100");
      }
    }, 5000);

    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("70");
      } else if (moveon && showprogress && progress == "100") {
        setProgress("100");
      }
    }, 6000);

    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("80");
      } else if (moveon && showprogress && progress == "100") {
        setProgress("100");
      }
    }, 7000);

    setTimeout(() => {
      if (!moveon && showprogress && progress != "100") {
        setProgress("90");
      } else if (moveon && showprogress && progress == "100") {
        setProgress("100");
      }
    }, 8000);

    setInterval(() => {
      if (moveon && showprogress) {
        setProgress("100");
        setcircularprogressshow(false);
      }
    }, 8200);
  }, [showprogressdata]);

  useEffect(() => {
    setshowprogressdata(false);
  }, [moveon, getdatawhere]);

  const { DamCountData } = useSelector(
    (state) => state.SuperAdminDamFilterFavourateCount
  );

  const { DamCountDataid } = useSelector(
    (state) => state.SuperAdminDamFilterFavourateCountID
  );

  const { loading: parentloader } = useSelector(
    (state) => state.SuperAdminDamFilterFavourateCountID
  );

  const { userData: userDataFromStore } = useSelector(
    (state) => state.authReducer
  );

  const userData = [
    { name: "Your Favorites" },
    { name: "Photo" },
    { name: "Videos" },
    { name: "Collections" },
    { name: "Folders" },
  ];

  const { success: collectiondata } = useSelector(
    (state) => state.SuperAdminPostDamCollectionReducer
  );

  const { Collectionviewdata } = useSelector(
    (state) => state.SuperAdminCollectionviewreducer
  );

  const { DamDataCollectionId } = useSelector(
    (state) => state.SuperAdminDamIDCollectionReducer
  );

  const { success: dialogdata } = useSelector(
    (state) => state.SuperAdminDamIDCollectionReducer
  );

  const [addNew, setAddNew] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { RootDamData } = useSelector(
    (state) => state.SuperAdminRootDamReducer
  );

  const { DamImageData } = useSelector(
    (state) => state.SuperAdminDamimageReducer
  );

  const { success: favpass } = useSelector(
    (state) => state.SuperAdminDamimageReducer
  );

  const { DamDataImages } = useSelector(
    (state) => state.SuperAdminDamIDIMAGESReducer
  );

  const { loading: collectionparentpost } = useSelector(
    (state) => state.SuperAdminPostDamIdCollectionReducer
  );
  const { success: collectionparentpostsucess } = useSelector(
    (state) => state.SuperAdminPostDamIdCollectionReducer
  );

  const { DamRootImages } = useSelector(
    (state) => state.SuperAdminDamRootImages
  );
  const { DamCollectionParentImages } = useSelector(
    (state) => state.SuperAdminDamParentCollection
  );

  const { loading: collectionparent } = useSelector(
    (state) => state.SuperAdminDamParentCollection
  );

  const { DamData, success: damDataSuccess } = useSelector(
    (state) => state.SuperAdminDamReducer
  );
  const { DamData1 } = useSelector((state) => state.SuperAdminDamIDReducer);

  const { DamPostCollectionData } = useSelector(
    (state) => state.SuperAdminDamCollectionReducer
  );

  const [isOpenImg, setIsOpenImg] = useState(false);

  const showModalImg = () => {
    setIsOpenImg(true);
  };

  const ModalImg = ({ src, alt, onClose }) => {
    return (
      <div className="modalImgPOP">
        <span className="closePop" onClick={onClose}>
          &times;
        </span>
        <img className="modal_content" src={src} alt={alt} />
      </div>
    );
  };

  const sizeincrease = () => {
    showModalImg();
    setFileContextMenu(false);
    setFileContextMenu(null);
    setCollectionContextMenu(null);
  };

  useEffect(() => {
    if (parentid == undefined) {
      dispatch(SuperAdminlistAllCollectionDAM());
    } else if (parentid) {
      dispatch(SuperAdminDAMParentCollection(parentid));
    }
  }, [damrenameupdate]);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(SuperAdmingetdamImageswithid(jobshow));
    } else {
      dispatch(SuperAdminlistAllRootImages());
      dispatch(SuperAdminlistAllDamImages());
      if (parentid) {
        dispatch(SuperAdmingetdamImageswithid(parentid));
      }
    }
  }, [collectionparentpostsucess]);

  const [isDisplayDetails, setIsDisplayDetails] = useState(false);
  const [hidefolder, sethidefolder] = useState(true);
  const [searchfolder, setsearchfolder] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");
  const [selectimages, setselectimages] = useState([]);
  const [copyfolderdata, setcopyFolderdata] = useState(false);
  const [copyfolderdata1, setcopyFolderdata1] = useState(false);
  const [copyfolderdata2, setcopyFolderdata2] = useState(false);
  const [copydata, setcopydata] = useState(false);
  const [movedata, setmovedata] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [CollectionName, setCollectionName] = useState("");
  const [CollectionNameShow, setCollectionNameShow] = useState("");
  const [Parentid, setParentid] = useState();
  const [favouritefolder, setisfavouritefolder] = useState();
  const [favouritecollection, setisfavouritecollection] = useState();
  const [folderdeleteid, setfolderdeleteid] = useState();
  const [Renamechange, setrenamechange] = useState();
  const [folderdeletedam, setfolderdeletedam] = useState();
  const [imagefav, setimagefav] = useState();
  const [movefoldershow, setmovefoldershow] = useState(true);
  const [count, setcount] = useState([]);
  const [countfav, setcountfav] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [moveid, setmoveid] = useState();
  const [parentidvalue, setParentidvalue] = useState();
  const [parentvalue, setparentvalue] = useState();
  const [collectionlength, setcollectionlength] = useState();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState([]);
  const [createddate, setcreateddate] = useState();
  const [username, setusername] = useState("");
  const [filesize, setfilesize] = useState();
  const [open2, setOpen2] = useState(false);
  const [titlename, settitleName] = useState();
  const [publicvalue, setpublicvalue] = useState();
  const [fullview, setFullview] = useState();
  const [limiteusage, setlimitusage] = useState();
  const [description, setdescription] = useState("");
  const [detailsid, setdetailsid] = useState();
  const [imagevisible, setimagevisible] = useState();
  const [favouritevalue, setisfavourite] = useState();
  const [idstore, setidstore] = useState();
  const [multiImages, setMultiImages] = useState([]);

  const [createdropdown, setCreatedropdown] = React.useState(null);
  const open = Boolean(createdropdown);

  const [openFolder, setOpenFolder] = React.useState(false);
  const [moveFolder, setmoveFolder] = React.useState(false);
  const [moveFolder1, setmoveFolder1] = React.useState(false);
  const [moveFolder2, setmoveFolder2] = React.useState(false);

  const [openUploadFile, setopenUploadFile] = React.useState(false);

  const [openUploadCollection, setopenUploadCollection] = React.useState(false);

  const [isfiles, setisfiles] = useState(true);

  const [iscount, setiscount] = useState(false);

  const handleClickfiles = (event) => {
    setisfiles((current) => !current);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const countclick = () => {
    setiscount((current) => !current);
  };

  const publicvalue1 = (e) => {
    setpublicvalue(e.target.value);
    settitleupdater(true);
  };

  const handleCloseFolder = () => {
    setOpenFolder(false);
    setFolderName("");
    setFolderContextMenu(null);
    setisfavouritefolder();
    setisfavouritecollection();
    if (!parentid) {
      setcompanyvalue(null);
    }
  };

  const imageinsidevalue = () => {
    setIsDisplayDetails(true);
    setFileContextMenu(null);
    setContextMenu(null);
    setOpen2(false);
    setCollectionContextMenu(null);
    setimagevisible(detailsid);
  };

  const detailschange = () => {
    const formData = new FormData();
    formData.append("title", titlename);
    for (var i = 0; i < skills.length; i++) {
      formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
    }
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("limit_usage", limiteusage);
    formData.append("usage", publicvalue);
    formData.append("limit_usage_toggle", iscount);
    if (companydataupdate) {
      formData.append("company", companydataupdate);
    } else {
      formData.append("company", "");
    }
    formData.append("dam", movefileid);
    setIsDisplayDetails(false);
    setdetailsid();
    dispatch(SuperAdminTitleupdate(formData, detailsid));
    setIsLoading(true);
    setTimeout(() => {
      setdeletevalue([]);
      setdeletevaluesingle();
      setdetailsid();
      setcount([]);
      setcompanydataupdate();
      setiscount(false);
    }, 2000);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (parentid) {
      dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
    } else {
      dispatch(SuperAdminCountCompanies(companylistid));
    }
    if (parentid) {
      dispatch(SuperAdminlistCompaniesID(parentid));
    } else {
      dispatch(SuperAdminlistCompanies());
    }

    if (titleupdater) {
      let jobshow = localStorage.getItem("jobdamid");
      if (jobshow) {
        dispatch(SuperAdmingetdamImageswithid(jobshow));
      } else {
        dispatch(SuperAdminlistAllRootImages());
        dispatch(SuperAdminlistAllDamImages());
        if (parentid) {
          dispatch(SuperAdmingetdamImageswithid(parentid));
        }
      }
    }
    settitleupdater(false);
  }, [reducertitleupdate]);

  const handleCloseUpload = () => {
    setopenUploadFile(false);
    setFiles([]);
  };

  const [showprogressbox, setshowprogressbox] = React.useState(false);

  const UploadProgress = () => {
    setshowprogressbox((current) => !current);
  };

  useEffect(() => {
    if (damDataSuccess) {
      if (DamData?.[0]?.company_id) {
        setcompanyvalue(DamData?.[0]?.company_id);
      } else {
        setcompanyvalue(null);
      }
    }
  }, [damDataSuccess, parentid]);

  const handleCloseCollection = () => {
    setFileGallery([]);
    setexistingmediafile([]);
    setCollectionName("");
    setopenUploadCollection(false);
    setFolderContextMenu(null);
    setisfavouritefolder();
    setisfavouritecollection();
    setdetailsid();
    setCollectionShowIdData();
  };

  const { DamSearch1 } = useSelector((state) => state.SuperAdminDamSearch);
  const { DamSearchnew } = useSelector(
    (state) => state.SuperAdminDamSearchfolder
  );

  const { Dammostused } = useSelector(
    (state) => state.SuperAdminlistAllMostUsed
  );

  const { DamParentFilter } = useSelector(
    (state) => state.SuperAdminAllParentFilter
  );

  const { loading: filterloader } = useSelector(
    (state) => state.SuperAdminAllParentFilter
  );

  const [state, setState] = React.useState([]);
  const [stateid, setStateid] = React.useState([]);
  const [stateparent, setStateparent] = React.useState([]);
  const [stateparentid, setStateparentid] = React.useState([]);

  const [fileGallery, setFileGallery] = useState([]);
  const [mediafile, setexistingmediafile] = useState([]);

  useEffect(() => {
    const handler = () => {
      setCreatedropdown(null);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const handleClick = (event) => {
    setCreatedropdown(event.currentTarget);
  };

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  const videoStyle = {
    display: "block",
    width: "100%",
    Position: "relative",
  };
  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    minWidth: 0,
    overflow: "hidden",
    position: "relative",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState([]);

  const {
    getRootProps: getRootfileProps,
    getInputProps: getInputfileProps,
    isDragActive,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "video/mov": [],
      "video/mp4": [],
      "audio/mpeg": [],
      "video/quicktime": [],
    },
    onDrop: useCallback(
      (acceptedFiles) => {
        setFiles([
          ...files,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              title: file.name,
            })
          ),
        ]);
      },
      [files]
    ),
  });

  const {
    getRootProps: getRootGalleryProps,
    getInputProps: getInputGalleryProps,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "video/mov": [],
      "video/mp4": [],
      "audio/mpeg": [],
      "video/quicktime": [],
    },
    onDrop: useCallback(
      (acceptedFiles) => {
        setFileGallery([
          ...fileGallery,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              title: file.name,
            })
          ),
        ]);
      },
      [fileGallery]
    ),
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <span index="0" className="removeFileXbtn">
          {/* <a
            href="#"
            onClick={removeFile(file)}
            className="icon_asdsdasd"
            title="Remove"
          >
            <i className="fa-solid fa-circle-xmark" onClick={removeFile(file)}></i>
          </a> */}
        </span>

        {file.type == "video/mp4" && (
          <>
            <div onClick={removeFile(file)}>
              <span className="crossicon12">X</span>
            </div>
            <video style={videoStyle}>
              <source src={file.preview} type="video/mp4" />
            </video>
            {file.title}
            {file.name}
          </>
        )}

        {file.type == "audio/mpeg" && (
          <>
            <div onClick={removeFile(file)}>
              <span className="crossicon">X</span>
            </div>
            <audio controls>
              <source src={file.preview} />
            </audio>
            {file.title}
            {file.name}
          </>
        )}

        {file.type != "video/mp4" && (
          <>
            <div onClick={removeFile(file)}>
              <span className="crossicon">X</span>
            </div>
            <img
              src={file.preview}
              style={img}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
            {file.title}
            {file.name}
          </>
        )}
      </div>
    </div>
  ));

  const [localname, setlocalname] = useState([]);
  const [localid, setlocalid] = useState([]);
  const [localparentid, setlocalparentid] = useState([]);
  const [movefileid, setmovefileid] = useState();
  const [deletevalue, setdeletevalue] = useState([]);
  const [damjobshow, setdamjobshow] = useState(false);
  const [titleupdater, settitleupdater] = React.useState(false);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      setParentidvalue(jobshow);
      sethidefolder(false);
      setLastElemenetChk(jobshow);
      dispatch(SuperAdminlistAllDam(jobshow));
      dispatch(SuperAdminlistCompaniesID(jobshow));
      dispatch(SuperAdmingetdamImageswithid(jobshow));
      dispatch(SuperAdmingetdamDetailswithid(jobshow));
      dispatch(SuperAdminDAMParentCollection(jobshow));
      dispatch(SuperAdminlistAllMostUsedcount(jobshow));
      const myname = JSON.parse(localStorage.getItem("name"));
      const idget = JSON.parse(localStorage.getItem("id"));
      const myparentid = JSON.parse(localStorage.getItem("parentid"));
      localStorage.setItem("name", JSON.stringify(myname));
      localStorage.setItem("myid", JSON.stringify(idget));
      localStorage.setItem("parentid", JSON.stringify(myparentid));
      setTimeout(() => {
        setState(myname);
        setStateid(idget);
        setStateparentid(myparentid);
        setlocalname(JSON.parse(localStorage.getItem("name")));
        // setlocalid(JSON.parse(localStorage.getItem("id"))),
        setlocalparentid(JSON.parse(localStorage.getItem("parentid")));
        return;
      }, 200);

      setTimeout(() => {
        setlocalid(JSON.parse(localStorage.getItem("id")));
      }, 200);
    } else {
      if (parentid == undefined) {
        sethidefolder(true);
        dispatch(SuperAdminlistCompanies());
        dispatch(SuperAdminlistAllROOTDam());
        dispatch({ type: ADMIN_DAM_ID_RESET });
        dispatch(SuperAdminlistAllDamImages());
        dispatch(SuperAdminlistAllCollectionDAM());
        setLastElemenetChk();
      } else if (parentid) {
        setParentidvalue(parentid);
        sethidefolder(false);
        setLastElemenetChk(parentid);
        dispatch(SuperAdminlistAllDam(parentid));
        dispatch(SuperAdminlistCompaniesID(parentid));
        dispatch(SuperAdmingetdamImageswithid(parentid));
        dispatch(SuperAdmingetdamDetailswithid(parentid));
        dispatch(SuperAdminDAMParentCollection(parentid));
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
        const myname = JSON.parse(localStorage.getItem("name"));
        const idget = JSON.parse(localStorage.getItem("id"));
        const myparentid = JSON.parse(localStorage.getItem("parentid"));
        localStorage.setItem("name", JSON.stringify(myname));
        localStorage.setItem("myid", JSON.stringify(idget));
        localStorage.setItem("parentid", JSON.stringify(myparentid));
        setTimeout(() => {
          setState(myname);
          setStateid(idget);
          setStateparentid(myparentid);
          setlocalname(JSON.parse(localStorage.getItem("name")));
          // setlocalid(JSON.parse(localStorage.getItem("id"))),
          setlocalparentid(JSON.parse(localStorage.getItem("parentid")));
          return;
        }, 200);

        setTimeout(() => {
          setlocalid(JSON.parse(localStorage.getItem("id")));
        }, 200);
      }
    }
  }, [moveon, deleteloader]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(SuperAdminCountCompaniesID(jobshow, companylistid));
    } else {
      if (parentid) {
        dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
      } else {
        dispatch(SuperAdminCountCompanies(companylistid));
      }
    }
  }, [moveon, moveonbro, getdatawhere]);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      setcompanylist(DamIdCompany?.company_count);
      setcompanylistnull(DamIdCompany?.company_data);
    } else {
      if (parentid) {
        setcompanylist(DamIdCompany?.company_count);
        setcompanylistnull(DamIdCompany?.company_data);
      } else {
        setcompanylist(DamCompany?.company_count);
        setcompanylistnull(DamCompany?.company_data);
      }
    }
  }, [
    stagesLoading,
    moveon,
    companylistall,
    companylistall1,
    moveonbro,
    getdatawhere,
  ]);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(SuperAdminDamFilterFavourateCountID(jobshow));
    } else {
      if (parentid) {
        dispatch(SuperAdminDamFilterFavourateCountID(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }
  }, [moveon, moveonbro, getdatawhere]);

  useEffect(() => {
    setdetailsid();
  }, []);

  useEffect(() => {
    let jobshow = localStorage.getItem("damon");
    if (jobshow == "on") {
      setdamjobshow(true);
    }
  }, [moveon, moveonbro, getdatawhere]);

  useEffect(() => {
    dispatch(SuperAdminlistAllCollectionDAM());
  }, [collectiondata]);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(SuperAdmingetdamImageswithid(jobshow));
    } else {
      dispatch(SuperAdminlistAllRootImages());
      dispatch(SuperAdmingetdamImageswithid(parentid));
    }
  }, [collectionparentpostsucess]);

  useEffect(() => {
    setexistingmediafile(Collectionviewdata);
  }, [moveit]);

  const [progress3, setProgress3] = useState(0);
  const indexvalue = useRef(0);

  function checkagencyid(age) {
    return (age = companyvalue);
  }

  const [myNewProgress, setMyNewProgress] = useState([]);
  const myNewProgressRef = useRef(myNewProgress);

  useEffect(() => {
    myNewProgressRef.current = myNewProgress;

    let myNewObj = myNewProgress;

    if (myNewObj) {
      Object.entries(myNewObj).forEach(([key, value]) => {
        if (value.percent === 100) {
          setTimeout(() => {
            delete myNewObj[key];
            setMyNewProgress(myNewObj);
          }, 2000);
        }
      });
    }
  }, [myNewProgress]);

  const handleFileSubmit = () => {
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    setyourfilter(true);
    const myArr = [];

    let startIndex = inputRef.current.length ? inputRef.current.length : 0;
    for (let index = 0; index < files.length; index++) {
      myArr.push({
        id: startIndex,
        progress2: progress3,
        title: files[index].name,
      });
    }

    if (inputRef.current.length) {
      const total = myArr.concat(inputRef.current);
      inputRef.current = total;
      setshowprogressheader(total);
    } else {
      inputRef.current = myArr;
      setshowprogressheader(myArr);
    }

    for (let index = 0; index < files.length; index++) {
      const formData = new FormData();
      if (files) {
        formData.append("dam_files", files[index]);
      }
      if (parentidvalue) {
        formData.append("parent", parentidvalue);
      }
      setCollectionNameShow();
      formData.append("name", "");
      formData.append("type", 3);
      formData.append("dam_files_name", files[index].name);
      indexvalue.current = indexvalue.current + 1;
      if (companyvalue) {
        formData.append("company", companyvalue);
        let a = companiesData.find((item) => item.company_id == companyvalue);
        formData.append("agency", a.agency);
      } else {
        formData.append("company", "");
        formData.append("agency", user_id.user?.user_id);
      }
      const file1 = files[index];
      const fileId = `${file1.name}-${file1.size}`;

      setMyNewProgress((prevProgress) => ({
        ...prevProgress,
        [fileId]: { percent: 0 },
      }));

      if (parentid) {
        let list = inputRef.current;
        list[index].id = indexvalue.current;
        axios
          .post(
            `${BACKEND_API_URL}super-admin-dam/?parent=${parentid}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userDataFromStore.token}`,
              },
              onUploadProgress: (progressEvent) => {
                let percentComplete =
                  progressEvent.loaded / progressEvent.total;
                percentComplete = parseInt(percentComplete * 100);
                setMyNewProgress((prevProgress) => ({
                  ...prevProgress,
                  [fileId]: {
                    ...prevProgress[fileId],
                    percent: percentComplete,
                  },
                }));
              },
            }
          )
          .then((response) => {
            dispatch(SuperAdmingetdamImageswithid(parentid));
            dispatch(SuperAdminlistCompaniesID(parentid));
            setyourfilter(true);
            let lengthstore = [];

            {
              inputRef.current?.map((file, index) =>
                lengthstore.push(file?.progress2)
              );
            }
            setshowprogressheader(lengthstore);
            if (parentid) {
              dispatch(SuperAdminlistAllMostUsedcount(parentid));
            } else {
              dispatch(SuperAdminDamFilterFavourateCount());
            }
            if (parentid) {
              dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
            } else {
              dispatch(SuperAdminCountCompanies(companylistid));
            }
          });
        setShowModal(false);
        setopenUploadFile(false);
        setIsLoading(true);
        if (!parentid) {
          setcompanyvalue(null);
        }
        setFiles([]);
        setshowprogress(true);
        setshowprogressdata(true);
        setProgress("10");
      } else {
        let list = inputRef.current;
        list[index].id = indexvalue.current;
        axios
          .post(`${BACKEND_API_URL}super-admin-dam/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userDataFromStore.token}`,
            },
            onUploadProgress: (progressEvent) => {
              let percentComplete = progressEvent.loaded / progressEvent.total;
              percentComplete = parseInt(percentComplete * 100);
              list[index].progress2 = percentComplete;
              inputRef.current = list;

              setMyNewProgress((prevProgress) => ({
                ...prevProgress,
                [fileId]: {
                  ...prevProgress[fileId],
                  percent: percentComplete,
                },
              }));
            },
          })
          .then((response) => {
            dispatch(SuperAdminlistAllRootImages());
            dispatch(SuperAdminlistAllDamImages());
            dispatch(SuperAdminlistCompanies());
            let lengthstore = [];

            {
              inputRef.current?.map((file, index) =>
                lengthstore.push(file?.progress2)
              );
            }
            setshowprogressheader(lengthstore);
            if (parentid) {
              dispatch(SuperAdminlistAllMostUsedcount(parentid));
            } else {
              dispatch(SuperAdminDamFilterFavourateCount(companylistid));
            }
            if (parentid) {
              dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
            } else {
              dispatch(SuperAdminCountCompanies(companylistid));
            }
          });

        setopenUploadFile(false);
        setFiles([]);
        setshowprogress(true);
        setshowprogressdata(true);
        setProgress("10");
        setIsLoading(true);
        if (!parentid) {
          setcompanyvalue(null);
        }
      }
    }
  };

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(SuperAdmingetdamImageswithid(jobshow));
      dispatch(SuperAdminlistAllMostUsedcount(jobshow));
    } else {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }
    dispatch(SuperAdminlistAllDamImages());
    dispatch(SuperAdminlistAllRootImages());
    dispatch(SuperAdminlistAllCollectionDAM());
  }, [getdatawhere, deleteloader]);

  useEffect(() => {
    if (parentid == undefined) {
      sethidefolder(true);
      dispatch(SuperAdminlistCompanies());
      dispatch(SuperAdminlistAllCollectionDAM());
    } else if (parentid) {
      dispatch(SuperAdminlistCompaniesID(parentid));
      dispatch(SuperAdminDAMParentCollection(parentid));
    }
  }, [collectionparentpostsucess, collectiondata, Collectionfilessucess]);

  useEffect(() => {
    dispatch(SuperAdminlistAllCollectionDAM());
    dispatch(SuperAdminlistAllDamImages());
    dispatch(SuperAdminlistAllROOTDam());
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(SuperAdmingetdamImageswithid(jobshow));
    } else {
      dispatch(SuperAdmingetdamImageswithid(parentid));
    }
  }, [deleteCollectionloader]);

  const [images, setimages] = useState();

  const validateSubmit = (e, data) => {
    const tempErrors = {
      folderName: !folderName && "Please enter Folder Name",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    handleFolderSubmit();
  };

  const handleFolderSubmit = (e) => {
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    let a = companiesData.find((item) => item.company_id == companyvalue);
    setimages();
    if (folderName) {
      if (parentidvalue) {
        if (companyvalue) {
          dispatch(
            SuperAdminDAMParentPost(
              {
                dam_files: images,
                name: folderName,
                type: 1,
                agency: a.agency,
                parent: parentidvalue,
                company: companyvalue,
              },
              parentidvalue
            )
          );
        } else {
          dispatch(
            SuperAdminDAMParentPost(
              {
                dam_files: images,
                name: folderName,
                type: 1,
                agency: user_id.user?.user_id,
                parent: parentidvalue,
              },
              parentidvalue
            )
          );
        }

        setIsLoading(true);
        setFolderName("");
        setopenUploadFile(false);
        setOpenFolder(false);
        setTimeout(function () {
          dispatch(SuperAdmingetdamDetailswithid(parentidvalue));
        }, 1500);
      } else {
        if (companyvalue) {
          dispatch(
            SuperAdminDAMPost({
              dam_files: images,
              name: folderName,
              type: 1,
              agency: a.agency,
              parent: "",
              company: companyvalue,
            })
          );
        } else {
          dispatch(
            SuperAdminDAMPost({
              dam_files: images,
              name: folderName,
              type: 1,
              agency: user_id.user?.user_id,
              parent: "",
            })
          );
        }

        setIsLoading(true);
        setFolderName("");
        setOpenFolder(false);
        setopenUploadFile(false);
      }
    }
    setTimeout(() => {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }, 1000);
    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    if (sortby == "new") {
      params += "ordering=-created";
      setcount([]);
      setisfiles(false);
    } else if (sortby == "old") {
      params += "ordering=created";
      setcount([]);
      setisfiles(false);
    } else if (sortby == "mostused") {
      params += "ordering=-dam_media__job_count";
      setcount([]);
      setisfiles(false);
    }
    if (total.includes("Your Favorites")) {
      params += "&is_favourite=true";
      companyparams += "&favourite=true";
      setcount([]);
      setisfiles(false);
    }
    if (total.includes("Photo")) {
      params += "&photos=1";
      companyparams += "&photos=1";
      setisfiles(false);
      setcount([]);
    }
    if (total.includes("Folders")) {
      companyparams += "&folders=1";
      if (total.includes("Videos")) {
        params += "&folders=1";
      } else if (total.includes("Photo")) {
        params += "&folders=1";
      } else if (total.includes("Your Favorites")) {
        params += "&folders=1";
      } else if (total.includes("Collections")) {
        params += "&folders=1";
      } else if (total.includes("allSelect")) {
        params += "&folders=1";
      } else {
        params += "&type=1";
      }
    }
    if (total.includes("Videos")) {
      params += "&videos=1";
      companyparams += "&videos=1";
      setisfiles(false);
      setcount([]);
    }
    if (total.includes("Collections")) {
      companyparams += "&collections=1";
      if (total.includes("Videos")) {
        params += "&collections=1";
      } else if (total.includes("Photo")) {
        params += "&collections=1";
      } else if (total.includes("Your Favorites")) {
        params += "&collections=1";
      } else if (total.includes("Folders")) {
        params += "&collections=1";
      } else if (total.includes("allSelect")) {
        params += "&collections=1";
      } else {
        params += "&type=2";
      }
      setisfiles(false);
      setcount([]);
    }
    if (total.includes("allSelect")) {
      params += "is_favourite=true";
      params += "&type=3";
      params += "&is_video=true";
      params += "&type=2";
      params += "&folders=1";
      companyparams += "&folders=1";
      companyparams += "&videos=1";
      companyparams += "&photos=1";
      companyparams += "&favourite=true";
      companyparams += "&collections=1";
      setisfiles(false);
      setcount([]);
    }

    if (companylistid.length) {
      params += `&company=${companylistid}`;
      setisfiles(false);
      setcompanyshow(false);
      if (parentid || jobshow) {
        if (jobshow) {
          dispatch(SuperAdminCountCompaniesID(jobshow, companylistid));
        } else {
          dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
        }
      } else {
        dispatch(SuperAdminCountCompanies(companylistid));
      }
    } else if (!companylistid.length) {
      setcompanyshow(true);
      dispatch(SuperAdminDamFilterFavourateCountID(params));
    } else {
      if (
        !total.includes("Photo") &&
        !sortby &&
        !total.includes("Your Favorites") &&
        !total.includes("Videos") &&
        !total.includes("Collections")
      ) {
        setisfiles(true);
      }
    }

    if (parentid || jobshow) {
      if (jobshow) {
        dispatch(SuperAdminlistAllParentFilter(params, jobshow));
      } else {
        dispatch(SuperAdminlistAllParentFilter(params, parentid));
      }
    } else {
      dispatch(SuperAdminDamFilterFavourateCountID(params));
    }

    if (companyparams) {
      if (parentid) {
        dispatch(SuperAdminlistCompaniesID(parentid, companyparams));
      } else {
        dispatch(SuperAdminlistCompanies(companyparams));
      }
    } else {
      if (parentid) {
        dispatch(SuperAdminlistCompaniesID(parentid));
      } else {
        dispatch(SuperAdminlistCompanies());
      }
    }
    if (!parentid) {
      setcompanyvalue(null);
    }
  };

  const handleClose = () => {
    setCreatedropdown(null);
  };

  const Newest = (e) => {
    setsortby("new");
    setyourfilter(false);
    setisfiles(false);
  };

  const oldest = (e) => {
    setsortby("old");
    setyourfilter(false);
    setisfiles(false);
  };

  const bestmatch = () => {
    setsortby("mostused");
    setyourfilter(false);
    setisfiles(false);
  };

  //using hooks o store the data

  const Collectiondatashow = (id) => {
    localStorage.setItem("collectionid", JSON.stringify(id));
    setOpen2(true);
    setidstore(id);
    setTimeout(() => {
      setContextMenu(null);
    }, 10);
    if (parentid) {
      dispatch(SuperAdmingetdamCollectionDetailswithid("", parentid));
    } else {
      dispatch(SuperAdmingetdamCollectionDetailswithid(id, ""));
    }
  };

  const movefilelocation = (value) => {
    localStorage.removeItem("imageshow");
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    let collectiontrue = localStorage.getItem("collectiontrue");
    let moveparentfileid = "";
    if (value == "2") {
      moveparentfileid = localStorage.getItem("moveparentid");
    } else {
      moveparentfileid = "";
    }
    const formData = new FormData();
    if (collectiontrue && copydata) {
      dispatch(
        SuperAdminDamcopypost({
          id: detailsid,
          parent: moveparentfileid,
          type: 3,
          type_new: 2,
        })
      );
    } else if (collectiontrue) {
      dispatch(
        SuperAdminTitleupdate(
          {
            dam: moveparentfileid,
          },
          detailsid
        )
      );
    } else if (copydata) {
      dispatch(
        SuperAdminDamcopypost({
          id: detailsid,
          parent: moveparentfileid,
          type: 3,
          type_new: 3,
        })
      );
    } else if (movedata && count.length <= 0) {
      dispatch(
        SuperAdminDAMMovePost(
          {
            parent: moveparentfileid,
          },
          movefileid
        )
      );
    } else if (count.length > 0) {
      dispatch(
        SuperAdminDamMoveMultiple({
          id: deletevalue,
          parent: moveparentfileid,
        })
      );
    } else if (open2 == true) {
      formData.append("dam_images", imagefav);
      formData.append("type", 3);
      formData.append("parent", moveparentfileid);
      formData.append("user", user_id.user?.user_id);
      dispatch(SuperAdminDamMoveCollectioninside(formData));
    } else {
      dispatch(
        SuperAdminDAMMovePost(
          {
            parent: moveparentfileid,
          },
          movefileid
        )
      );
    }
    setIsLoading(true);
    setmoveFolder(false);
    setcopyFolderdata(false);
    setcopyFolderdata1(false);
    setcopydata(false);
    setOpen2(false);
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
    setmovedata(false);
    setcopyFolderdata2(false);
    setCollectionContextMenu(null);
    setTimeout(() => {
      if (parentid == undefined) {
        dispatch(SuperAdminlistAllROOTDam());
        dispatch(SuperAdminlistAllDamImages());
        dispatch(SuperAdminlistAllCollectionDAM());
        dispatch(SuperAdminlistAllRootImages());
        dispatch(SuperAdmingetdamCollectionDetailswithid(idstore));
      } else if (parentid) {
        dispatch(SuperAdminlistAllDam(parentid));
        dispatch(SuperAdmingetdamImageswithid(parentid));
        dispatch(SuperAdmingetdamDetailswithid(parentid));
        dispatch(SuperAdminDAMParentCollection(parentid));
        dispatch(SuperAdmingetdamCollectionDetailswithid(idstore));
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      let jobshow = localStorage.getItem("jobdamid");
      let params = "";
      let companyparams = "";
      if (sortby == "new") {
        params += "ordering=-created";
        setcount([]);
        setisfiles(false);
      } else if (sortby == "old") {
        params += "ordering=created";
        setcount([]);
        setisfiles(false);
      } else if (sortby == "mostused") {
        params += "ordering=-dam_media__job_count";
        setcount([]);
        setisfiles(false);
      }
      if (total.includes("Your Favorites")) {
        params += "&is_favourite=true";
        companyparams += "&favourite=true";
        setcount([]);
        setisfiles(false);
      }
      if (total.includes("Photo")) {
        params += "&photos=1";
        companyparams += "&photos=1";
        setisfiles(false);
        setcount([]);
      }
      if (total.includes("Folders")) {
        companyparams += "&folders=1";
        if (total.includes("Videos")) {
          params += "&folders=1";
        } else if (total.includes("Photo")) {
          params += "&folders=1";
        } else if (total.includes("Your Favorites")) {
          params += "&folders=1";
        } else if (total.includes("Collections")) {
          params += "&folders=1";
        } else if (total.includes("allSelect")) {
          params += "&folders=1";
        } else {
          params += "&type=1";
        }
      }
      if (total.includes("Videos")) {
        params += "&videos=1";
        companyparams += "&videos=1";
        setisfiles(false);
        setcount([]);
      }
      if (total.includes("Collections")) {
        companyparams += "&collections=1";
        if (total.includes("Videos")) {
          params += "&collections=1";
        } else if (total.includes("Photo")) {
          params += "&collections=1";
        } else if (total.includes("Your Favorites")) {
          params += "&collections=1";
        } else if (total.includes("Folders")) {
          params += "&collections=1";
        } else if (total.includes("allSelect")) {
          params += "&collections=1";
        } else {
          params += "&type=2";
        }
        setisfiles(false);
        setcount([]);
      }
      if (total.includes("allSelect")) {
        params += "is_favourite=true";
        params += "&type=3";
        params += "&is_video=true";
        params += "&type=2";
        params += "&folders=1";
        companyparams += "&folders=1";
        companyparams += "&videos=1";
        companyparams += "&photos=1";
        companyparams += "&favourite=true";
        companyparams += "&collections=1";
        setisfiles(false);
        setcount([]);
      }

      if (companylistid.length) {
        params += `&company=${companylistid}`;
        setisfiles(false);
        setcompanyshow(false);
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(SuperAdminCountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(SuperAdminCountCompanies(companylistid));
        }
      } else if (!companylistid.length) {
        setcompanyshow(true);
        dispatch(SuperAdminDamFilterFavourateCountID(params));
      } else {
        if (
          !total.includes("Photo") &&
          !sortby &&
          !total.includes("Your Favorites") &&
          !total.includes("Videos") &&
          !total.includes("Collections")
        ) {
          setisfiles(true);
        }
      }

      if (parentid || jobshow) {
        if (jobshow) {
          dispatch(SuperAdminlistAllParentFilter(params, jobshow));
        } else {
          dispatch(SuperAdminlistAllParentFilter(params, parentid));
        }
      } else {
        dispatch(SuperAdminDamFilterFavourateCountID(params));
      }

      if (companyparams) {
        if (parentid) {
          dispatch(SuperAdminlistCompaniesID(parentid, companyparams));
        } else {
          dispatch(SuperAdminlistCompanies(companyparams));
        }
      } else {
        if (parentid) {
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
        } else {
          dispatch(SuperAdminDamFilterFavourateCount());
        }
      }
    }, 1500);
  };

  const renamedone = () => {
    dispatch(
      SuperAdminRenamefolder(
        {
          name: Renamechange,
          company: companyvalue,
        },
        folderdeleteid
      )
    );
    setmoveFolder1(false);
    setIsLoading(true);
    setTimeout(() => {
      if (parentid == undefined) {
        dispatch(SuperAdminlistAllROOTDam());
      } else if (parentid) {
        dispatch(SuperAdminlistAllDam(parentid));
        dispatch(SuperAdmingetdamDetailswithid(parentid));
      }
    }, 1500);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    if (!parentid) {
      setcompanyvalue(null);
    }
    setCompanyChange(false);
  };

  const foldernavigate = (parent, is_parent, id, name) => {
    let jobshow = localStorage.getItem("jobdamid");
    setsearchfolder();
    dispatch(SuperAdminDamFilterFavourateCountID(id));
    setsearchvalue("");
    setLastElemenetChk(id);
    setlocalid(parent);
    setyourfilter(true);
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
    dispatch(SuperAdminlistAllDam(id));
    if (damjobshow == false) {
      navigate(`/admin-media/${id}`);
    } else {
      localStorage.setItem("jobdamid", id);
    }
    sethidefolder(false);
    setParentid(parent);
    setAddNew([...addNew]);
    setparentvalue(is_parent);
    if (companylistid.length) {
      setisfiles(false);
      setcompanyshow(false);
      if (parentid) {
        dispatch(SuperAdminCountCompaniesID(id, companylistid));
      }
    }
    setParentidvalue(id);
    dispatch(SuperAdmingetdamImageswithid(id));
    dispatch(SuperAdmingetdamDetailswithid(id));
    dispatch(SuperAdminDAMParentCollection(id));
    dispatch(SuperAdminlistCompaniesID(id));
    dispatch(SuperAdminlistAllMostUsedcount(id));
    setState([...state, name]);
    setStateid([...stateid, id]);
    setStateparent([...stateparent, is_parent]);
    setStateparentid([...stateparentid, parent]);
    setIsDisplayDetails(false);
    if (DamData1) {
      sethidefolder(false);
    }

    if (total) {
      let params = "";
      if (sortby == "new") {
        params += "ordering=-created";
        setcount([]);
        setisfiles(false);
      } else if (sortby == "old") {
        params += "ordering=created";
        setcount([]);
        setisfiles(false);
      } else if (sortby == "mostused") {
        params += "ordering=-dam_media__job_count";
        setcount([]);
        setisfiles(false);
      }
      if (total.includes("Your Favorites")) {
        params += "&is_favourite=true";
        setcount([]);
        setisfiles(false);
      }
      if (total.includes("Photo")) {
        params += "&photos=1";
        setisfiles(false);
        setcount([]);
      }
      if (total.includes("Videos")) {
        params += "&videos=1";
        setisfiles(false);
        setcount([]);
      }
      if (total.includes("Collections")) {
        if (total.includes("Videos")) {
          params += "&collections=1";
        } else if (total.includes("Photo")) {
          params += "&collections=1";
        } else if (total.includes("Your Favorites")) {
          params += "&collections=1";
        } else if (total.includes("allSelect")) {
          params += "&collections=1";
        } else {
          params += "&type=2";
        }
        setisfiles(false);
        setcount([]);
      }
      if (total.includes("allSelect")) {
        params += "is_favourite=true";
        params += "&type=3";
        params += "&is_video=true";
        params += "&type=2";
        setisfiles(false);
        setcount([]);
      }

      if (companylistid.length) {
        params += `&company=${companylistid}`;
        setisfiles(false);
        setcompanyshow(false);
        if (parentid || jobshow) {
          dispatch(SuperAdminCountCompaniesID(id, companylistid));
        } else {
          dispatch(SuperAdminCountCompanies(companylistid));
        }
      } else if (!companylistid.length) {
        setcompanyshow(true);
        dispatch(SuperAdminDamFilterFavourateCountID(params));
      } else {
        if (
          !total.includes("Photo") &&
          !sortby &&
          !total.includes("Your Favorites") &&
          !total.includes("Videos") &&
          !total.includes("Collections")
        ) {
          setisfiles(true);
        }
      }

      if (parentid || jobshow) {
        dispatch(SuperAdminlistAllParentFilter(params, id));
      } else {
        dispatch(SuperAdminDamFilterFavourateCountID(params));
      }
    }
    const propertyNames = Object.values(localname);
    const myname = [...state, name];
    const myid = [...stateid, id];
    const myparentid = [...stateparentid, parent];

    localStorage.setItem("name", JSON.stringify(myname));
    localStorage.setItem("id", JSON.stringify(myid));
    localStorage.setItem("parentid", JSON.stringify(myparentid));
    setTimeout(() => {
      setlocalname(JSON.parse(localStorage.getItem("name")));
      // setlocalid(JSON.parse(localStorage.getItem("id"))),
      setlocalparentid(JSON.parse(localStorage.getItem("parentid")));
    }, 200);

    setTimeout(() => {
      setlocalid(JSON.parse(localStorage.getItem("id")));
    }, 200);
  };

  const [keyfield, setkeyfield] = useState(false);

  const [lastElemenetChk, setLastElemenetChk] = useState();
  const handleClick2 = (event, key, element) => {
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
    let parentidbreedcrumbs = localparentid[key];
    setIsDisplayDetails(false);
    let passed = stateid[key];
    const person = {
      firstName: localname,
    };
    const propertyNames = Object.keys(person);
    var lastelement = stateparentid[stateparentid.length - 1];
    setLastElemenetChk(lastelement);
    if (parentidbreedcrumbs) {
      setParentidvalue(parentidbreedcrumbs);
      dispatch(SuperAdmingetdamDetailswithid(parentidbreedcrumbs));
      dispatch(SuperAdminDamFilterFavourateCountID(parentidbreedcrumbs));
      dispatch(SuperAdmingetdamImageswithid(parentidbreedcrumbs));
      dispatch(SuperAdminDAMParentCollection(parentidbreedcrumbs));
      dispatch(SuperAdminlistAllMostUsedcount(parentidbreedcrumbs));
      sethidefolder(false);
      if (damjobshow == false) {
        navigate(`/admin-media/${parentidbreedcrumbs}`);
      } else {
        localStorage.setItem("jobdamid", parentidbreedcrumbs);
      }
      localname.splice(key, localname.length);
      localparentid.splice(key, localparentid.length);
      stateid.splice(key, stateid.length);
      state.splice(key, state.length);
      stateparentid.splice(key, stateparentid.length);
      localStorage.setItem("name", JSON.stringify(localname));
      localStorage.setItem("id", JSON.stringify(stateid));
      localStorage.setItem("parentid", JSON.stringify(localparentid));
    }
  };

  const countimages = (id, dam, type, media) => {
    setIsDisplayDetails(false);
    if (count.includes(id)) {
      setcount(count.filter((el, i) => el !== id));
      localStorage.setItem(
        "useimage",
        count.filter((el, i) => el !== id)
      );
    } else {
      setcount([...count, id]);
      localStorage.setItem("useimage", [...count, id]);
    }
    setdetailsid();
    if (type == 2) {
      if (deletevalue.includes(id)) {
        setdeletevalue(deletevalue.filter((el, i) => el !== id));
      } else {
        setdeletevalue([...deletevalue, id]);
      }
    } else {
      if (deletevalue.includes(dam)) {
        setdeletevalue(deletevalue.filter((el, i) => el !== dam));
      } else {
        setdeletevalue([...deletevalue, dam]);
      }
    }
    if (multiImages.includes(media)) {
      setMultiImages(multiImages.filter((el, i) => el !== media));
    } else {
      setMultiImages([...multiImages, media]);
    }
  };

  const resetcount = () => {
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
  };

  const companyChangeFile = () => {
    setCompanyChange(true);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
  };
  const handleCloseCompanyChange = () => {
    setCompanyChange(false);
    if (!parentid) {
      setcompanyvalue(null);
    }
  };

  const rootfolder = () => {
    dispatch({ type: ADMIN_DAM_ID_RESET });
    setcompanyvalue(null);
    setmoveFolder(true);
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
    setIsDisplayDetails(false);
    sethidefolder(true);
    dispatch(SuperAdminlistAllROOTDam());
    dispatch(SuperAdminlistAllDamImages());
    dispatch(SuperAdminDamFilterFavourateCount());
    dispatch(SuperAdminlistCompanies());

    if (damjobshow == false) {
      navigate(`/admin-media`);
    }
    setState([]);
    setStateid([]);
    setStateparent([]);
    setStateparentid([]);
    setParentidvalue();
    setmoveFolder(false);
    setmovefoldershow(true);
    setFolderContextMenu(null);
    setlocalid();
    if (total) {
      let params = "";

      if (sortby == "new") {
        params += "ordering=-created";
      } else if (sortby == "old") {
        params += "ordering=created";
      } else if (sortby == "mostused") {
        params += "ordering=-dam_media__job_count";
      }
      if (total.includes("Your Favorites")) {
        params += "is_favourite=1";
      }
      if (total.includes("Photo")) {
        params += "&photos=1";
      }
      if (total.includes("Videos")) {
        params += "&videos=1";
      }
      if (total.includes("Collections")) {
        params += "&collections=1";
      }

      if (total.includes("allSelect")) {
        params += "is_favourite=true";
        params += "&type=3";
        params += "&is_video=true";
        params += "&type=2";
      }
      dispatch(SuperAdminDamFilterFavourateCountID(params));
      setyourfilter(false);
    }
  };

  const movedialogclose = () => {
    setmoveFolder(false);
    setdetailsid();
    localStorage.removeItem("imageshow");
    localStorage.removeItem("disableid");
    setSkillsMove();
    localStorage.removeItem("collectiontrue");
    setTimeout(() => {
      setcopyFolderdata(false);
      setcopyFolderdata1(false);
      setcopyFolderdata2(false);
      setcopydata(false);
      setmovedata(false);
    }, 500);
  };

  const movedialogclose1 = () => {
    setmoveFolder1(false);
    setContextMenu(null);
    setdetailsid();
    setFileContextMenu(null);
    setFolderContextMenu(null);
    setFileVideoContextMenu(null);
    setSkillsMove();
  };

  const movedialogclose2 = () => {
    setmoveFolder2(false);
    localStorage.removeItem("asset");
    setContextMenu(null);
    setdetailsid();
    setFileContextMenu(null);
    setFolderContextMenu(null);
    setSkillsMove();
    setFileVideoContextMenu(null);
  };

  const sampleassetclick = () => {
    localStorage.setItem("asset", "sampleasset");
    navigate(`/jobs/add`);
    setContextMenu(null);
    setCreatedropdown(null);
    setContextMenu(null);
    setFileContextMenu(null);
    setFolderContextMenu(null);
    setContextMenu(null);
    setdetailsid();
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setdetailsid();
  };

  const fileassetclick = () => {
    localStorage.setItem("asset", "fileasset");
    navigate(`/jobs/add`);
    setContextMenu(null);
    setCreatedropdown(null);
    setContextMenu(null);
    setFileContextMenu(null);
    setFolderContextMenu(null);
  };

  const handleCreateFolder = () => {
    setContextMenu(null);
    setOpenFolder(true);
    setCreatedropdown(null);
  };
  const handleClickOpenUpload = () => {
    setContextMenu(null);
    setopenUploadFile(true);
    setCreatedropdown(null);
  };

  const handleCreateCollection = () => {
    let view = [];
    if (count.length > 0) {
      dispatch(SuperAdminCollectionView(count));
    } else {
      dispatch(SuperAdminCollectionView(collectionShowIdData));
    }
    setexistingmediafile(Collectionviewdata);
    setContextMenu(null);
    setopenUploadCollection(true);
    setCreatedropdown(null);
    setContextMenu(null);
    // setCollectionShowIdData()
    setFileContextMenu(null);
    setFolderContextMenu(null);
    setFileVideoContextMenu(null);
  };

  const createjobadd = () => {
    let view = [];
    localStorage.setItem("useimage", count);
    setmoveFolder2(true);
    // navigate(`/jobs/add`);
    setContextMenu(null);
    setCreatedropdown(null);
    setContextMenu(null);
    setFileContextMenu(null);
    setFolderContextMenu(null);
  };

  const createjobadd1 = () => {
    let view = [];
    if (count.length > 0) {
      localStorage.setItem("useimage", count);
    } else {
      localStorage.setItem("useimage", detailsid);
    }
    setmoveFolder2(true);
    // navigate(`/jobs/add`);
    setContextMenu(null);
    setCreatedropdown(null);
    setContextMenu(null);
    setFileContextMenu(null);
    setFolderContextMenu(null);
  };

  const selectall = () => {
    let selectfolderid = [];
    let selectfileid = [];
    let selectrecentfileid = [];
    let selectcollectionid = [];
    {
      RootDamData?.map((item) => selectfolderid.push(item?.id));
    }
    {
      DamRootImages?.map((item) => {
        selectfileid.push(item?.id);
      });
    }
    {
      DamImageData?.map((item) => {
        selectrecentfileid.push(item?.id);
      });
    }
    {
      DamPostCollectionData?.map((item) => {
        selectcollectionid.push(item?.id);
      });
    }
    setTimeout(() => {
      let total =
        selectfolderid + selectfileid + selectrecentfileid + selectcollectionid;
      setselectimages(total);
    }, 10);
    setContextMenu(null);
    setCreatedropdown(null);
  };

  const [images1, setimages1] = useState([]);
  const [images2, setimages2] = useState([]);
  const [images3, setimages3] = useState([]);
  const [images4, setimages4] = useState([]);
  const [images5, setimages5] = useState([]);
  const [images6, setimages6] = useState([]);
  const [images7, setimages7] = useState([]);
  const [images8, setimages8] = useState([]);
  useEffect(() => {
    if (DamImageData) {
      setimages1(DamImageData.filter((item) => item.is_favourite == true));
    }
    if (DamImageData) {
      setimages8(DamImageData.filter((item) => item.image_favourite == true));
    }
    if (RootDamData) {
      setimages2(RootDamData.filter((item) => item.is_favourite == true));
    }

    if (DamRootImages) {
      setimages3(DamRootImages?.filter((item) => item.is_favourite == true));
    }

    if (DamDataImages) {
      setimages4(DamDataImages?.filter((item) => item.is_favourite == true));
    }

    if (DamPostCollectionData) {
      setimages6(
        DamPostCollectionData?.filter((item) => item.is_favourite == true)
      );
    }
    if (DamData1) {
      setimages7(DamData1?.filter((item) => item.is_favourite == true));
    }

    if (DamDataCollectionId) {
      DamDataCollectionId.map((item) => {
        setimages5(
          item?.dam_media?.filter((item) => item.image_favourite == true)
        );
      });
    }
  }, [favpass, DamRootImages, dialogdata]);

  useEffect(() => {
    let storer = [];

    {
      images1.map((item) => storer.push(item.dam));
    }
    {
      images8.map((item) => storer.push(item.id));
    }
    {
      images2.map((item) => storer.push(item.id));
    }
    {
      images3.map((item) => {
        <>{item.dam_media.map((value) => storer.push(value.dam))}</>;
      });
    }
    {
      images4.map((item) => {
        <>{item.dam_media.map((value) => storer.push(value.dam))}</>;
      });
    }
    {
      images5.map((item) => storer.push(item.id));
    }
    {
      images6.map((item) => storer.push(item.id));
    }
    {
      images7.map((item) => storer.push(item.id));
    }

    if (images1.length > 0) {
      setcountfav(storer);
    }

    if (images2.length > 0) {
      setcountfav(storer);
    }

    if (images3.length > 0) {
      setcountfav(storer);
    }
    if (images4.length > 0) {
      setcountfav(storer);
    }
    if (images5.length > 0) {
      setcountfav(storer);
    }
    if (images6.length > 0) {
      setcountfav(storer);
    }
    if (images7.length > 0) {
      setcountfav(storer);
    }
    if (images8.length > 0) {
      setcountfav(storer);
    }
  }, [images1, images2, images3, images4, images5, images6, images7, images8]);

  const removesampleFile = (file) => () => {
    const newfileGallery = [...fileGallery];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setFileGallery(newfileGallery);
  };

  const removeexistingmediaFile = (file) => () => {
    const newmediafile = [...mediafile];
    newmediafile.splice(newmediafile.indexOf(file), 1);
    setexistingmediafile(newmediafile);
  };

  const thumbs1 = fileGallery.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <span index="0" className="removeFileXbtn">
          {/* <a
            href="#"
            onClick={removeFile(file)}
            className="icon_asdsdasd"
            title="Remove"
          >
            <i className="fa-solid fa-circle-xmark" onClick={removeFile(file)}></i>
          </a> */}
        </span>
        {file.type === "video/mp4" && (
          <>
            <div onClick={removesampleFile(file)}>
              <span className="crossicon12">X</span>
            </div>
            <video style={videoStyle}>
              <source src={file.preview} type="video/mp4" />
            </video>
            {file.title}
            {file.name}
          </>
        )}

        {file.type === "audio/mpeg" && (
          <>
            <div onClick={removesampleFile(file)}>
              <span className="crossicon">X</span>
            </div>
            <audio controls>
              <source src={file.preview} />
            </audio>
            {file.title}
            {file.name}
          </>
        )}

        {file.type != "video/mp4" && (
          <>
            <div onClick={removesampleFile(file)}>
              <span className="crossicon">X</span>
            </div>
            <img
              src={file.preview}
              style={img}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
            {file.title}
            {file.name}
          </>
        )}
      </div>
    </div>
  ));
  // console.log("Collectionviewdata == ", Collectionviewdata);
  const existingMedia = mediafile?.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <span index="0" className="removeFileXbtn">
          {/* <a
            href="#"
            onClick={removeexistingmediaFile(file)}
            className="icon_asdsdasd"
            title="Remove"
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </a> */}
        </span>
        {file.is_video == true ? (
          <>
            <video className="videoIsvideoShow">
              <source src={file.media} type="video/mp4" />
            </video>
          </>
        ) : (
          <>
            <img
              src={file.media}
              style={img}
            // Revoke data uri after image is loaded
            //         onLoad={() => {
            //           URL.revokeObjectURL(file.media);
            //         }}
            />
          </>
        )}
        {/* <img
          src={file.media}
          style={img}
          // Revoke data uri after image is loaded
          //         onLoad={() => {
          //           URL.revokeObjectURL(file.media);
          //         }}
        /> */}
        {file.title}
      </div>
    </div>
  ));

  const validateSubmit1 = (e, data) => {
    const tempErrors = {
      CollectionName: !CollectionName && "Please Add Collection Name",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    handleCollectionSubmit();
  };

  const handleCollectionSubmit = () => {
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);

    const myArr = [];

    let startIndex = inputRef.current.length ? inputRef.current.length : 0;

    if (fileGallery?.length) {
      myArr.push({
        id: startIndex,
        progress2: progress3,
        title: fileGallery[0].name,
      });
    } else {
      myArr.push({
        id: startIndex,
        progress2: progress3,
        title: "",
      });
    }

    // myArr.push({
    //   id: startIndex,
    //   progress2: progress3,
    //   title: fileGallery[0].name,
    // });

    if (inputRef.current.length) {
      const total = myArr.concat(inputRef.current);
      inputRef.current = total;
      setshowprogressheader(total);
    } else {
      inputRef.current = myArr;
      setshowprogressheader(myArr);
    }

    const formData = new FormData();
    if (parentidvalue) {
      formData.append("parent", parentidvalue);
    }
    {
      fileGallery.map((item) => {
        const numbers = {
          one: item.name,
        };
        let valuename = Object.values(numbers);
        formData.append("dam_files_name", valuename);
      });
    }

    if (count.length > 0) {
      formData.append("dam_images", count);
    } else if (collectionShowIdData) {
      formData.append("dam_images", collectionShowIdData);
    }
    setCollectionNameShow(CollectionName);
    formData.append("name", CollectionName);
    formData.append("type", 2);
    formData.append("agency", user_id.user?.user_id);
    if (companyvalue) {
      formData.append("company", companyvalue);
      let a = companiesData.find((item) => item.company_id == companyvalue);
      formData.append("agency", a.agency);
    } else {
      formData.append("company", "");
      formData.append("agency", user_id.user?.user_id);
    }
    if (fileGallery) {
      for (const key of Object.keys(fileGallery)) {
        formData.append("dam_files", fileGallery[key]);
      }
    }
    setyourfilter(true);
    if (count.length > 0) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(
          `${BACKEND_API_URL}super-admin-dam/create_collection/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userDataFromStore.token}`,
            },
            onUploadProgress: (progressEvent) => {
              let percentComplete = progressEvent.loaded / progressEvent.total;
              percentComplete = parseInt(percentComplete * 100);
              list.progress2 = percentComplete;
            },
          }
        )
        .then((response) => {
          dispatch(SuperAdminDAMParentCollection(parentid));
          dispatch(SuperAdminlistAllCollectionDAM());
          dispatch(SuperAdminlistAllDamImages());
          setyourfilter(true);
          let lengthstore = [];
          if (parentid) {
            dispatch(SuperAdminlistCompaniesID(parentid));
          } else {
            dispatch(SuperAdminlistCompanies());
          }

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setshowprogressheader(lengthstore);
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
          dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
        });
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setcount([]);
      setdeletevalue([]);
      setdeletevaluesingle();
      setIsLoading(true);
      setShowModal(false);
      setopenUploadCollection(false);
      setFileGallery([]);
      setCollectionShowIdData();
      if (!parentid) {
        setcompanyvalue(null);
      }
      setCollectionName("");
    } else if (collectionShowIdData) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(
          `${BACKEND_API_URL}super-admin-dam/create_collection/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userDataFromStore.token}`,
            },
            onUploadProgress: (progressEvent) => {
              let percentComplete = progressEvent.loaded / progressEvent.total;
              percentComplete = parseInt(percentComplete * 100);
              list.progress2 = percentComplete;
            },
          }
        )
        .then((response) => {
          dispatch(SuperAdminlistAllDamImages());
          dispatch(SuperAdminDAMParentCollection(parentid));
          dispatch(SuperAdminlistAllCollectionDAM());
          if (parentid) {
            dispatch(SuperAdminlistCompaniesID(parentid));
          } else {
            dispatch(SuperAdminlistCompanies());
          }
          setyourfilter(true);
          let lengthstore = [];

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setshowprogressheader(lengthstore);
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
          dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
        });
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setcount([]);
      setdeletevalue([]);
      setdeletevaluesingle();
      setIsLoading(true);
      setShowModal(false);
      setopenUploadCollection(false);
      setFileGallery([]);
      setCollectionShowIdData();
      setexistingmediafile([]);
      if (!parentid) {
        setcompanyvalue(null);
      }
      setCollectionName("");
    } else if (parentidvalue) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(
          `${BACKEND_API_URL}super-admin-dam/?parent=${parentid}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userDataFromStore.token}`,
            },
            onUploadProgress: (progressEvent) => {
              let percentComplete = progressEvent.loaded / progressEvent.total;
              percentComplete = parseInt(percentComplete * 100);
              // console.log(percentComplete);
              list.progress2 = percentComplete;
            },
          }
        )
        .then((response) => {
          dispatch(SuperAdminlistAllDamImages());
          dispatch(SuperAdminDAMParentCollection(parentid));
          setyourfilter(true);
          if (parentid) {
            dispatch(SuperAdminlistCompaniesID(parentid));
          } else {
            dispatch(SuperAdminlistCompanies());
          }
          let lengthstore = [];

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setshowprogressheader(lengthstore);
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
          dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
        });
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setShowModal(false);
      setopenUploadCollection(false);
      setIsLoading(true);
      setFileGallery([]);
      setcount([]);
      setCollectionShowIdData();
      setexistingmediafile([]);
      setCollectionName("");
    } else if (!parentidvalue) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(`${BACKEND_API_URL}super-admin-dam/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userDataFromStore.token}`,
          },
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total;
            percentComplete = parseInt(percentComplete * 100);
            // console.log(percentComplete);
            list[0].progress2 = percentComplete;
          },
        })
        .then((response) => {
          dispatch(SuperAdminlistAllDamImages());
          dispatch(SuperAdminlistAllCollectionDAM());
          setyourfilter(true);
          if (parentid) {
            dispatch(SuperAdminlistCompaniesID(parentid));
          } else {
            dispatch(SuperAdminlistCompanies());
          }
          let lengthstore = [];

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setshowprogressheader(lengthstore);
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
          dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
        });
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setopenUploadFile(false);
      setopenUploadCollection(false);
      setcount([]);
      setFileGallery([]);
      setCollectionShowIdData();
      setCollectionName("");
      // setTimeout(function () {
      //   dispatch(listAllCollectionDAM());
      // }, 2500);
    }
    setdetailsid();
    setTimeout(() => {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }, 700);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const [newone, setnewone] = useState(false);
  const [imagelink, setimagelink] = useState("");
  const [imagelink1, setimagelink1] = useState();
  const [fileContextMenu, setFileContextMenu] = React.useState(null);
  const [fileVideoContextMenu, setFileVideoContextMenu] = React.useState(null);

  const handleFileContextMenu = (
    root,
    media,
    event,
    dam,
    upload_by,
    created,
    title,
    description,
    files_size,
    id,
    file_type,
    limit_usage,
    thumbnail,
    skill,
    usage,
    company,
    type
  ) => {
    if (root != null) {
      setrootid(root);
    } else {
      setrootid();
    }
    if (usage == 0) {
      setimagelink();
    } else {
      setimagelink(media);
    }
    setpublicvalue(usage);
    event.preventDefault();
    setTimeout(() => {
      setContextMenu(null);
      setFolderContextMenu(null);
      setFileVideoContextMenu(null);
    }, 10);
    setmovefileid(dam);
    localStorage.setItem("disableid", dam);
    setdetailsid(id);
    if (type == 2) {
      setimagefav(id);
      setnewone(true);
    } else {
      setimagefav(dam);
      setnewone(false);
    }
    // if (deletevalue.length <= 0) {
    setdeletevaluesingle(dam);
    setCollectionShowIdData(id);
    // }
    dispatch(SuperAdminDamDataDetails(dam));
    setcreateddate(moment(created).format("MMMM Do YYYY"));
    setusername(upload_by);
    settitleName(title);
    // if (company == "") {
    //   setcompanydataupdate(null);
    // } else {
    //   setcompanydataupdate(company);
    // }
    if (description == null) {
      setdescription("");
    } else {
      setdescription(description);
    }
    setdeleteicontext(false);
    setSkills(skill);
    setlimitusage(limit_usage);
    setFullview(media);
    if (type == 2) {
      if (countfav.includes(id)) {
        setisfavourite("UnFavorite");
      } else {
        setisfavourite("Favorite");
      }
    } else {
      if (countfav.includes(dam)) {
        setisfavourite("UnFavorite");
      } else {
        setisfavourite("Favorite");
      }
    }

    setFileContextMenu(
      fileContextMenu === null
        ? {
          mouseX: event.clientX + 0,
          mouseY: event.clientY - 0,
        }
        : null
    );

    if (files_size >= 1073741824) {
      files_size = (files_size / 1073741824).toFixed(2) + " GB";
    } else if (files_size >= 1048576) {
      files_size = (files_size / 1048576).toFixed(2) + " MB";
    } else if (files_size >= 1024) {
      files_size = (files_size / 1024).toFixed(2) + " KB";
    } else if (files_size > 1) {
      files_size = files_size + " bytes";
    } else if (files_size == 1) {
      files_size = files_size + " byte";
    } else {
      files_size = "0 bytes";
    }

    setTimeout(() => {
      setfilesize(files_size);
    }, 200);
    return files_size;
  };

  const handleFileVideoContextMenu = (
    root,
    media,
    event,
    dam,
    upload_by,
    created,
    title,
    description,
    files_size,
    id,
    file_type,
    limit_usage,
    thumbnail,
    skill,
    usage,
    company,
    type
  ) => {
    if (root != null) {
      setrootid(root);
    } else {
      setrootid();
    }
    if (usage == 0) {
      setimagelink();
    } else {
      setimagelink(media);
    }
    setpublicvalue(usage);
    event.preventDefault();
    setTimeout(() => {
      setContextMenu(null);
      setFolderContextMenu(null);
      setFileContextMenu(null);
    }, 10);
    setmovefileid(dam);
    localStorage.setItem("disableid", dam);
    setdetailsid(id);
    if (type == 2) {
      setimagefav(id);
      setnewone(true);
    } else {
      setimagefav(dam);
      setnewone(false);
    }
    setCollectionShowIdData(id);
    dispatch(SuperAdminDamDataDetails(dam));
    // if (deletevalue.length <= 0) {
    setdeletevaluesingle(dam);
    // }
    setcreateddate(moment(created).format("MMMM Do YYYY"));
    setusername(upload_by);
    setdeleteicontext(true);
    settitleName(title);
    // if (company == "") {
    //   setcompanydataupdate(null);
    // } else {
    //   setcompanydataupdate(company);
    // }

    if (description == null) {
      setdescription("");
    } else {
      setdescription(description);
    }
    setSkills(skill);
    setlimitusage(limit_usage);
    setFullview(media);
    if (countfav.includes(dam)) {
      setisfavourite("UnFavorite");
    } else if (countfav.includes(id)) {
      setisfavourite("UnFavorite");
    } else {
      setisfavourite("Favorite");
    }

    setFileVideoContextMenu(
      fileVideoContextMenu === null
        ? {
          mouseX: event.clientX + 0,
          mouseY: event.clientY - 0,
        }
        : null
    );

    if (files_size >= 1073741824) {
      files_size = (files_size / 1073741824).toFixed(2) + " GB";
    } else if (files_size >= 1048576) {
      files_size = (files_size / 1048576).toFixed(2) + " MB";
    } else if (files_size >= 1024) {
      files_size = (files_size / 1024).toFixed(2) + " KB";
    } else if (files_size > 1) {
      files_size = files_size + " bytes";
    } else if (files_size == 1) {
      files_size = files_size + " byte";
    } else {
      files_size = "0 bytes";
    }

    setTimeout(() => {
      setfilesize(files_size);
    }, 200);
    return files_size;
  };

  const handleFileClose = () => {
    setFileContextMenu(null);
    setisfavourite();
    setdetailsid();
    setCollectionShowIdData();
  };

  const handleFileCloseVideo = () => {
    setFileVideoContextMenu(null);
    setisfavourite();
    setdetailsid();
    setCollectionShowIdData();
  };

  const detailspageclose = (e) => {
    setIsDisplayDetails(!isDisplayDetails);
    setdetailsid();
  };

  const [folderContextMenu, setFolderContextMenu] = React.useState(null);

  const handleFolderContextMenu = (
    event,
    root,
    company_id,
    id,
    is_favourite,
    dam,
    name,
    type
  ) => {
    if (root != null) {
      setrootid(root);
    } else {
      setrootid();
    }
    if (company_id) {
      setcompanyvalue(company_id);
    } else {
      setcompanyvalue(null);
    }
    localStorage.setItem("disableid", id);
    setmovefileid(id);
    event.preventDefault();
    setfolderdeleteid(id);
    setfolderdeletedam(dam);
    setrenamechange(name);
    setTimeout(() => {
      setContextMenu(null);
    }, 10);
    if (countfav.includes(id)) {
      setisfavouritefolder("UnFavorite");
    } else {
      setisfavouritefolder("Favorite");
    }

    setFolderContextMenu(
      folderContextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : null
    );
  };

  const [CollectionContextMenu, setCollectionContextMenu] =
    React.useState(null);
  const [collectiondamid, setcollectiondamid] = useState("");
  const handleCollectionContextMenu = (
    event,
    root,
    image_favourite,
    id,
    dam,
    media,
    description,
    limit_usage,
    skill,
    title,
    upload_by,
    files_size,
    created,
    tags,
    usage,
    company
  ) => {
    event.preventDefault();
    if (root != null) {
      setrootid(root);
    } else {
      setrootid();
    }
    setTimeout(() => {
      setContextMenu(null);
    }, 10);
    if (usage == 0) {
      setimagelink();
    } else {
      setimagelink(media);
    }
    setpublicvalue(usage);
    setimagefav(id);
    setfolderdeleteid(id);
    setFullview(media);
    settitleName(title);
    dispatch(SuperAdminDamDataDetails(dam));
    // if (company == "") {
    //   setcompanydataupdate(null);
    // } else {
    //   setcompanydataupdate(company);
    // }
    if (description == null) {
      setdescription("");
    } else {
      setdescription(description);
    }
    setSkills(skill);
    setlimitusage(limit_usage);
    if (tags) {
      const tagsList = tags?.split(",");
      if (tagsList) {
        setTags(tagsList);
      }
    }
    if (countfav.includes(id)) {
      setisfavouritecollection("UnFavorite");
    } else {
      setisfavouritecollection("Favorite");
    }
    setcreateddate(moment(created).format("MMMM Do YYYY"));
    setusername(upload_by);
    setcollectiondamid(dam);
    setdetailsid(id);
    setCollectionContextMenu(
      CollectionContextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : null
    );
    if (files_size >= 1073741824) {
      files_size = (files_size / 1073741824).toFixed(2) + " GB";
    } else if (files_size >= 1048576) {
      files_size = (files_size / 1048576).toFixed(2) + " MB";
    } else if (files_size >= 1024) {
      files_size = (files_size / 1024).toFixed(2) + " KB";
    } else if (files_size > 1) {
      files_size = files_size + " bytes";
    } else if (files_size == 1) {
      files_size = files_size + " byte";
    } else {
      files_size = "0 bytes";
    }
    setTimeout(() => {
      setfilesize(files_size);
    }, 200);
    return files_size;
  };

  const handleFolderClose = () => {
    setFolderContextMenu(null);
    if (!parentid) {
      setcompanyvalue(null);
    }
  };

  const handleCollectionClose = () => {
    setCollectionContextMenu(null);
    setdetailsid();
  };

  const deleteimage = () => {
    setCollectionContextMenu(null);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setFolderContextMenu(null);
    setIsDisplayDetails(false);
    const formData = new FormData();
    if (count.length > 0) {
      formData.append("id_list", deletevalue);
      if (deleteicontext) {
        swal({
          title: "",
          text: "Are you sure you want to delete this Assets",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(SuperAdmindeletedam(formData));
            setcount([]);
            setdeletevaluesingle();
            setdeletevalue([]);
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
          }
        });
      } else if (!deleteicontext) {
        swal({
          title: "",
          text: "Are you sure you want to delete this Assets",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(SuperAdmindeletedam(formData));
            setcount([]);
            setdeletevaluesingle();
            setdeletevalue([]);
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
          }
        });
      }
    } else {
      // formData.append("id_list", deletevaluesingle);
      if (deleteicontext) {
        swal({
          title: "",
          text: "Are you sure you want to delete this Asset",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(SuperAdmindeleteCollection(deletevaluesingle));
            setcount([]);
            setdeletevaluesingle();
            setdeletevalue([]);
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
          }
        });
      } else if (!deleteicontext) {
        swal({
          title: "",
          text: "Are you sure you want to delete this Asset",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(SuperAdmindeleteCollection(deletevaluesingle));
            setcount([]);
            setdeletevaluesingle();
            setdeletevalue([]);
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
          }
        });
      }
    }
  };

  const deletefolder = () => {
    {
      DamDataCollectionId?.map((item) => {
        if (item?.dam_media.length <= 1) {
        } else {
        }
      });
    }
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setOpen2(false);
    setFolderContextMenu(null);
    setCollectionContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
    const formData = new FormData();
    {
      DamDataCollectionId?.map((item) => {
        if (item?.dam_media.length <= 1) {
          formData.append("id_list", folderdeletedam);
        } else {
          formData.append("id_list", folderdeleteid);
        }
      });
    }
    formData.append("id_list", folderdeleteid);
    swal({
      title: "",
      text: "Are you sure you want to delete",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (DamDataCollectionId) {
          if (DamDataCollectionId[0].dam_media.length <= 1) {
            dispatch(SuperAdmindeleteCollection(folderdeletedam));
          } else {
            dispatch(SuperAdminDamMutipledelete(folderdeleteid));
          }
        }
        dispatch(SuperAdmindeleteCollection(folderdeleteid));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        setdeletevaluesingle();
        setdeletevalue([]);
        setcount([]);
        // setIsLoading(true);
        // setTimeout(() => {
        //   dispatch(SuperAdminlistAllROOTDam());
        //   dispatch(SuperAdminlistAllDamImages());
        //   dispatch(SuperAdminlistAllRootImages());
        //   dispatch(SuperAdminlistAllCollectionDAM());
        //   setdeletevalue([]);
        //   setcount([]);
        //   if (parentid) {
        //     dispatch(SuperAdminlistAllDam(parentid));
        //     dispatch(SuperAdmingetdamImageswithid(parentid));
        //     dispatch(SuperAdmingetdamDetailswithid(parentid));
        //     dispatch(SuperAdminDAMParentCollection(parentidvalue));
        //   }
        // }, 1400);
        setTimeout(() => {
          if (parentid) {
            dispatch(SuperAdminlistAllMostUsedcount(parentid));
          } else {
            dispatch(SuperAdminDamFilterFavourateCount());
          }
        }, 700);
      }
    });
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  };
  // const [progresscircle, setProgresscircle] = React.useState(0);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgresscircle((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10
  //     );
  //   }, 800);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const favourite = () => {
    if (countfav.includes(imagefav)) {
      setcountfav(countfav.filter((el, i) => el !== imagefav));
    } else {
      setcountfav([...countfav, imagefav]);
    }

    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setFolderContextMenu(null);
    setIsDisplayDetails(false);
    setCollectionContextMenu(null);
    const formData = new FormData();
    if (newone == true) {
      if (favouritevalue === "Favorite") {
        formData.append("image_favourite", true);
      } else if (favouritevalue === "UnFavorite") {
        formData.append("image_favourite", false);
      }
      dispatch(SuperAdminTitleupdate(formData, imagefav));
    } else if (newone == false) {
      if (favouritevalue === "Favorite") {
        formData.append("is_favourite", true);
      } else if (favouritevalue === "UnFavorite") {
        formData.append("is_favourite", false);
      }
      dispatch(SuperAdminFavorites(formData, imagefav));
    }
    setdeletevalue([]);
    setdeletevaluesingle();
    setnewone(false);
    setdetailsid();
    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    setTimeout(() => {
      if (companylistid.length) {
        params += `&company=${companylistid}`;
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(SuperAdminCountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(SuperAdminCountCompanies(companylistid));
        }
      } else if (!companylistid.length) {
        if (parentid) {
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
        } else {
          dispatch(SuperAdminDamFilterFavourateCount());
        }
      }
    }, 500);
    setdetailsid();
    // setimagefav();
  };

  const favouritecollection1 = () => {
    if (countfav.includes(imagefav)) {
      setcountfav(countfav.filter((el, i) => el !== imagefav));
    } else {
      setcountfav([...countfav, imagefav]);
    }
    setCollectionContextMenu(null);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setdetailsid();
    setFolderContextMenu(null);
    setIsDisplayDetails(false);
    const formData = new FormData();
    if (favouritecollection === "Favorite") {
      formData.append("image_favourite", true);
    } else if (favouritecollection === "UnFavorite") {
      formData.append("image_favourite", false);
    }
    dispatch(SuperAdminTitleupdate(formData, imagefav));
    setisfavourite();
    setdeletevalue([]);
    setdeletevaluesingle();
    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    setTimeout(() => {
      if (companylistid.length) {
        params += `&company=${companylistid}`;
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(SuperAdminCountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(SuperAdminCountCompanies(companylistid));
        }
      } else if (!companylistid.length) {
        if (parentid) {
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
        } else {
          dispatch(SuperAdminDamFilterFavourateCount());
        }
      }
    }, 500);
    setdetailsid();
  };

  const favouritefile = () => {
    if (countfav.includes(folderdeleteid)) {
      setcountfav(countfav.filter((el, i) => el !== folderdeleteid));
    } else {
      setcountfav([...countfav, folderdeleteid]);
    }
    setCollectionContextMenu(null);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
    const formData = new FormData();
    if (favouritefolder === "Favorite") {
      formData.append("is_favourite", true);
    } else if (favouritefolder === "UnFavorite") {
      formData.append("is_favourite", false);
    }
    dispatch(SuperAdminFavorites(formData, folderdeleteid));
    setisfavouritefolder();
    setisfavouritecollection();
    setdeletevalue([]);
    setdetailsid();
    setdeletevaluesingle();
    setfolderdeletedam();

    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    setTimeout(() => {
      if (companylistid.length) {
        params += `&company=${companylistid}`;
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(SuperAdminCountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(SuperAdminCountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(SuperAdminCountCompanies(companylistid));
        }
      } else if (!companylistid.length) {
        if (parentid) {
          dispatch(SuperAdminlistAllMostUsedcount(parentid));
        } else {
          dispatch(SuperAdminDamFilterFavourateCount());
        }
      }
    }, 500);
    setdetailsid();
  };

  const [name, setName] = useState("Share link");

  function doublefunction() {
    setTimeout(() => {
      setName("Share link");
    }, 2000);
    setName("Copied");
    navigator.clipboard
      .writeText(imagelink)
      .then(() => { })
      .catch(() => { });
    setFileContextMenu(null);
    setContextMenu(null);
    setFolderContextMenu(null);
    setCollectionContextMenu(null);
  }

  const copyFile = () => {
    setcopydata(true);
    setmovedata(false);
    setcopyFolderdata1(true);
    setcopyFolderdata(false);
    setcopyFolderdata2(false);
    setCollectionContextMenu(null);
    localStorage.setItem("imageshow", "imageshow");
    if (parentid) {
      localStorage.setItem("dialoginsideparentid", parentid);
    } else {
      localStorage.removeItem("dialoginsideparentid");
    }
    localStorage.setItem("movefileid", movefileid);
    setmoveFolder(true);
    // setcopyFolder(true);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
    localStorage.removeItem("collectiontrue");
    setTimeout(() => {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }, 1000);
  };

  const duplicateFile = () => {
    dispatch(
      SuperAdminDamcopypost({
        id: detailsid,
        parent: parentid,
        type: 3,
        type_new: 3,
      })
    );
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
    setIsLoading(true);
    setCollectionContextMenu(null);
    setTimeout(() => {
      dispatch(SuperAdminlistAllROOTDam());
      dispatch(SuperAdminlistAllDamImages());
      dispatch(SuperAdminlistAllRootImages());
      dispatch(SuperAdminlistAllCollectionDAM());
      setdeletevalue([]);
      setdeletevaluesingle();
      setcount([]);
      if (parentid) {
        dispatch(SuperAdminlistAllDam(parentid));
        dispatch(SuperAdmingetdamImageswithid(parentid));
        dispatch(SuperAdmingetdamDetailswithid(parentid));
        dispatch(SuperAdminDAMParentCollection(parentidvalue));
      }
    }, 1800);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setTimeout(() => {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }, 1000);
  };

  const duplicateCollectionimage = () => {
    dispatch(
      SuperAdminDamcopypost({
        id: detailsid,
        parent: collectiondamid,
        type: 2,
        type_new: 2,
      })
    );
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
    setOpen2(false);
    setCollectionContextMenu(null);
    setIsLoading(true);
    setTimeout(() => {
      dispatch(SuperAdminlistAllROOTDam());
      dispatch(SuperAdminlistAllDamImages());
      dispatch(SuperAdminlistAllRootImages());
      dispatch(SuperAdminlistAllCollectionDAM());
      setdeletevalue([]);
      setdeletevaluesingle();
      setcount([]);
      if (parentid) {
        dispatch(SuperAdminlistAllDam(parentid));
        dispatch(SuperAdmingetdamImageswithid(parentid));
        dispatch(SuperAdmingetdamDetailswithid(parentid));
        dispatch(SuperAdminDAMParentCollection(parentidvalue));
      }
    }, 1800);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setTimeout(() => {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }, 1000);
  };

  const movefile = () => {
    setcopyFolderdata(true);
    setcopyFolderdata1(false);
    setcopyFolderdata2(false);
    setCollectionContextMenu(null);
    setcopydata(false);
    setmovedata(false);
    if (parentid) {
      localStorage.setItem("dialoginsideparentid", parentid);
    } else {
      localStorage.removeItem("dialoginsideparentid");
    }
    localStorage.setItem("movefileid", movefileid);
    setmoveid(movefileid);
    setmoveFolder(true);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
    localStorage.removeItem("collectiontrue");
    setTimeout(() => {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }, 1000);
  };

  const moveimages = () => {
    setcopyFolderdata(false);
    setcopyFolderdata1(false);
    setcopyFolderdata2(true);
    setcopydata(false);
    setmovedata(true);
    localStorage.setItem("imageshow", "imageshow");
    if (parentid) {
      localStorage.setItem("dialoginsideparentid", parentid);
    } else {
      localStorage.removeItem("dialoginsideparentid");
    }
    localStorage.setItem("movefileid", movefileid);
    setmoveFolder(true);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
    localStorage.removeItem("collectiontrue");
    setTimeout(() => {
      if (parentid) {
        dispatch(SuperAdminlistAllMostUsedcount(parentid));
      } else {
        dispatch(SuperAdminDamFilterFavourateCount());
      }
    }, 1000);
  };

  const movecollectionimage = () => {
    setcopyFolderdata(false);
    setcopyFolderdata1(false);
    setcopyFolderdata2(false);
    setcopydata(false);
    setmovedata(false);
    setmoveFolder(true);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
  };

  const renamefile = () => {
    setmoveFolder1(true);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
  };

  const companydatavalue = (e) => {
    setcompanyvalue(e.target.value);
  };

  const companyimageupdate = (e) => {
    // console.log(e.target.value);
    if (e.target.value == null) {
      setcompanydataupdate(null);
    } else {
      setcompanydataupdate(e.target.value);
    }
  };

  const { InsideData, success: damdatainside } = useSelector(
    (state) => state.AdminDaminsideData
  );

  useEffect(() => {
    // settitleName(InsideData?.dam_media[0]?.title);
    if (InsideData?.dam_media[0]?.company == "") {
      setcompanydataupdate(null);
    } else {
      setcompanydataupdate(InsideData?.dam_media[0]?.company);
    }
  }, [damdatainside]);

  const [savetagbutton, setSavetagButton] = useState("");
  function handleSaveTag(e, v) {
    if (savetagbutton.length < 1) return;

    const filteredTags = tags.filter(
      (str) => str.toLowerCase() == savetagbutton.toLowerCase()
    );

    if (filteredTags.length > 0) {
      swal({
        title: "",
        text: "Tag already added",
        className: "noticeAlert",
        icon: "/img/NoticeAlert.png",
        buttons: false,
        timer: 5000,
      });
      return;
    }
    setTags([...tags, savetagbutton]);
    setSavetagButton("");
    // console.log(inputRef.current.value);
    inputRef.current.value = "";
  }
  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;

    const filteredTags = tags.filter(
      (str) => str.toLowerCase() == value.toLowerCase()
    );

    if (filteredTags.length > 0) {
      swal({
        title: "",
        text: "Tag already added",
        className: "noticeAlert",
        icon: "/img/NoticeAlert.png",
        buttons: false,
        timer: 5000,
      });
      return;
    }
    setTags([...tags, value]);
    e.target.value = "";
    setSavetagButton("");
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  /****** Share Media *****/
  const [openShareMedia, setOpenShareMedia] = React.useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [copiedIndex, setCopiedIndex] = useState();
  const mydata = useRef([]);
  const mydataNew = useRef([]);
  // useEffect(() => {
  // }, []);
  const shareArr = [];
  const shareArrNames = [];

  // console.log("mydata -- == ", mydata.current);
  const shareMedia = mydata.current?.map((file, index) => (
    <>
      {file?.usage == 1 && (
        <>
          {/* {JSON.stringify(mydataNew?.current)} */}
          <div className="Link-count">{shareArr.push(file.media)}</div>
          <div className="media--item" key={file.name}>
            <div className="media-name">
              <p className="media-link">
                {shareArrNames.push(file.files_name)} . {file.title}
              </p>
              <div className="Copylink">
                <div className="copy-area">
                  <CopyToClipboard
                    text={file.media}
                    onCopy={() => shareMediaLinkfunction(file.media, index)}
                  // onClick={() => shareMediaLinkfunction(file.media, index)}
                  >
                    <span>
                      <img src="/img/link-h.png" />
                      {copiedIndex == index ? "Copied" : "Copy Link"}
                    </span>
                  </CopyToClipboard>

                  {/* <Button
                    type="button"
                    onClick={(e) => {
                      shareMediaLinkfunction(file.media, index);
                    }}
                  >
                    <img src="/img/link-h.png" />
                    Copy Link
                    {{mydataNew?.current?.length > 0
                      ? mydataNew.current[index]?.shareText
                      : "Copy Link"}}
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  ));

  useEffect(() => {
    if (Collectionviewdata) {
      mydata.current = Collectionviewdata;
    }
  }, [Collectionviewdata]);

  const handleOpenShareMedia = () => {
    let view = [];
    if (count.length > 0) {
      dispatch(SuperAdminCollectionView(count));
      // alert("count")
    } else {
      dispatch(SuperAdminCollectionView(detailsid));
      // alert("without_count")
    }
    setexistingmediafile(Collectionviewdata);
    setOpenShareMedia(true);
    setContextMenu(null);
    setCreatedropdown(null);
    setContextMenu(null);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setFolderContextMenu(null);

    setTimeout(() => {
      let myArr = [];
      for (let index = 0; index < mydata.current?.length; index++) {
        if (mydata.current[index]?.usage == 1) {
          myArr.push({ id: index, shareText: "Copy link" });
        }
      }
      mydataNew.current = myArr;
    }, 1000);
  };
  const handleCloseShareMedia = () => {
    setFileGallery([]);
    setCollectionShowIdData();
    setOpenShareMedia(false);
    setFolderContextMenu(null);
    setisfavouritefolder();
    setisfavouritecollection();
    setShareEmail("");
  };
  const [errors21, setErrors21] = useState({
    shareEmail: null,
  });
  const validateShareSubmit = (e, data) => {
    const tempErrors = {
      shareEmail: validations.email(shareEmail),
    };
    setErrors21(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    handleShareMediaSubmit();
  };
  const handleShareMediaSubmit = () => {
    dispatch(
      SuperAdmindamShare({
        email: shareEmail,
        media: shareArr,
        mediaNames: shareArrNames,
      })
    );
    setcount([]);
  };

  function shareMediaLinkfunction(imgLink, i) {
    setCopiedIndex(i);
    const list = mydataNew.current;
    list[i].shareText = "Copied!";
    mydataNew.current = list;

    setTimeout(() => {
      setCopiedIndex();
    }, 2000);
  }

  const {
    success: successShare,
    error: errorShare,
    shareDAM,
  } = useSelector((state) => state.SuperAdminDamShareReducer);

  useEffect(() => {
    if (successShare) {
      swal({
        title: "Successfully Complete",
        text: shareDAM,
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 2500,
      });
      setOpenShareMedia(false);
    }
    if (errorShare) {
      swal({
        title: "",
        text: errorShare,
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2500,
      });
    }
  }, [successShare, errorShare]);

  /****** Share Media *****/

  // ------------------download Image-----------------------------
  const downloadtheimagefun = () => {
    const dataFormatData = fullview?.split("?")[0];
    if (fullview) {
      fetch(dataFormatData)
        .then((response) => response.blob())
        .then((blob) => {
          FileSaver.saveAs(blob, `${dataFormatData.split("/").pop()}`);
          setFullview("");
          setFileContextMenu(false);
          setFileContextMenu(null);
          setFileVideoContextMenu(false);
          setFileVideoContextMenu(null);
        })
        .catch((error) => console.error(error));
    }
    setFileContextMenu(false);
    setFileContextMenu(null);
    setFileVideoContextMenu(false);
    setFileVideoContextMenu(null);
  };

  const handlefiledonwloadfun = () => {
    let arrJobDocuments = [];
    if (count) {
      for (let index = 0; index < count.length; index++) {
        arrJobDocuments.push(multiImages[index]?.split("?")[0]);
      }
      // setMultiImagesData(arrJobDocuments.filter((x) => x !== null));
      const promises = arrJobDocuments.map((url) =>
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
            FileSaver.saveAs(blob, `${url.split("/").pop()}`);
            setMultiImages([]);
            setcount([]);
            setFullview("");
            setFileContextMenu(false);
            setFileContextMenu(null);
            setFileVideoContextMenu(false);
            setFileVideoContextMenu(null);
          })
          .catch((error) => console.error(error))
      );
    }
    setFileContextMenu(false);
    setFileContextMenu(null);
    setFileVideoContextMenu(false);
    setFileVideoContextMenu(null);
  };
  // ------------------download Image-----------------------------

  return (
    <>
      <>
        <Dialog
          className="profileImgDialogagency popupclass"
          open={openShareMedia}
          onClose={handleCloseShareMedia}
        >
          <DialogTitle className="profileImgHeadingAnew2">
            <div
              className={
                errors21.shareEmail
                  ? "profileImgHeadingAnew2 error"
                  : "profileImgHeadingAnew2  "
              }
            >
              <h3 className="nameOrEmailText">Enter Email</h3>
              <input
                className="inputdatacollection"
                type="email"
                placeholder="Enter Email Address"
                onChange={(e) => {
                  setShareEmail(e.target.value);
                  setErrors21({ ...errors21, shareEmail: null });
                }}
              />
              {errors21.shareEmail && (
                <span
                  className="CoverCreator3 shareerror"
                  style={{
                    color: "#D14F4F",
                    opacity: errors21.shareEmail ? 1 : 0,
                  }}
                >
                  {errors21.shareEmail ?? "valid"}
                </span>
              )}
            </div>
          </DialogTitle>
          <div className="dialogcontent_and_actions_new">
            <DialogContent className="enterNameInputNewD">
              <Modal.Body>
                <div className="container1">
                  <aside>{shareMedia}</aside>

                  {/* {JSON.stringify(Collectionviewdata)} */}
                </div>
              </Modal.Body>
            </DialogContent>
            <DialogActions>
              <div className="cancelButtonnewFolder">
                <button
                  className="canceButtonnewPop"
                  onClick={handleCloseShareMedia}
                >
                  Cancel
                </button>
                <Button className="shareNewPop" onClick={validateShareSubmit}>
                  Share
                </Button>
              </div>
            </DialogActions>
          </div>
        </Dialog>

        {/* {JSON.stringify(DamImageData)} */}

        {/* <div className="vector_toggleNewUpper">
          <img
            onClick={handleClickShowMediaTable}
            className="vector_img"
            src="/img/mediaimagevector.png"
          />
        </div>  */}

        {isShown ? (
          <>
            <Admin_Media_datatable />
          </>
        ) : (
          <>
            <div className="input_search22_New_media">
              <input
                onChange={(e) => {
                  getvalue1(e);
                }}
                value={searchvalue}
                className="input_search_bar_new_media"
                placeholder="Search Files and Folders"
                type="text"
              />
              <i className="fa fa-search"></i>
            </div>
            <div className="topsliderdiv">
              <div className="Createmide">
                <div className="dammideanewdiv">
                  {!damjobshow && (
                    <>
                      <div className="Createmidebtn">
                        <Link to="#">
                          <Button
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            className="crbdnmide"
                          >
                            <i className="fa fa-plus"></i>
                            Create
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={createdropdown}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem onClick={handleCreateFolder}>
                              <img src="/img/createfolder.png" /> Create a
                              folder
                            </MenuItem>
                            <MenuItem onClick={handleClickOpenUpload}>
                              <img src="/img/uploadfileRC.png" /> Upload a file
                            </MenuItem>
                            <MenuItem onClick={handleCreateCollection}>
                              <img src="/img/createfolder.png" /> Create a
                              collection
                            </MenuItem>
                          </Menu>
                        </Link>
                      </div>
                    </>
                  )}
                  <Dialog
                    className="profileImgDialogagency popupclass profileImgDialogagencymove"
                    open={moveFolder}
                  // onClick={movedialogclose}
                  >
                    <DialogTitle className="profileImgfolder imgsizefixer imgsizefixermediafolder">
                      <h2>
                        {copyfolderdata && <> Move Folder</>}
                        {copyfolderdata1 && <> Copy Image</>}
                        {copyfolderdata2 && <> Move Image</>}
                        {!parentid && (
                          <>
                            {" "}
                            <Link
                              to={`/admin-media`}
                              className="closebuttonsec"
                            >
                              <i
                                className="fa-solid fa-xmark  dialogcross"
                                onClick={movedialogclose}
                              ></i>
                            </Link>
                          </>
                        )}
                        {parentid && (
                          <>
                            {" "}
                            <Link
                              to={`/admin-media/${parentid}`}
                              className="closebuttonsec"
                            >
                              <i
                                className="fa-solid fa-xmark  dialogcross "
                                onClick={movedialogclose}
                              ></i>
                            </Link>
                          </>
                        )}
                      </h2>
                    </DialogTitle>
                    <div className="dialogcontent_and_actions_new">
                      <DialogContent>
                        <div>
                          <div className="foldermainDisplayDivsec">
                            <Admin_Movemedia setSkillsMove={setSkillsMove} />
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <div className="cancelButtonnewFolder">
                          <button
                            className="canceButtonnewPop"
                            onClick={movedialogclose}
                          >
                            Cancel
                          </button>
                          {(skillsMove || parentid) && (
                            <>
                              <Button
                                className="shareNewPop"
                                onClick={() => movefilelocation("2")}
                              >
                                {copyfolderdata && <> Move </>}
                                {copyfolderdata1 && !open2 && <> Copy </>}
                                {copyfolderdata2 && <> Move </>}
                                {open2 && copyfolderdata1 && <>Copy</>}
                                {open2 && !copyfolderdata1 && <>Move</>}
                              </Button>
                              {rootid != "Null" && (
                                <>
                                  <Button
                                    className="shareNewPop move-to-media-btn"
                                    onClick={() => movefilelocation("1")}
                                  >
                                    {copyfolderdata && (
                                      <> Move to main Media </>
                                    )}
                                    {copyfolderdata1 && !open2 && (
                                      <> Copy to main media </>
                                    )}
                                    {copyfolderdata2 && (
                                      <> Move to main media </>
                                    )}
                                    {open2 && copyfolderdata1 && (
                                      <>Copy to main media</>
                                    )}
                                    {open2 && !copyfolderdata1 && (
                                      <>Move to main media</>
                                    )}
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </DialogActions>
                    </div>
                  </Dialog>

                  <Dialog
                    className="profileImgDialogagency popupclass"
                    open={comapnyChange}
                    onClose={handleCloseCompanyChange}
                  >
                    <DialogTitle className="uploadmediapage">
                      <h2>
                        Select Company
                        <span
                          className="closebuttonsec"
                          onClick={handleCloseCompanyChange}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </h2>
                    </DialogTitle>
                    <div className="dialogcontent_and_actions_new">
                      <DialogContent className="enterNameInputNewD">
                        <Modal.Body>
                          <div>
                            <h4 className="Company_name27">Company</h4>{" "}
                            <div className="styled-select Companyname Companyname_1">
                              <Select
                                open={isOpen9}
                                onOpen={() => {
                                  setIsOpen9(true);
                                }}
                                onClose={() => {
                                  setIsOpen9(false);
                                }}
                                MenuProps={menuProps}
                                value={companyvalue}
                                onChange={companydatavalue}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                              >
                                <MenuItem value={null}>Select Company</MenuItem>
                                {companiesData?.map((item) =>
                                  item.is_active ? (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item?.name}
                                    </MenuItem>
                                  ) : null
                                )}
                              </Select>
                            </div>
                          </div>
                        </Modal.Body>
                      </DialogContent>
                      <DialogActions>
                        {/* <div className="Copylink">
                      <Button onClick={handleCloseFolder}>
                        <img src="/img/link-h.png" /> Copy link
                      </Button>
                    </div> */}
                        <div className="cancelButtonnewFolder">
                          <button
                            className="canceButtonnewPop"
                            onClick={handleCloseCompanyChange}
                          >
                            Cancel
                          </button>
                          <Button className="shareNewPop" onClick={renamedone}>
                            Submit
                          </Button>
                        </div>
                      </DialogActions>
                    </div>
                  </Dialog>

                  <Dialog
                    className="profileImgDialogagency popupclass profileImgDialogagencymove"
                    open={moveFolder2}
                  // onClick={movedialogclose}
                  >
                    <DialogTitle className="profileImgfolderAttach">
                      <div className="AjobshareAttach">
                        <h2>Are you sure you want to use this image</h2>

                        <span
                          className="closebuttonsec"
                          onClick={movedialogclose2}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </div>
                    </DialogTitle>
                    <div className="dialogcontent_and_actions_new">
                      <DialogContent></DialogContent>
                      <DialogActions>
                        <div className="cancelButtonnewFolder">
                          <button
                            className="canceButtonnewPop"
                            onClick={movedialogclose2}
                          >
                            Cancel
                          </button>
                          <button
                            className="canceButtonnewPopAttach"
                            onClick={sampleassetclick}
                          >
                            Sample Assets
                          </button>
                          <Button
                            className="shareNewPopAttach"
                            onClick={fileassetclick}
                          >
                            Files Assets
                          </Button>
                        </div>
                      </DialogActions>
                    </div>
                  </Dialog>

                  {moveFolder1 && (
                    <>
                      <Dialog
                        className="profileImgDialogagency popupclass"
                        open={moveFolder1}
                      // onClick={movedialogclose}
                      >
                        <DialogTitle className="profileImgfolder imgsizefixer">
                          <h2>Rename</h2>
                        </DialogTitle>
                        <div className="dialogcontent_and_actions_new">
                          <DialogContent>
                            <div>
                              <div className="foldermainDisplayDivsec">
                                <div className="dialogcontent_and_actions_new">
                                  <input
                                    value={Renamechange}
                                    onChange={(e) => {
                                      setrenamechange(e.target.value);
                                    }}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                          <DialogActions>
                            <div className="cancelButtonnewFolder">
                              <button
                                className="canceButtonnewPop"
                                onClick={movedialogclose1}
                              >
                                Cancel
                              </button>
                              <Button
                                className="shareNewPop"
                                onClick={renamedone}
                              >
                                Ok
                              </Button>
                            </div>
                          </DialogActions>
                        </div>
                      </Dialog>
                    </>
                  )}

                  <Dialog
                    className="profileImgDialogagency popupclass"
                    open={openFolder}
                    onClose={handleCloseFolder}
                  >
                    <DialogTitle className="profileImgfolder imgsizefixer">
                      <h2>
                        Create Folder
                        <span
                          className="closebuttonsec"
                          onClick={handleCloseFolder}
                        >
                          <i className="fa-solid fa-xmark  dialogcross"></i>
                        </span>
                      </h2>
                    </DialogTitle>
                    <div className="dialogcontent_and_actions_new">
                      <DialogContent
                        className={
                          errors1.folderName
                            ? "enterNameInputNewD error"
                            : "enterNameInputNewD  "
                        }
                      >
                        <div>
                          <h3 className="nameOrEmailText">Add Folder</h3>
                          <input
                            className="NameorEmailNewPop"
                            type="text"
                            placeholder="Enter folder name..."
                            value={folderName}
                            onChange={(e) => {
                              setFolderName(e.target.value);
                              setErrors({ ...errors1, folderName: null });
                            }}
                          />
                          <span
                            className="CoverCreator3"
                            style={{
                              color: "#D14F4F",
                              opacity: errors1.folderName ? 1 : 0,
                            }}
                          >
                            {errors1.folderName ?? "valid"}
                          </span>
                          <div>
                            <h4 className="Company_name27">Company</h4>{" "}
                            <div className="styled-select Companyname Companyname_1">
                              <Select
                                open={isOpen9}
                                onOpen={() => {
                                  setIsOpen9(true);
                                }}
                                onClose={() => {
                                  setIsOpen9(false);
                                }}
                                disabled={DamData?.[0]?.company_id}
                                MenuProps={menuProps}
                                value={companyvalue}
                                onChange={(e) => companydatavalue(e)}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                              >
                                <MenuItem value={null}>Select Company</MenuItem>
                                {companiesData?.map((item) =>
                                  item.is_active ? (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item?.name}
                                    </MenuItem>
                                  ) : null
                                )}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        {/* <div className="Copylink">
                        <Button onClick={handleCloseFolder}>
                          <img src="/img/link-h.png" /> Copy link
                        </Button>
                      </div> */}
                        <div className="cancelButtonnewFolder">
                          <button
                            className="canceButtonnewPop"
                            onClick={handleCloseFolder}
                          >
                            Cancel
                          </button>
                          <Button
                            onClick={validateSubmit}
                            className="shareNewPop"
                          >
                            Create
                          </Button>
                        </div>
                      </DialogActions>
                    </div>
                  </Dialog>

                  <Dialog
                    className="profileImgDialogagency popupclass"
                    open={openUploadFile}
                    onClose={handleCloseUpload}
                  >
                    <DialogTitle className="uploadmediapage">
                      <h2>
                        Upload File
                        <span
                          className="closebuttonsec"
                          onClick={handleCloseUpload}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </h2>
                    </DialogTitle>
                    <div className="dialogcontent_and_actions_new">
                      <DialogContent className="enterNameInputNewD">
                        <Modal.Body>
                          <div className="container">
                            <div
                              className="borderOfUploadFilenew"
                              {...getRootfileProps({ style })}
                            >
                              <input
                                {...getInputfileProps()}
                                imgExtension={[
                                  ".jpg",
                                  ".gif",
                                  ".png",
                                  ".gif",
                                  ".mp4",
                                ]}
                                maxfilesize={5242880}
                              />
                              <span className="uploadFilenewArea">
                                {" "}
                                <img
                                  className="upiconimg"
                                  src="/img/uploadimg.png"
                                  alt=""
                                />
                                Upload Files
                              </span>
                            </div>
                            <aside style={thumbsContainer}>{thumbs}</aside>
                          </div>
                          <div>
                            <h4 className="Company_name27">Company</h4>{" "}
                            <div className="styled-select Companyname Companyname_1">
                              <Select
                                open={isOpen9}
                                onOpen={() => {
                                  setIsOpen9(true);
                                }}
                                onClose={() => {
                                  setIsOpen9(false);
                                }}
                                disabled={DamData?.[0]?.company_id}
                                MenuProps={menuProps}
                                value={companyvalue}
                                onChange={(e) => companydatavalue(e)}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                              >
                                <MenuItem value={null}>Select Company</MenuItem>
                                {companiesData?.map((item) =>
                                  item.is_active ? (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item?.name}
                                    </MenuItem>
                                  ) : null
                                )}
                              </Select>
                            </div>
                          </div>
                        </Modal.Body>
                      </DialogContent>
                      <DialogActions>
                        {/* <div className="Copylink">
                        <Button onClick={handleCloseFolder}>
                          <img src="/img/link-h.png" /> Copy link
                        </Button>
                      </div> */}
                        <div className="cancelButtonnewFolder">
                          <button
                            className="canceButtonnewPop"
                            onClick={handleCloseUpload}
                          >
                            Cancel
                          </button>
                          <Button
                            className="shareNewPop"
                            onClick={handleFileSubmit}
                          >
                            Submit
                          </Button>
                        </div>
                      </DialogActions>
                    </div>
                  </Dialog>

                  <Dialog
                    className="profileImgDialogagency popupclass"
                    open={openUploadCollection}
                    onClose={handleCloseCollection}
                  >
                    <DialogTitle
                      className={
                        errors1.CollectionName
                          ? "profileImgHeadingAnew2 error"
                          : "profileImgHeadingAnew2  "
                      }
                    >
                      <div>
                        <h3 className="nameOrEmailText">Add Collection name</h3>
                        <input
                          className="inputdatacollection"
                          type="text"
                          placeholder="Enter Collection name..."
                          value={CollectionName}
                          onChange={(e) => {
                            setCollectionName(e.target.value);
                            setErrors({ ...errors1, CollectionName: null });
                          }}
                        />
                        <span
                          className="CoverCreator3"
                          style={{
                            color: "#D14F4F",
                            opacity: errors1.CollectionName ? 1 : 0,
                          }}
                        >
                          {errors1.CollectionName ?? "valid"}
                        </span>
                      </div>

                      <h2>
                        Upload Collection
                        <span
                          className="closebuttonsec"
                          onClick={handleCloseCollection}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </h2>
                    </DialogTitle>
                    <div className="dialogcontent_and_actions_new">
                      <DialogContent className="enterNameInputNewD">
                        <Modal.Body>
                          <div className="container1">
                            <div
                              className="borderOfUploadFilenew"
                              {...getRootGalleryProps({ style })}
                            >
                              <input
                                {...getInputGalleryProps()}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxfilesize={5242880}
                              />
                              <span className="uploadFilenewArea">
                                {" "}
                                <img
                                  className="upiconimg"
                                  src="/img/uploadimg.png"
                                  alt=""
                                />
                                Upload Collections
                              </span>
                            </div>
                            <aside style={thumbsContainer}>
                              {thumbs1} {existingMedia}
                            </aside>

                            {/* {JSON.stringify(Collectionviewdata)} */}
                            {/*  */}
                          </div>
                          <div>
                            <h4 className="Company_name27">Company</h4>{" "}
                            <div className="styled-select Companyname Companyname_1">
                              <Select
                                open={isOpen9}
                                onOpen={() => {
                                  setIsOpen9(true);
                                }}
                                onClose={() => {
                                  setIsOpen9(false);
                                }}
                                disabled={DamData?.[0]?.company_id}
                                MenuProps={menuProps}
                                value={companyvalue}
                                onChange={companydatavalue}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                              >
                                <MenuItem value={null}>Select Company</MenuItem>
                                {companiesData?.map((item) =>
                                  item.is_active ? (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item?.name}
                                    </MenuItem>
                                  ) : null
                                )}
                              </Select>
                            </div>
                          </div>
                        </Modal.Body>
                      </DialogContent>
                      <DialogActions>
                        <div className="cancelButtonnewFolder">
                          <button
                            className="canceButtonnewPop"
                            onClick={handleCloseCollection}
                          >
                            Cancel
                          </button>
                          <Button
                            className="shareNewPop"
                            onClick={validateSubmit1}
                          >
                            Create
                          </Button>
                        </div>
                      </DialogActions>
                    </div>
                  </Dialog>
                  <div className="files_selected">
                    <div className="sharedampage">
                      {count.length > 0 && (
                        <>
                          <div className="job_select_contnet">
                            <h6 className="files_selct_content11">
                              <span className="number22">{count.length}</span>
                              files selected
                            </h6>
                            {!damjobshow && (
                              <>
                                <h6
                                  className="files_selct_content11"
                                  onClick={createjobadd}
                                >
                                  Create Job
                                </h6>
                                <h6
                                  className="files_selct_content11"
                                  onClick={handleCreateCollection}
                                >
                                  Create Collection
                                </h6>
                              </>
                            )}
                          </div>
                          <div className="delete_share_contnet">
                            <i
                              onClick={handleOpenShareMedia}
                              className="fa fa-share-alt"
                            ></i>
                            <i
                              className="fa fa-trash-o"
                              onClick={deleteimage}
                            ></i>
                            <i className="fa fa-close" onClick={resetcount}></i>
                          </div>
                        </>
                      )}
                      {selectimages.length > 0 && (
                        <>
                          <div className="job_select_contnet">
                            <h6 className="files_selct_content11">
                              <span className="number22">
                                {selectimages.length}
                              </span>
                              files selected
                            </h6>
                            <h6
                              className="files_selct_content11"
                              onClick={createjobadd}
                            >
                              Create Job
                            </h6>
                            <h6
                              className="files_selct_content11"
                              onClick={handleCreateCollection}
                            >
                              Create Collection
                            </h6>
                          </div>
                          <div className="delete_share_contnet">
                            <i className="fa fa-share-alt"></i>
                            <i
                              className="fa fa-trash-o"
                              onClick={deleteimage}
                            ></i>
                            <i className="fa fa-close"></i>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {showprogress && (
                  <>
                    {Object.entries(myNewProgress)
                      .slice(0, 1)
                      .map(([fileId, { percent }]) => (
                        <>
                          {/* {fileId}: {percent}% */}
                          {/* <progress max="100" value={percent} /> */}
                          {/* {CollectionNameShow && (
                            <>({CollectionNameShow.substring(0, 5)})</>
                          )} */}
                          {fileId.length > 5
                            ? `${fileId.substring(0, 5)}...`
                            : fileId}
                          <ProgressBar now={percent} label={`${percent}%`} />
                          <i
                            className="fa fa-caret-down dropdown"
                            onClick={UploadProgress}
                          ></i>
                        </>
                      ))}
                  </>
                )}

                {!showprogressheader.every(checkAge) && (
                  <>
                    {showprogressbox && (
                      <>
                        <div className="fixedclass">
                          <div className="dialogcontent_and_actions_new">
                            <div className="container">
                              {Object.entries(myNewProgress).map(
                                ([fileId, { percent }]) => (
                                  <>
                                    <>
                                      <div className="ProgressBartext">
                                        {percent != 100 && (
                                          <>
                                            <p>{fileId}</p>
                                            <ProgressBar
                                              now={percent}
                                              label={`${percent}%`}
                                            />{" "}
                                          </>
                                        )}
                                      </div>
                                    </>
                                  </>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* {showprogress && (
                  <>
                    {inputRef.current?.length && (
                      <>
                        {inputRef.current?.slice(0, 1).map((file, index) => (
                          <>
                            <>
                              {!showprogressheader.every(checkAge) && (
                                <>
                                  {CollectionNameShow && (
                                    <>({CollectionNameShow.substring(0, 5)})</>
                                  )}
                                  {!CollectionNameShow && (
                                    <>
                                      {" "}
                                      <h6>({file.title.substring(0, 5)})</h6>
                                    </>
                                  )}
                                  <ProgressBar
                                    now={file?.progress2}
                                    label={`${file?.progress2}%`}
                                  />{" "}
                                  <i
                                    className="fa fa-caret-down dropdown"
                                    onClick={UploadProgress}
                                  ></i>
                                </>
                              )}
                            </>
                          </>
                        ))}
                      </>
                    )}
                  </>
                )}

                {!showprogressheader.every(checkAge) && (
                  <>
                    {showprogressbox && (
                      <>
                        <div className="fixedclass">
                          <div className="dialogcontent_and_actions_new">
                            <div className="container">
                              {inputRef.current?.length && (
                                <>
                                  {inputRef.current?.map((file, index) => (
                                    <>
                                      <>
                                        <div className="ProgressBartext">
                                          {file?.progress2 != 100 && (
                                            <>
                                              <p>{file.title}</p>
                                              <ProgressBar
                                                now={file?.progress2}
                                                label={`${file?.progress2}%`}
                                              />{" "}
                                            </>
                                          )}
                                        </div>
                                      </>
                                    </>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )} */}
              </div>
              <div className="sliderAdva">
                <div className="media_manager">
                  <div className="media_contnet"></div>
                </div>

                <div className="advanced_btn"></div>
              </div>

              <div className="slidertoppage">
                <div className="main_slider">
                  <div className="Sort_by_content">
                    <h4 className="sort_contnet">Sort by</h4>
                  </div>
                  <div className="container1 borderBottomsortByOne">
                    <div className="radioOne radioOneMarginTB">
                      {" "}
                      <input
                        type="radio"
                        id="html"
                        name="fav_language"
                        checked={sortby == "mostused" ? "checked" : ""}
                        onChange={bestmatch}
                      />
                      {" "}
                      <label
                        for="html"
                        className="labelForRadioMedia labelForRadioMediaUpdate"
                      >
                        Most Used
                      </label>
                    </div>
                    <div className="radioOne radioOneMarginTB">
                      <input
                        type="radio"
                        id="html1"
                        name="fav_language"
                        onChange={oldest}
                      />
                      {" "}
                      <label
                        for="html1"
                        className="labelForRadioMediaTwo labelForRadioMediaUpdateTwo"
                      >
                        Oldest
                      </label>
                    </div>
                    <div className="radioOne  radioOneMarginTB">
                      {" "}
                      <input
                        type="radio"
                        id="javascript"
                        name="fav_language"
                        onChange={Newest}
                      />
                      {" "}
                      <label
                        for="javascript"
                        className="labelForRadioMedia labelForRadioMediaUpdate"
                      >
                        Newest
                      </label>
                    </div>

                  </div>
                  <div className="borderBottomFileTypesTwo">
                    <div className="container my-4 mediaFileTypesChecks">
                      <form className="form w-100">
                        <h3>Filters</h3>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="allSelect"
                            // checked={
                            //   users.filter((user) => user?.isChecked !== true).length < 1
                            // }
                            checked={
                              !users.some((user) => user?.isChecked !== true)
                            }
                            onChange={handleChange}
                          />
                          <label className="form-check-label ms-1 textDarkFileTypes">
                            All Select
                          </label>
                        </div>
                        {users.map((user, index) => (
                          <div
                            className="form-check form_check_MarginL"
                            key={index}
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={user.name}
                              checked={user?.isChecked || false}
                              onChange={handleChange}
                            />
                            <label className="form-check-label ms-1 textDarkFileTypesData textDarkFileTypesDataSecondmedia">
                              <span className="companyDataDynamic">
                                {user.name}
                              </span>

                              <span className="countingDataDynamic">
                                {!parentid && (
                                  <>
                                    {companyshow && (
                                      <>
                                        {index == 0 && (
                                          <> {DamCountData?.fav_folder} </>
                                        )}
                                        {index == 1 && (
                                          <> {DamCountData?.total_image} </>
                                        )}
                                        {index == 2 && (
                                          <> {DamCountData?.total_video} </>
                                        )}
                                        {index == 3 && (
                                          <>
                                            {" "}
                                            {
                                              DamCountData?.total_collection
                                            }{" "}
                                          </>
                                        )}
                                        {index == 4 && (
                                          <> {DamCountData?.total_folder} </>
                                        )}
                                      </>
                                    )}
                                    {!companyshow && (
                                      <>
                                        {index == 0 && (
                                          <> {DamIdCompanylist?.fav_folder} </>
                                        )}
                                        {index == 1 && (
                                          <> {DamIdCompanylist?.total_image} </>
                                        )}
                                        {index == 2 && (
                                          <> {DamIdCompanylist?.total_video} </>
                                        )}
                                        {index == 3 && (
                                          <>
                                            {" "}
                                            {
                                              DamIdCompanylist?.total_collection
                                            }{" "}
                                          </>
                                        )}
                                        {index == 4 && (
                                          <>
                                            {" "}
                                            {
                                              DamIdCompanylist?.total_folder
                                            }{" "}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                {parentid && (
                                  <>
                                    {companyshow && (
                                      <>
                                        {index == 0 && (
                                          <> {Dammostused?.fav_folder} </>
                                        )}
                                        {index == 1 && (
                                          <> {Dammostused?.total_image} </>
                                        )}
                                        {index == 2 && (
                                          <> {Dammostused?.total_video} </>
                                        )}
                                        {index == 3 && (
                                          <> {Dammostused?.total_collection} </>
                                        )}
                                        {index == 4 && (
                                          <> {Dammostused?.total_folder} </>
                                        )}
                                      </>
                                    )}

                                    {!companyshow && (
                                      <>
                                        {index == 0 && (
                                          <>
                                            {" "}
                                            {
                                              DamIdCompanydatalist?.fav_folder
                                            }{" "}
                                          </>
                                        )}
                                        {index == 1 && (
                                          <>
                                            {" "}
                                            {
                                              DamIdCompanydatalist?.total_image
                                            }{" "}
                                          </>
                                        )}
                                        {index == 2 && (
                                          <>
                                            {" "}
                                            {
                                              DamIdCompanydatalist?.total_video
                                            }{" "}
                                          </>
                                        )}
                                        {index == 3 && (
                                          <>
                                            {" "}
                                            {
                                              DamIdCompanydatalist?.total_collection
                                            }{" "}
                                          </>
                                        )}
                                        {index == 4 && (
                                          <>
                                            {" "}
                                            {
                                              DamIdCompanydatalist?.total_folder
                                            }{" "}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </span>
                            </label>
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>
                  <div className="container my-4 mediaFileTypesChecks">
                    <form className="form w-100">
                      <h3>Company Filters</h3>
                      {companylistnull?.map((user, index) => (
                        <>
                          <div
                            className="form-check form_check_MarginL"
                            key={index}
                          >
                            {user?.name?.map((value, i) => (
                              <>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name={value}
                                  checked={companylistid?.some(
                                    (item) => item == user.id[0]
                                  )}
                                  onChange={(e) => {
                                    handlecollectionfilter(e, user.id[0]);
                                  }}
                                />
                                <label className="form-check-label ms-1 textDarkFileTypesData textDarkFileTypesDataSecondmedia">
                                  <span className="companyDataDynamic">
                                    {" "}
                                    {value}
                                  </span>
                                  <span className="countingDataDynamic">
                                    {user.count}
                                  </span>
                                </label>
                              </>
                            ))}
                          </div>
                        </>
                      ))}
                    </form>
                  </div>
                  {/* file Type end */}
                </div>
                <div
                  className="sliderleftsec newPositionToggle"
                  onContextMenu={handleContextMenu}
                >
                  <Menu
                    className="mediaRightClickCreateUpload"
                    open={contextMenu !== null}
                    onClose={handleContextMenuClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      contextMenu !== null
                        ? {
                          top: contextMenu.mouseY,
                          left: contextMenu.mouseX,
                        }
                        : undefined
                    }
                  >
                    <MenuItem onClick={handleCreateFolder}>
                      <img
                        className="createfolderLogoRC"
                        src="/img/createfolder.png"
                      />{" "}
                      Create a folder
                    </MenuItem>
                    <MenuItem
                      className="uploadfileLogoRclick"
                      onClick={handleClickOpenUpload}
                    >
                      <img src="/img/uploadfileRC.png" /> Upload a file
                    </MenuItem>
                    <MenuItem onClick={handleCreateCollection}>
                      <img
                        className="createCollectionLogoRC"
                        src="/img/createfolder.png"
                      />{" "}
                      Create a collection
                    </MenuItem>
                    <MenuItem>
                      <img
                        className="selectAllLogoRC"
                        src="/img/selectAll.png"
                      />
                      All Select
                    </MenuItem>
                  </Menu>
                  {count.length > 0 && (
                    <>
                      <Menu
                        className="rightClickCreateJobCollection-menu"
                        open={fileContextMenu !== null}
                        onClose={handleFileClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                          fileContextMenu !== null
                            ? {
                              top: fileContextMenu.mouseY,
                              left: fileContextMenu.mouseX,
                            }
                            : undefined
                        }
                      >
                        {!damjobshow && (
                          <>
                            <MenuItem onClick={createjobadd1}>
                              {" "}
                              <img src="/img/createjobrc.png" /> Create Job
                            </MenuItem>
                          </>
                        )}
                        {!damjobshow && (
                          <>
                            <MenuItem onClick={handleCreateCollection}>
                              {" "}
                              <img src="/img/createjobrc.png" />
                              Create Collection
                            </MenuItem>
                          </>
                        )}
                        <MenuItem onClick={favourite}>
                          {" "}
                          <img src="/img/favouriterc.png" /> {favouritevalue}
                        </MenuItem>
                        {/* {imagelink && (
                          <> */}{" "}
                        <MenuItem onClick={handleOpenShareMedia}>
                          {" "}
                          <img src="/img/sharelinkrc.png" /> {name}
                        </MenuItem>
                        {/* </>
                        )} */}
                        <MenuItem onClick={moveimages}>
                          {" "}
                          <img src="/img/movetorc.png" />
                          Move
                        </MenuItem>
                        <MenuItem onClick={copyFile}>
                          {" "}
                          <img src="/img/copytorc.png" /> Copy
                        </MenuItem>
                        {count.length > 0 ? (
                          <MenuItem onClick={handlefiledonwloadfun}>
                            {" "}
                            <img src="/img/detailsrc.png" />
                            Download
                          </MenuItem>
                        ) : (
                          <MenuItem onClick={downloadtheimagefun}>
                            {" "}
                            <img src="/img/detailsrc.png" />
                            Download
                          </MenuItem>
                        )}
                        <MenuItem onClick={duplicateFile}>
                          {" "}
                          <img src="/img/duplicaterc.png" /> Duplicate
                        </MenuItem>
                        <MenuItem onClick={deleteimage}>
                          {" "}
                          <img src="/img/deleterc.png" /> Delete
                        </MenuItem>
                      </Menu>
                    </>
                  )}

                  {count.length <= 0 && (
                    <>
                      <Menu
                        className="rightClickCreateJobCollection-menu"
                        open={fileContextMenu !== null}
                        onClose={handleFileClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                          fileContextMenu !== null
                            ? {
                              top: fileContextMenu.mouseY,
                              left: fileContextMenu.mouseX,
                            }
                            : undefined
                        }
                      >
                        {!damjobshow && (
                          <>
                            <MenuItem onClick={createjobadd1}>
                              {" "}
                              <img src="/img/createjobrc.png" /> Create Job
                            </MenuItem>
                          </>
                        )}
                        {!damjobshow && (
                          <>
                            <MenuItem onClick={handleCreateCollection}>
                              {" "}
                              <img src="/img/createjobrc.png" />
                              Create Collection
                            </MenuItem>
                          </>
                        )}
                        <MenuItem onClick={favourite}>
                          {" "}
                          <img src="/img/favouriterc.png" /> {favouritevalue}
                        </MenuItem>
                        {/* {imagelink && (
                          <> */}{" "}
                        <MenuItem onClick={handleOpenShareMedia}>
                          {" "}
                          <img src="/img/sharelinkrc.png" /> {name}
                        </MenuItem>
                        {/* </>
                        )} */}
                        <MenuItem onClick={imageinsidevalue}>
                          {" "}
                          <img src="/img/detailsrc.png" /> Details
                        </MenuItem>
                        <MenuItem onClick={sizeincrease}>
                          {" "}
                          <img src="/img/detailsrc.png" /> View
                        </MenuItem>
                        <MenuItem onClick={moveimages}>
                          {" "}
                          <img src="/img/movetorc.png" />
                          Move
                          {/* {count.length > 0 && <>Move All</>}
     {count.length <= 0 && <>Move </>} */}
                        </MenuItem>
                        <MenuItem onClick={copyFile}>
                          {" "}
                          <img src="/img/copytorc.png" /> Copy
                        </MenuItem>
                        {count.length > 0 ? (
                          <MenuItem onClick={handlefiledonwloadfun}>
                            {" "}
                            <img src="/img/detailsrc.png" />
                            Download
                          </MenuItem>
                        ) : (
                          <MenuItem onClick={downloadtheimagefun}>
                            {" "}
                            <img src="/img/detailsrc.png" />
                            Download
                          </MenuItem>
                        )}
                        <MenuItem onClick={duplicateFile}>
                          {" "}
                          <img src="/img/duplicaterc.png" /> Duplicate
                        </MenuItem>
                        <MenuItem onClick={deleteimage}>
                          {" "}
                          <img src="/img/deleterc.png" /> Delete
                        </MenuItem>
                      </Menu>
                    </>
                  )}

                  <Menu
                    className="rightClickCreateJobCollection-menu"
                    open={fileVideoContextMenu !== null}
                    onClose={handleFileCloseVideo}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      fileVideoContextMenu !== null
                        ? {
                          top: fileVideoContextMenu.mouseY,
                          left: fileVideoContextMenu.mouseX,
                        }
                        : undefined
                    }
                  >
                    {!damjobshow && (
                      <>
                        <MenuItem onClick={createjobadd1}>
                          {" "}
                          <img src="/img/createjobrc.png" /> Create Job
                        </MenuItem>
                      </>
                    )}
                    {!damjobshow && (
                      <>
                        <MenuItem onClick={handleCreateCollection}>
                          {" "}
                          <img src="/img/createjobrc.png" />
                          Create Collection
                        </MenuItem>
                      </>
                    )}
                    <MenuItem onClick={favourite}>
                      {" "}
                      <img src="/img/favouriterc.png" /> {favouritevalue}
                    </MenuItem>
                    {/* {imagelink && (
                      <> */}{" "}
                    <MenuItem onClick={handleOpenShareMedia}>
                      {" "}
                      <img src="/img/sharelinkrc.png" /> {name}
                    </MenuItem>
                    {/* </>
                    )} */}
                    <MenuItem onClick={moveimages}>
                      {" "}
                      <img src="/img/movetorc.png" />
                      Move
                    </MenuItem>
                    <MenuItem onClick={copyFile}>
                      {" "}
                      <img src="/img/copytorc.png" /> Copy
                    </MenuItem>
                    {count.length > 0 ? (
                      <MenuItem onClick={handlefiledonwloadfun}>
                        {" "}
                        <img src="/img/detailsrc.png" />
                        Download
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={downloadtheimagefun}>
                        {" "}
                        <img src="/img/detailsrc.png" />
                        Download
                      </MenuItem>
                    )}
                    <MenuItem onClick={duplicateFile}>
                      {" "}
                      <img src="/img/duplicaterc.png" /> Duplicate
                    </MenuItem>
                    <MenuItem onClick={deleteimage}>
                      {" "}
                      <img src="/img/deleterc.png" /> Delete
                    </MenuItem>
                  </Menu>

                  <Menu
                    className="mediaRightClickCreateUploadPortF additionnanme"
                    open={folderContextMenu !== null}
                    onClose={handleFolderClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      folderContextMenu !== null
                        ? {
                          top: folderContextMenu.mouseY,
                          left: folderContextMenu.mouseX,
                        }
                        : undefined
                    }
                  >
                    {/* <MenuItem onClick={countimages}>
                      {" "}
                      <img src="/img/movetorc.png" />
                      Select
                    </MenuItem> */}
                    <MenuItem onClick={deletefolder}>
                      {" "}
                      <img src="/img/deleterc.png" />
                      Delete
                    </MenuItem>
                    <MenuItem onClick={favouritefile}>
                      <img src="/img/favouriterc.png" /> {favouritefolder}
                    </MenuItem>
                    <MenuItem onClick={movefile}>
                      {" "}
                      <img src="/img/movetorc.png" /> Move
                    </MenuItem>
                    <MenuItem onClick={renamefile}>
                      {" "}
                      <img src="/img/movetorc.png" /> Rename
                    </MenuItem>
                    <MenuItem onClick={companyChangeFile}>
                      {" "}
                      <img src="/img/movetorc.png" />
                      Company
                    </MenuItem>
                  </Menu>

                  <Menu
                    className="mediaRightClickCreateUploadPortF newoneadd"
                    open={CollectionContextMenu !== null}
                    onClose={handleCollectionClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      CollectionContextMenu !== null
                        ? {
                          top: CollectionContextMenu.mouseY,
                          left: CollectionContextMenu.mouseX,
                        }
                        : undefined
                    }
                  >
                    <MenuItem onClick={deletefolder}>
                      {" "}
                      <img src="/img/deleterc.png" />
                      Delete
                    </MenuItem>
                    <MenuItem onClick={favouritecollection1}>
                      <img src="/img/favouriterc.png" /> {favouritecollection}
                    </MenuItem>
                    <MenuItem onClick={movecollectionimage}>
                      {" "}
                      <img src="/img/copytorc.png" /> Move
                    </MenuItem>
                    {/* <MenuItem onClick={imageinsidevalue}>
                                {" "}
                                <img src="/img/detailsrc.png" /> Details
                              </MenuItem> */}
                    <MenuItem onClick={copyFile}>
                      {" "}
                      <img src="/img/copytorc.png" /> Copy
                    </MenuItem>
                    {count.length > 0 ? (
                      <MenuItem onClick={handlefiledonwloadfun}>
                        {" "}
                        <img src="/img/detailsrc.png" />
                        Download
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={downloadtheimagefun}>
                        {" "}
                        <img src="/img/detailsrc.png" />
                        Download
                      </MenuItem>
                    )}
                    <MenuItem onClick={sizeincrease}>
                      {" "}
                      <img src="/img/detailsrc.png" /> View
                    </MenuItem>
                    {/* <MenuItem onClick={doublefunction}>
                                {" "}
                                <img src="/img/sharelinkrc.png" /> {name}
                              </MenuItem> */}
                    <MenuItem onClick={duplicateCollectionimage}>
                      {" "}
                      <img src="/img/duplicaterc.png" /> Duplicate
                    </MenuItem>
                  </Menu>
                  <div
                    className={
                      isDisplayDetails
                        ? "main_manger"
                        : "main_manger  main_mangerleft"
                    }
                  >
                    {/* {DamImageData && DamData1 && DamRootImages && DamPostCollectionData?.length < 0  && <>
  <h2>No Data Show</h2>
  </> } */}
                    <div className="vector_toggleNewUppers">
                      <img
                        onClick={handleClickShowMediaTable}
                        className="vector_img"
                        src="/img/mediaimagevector.png"
                      />
                      <span className="table-view-text"> List view</span>
                    </div>
                    <div className="manager_contnet_type AllDriveContent">
                      {hidefolder && (
                        <>
                          <div className="Sort_by_contentDam">
                            {DamImageData?.length > 0 && !searchfolder && (
                              <>
                                <h4 className="recent_contnetDam">Recent</h4>
                                <div className="switch_Agency switch_media">
                                  <div className="Observers_agency_job_add Observers_agency_job_add1 Observers_agency_job_add2">
                                    <label className="switch">
                                      {isfiles && (
                                        <>
                                          {" "}
                                          <input
                                            type="checkbox"
                                            checked={true}
                                            onClick={handleClickfiles}
                                          />
                                        </>
                                      )}
                                      {!isfiles && (
                                        <>
                                          {" "}
                                          <input
                                            type="checkbox"
                                            checked={false}
                                            onClick={handleClickfiles}
                                          />
                                        </>
                                      )}
                                      <span className="slider round"></span>
                                    </label>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}
                      {isfiles && hidefolder && !searchfolder && (
                        <>
                          <div className="folderImagesNewDFlex">
                            {/* {JSON.stringify(DamImageData?.slice(0.4))} */}
                            {DamImageData?.map((item) => (
                              <>
                                <div
                                  className={
                                    count.includes(item?.id) ||
                                      detailsid == item?.id
                                      ? "recent_pics1NewImages selected"
                                      : "recent_pics1NewImages "
                                  }
                                >
                                  <img
                                    className="selected_check_icon"
                                    src="/img/allok.png"
                                  />
                                  <div className="react_pics_contnetNewImages">
                                    {item?.is_video == false && (
                                      <>
                                        <img
                                          onContextMenu={(event) =>
                                            handleFileContextMenu(
                                              item?.root,
                                              item?.media,
                                              event,
                                              item?.dam,
                                              item?.upload_by,
                                              item?.created,
                                              item?.title,
                                              item?.description,
                                              item?.files_size,
                                              item?.id,
                                              item?.file_type,
                                              item?.limit_usage,
                                              item?.thumbnail,
                                              item?.skill,
                                              item?.usage,
                                              item?.company,
                                              item?.tags,
                                              item?.type
                                            )
                                          }
                                          onClick={() =>
                                            countimages(
                                              item?.id,
                                              item?.dam,
                                              item?.type,
                                              item?.media
                                            )
                                          }
                                          className="scene_contnetNew"
                                          src={item?.thumbnail}
                                        />
                                        {isOpenImg && (
                                          <ModalImg
                                            src={fullview}
                                            alt="recent images"
                                            onClose={() => setIsOpenImg(false)}
                                          />
                                        )}
                                      </>
                                    )}
                                    {item?.is_video == true && (
                                      <>
                                        <video
                                          className="videoSWithDamData"
                                          controls
                                          onClick={() =>
                                            countimages(
                                              item?.id,
                                              item?.dam,
                                              item?.type,
                                              item?.media
                                            )
                                          }
                                          onContextMenu={(event) =>
                                            handleFileVideoContextMenu(
                                              item?.root,
                                              item?.media,
                                              event,
                                              item?.dam,
                                              item?.upload_by,
                                              item?.created,
                                              item?.title,
                                              item?.description,
                                              item?.files_size,
                                              item?.id,
                                              item?.file_type,
                                              item?.limit_usage,
                                              item?.thumbnail,
                                              item?.skill,
                                              item?.usage,
                                              item?.company,
                                              item?.type
                                            )
                                          }
                                        >
                                          <source
                                            src={item?.thumbnail}
                                            type="video/mp4"
                                          />
                                        </video>
                                      </>
                                    )}

                                    {countfav?.includes(item?.dam) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst updaterecent updaterecentSetDes"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    {countfav?.includes(item?.id) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst updaterecent updaterecentSetDes"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    {/* {item?.is_favourite && (
                                          <>
                                            {" "}
                                            <img
                                              className="startimgst updaterecent"
                                              src="/img/startimg.png"
                                            />
                                          </>
                                        )} */}
                                    <div className="valuename">
                                      <p className="looking_title">
                                        {item?.title}
                                      </p>
                                      <span className="price_contnet11">
                                        <i className="fas fa-shopping-bag"></i>
                                        {item.job_count}
                                      </span>
                                    </div>
                                    {item.usage_limit_reached == true && (
                                      <>
                                        <h6>Limit Exceeded</h6>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      )}
                      {/* ; })} */}
                      {!hidefolder && !searchfolder && (
                        <>
                          <div className="mydriver">
                            <span onClick={rootfolder}>Media</span>
                            <div className="damFolderBackButton">
                              <img src="/img/angle-right-b.png" alt="" />
                            </div>
                          </div>
                          {/* {lastElemenetChk == parentid && <> i m ready</>} */}
                          {/* {JSON.stringify(localname)} */}
                          {localname?.map((element, key) => (
                            <div
                              className={
                                lastElemenetChk == localid[key]
                                  ? "damFolderNameBackButton last_elem"
                                  : "damFolderNameBackButton"
                              }
                              onClick={(event) =>
                                handleClick2(event, key + 1, element)
                              }
                              key={key}
                            >
                              <h3 className="myDrivehead"> {element}</h3>

                              <div className="damFolderBackButton">
                                <img src="/img/angle-right-b.png" alt="" />
                              </div>
                              <hr />
                            </div>
                          ))}
                        </>
                      )}

                      <div className="folder_conttent11">
                        <div className="folder_heading folder_headingmedia">
                          {hidefolder &&
                            RootDamData?.length > 0 &&
                            yourfilter &&
                            !searchfolder && (
                              <>
                                {" "}
                                <h4 className="files11_contnet">Folders</h4>
                              </>
                            )}
                          {hidefolder &&
                            DamCountDataid?.folders?.length > 0 &&
                            !yourfilter &&
                            !searchfolder && (
                              <>
                                {" "}
                                <h4 className="files11_contnet">Folders</h4>
                              </>
                            )}
                          {!hidefolder &&
                            DamData1?.length > 0 &&
                            yourfilter &&
                            !searchfolder && (
                              <>
                                {" "}
                                <h4 className="files11_contnet">Folders</h4>
                              </>
                            )}
                          {!hidefolder &&
                            DamParentFilter?.folders?.length > 0 &&
                            !yourfilter &&
                            !searchfolder && (
                              <>
                                {" "}
                                <h4 className="files11_contnet">Folders</h4>
                              </>
                            )}
                        </div>
                        <div className="foldermainDisplayDiv">
                          {hidefolder &&
                            !searchfolder &&
                            yourfilter &&
                            RootDamData?.map((item) => (
                              <>
                                <div className="folderDisplayNewInline">
                                  <div
                                    className="file_contnet11New"
                                    onClick={() =>
                                      foldernavigate(
                                        item.parent,
                                        item.is_parent,
                                        item.id,
                                        item.name
                                      )
                                    }
                                    // onClick={() =>
                                    //   countimages(item?.id, item?.dam)
                                    // }
                                    onContextMenu={(event) =>
                                      handleFolderContextMenu(
                                        event,
                                        item?.root,
                                        item.company_id,
                                        item.id,
                                        item.is_favourite,
                                        item?.dam,
                                        item?.name
                                      )
                                    }
                                  >
                                    <div className="cardNewC">
                                      <div className="folder_structure">
                                        <div className="foldericonimg">
                                          {/* {countfav?.includes(item?.dam) */}
                                          {countfav?.includes(item?.id) && (
                                            <>
                                              <img src="/img/mediastarbox.png" />
                                            </>
                                          )}
                                          {!countfav?.includes(item?.id) && (
                                            <>
                                              <img src="/img/foldericon.png" />
                                            </>
                                          )}
                                        </div>
                                        {/* <Link to={`/media/${item.id}`}> */}
                                        <p>{item?.name}</p>
                                        {/* </Link> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}

                          {searchfolder &&
                            DamSearchnew?.map((item) => (
                              <>
                                {item?.type == 1 && (
                                  <>
                                    <div className="folderDisplayNewInline">
                                      <div
                                        className="file_contnet11New"
                                        onClick={() =>
                                          foldernavigate(
                                            item.parent,
                                            item.is_parent,
                                            item.id,
                                            item.name
                                          )
                                        }
                                        // onClick={() =>
                                        //   countimages(item?.id, item?.dam)
                                        // }
                                        onContextMenu={(event) =>
                                          handleFolderContextMenu(
                                            event,
                                            item?.root,
                                            item.company_id,
                                            item.id,
                                            item.is_favourite,
                                            item?.dam,
                                            item?.name
                                          )
                                        }
                                      >
                                        <div className="cardNewC">
                                          <div className="folder_structure">
                                            <div className="foldericonimg">
                                              {countfav?.includes(item?.id) && (
                                                <>
                                                  <img src="/img/mediastarbox.png" />
                                                </>
                                              )}
                                              {!countfav?.includes(
                                                item?.id
                                              ) && (
                                                  <>
                                                    <img src="/img/foldericon.png" />
                                                  </>
                                                )}
                                            </div>
                                            {/* <Link to={`/media/${item.id}`}> */}
                                            <p>{item?.name}</p>
                                            {/* </Link> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ))}
                        </div>
                        {!hidefolder && !searchfolder && yourfilter && (
                          <>
                            <div className="foldermainDisplayDiv">
                              {DamData1?.map((item) => (
                                <div className="folderDisplayNewInline">
                                  <div
                                    className="file_contnet11New"
                                    onClick={() =>
                                      foldernavigate(
                                        item.parent,
                                        item.is_parent,
                                        item.id,
                                        item.name
                                      )
                                    }
                                    // onClick={() =>
                                    //   countimages(item?.id, item?.dam)
                                    // }
                                    onContextMenu={(event) =>
                                      handleFolderContextMenu(
                                        event,
                                        item?.root,
                                        item.company_id,
                                        item.id,
                                        item.is_favourite,
                                        item.dam,
                                        item?.name
                                      )
                                    }
                                  >
                                    <div className="cardNewC">
                                      <div className="folder_structure">
                                        <div className="foldericonimg">
                                          {countfav?.includes(item?.id) && (
                                            <>
                                              <img src="/img/mediastarbox.png" />
                                            </>
                                          )}
                                          {!countfav?.includes(item?.id) && (
                                            <>
                                              <img src="/img/foldericon.png" />
                                            </>
                                          )}
                                        </div>
                                        {/* <Link to={`/media/${item.id}`}> */}
                                        <p>{item?.name}</p>
                                        {/* </Link> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        {hidefolder &&
                          !searchfolder &&
                          !yourfilter &&
                          DamCountDataid?.folders?.map((item) => (
                            <>
                              <div className="folderDisplayNewInline">
                                <div
                                  className="file_contnet11New"
                                  onClick={() =>
                                    foldernavigate(
                                      item.parent,
                                      item.is_parent,
                                      item.id,
                                      item.name
                                    )
                                  }
                                  // onClick={() =>
                                  //   countimages(item?.id, item?.dam)
                                  // }
                                  onContextMenu={(event) =>
                                    handleFolderContextMenu(
                                      event,
                                      item?.root,
                                      item.company_id,
                                      item.id,
                                      item.is_favourite,
                                      item?.dam,
                                      item?.name
                                    )
                                  }
                                >
                                  <div className="cardNewC">
                                    <div className="folder_structure">
                                      <div className="foldericonimg">
                                        {/* {countfav?.includes(item?.dam) */}
                                        {countfav?.includes(item?.id) && (
                                          <>
                                            <img src="/img/mediastarbox.png" />
                                          </>
                                        )}
                                        {!countfav?.includes(item?.id) && (
                                          <>
                                            <img src="/img/foldericon.png" />
                                          </>
                                        )}
                                      </div>
                                      {/* <Link to={`/media/${item.id}`}> */}
                                      <p>{item?.name}</p>
                                      {/* </Link> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}

                        {!hidefolder &&
                          !searchfolder &&
                          !yourfilter &&
                          DamParentFilter?.folders?.map((item) => (
                            <>
                              <div className="folderDisplayNewInline">
                                <div
                                  className="file_contnet11New"
                                  onClick={() =>
                                    foldernavigate(
                                      item.parent,
                                      item.is_parent,
                                      item.id,
                                      item.name
                                    )
                                  }
                                  // onClick={() =>
                                  //   countimages(item?.id, item?.dam)
                                  // }
                                  onContextMenu={(event) =>
                                    handleFolderContextMenu(
                                      event,
                                      item?.root,
                                      item.company_id,
                                      item.id,
                                      item.is_favourite,
                                      item?.dam,
                                      item?.name
                                    )
                                  }
                                >
                                  <div className="cardNewC">
                                    <div className="folder_structure">
                                      <div className="foldericonimg">
                                        {/* {countfav?.includes(item?.dam) */}
                                        {countfav?.includes(item?.id) && (
                                          <>
                                            <img src="/img/mediastarbox.png" />
                                          </>
                                        )}
                                        {!countfav?.includes(item?.id) && (
                                          <>
                                            <img src="/img/foldericon.png" />
                                          </>
                                        )}
                                      </div>
                                      {/* <Link to={`/media/${item.id}`}> */}
                                      <p>{item?.name}</p>
                                      {/* </Link> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                      </div>

                      <div className="folder_heading headingnewtitle">
                        {hidefolder &&
                          DamRootImages?.length > 0 &&
                          !searchfolder && (
                            <>
                              {" "}
                              <h4 className="files11_contnet  files11_contnetM">
                                Files
                              </h4>
                            </>
                          )}
                        {!hidefolder &&
                          DamDataImages?.length > 0 &&
                          !searchfolder && (
                            <>
                              {" "}
                              <h4 className="files11_contnet files11_contnetM">
                                Files
                              </h4>
                            </>
                          )}
                      </div>

                      {hidefolder && !searchfolder && !yourfilter && (
                        <>
                          <div className="folderImagesNewDFlex">
                            {DamCountDataid?.photos?.length > 0 && (
                              <>
                                {DamCountDataid?.photos?.map((item) => (
                                  <>
                                    <>
                                      {item?.dam_media.map((value) => (
                                        <>
                                          <div
                                            className={
                                              count.includes(value?.id) ||
                                                detailsid == value?.id
                                                ? "recent_pics1NewImages selected"
                                                : "recent_pics1NewImages "
                                            }
                                          >
                                            <img
                                              className="selected_check_icon"
                                              src="/img/allok.png"
                                            />
                                            <div className="react_pics_contnetNewImages">
                                              {value?.is_video == false && (
                                                <>
                                                  <img
                                                    onContextMenu={(event) =>
                                                      handleFileContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    className="scene_contnetNew"
                                                    src={value?.thumbnail}
                                                  />
                                                  {isOpenImg && (
                                                    <ModalImg
                                                      src={fullview}
                                                      alt="recent images"
                                                      onClose={() =>
                                                        setIsOpenImg(false)
                                                      }
                                                    />
                                                  )}
                                                </>
                                              )}{" "}
                                              {value?.is_video == true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    onContextMenu={(event) =>
                                                      handleFileVideoContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                  >
                                                    <source
                                                      src={value?.thumbnail}
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img
                                                      className="startimgst updaterecent updaterecentSetDes"
                                                      src="/img/startimg.png"
                                                    />
                                                  </>
                                                )}
                                              <div className="valuename">
                                                <p className="looking_title">
                                                  {value?.title}
                                                </p>
                                                <span className="price_contnet11">
                                                  <i className="fas fa-shopping-bag"></i>
                                                  {value?.job_count}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  </>
                                ))}
                              </>
                            )}

                            {DamCountDataid?.is_favourite?.length > 0 && (
                              <>
                                {DamCountDataid?.is_favourite?.map((item) => (
                                  <>
                                    <>
                                      {item?.dam_media.map((value) => (
                                        <>
                                          <div
                                            className={
                                              count.includes(value?.id) ||
                                                detailsid == value?.id
                                                ? "recent_pics1NewImages selected"
                                                : "recent_pics1NewImages "
                                            }
                                          >
                                            <img
                                              className="selected_check_icon"
                                              src="/img/allok.png"
                                            />
                                            <div className="react_pics_contnetNewImages">
                                              {value?.is_video == false && (
                                                <>
                                                  <img
                                                    onContextMenu={(event) =>
                                                      handleFileContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    className="scene_contnetNew"
                                                    src={value?.thumbnail}
                                                  />
                                                  {isOpenImg && (
                                                    <ModalImg
                                                      src={fullview}
                                                      alt="recent images"
                                                      onClose={() =>
                                                        setIsOpenImg(false)
                                                      }
                                                    />
                                                  )}
                                                </>
                                              )}{" "}
                                              {value?.is_video == true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    onContextMenu={(event) =>
                                                      handleFileVideoContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                  >
                                                    <source
                                                      src={value?.thumbnail}
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img
                                                      className="startimgst updaterecent updaterecentSetDes"
                                                      src="/img/startimg.png"
                                                    />
                                                  </>
                                                )}
                                              <div className="valuename">
                                                <p className="looking_title">
                                                  {value?.title}
                                                </p>
                                                <span className="price_contnet11">
                                                  <i className="fas fa-shopping-bag"></i>
                                                  {value?.job_count}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  </>
                                ))}
                              </>
                            )}

                            {DamCountDataid?.videos?.length > 0 && (
                              <>
                                {DamCountDataid?.videos?.map((item) => (
                                  <>
                                    <>
                                      {item?.dam_media.map((value) => (
                                        <>
                                          <div
                                            className={
                                              count.includes(value?.id) ||
                                                detailsid == value?.id
                                                ? "recent_pics1NewImages selected"
                                                : "recent_pics1NewImages "
                                            }
                                            onContextMenu={(event) =>
                                              handleFileVideoContextMenu(
                                                value?.root,
                                                value?.media,
                                                event,
                                                value?.dam,
                                                value?.upload_by,
                                                value?.created,
                                                value?.title,
                                                value?.description,
                                                value?.files_size,
                                                value?.id,
                                                value?.file_type,
                                                value?.limit_usage,
                                                value?.thumbnail,
                                                value?.skill,
                                                value?.usage,
                                                value?.company
                                              )
                                            }
                                          >
                                            <img
                                              className="selected_check_icon"
                                              src="/img/allok.png"
                                            />
                                            <div className="react_pics_contnetNewImages">
                                              <video
                                                className="videoSWithDamData"
                                                controls
                                              >
                                                <source
                                                  src={value?.thumbnail}
                                                  type="video/mp4"
                                                />
                                              </video>
                                              <div className="valuename">
                                                <p className="looking_title">
                                                  {value?.title}
                                                </p>
                                                <span className="price_contnet11">
                                                  <i className="fas fa-shopping-bag"></i>
                                                  {value?.job_count}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  </>
                                ))}
                              </>
                            )}
                          </div>
                        </>
                      )}

                      {!hidefolder && !searchfolder && !yourfilter && (
                        <>
                          <div className="folderImagesNewDFlex">
                            {DamParentFilter?.is_favourite?.length > 0 && (
                              <>
                                {DamParentFilter?.is_favourite?.map((item) => (
                                  <>
                                    <>
                                      {item?.dam_media.map((value) => (
                                        <>
                                          <div
                                            className={
                                              count.includes(value?.id) ||
                                                detailsid == value?.id
                                                ? "recent_pics1NewImages selected"
                                                : "recent_pics1NewImages "
                                            }
                                          >
                                            <img
                                              className="selected_check_icon"
                                              src="/img/allok.png"
                                            />
                                            <div className="react_pics_contnetNewImages">
                                              {value?.is_video == false && (
                                                <>
                                                  <img
                                                    onContextMenu={(event) =>
                                                      handleFileContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    className="scene_contnetNew"
                                                    src={value?.thumbnail}
                                                  />
                                                  {isOpenImg && (
                                                    <ModalImg
                                                      src={fullview}
                                                      alt="recent images"
                                                      onClose={() =>
                                                        setIsOpenImg(false)
                                                      }
                                                    />
                                                  )}
                                                </>
                                              )}{" "}
                                              {value?.is_video == true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    onContextMenu={(event) =>
                                                      handleFileVideoContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                  >
                                                    <source
                                                      src={value?.thumbnail}
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img
                                                      className="startimgst updaterecent updaterecentSetDes"
                                                      src="/img/startimg.png"
                                                    />
                                                  </>
                                                )}
                                              <div className="valuename">
                                                <p className="looking_title">
                                                  {value?.title}
                                                </p>
                                                <span className="price_contnet11">
                                                  <i className="fas fa-shopping-bag"></i>
                                                  {value?.job_count}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  </>
                                ))}
                              </>
                            )}

                            {DamParentFilter?.photos?.length > 0 && (
                              <>
                                {DamParentFilter?.photos?.map((item) => (
                                  <>
                                    <>
                                      {item?.dam_media.map((value) => (
                                        <>
                                          <div
                                            className={
                                              count.includes(value?.id) ||
                                                detailsid == value?.id
                                                ? "recent_pics1NewImages selected"
                                                : "recent_pics1NewImages "
                                            }
                                          >
                                            <img
                                              className="selected_check_icon"
                                              src="/img/allok.png"
                                            />
                                            <div className="react_pics_contnetNewImages">
                                              {value?.is_video == false && (
                                                <>
                                                  <img
                                                    onContextMenu={(event) =>
                                                      handleFileContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    className="scene_contnetNew"
                                                    src={value?.thumbnail}
                                                  />
                                                  {isOpenImg && (
                                                    <ModalImg
                                                      src={fullview}
                                                      alt="recent images"
                                                      onClose={() =>
                                                        setIsOpenImg(false)
                                                      }
                                                    />
                                                  )}
                                                </>
                                              )}{" "}
                                              {value?.is_video == true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                    onClick={() =>
                                                      countimages(
                                                        value?.id,
                                                        value?.dam,
                                                        value?.type,
                                                        value?.media
                                                      )
                                                    }
                                                    onContextMenu={(event) =>
                                                      handleFileVideoContextMenu(
                                                        value?.root,
                                                        value?.media,
                                                        event,
                                                        value?.dam,
                                                        value?.upload_by,
                                                        value?.created,
                                                        value?.title,
                                                        value?.description,
                                                        value?.files_size,
                                                        value?.id,
                                                        value?.file_type,
                                                        value?.limit_usage,
                                                        value?.thumbnail,
                                                        value?.skill,
                                                        value?.usage,
                                                        value?.company
                                                      )
                                                    }
                                                  >
                                                    <source
                                                      src={value?.thumbnail}
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img
                                                      className="startimgst updaterecent updaterecentSetDes"
                                                      src="/img/startimg.png"
                                                    />
                                                  </>
                                                )}
                                              <div className="valuename">
                                                <p className="looking_title">
                                                  {value?.title}
                                                </p>
                                                <span className="price_contnet11">
                                                  <i className="fas fa-shopping-bag"></i>
                                                  {value?.job_count}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  </>
                                ))}
                              </>
                            )}

                            {DamParentFilter?.videos?.length > 0 && (
                              <>
                                {DamParentFilter?.videos?.map((item) => (
                                  <>
                                    <>
                                      {item?.dam_media.map((value) => (
                                        <>
                                          <div
                                            className={
                                              count.includes(value?.id) ||
                                                detailsid == value?.id
                                                ? "recent_pics1NewImages selected"
                                                : "recent_pics1NewImages "
                                            }
                                            onContextMenu={(event) =>
                                              handleFileVideoContextMenu(
                                                value?.root,
                                                value?.media,
                                                event,
                                                value?.dam,
                                                value?.upload_by,
                                                value?.created,
                                                value?.title,
                                                value?.description,
                                                value?.files_size,
                                                value?.id,
                                                value?.file_type,
                                                value?.limit_usage,
                                                value?.thumbnail,
                                                value?.skill,
                                                value?.usage,
                                                value?.company
                                              )
                                            }
                                          >
                                            <img
                                              className="selected_check_icon"
                                              src="/img/allok.png"
                                            />
                                            <div className="react_pics_contnetNewImages">
                                              <video
                                                className="videoSWithDamData"
                                                controls
                                              >
                                                <source
                                                  src={value?.thumbnail}
                                                  type="video/mp4"
                                                />
                                              </video>
                                              <div className="valuename">
                                                <p className="looking_title">
                                                  {value?.title}
                                                </p>
                                                <span className="price_contnet11">
                                                  <i className="fas fa-shopping-bag"></i>
                                                  {value?.job_count}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                    </>
                                  </>
                                ))}
                              </>
                            )}
                          </div>
                        </>
                      )}

                      {hidefolder &&
                        !searchfolder &&
                        hidecheck &&
                        yourfilter && (
                          <>
                            <div className="folderImagesNewDFlex">
                              {DamRootImages?.map((item) => (
                                <>
                                  {item?.dam_media.map((value) => (
                                    <>
                                      <div
                                        className={
                                          count.includes(value?.id) ||
                                            detailsid == value?.id
                                            ? "recent_pics1NewImages selected"
                                            : "recent_pics1NewImages "
                                        }
                                      >
                                        <img
                                          className="selected_check_icon"
                                          src="/img/allok.png"
                                        />
                                        <div className="react_pics_contnetNewImages">
                                          {value?.is_video == false && (
                                            <>
                                              <img
                                                // onClick={() =>
                                                //   imageinsidevalue(
                                                //     value?.upload_by,
                                                //     value?.created,
                                                //     value?.files_name,
                                                //     value?.files_size
                                                //   )
                                                // }
                                                onContextMenu={(event) =>
                                                  handleFileContextMenu(
                                                    value?.root,
                                                    value?.media,
                                                    event,
                                                    value?.dam,
                                                    value?.upload_by,
                                                    value?.created,
                                                    value?.title,
                                                    value?.description,
                                                    value?.files_size,
                                                    value?.id,
                                                    value?.file_type,
                                                    value?.limit_usage,
                                                    value?.thumbnail,
                                                    value?.skill,
                                                    value?.usage,
                                                    value?.company
                                                  )
                                                }
                                                onClick={() =>
                                                  countimages(
                                                    value?.id,
                                                    value?.dam,
                                                    value?.type,
                                                    value?.media
                                                  )
                                                }
                                                className="scene_contnetNew"
                                                src={value?.thumbnail}
                                              />
                                              {isOpenImg && (
                                                <ModalImg
                                                  src={fullview}
                                                  alt="recent images"
                                                  onClose={() =>
                                                    setIsOpenImg(false)
                                                  }
                                                />
                                              )}
                                            </>
                                          )}
                                          {value?.is_video == true && (
                                            <>
                                              <video
                                                className="videoSWithDamData"
                                                controls
                                                onClick={() =>
                                                  countimages(
                                                    value?.id,
                                                    value?.dam,
                                                    value?.type,
                                                    value?.media
                                                  )
                                                }
                                                onContextMenu={(event) =>
                                                  handleFileVideoContextMenu(
                                                    value?.root,
                                                    value?.media,
                                                    event,
                                                    value?.dam,
                                                    value?.upload_by,
                                                    value?.created,
                                                    value?.title,
                                                    value?.description,
                                                    value?.files_size,
                                                    value?.id,
                                                    value?.file_type,
                                                    value?.limit_usage,
                                                    value?.thumbnail,
                                                    value?.skill,
                                                    value?.usage,
                                                    value?.company
                                                  )
                                                }
                                              >
                                                <source
                                                  src={value?.thumbnail}
                                                  type="video/mp4"
                                                />
                                              </video>
                                            </>
                                          )}
                                          {countfav?.includes(value?.dam) && (
                                            <>
                                              {" "}
                                              <img
                                                className="startimgst updaterecent updaterecentSetDes"
                                                src="/img/startimg.png"
                                              />
                                            </>
                                          )}

                                          <div className="valuename">
                                            <p className="looking_title">
                                              {value?.title}
                                            </p>
                                            <span className="price_contnet11">
                                              <i className="fas fa-shopping-bag"></i>
                                              {value?.job_count}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </>
                              ))}
                            </div>
                          </>
                        )}

                      {hidefolder &&
                        !searchfolder &&
                        hidecheck &&
                        yourfilter && (
                          <>
                            <div className="folder_heading Collectionstitlemedia">
                              {hidefolder &&
                                DamPostCollectionData?.length > 0 &&
                                !searchfolder && (
                                  <>
                                    {" "}
                                    <h4 className="files11_contnet">
                                      Collections
                                    </h4>
                                  </>
                                )}
                            </div>

                            <div className="folderImagesNewDFlex1">
                              {/* {JSON.stringify(DamPostCollectionData)} */}
                              {DamPostCollectionData?.map((item) => (
                                <>
                                  <div className="collectionnameimgdiv ">
                                    <div
                                      className="mideaimgsecc"
                                      onClick={() =>
                                        Collectiondatashow(item?.id)
                                      }
                                      onContextMenu={(event) =>
                                        handleFolderContextMenu(
                                          event,
                                          item?.root,
                                          item.company_id,
                                          item.id,
                                          item.is_favourite,
                                          item.dam,
                                          item?.name,
                                          item?.type
                                        )
                                      }
                                    >
                                      <li>
                                        <div className="collectionimageupload">
                                          {item?.dam_media[0]?.is_video ==
                                            false && (
                                              <>
                                                <img
                                                  src={
                                                    item?.dam_media[0]?.thumbnail
                                                  }
                                                />
                                              </>
                                            )}
                                          {item?.dam_media[0]?.is_video ==
                                            true && (
                                              <>
                                                <video
                                                  className="videoSWithDamData"
                                                  controls
                                                >
                                                  <source
                                                    src={
                                                      item?.dam_media[0].thumbnail
                                                    }
                                                    type="video/mp4"
                                                  />
                                                </video>
                                              </>
                                            )}
                                        </div>
                                      </li>

                                      {item.dam_media.length < 1 && (
                                        <li>
                                          {" "}
                                          <div className="collectionimageupload">
                                            <img
                                              // onClick={() => Collectiondatashow(item.id)}
                                              src="/img/dummy_collection.jpg"
                                            />
                                          </div>
                                        </li>
                                      )}

                                      {item.dam_media.length > 1 && (
                                        <li>
                                          {" "}
                                          <div className="collectionimageupload">
                                            {item?.dam_media[1]?.is_video ==
                                              false && (
                                                <>
                                                  <img
                                                    src={
                                                      item?.dam_media[1]
                                                        ?.thumbnail
                                                    }
                                                  />
                                                </>
                                              )}
                                            {item?.dam_media[1]?.is_video ==
                                              true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                  >
                                                    <source
                                                      src={
                                                        item?.dam_media[1]
                                                          .thumbnail
                                                      }
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                          </div>
                                        </li>
                                      )}

                                      {item.dam_media.length > 2 && (
                                        <>
                                          <li>
                                            <div className="collectionimageupload">
                                              {item?.dam_media[2]?.is_video ==
                                                false && (
                                                  <>
                                                    <img
                                                      src={
                                                        item?.dam_media[2]
                                                          ?.thumbnail
                                                      }
                                                    />
                                                  </>
                                                )}
                                              {item?.dam_media[2]?.is_video ==
                                                true && (
                                                  <>
                                                    <video
                                                      className="videoSWithDamData"
                                                      controls
                                                    >
                                                      <source
                                                        src={
                                                          item?.dam_media[2]
                                                            .thumbnail
                                                        }
                                                        type="video/mp4"
                                                      />
                                                    </video>
                                                  </>
                                                )}
                                            </div>
                                          </li>
                                        </>
                                      )}
                                    </div>

                                    {countfav?.includes(item?.id) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst2 startimgst2SetBottom"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectionname">
                                      <p className="looking_contnet">
                                        {item?.name}
                                      </p>
                                      {/* <span className="price_contnetmediasec">
                                        <i className="fas fa-shopping-bag"></i>
                                        {item?.dam_media.length}
                                      </span> */}
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        )}

                      {hidefolder && !searchfolder && !yourfilter && (
                        <>
                          <div className="folder_heading Collectionstitlemedia">
                            {hidefolder &&
                              DamCountDataid?.collections?.length > 0 &&
                              !searchfolder &&
                              !yourfilter && (
                                <>
                                  {" "}
                                  <h4 className="files11_contnet">
                                    Collections
                                  </h4>
                                </>
                              )}
                          </div>

                          <div className="folderImagesNewDFlex1">
                            {/* {JSON.stringify(DamPostCollectionData)} */}
                            {DamCountDataid?.collections?.map((item) => (
                              <>
                                <>
                                  <div className="collectionnameimgdiv ">
                                    <div
                                      className="mideaimgsecc"
                                      onClick={() =>
                                        Collectiondatashow(item?.id)
                                      }
                                      onContextMenu={(event) =>
                                        handleFolderContextMenu(
                                          event,
                                          item?.root,
                                          item.company_id,
                                          item.id,
                                          item.is_favourite,
                                          item.dam,
                                          item?.name,
                                          item?.type
                                        )
                                      }
                                    >
                                      <li>
                                        <div className="collectionimageupload">
                                          {item?.dam_media[0]?.is_video ==
                                            false && (
                                              <>
                                                <img
                                                  src={
                                                    item?.dam_media[0]?.thumbnail
                                                  }
                                                />
                                              </>
                                            )}
                                          {item?.dam_media[0]?.is_video ==
                                            true && (
                                              <>
                                                <video
                                                  className="videoSWithDamData"
                                                  controls
                                                >
                                                  <source
                                                    src={
                                                      item?.dam_media[0].thumbnail
                                                    }
                                                    type="video/mp4"
                                                  />
                                                </video>
                                              </>
                                            )}
                                        </div>
                                      </li>

                                      {item.dam_media.length < 1 && (
                                        <li>
                                          {" "}
                                          <div className="collectionimageupload">
                                            <img
                                              // onClick={() => Collectiondatashow(item.id)}
                                              src="/img/dummy_collection.jpg"
                                            />
                                          </div>
                                        </li>
                                      )}

                                      {item.dam_media.length > 1 && (
                                        <li>
                                          {" "}
                                          <div className="collectionimageupload">
                                            {item?.dam_media[1]?.is_video ==
                                              false && (
                                                <>
                                                  <img
                                                    src={
                                                      item?.dam_media[1]
                                                        ?.thumbnail
                                                    }
                                                  />
                                                </>
                                              )}
                                            {item?.dam_media[1]?.is_video ==
                                              true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                  >
                                                    <source
                                                      src={
                                                        item?.dam_media[1]
                                                          .thumbnail
                                                      }
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                          </div>
                                        </li>
                                      )}

                                      {item.dam_media.length > 2 && (
                                        <>
                                          <li>
                                            <div className="collectionimageupload">
                                              {item?.dam_media[2]?.is_video ==
                                                false && (
                                                  <>
                                                    <img
                                                      src={
                                                        item?.dam_media[2]
                                                          ?.thumbnail
                                                      }
                                                    />
                                                  </>
                                                )}
                                              {item?.dam_media[2]?.is_video ==
                                                true && (
                                                  <>
                                                    <video
                                                      className="videoSWithDamData"
                                                      controls
                                                    >
                                                      <source
                                                        src={
                                                          item?.dam_media[2]
                                                            .thumbnail
                                                        }
                                                        type="video/mp4"
                                                      />
                                                    </video>
                                                  </>
                                                )}
                                            </div>
                                          </li>
                                        </>
                                      )}
                                    </div>

                                    {item?.is_favourite && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst2 startimgst2SetBottom"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectionname">
                                      <p className="looking_contnet">
                                        {item?.name}
                                      </p>
                                      {/* <span className="price_contnetmediasec">
                                        <i className="fas fa-shopping-bag"></i>
                                        {item?.dam_media.length}
                                      </span> */}
                                    </div>
                                  </div>
                                </>
                              </>
                            ))}
                          </div>
                        </>
                      )}

                      {!hidefolder && !searchfolder && !yourfilter && (
                        <>
                          <div className="folder_heading Collectionstitlemedia">
                            {!hidefolder &&
                              DamParentFilter?.collections?.length > 0 &&
                              !searchfolder &&
                              !yourfilter && (
                                <>
                                  {" "}
                                  <h4 className="files11_contnet">
                                    Collections
                                  </h4>
                                </>
                              )}
                          </div>

                          <div className="folderImagesNewDFlex1">
                            {/* {JSON.stringify(DamPostCollectionData)} */}
                            {DamParentFilter?.collections?.map((item) => (
                              <>
                                <>
                                  <div className="collectionnameimgdiv ">
                                    <div
                                      className="mideaimgsecc"
                                      onClick={() =>
                                        Collectiondatashow(item?.id)
                                      }
                                      onContextMenu={(event) =>
                                        handleFolderContextMenu(
                                          event,
                                          item?.root,
                                          item.company_id,
                                          item.id,
                                          item.is_favourite,
                                          item.dam,
                                          item?.name,
                                          item?.type
                                        )
                                      }
                                    >
                                      <li>
                                        <div className="collectionimageupload">
                                          {item?.dam_media[0]?.is_video ==
                                            false && (
                                              <>
                                                <img
                                                  src={
                                                    item?.dam_media[0]?.thumbnail
                                                  }
                                                />
                                              </>
                                            )}
                                          {item?.dam_media[0]?.is_video ==
                                            true && (
                                              <>
                                                <video
                                                  className="videoSWithDamData"
                                                  controls
                                                >
                                                  <source
                                                    src={
                                                      item?.dam_media[0].thumbnail
                                                    }
                                                    type="video/mp4"
                                                  />
                                                </video>
                                              </>
                                            )}
                                        </div>
                                      </li>

                                      {item.dam_media.length < 1 && (
                                        <li>
                                          {" "}
                                          <div className="collectionimageupload">
                                            <img
                                              // onClick={() => Collectiondatashow(item.id)}
                                              src="/img/dummy_collection.jpg"
                                            />
                                          </div>
                                        </li>
                                      )}

                                      {item.dam_media.length > 1 && (
                                        <li>
                                          {" "}
                                          <div className="collectionimageupload">
                                            {item?.dam_media[1]?.is_video ==
                                              false && (
                                                <>
                                                  <img
                                                    src={
                                                      item?.dam_media[1]
                                                        ?.thumbnail
                                                    }
                                                  />
                                                </>
                                              )}
                                            {item?.dam_media[1]?.is_video ==
                                              true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                  >
                                                    <source
                                                      src={
                                                        item?.dam_media[1]
                                                          .thumbnail
                                                      }
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                          </div>
                                        </li>
                                      )}

                                      {item.dam_media.length > 2 && (
                                        <>
                                          <li>
                                            <div className="collectionimageupload">
                                              {item?.dam_media[2]?.is_video ==
                                                false && (
                                                  <>
                                                    <img
                                                      src={
                                                        item?.dam_media[2]
                                                          ?.thumbnail
                                                      }
                                                    />
                                                  </>
                                                )}
                                              {item?.dam_media[2]?.is_video ==
                                                true && (
                                                  <>
                                                    <video
                                                      className="videoSWithDamData"
                                                      controls
                                                    >
                                                      <source
                                                        src={
                                                          item?.dam_media[2]
                                                            .thumbnail
                                                        }
                                                        type="video/mp4"
                                                      />
                                                    </video>
                                                  </>
                                                )}
                                            </div>
                                          </li>
                                        </>
                                      )}
                                    </div>

                                    {item?.is_favourite && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst2 startimgst2SetBottom"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectionname">
                                      <p className="looking_contnet">
                                        {item?.name}
                                      </p>
                                      {/* <span className="price_contnetmediasec">
                                        <i className="fas fa-shopping-bag"></i>
                                        {item?.dam_media.length}
                                      </span> */}
                                    </div>
                                  </div>
                                </>
                              </>
                            ))}
                          </div>
                        </>
                      )}

                      {searchfolder && (
                        <>
                          <div className="folderImagesNewDFlex">
                            {DamSearch1?.map((item) => (
                              <>
                                <>
                                  <div
                                    className={
                                      count.includes(item?.id) ||
                                        detailsid == item?.id
                                        ? "recent_pics1NewImages selected"
                                        : "recent_pics1NewImages "
                                    }
                                  >
                                    <img
                                      className="selected_check_icon"
                                      src="/img/allok.png"
                                    />
                                    <div className="react_pics_contnetNewImages">
                                      {item?.is_video == false && (
                                        <>
                                          <img
                                            // onClick={() =>
                                            //   imageinsidevalue(
                                            //     value?.upload_by,
                                            //     value?.created,
                                            //     value?.files_name,
                                            //     value?.files_size
                                            //   )
                                            // }
                                            onContextMenu={(event) =>
                                              handleFileContextMenu(
                                                item?.root,
                                                item?.media,
                                                event,
                                                item?.dam,
                                                item?.upload_by,
                                                item?.created,
                                                item?.title,
                                                item?.description,
                                                item?.files_size,
                                                item?.id,
                                                item?.file_type,
                                                item?.limit_usage,
                                                item?.thumbnail,
                                                item?.skill,
                                                item?.usage,
                                                item?.company
                                              )
                                            }
                                            onClick={() =>
                                              countimages(
                                                item?.id,
                                                item?.dam,
                                                item?.type,
                                                item?.media
                                              )
                                            }
                                            className="scene_contnetNew"
                                            src={item?.thumbnail}
                                          />
                                          {isOpenImg && (
                                            <ModalImg
                                              src={fullview}
                                              alt="recent images"
                                              onClose={() =>
                                                setIsOpenImg(false)
                                              }
                                            />
                                          )}
                                        </>
                                      )}
                                      {item?.is_video == true && (
                                        <>
                                          <video
                                            className="videoSWithDamData"
                                            controls
                                            onClick={() =>
                                              countimages(
                                                item?.id,
                                                item?.dam,
                                                item?.type,
                                                item?.media
                                              )
                                            }
                                            onContextMenu={(event) =>
                                              handleFileVideoContextMenu(
                                                item?.root,
                                                item?.media,
                                                event,
                                                item?.dam,
                                                item?.upload_by,
                                                item?.created,
                                                item?.title,
                                                item?.description,
                                                item?.files_size,
                                                item?.id,
                                                item?.file_type,
                                                item?.limit_usage,
                                                item?.thumbnail,
                                                item?.skill,
                                                item?.usage,
                                                item?.company
                                              )
                                            }
                                          >
                                            <source
                                              src={item?.thumbnail}
                                              type="video/mp4"
                                            />
                                          </video>
                                        </>
                                      )}
                                      {countfav?.includes(item?.dam) && (
                                        <>
                                          {" "}
                                          <img
                                            className="startimgst updaterecent"
                                            src="/img/startimg.png"
                                          />
                                        </>
                                      )}

                                      <div className="valuename">
                                        <p className="looking_title">
                                          {item?.title}
                                        </p>
                                        <span className="price_contnet11">
                                          <i className="fas fa-shopping-bag"></i>
                                          {item?.job_count}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              </>
                            ))}
                          </div>

                          <div className="folder_heading Collectionstitlemedia">
                            {hidefolder &&
                              DamPostCollectionData?.length > 0 &&
                              !searchfolder && (
                                <>
                                  {" "}
                                  <h4 className="files11_contnet">
                                    Collections
                                  </h4>
                                </>
                              )}

                            {/* {!hidefolder &&
                                  DamPostCollectionData?.length > 0 &&
                                  searchfolder && (
                                    <>
                                      {" "}
                                      <h4 className="files11_contnet">
                                        Collections
                                      </h4>
                                    </>
                                  )}
  
                                {hidefolder &&
                                  DamPostCollectionData?.length > 0 &&
                                  searchfolder && (
                                    <>
                                      {" "}
                                      <h4 className="files11_contnet">
                                        Collections
                                      </h4>
                                    </>
                                  )} */}
                          </div>

                          {searchfolder && (
                            <>
                              <div className="folderImagesNewDFlex1">
                                {/* {JSON.stringify(DamPostCollectionData)} */}
                                {DamSearchnew?.map((item) => (
                                  <>
                                    {item.type == 2 && (
                                      <>
                                        <div className="collectionnameimgdiv ">
                                          <div
                                            className="mideaimgsecc"
                                            onClick={() =>
                                              Collectiondatashow(item?.id)
                                            }
                                            onContextMenu={(event) =>
                                              handleFolderContextMenu(
                                                event,
                                                item?.root,
                                                item.company_id,
                                                item.id,
                                                item.is_favourite,
                                                item.dam,
                                                item?.name,
                                                item?.type
                                              )
                                            }
                                          >
                                            <li>
                                              <div className="collectionimageupload">
                                                {item?.dam_media[0]?.is_video ==
                                                  false && (
                                                    <>
                                                      <img
                                                        src={
                                                          item?.dam_media[0]
                                                            ?.thumbnail
                                                        }
                                                      />
                                                    </>
                                                  )}
                                                {item?.dam_media[0]?.is_video ==
                                                  true && (
                                                    <>
                                                      <video
                                                        className="videoSWithDamData"
                                                        controls
                                                      >
                                                        <source
                                                          src={
                                                            item?.dam_media[0]
                                                              .thumbnail
                                                          }
                                                          type="video/mp4"
                                                        />
                                                      </video>
                                                    </>
                                                  )}
                                              </div>
                                            </li>

                                            {item.dam_media.length < 1 && (
                                              <li>
                                                {" "}
                                                <div className="collectionimageupload">
                                                  <img
                                                    // onClick={() => Collectiondatashow(item.id)}
                                                    src="/img/dummy_collection.jpg"
                                                  />
                                                </div>
                                              </li>
                                            )}

                                            {item.dam_media.length > 1 && (
                                              <li>
                                                {" "}
                                                <div className="collectionimageupload">
                                                  {item?.dam_media[1]
                                                    ?.is_video == false && (
                                                      <>
                                                        <img
                                                          src={
                                                            item?.dam_media[1]
                                                              ?.thumbnail
                                                          }
                                                        />
                                                      </>
                                                    )}
                                                  {item?.dam_media[1]
                                                    ?.is_video == true && (
                                                      <>
                                                        <video
                                                          className="videoSWithDamData"
                                                          controls
                                                        >
                                                          <source
                                                            src={
                                                              item?.dam_media[1]
                                                                .thumbnail
                                                            }
                                                            type="video/mp4"
                                                          />
                                                        </video>
                                                      </>
                                                    )}
                                                </div>
                                              </li>
                                            )}

                                            {item.dam_media.length > 2 && (
                                              <>
                                                <li>
                                                  <div className="collectionimageupload">
                                                    {item?.dam_media[2]
                                                      ?.is_video == false && (
                                                        <>
                                                          <img
                                                            src={
                                                              item?.dam_media[2]
                                                                ?.thumbnail
                                                            }
                                                          />
                                                        </>
                                                      )}
                                                    {item?.dam_media[2]
                                                      ?.is_video == true && (
                                                        <>
                                                          <video
                                                            className="videoSWithDamData"
                                                            controls
                                                          >
                                                            <source
                                                              src={
                                                                item?.dam_media[2]
                                                                  .thumbnail
                                                              }
                                                              type="video/mp4"
                                                            />
                                                          </video>
                                                        </>
                                                      )}
                                                  </div>
                                                </li>
                                              </>
                                            )}
                                          </div>

                                          {countfav?.includes(item?.id) && (
                                            <>
                                              {" "}
                                              <img
                                                className="startimgst updaterecent"
                                                src="/img/startimg.png"
                                              />
                                            </>
                                          )}
                                          <div className="collectionname">
                                            <p className="looking_contnet">
                                              {item?.name}
                                            </p>
                                            {/* <span className="price_contnetmediasec">
                                              <i className="fas fa-shopping-bag"></i>
                                              {item?.dam_media.length}
                                            </span> */}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </>
                                ))}
                              </div>
                            </>
                          )}

                          {!searchfolder && (
                            <>
                              <div className="folderImagesNewDFlex1">
                                {/* {JSON.stringify(DamPostCollectionData)} */}
                                {DamPostCollectionData?.map((item) => (
                                  <>
                                    <div className="collectionnameimgdiv ">
                                      <div
                                        className="mideaimgsecc"
                                        onClick={() =>
                                          Collectiondatashow(item?.id)
                                        }
                                        onContextMenu={(event) =>
                                          handleFolderContextMenu(
                                            event,
                                            item?.root,
                                            item.company_id,
                                            item.id,
                                            item.is_favourite,
                                            item.dam,
                                            item?.name,
                                            item?.type
                                          )
                                        }
                                      >
                                        <li>
                                          <div className="collectionimageupload">
                                            {item?.dam_media[0]?.is_video ==
                                              false && (
                                                <>
                                                  <img
                                                    src={
                                                      item?.dam_media[0]
                                                        ?.thumbnail
                                                    }
                                                  />
                                                </>
                                              )}
                                            {item?.dam_media[0]?.is_video ==
                                              true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                  >
                                                    <source
                                                      src={
                                                        item?.dam_media[0]
                                                          .thumbnail
                                                      }
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                          </div>
                                        </li>

                                        {item.dam_media.length < 1 && (
                                          <li>
                                            {" "}
                                            <div className="collectionimageupload">
                                              <img
                                                // onClick={() => Collectiondatashow(item.id)}
                                                src="/img/dummy_collection.jpg"
                                              />
                                            </div>
                                          </li>
                                        )}

                                        {item.dam_media.length > 1 && (
                                          <li>
                                            {" "}
                                            <div className="collectionimageupload">
                                              {item?.dam_media[1]?.is_video ==
                                                false && (
                                                  <>
                                                    <img
                                                      src={
                                                        item?.dam_media[1]
                                                          ?.thumbnail
                                                      }
                                                    />
                                                  </>
                                                )}
                                              {item?.dam_media[1]?.is_video ==
                                                true && (
                                                  <>
                                                    <video
                                                      className="videoSWithDamData"
                                                      controls
                                                    >
                                                      <source
                                                        src={
                                                          item?.dam_media[1]
                                                            .thumbnail
                                                        }
                                                        type="video/mp4"
                                                      />
                                                    </video>
                                                  </>
                                                )}
                                            </div>
                                          </li>
                                        )}

                                        {item.dam_media.length > 2 && (
                                          <>
                                            <li>
                                              <div className="collectionimageupload">
                                                {item?.dam_media[2]?.is_video ==
                                                  false && (
                                                    <>
                                                      <img
                                                        src={
                                                          item?.dam_media[2]
                                                            ?.thumbnail
                                                        }
                                                      />
                                                    </>
                                                  )}
                                                {item?.dam_media[2]?.is_video ==
                                                  true && (
                                                    <>
                                                      <video
                                                        className="videoSWithDamData"
                                                        controls
                                                      >
                                                        <source
                                                          src={
                                                            item?.dam_media[2]
                                                              .thumbnail
                                                          }
                                                          type="video/mp4"
                                                        />
                                                      </video>
                                                    </>
                                                  )}
                                              </div>
                                            </li>
                                          </>
                                        )}
                                      </div>

                                      {item?.is_favourite && (
                                        <>
                                          {" "}
                                          <img
                                            className="startimgst2 startimgst2SetBottom"
                                            src="/img/startimg.png"
                                          />
                                        </>
                                      )}
                                      <div className="collectionname">
                                        <p className="looking_contnet">
                                          {item?.name}
                                        </p>
                                        {/* <span className="price_contnetmediasec">
                                          <i className="fas fa-shopping-bag"></i>
                                          {item?.dam_media.length}
                                        </span> */}
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {!hidefolder && !searchfolder && yourfilter && (
                        <>
                          <div className="folderImagesNewDFlex">
                            {DamDataImages?.map((item) => (
                              <>
                                {item?.dam_media.map((value) => (
                                  <>
                                    <div
                                      className={
                                        count.includes(value?.id) ||
                                          detailsid == value?.id
                                          ? "recent_pics1NewImages selected"
                                          : "recent_pics1NewImages "
                                      }
                                    >
                                      <img
                                        className="selected_check_icon"
                                        src="/img/allok.png"
                                      />
                                      <div className="react_pics_contnetNewImages">
                                        {value?.is_video == false && (
                                          <>
                                            <img
                                              onContextMenu={(event) =>
                                                handleFileContextMenu(
                                                  value?.root,
                                                  value?.media,
                                                  event,
                                                  value?.dam,
                                                  value?.upload_by,
                                                  value?.created,
                                                  value?.title,
                                                  value?.description,
                                                  value?.files_size,
                                                  value?.id,
                                                  value?.file_type,
                                                  value?.limit_usage,
                                                  value?.thumbnail,
                                                  value?.skill,
                                                  value?.usage,
                                                  value?.company
                                                )
                                              }
                                              onClick={() =>
                                                countimages(
                                                  value?.id,
                                                  value?.dam,
                                                  value?.type,
                                                  value?.media
                                                )
                                              }
                                              className="scene_contnetNew"
                                              src={value?.thumbnail}
                                            />
                                            {isOpenImg && (
                                              <ModalImg
                                                src={fullview}
                                                alt="recent images"
                                                onClose={() =>
                                                  setIsOpenImg(false)
                                                }
                                              />
                                            )}
                                          </>
                                        )}{" "}
                                        {value?.is_video == true && (
                                          <>
                                            <video
                                              className="videoSWithDamData"
                                              controls
                                              onClick={() =>
                                                countimages(
                                                  value?.id,
                                                  value?.dam,
                                                  value?.type,
                                                  value?.media
                                                )
                                              }
                                              onContextMenu={(event) =>
                                                handleFileVideoContextMenu(
                                                  value?.root,
                                                  value?.media,
                                                  event,
                                                  value?.dam,
                                                  value?.upload_by,
                                                  value?.created,
                                                  value?.title,
                                                  value?.description,
                                                  value?.files_size,
                                                  value?.id,
                                                  value?.file_type,
                                                  value?.limit_usage,
                                                  value?.thumbnail,
                                                  value?.skill,
                                                  value?.usage,
                                                  value?.company
                                                )
                                              }
                                            >
                                              <source
                                                src={value?.thumbnail}
                                                type="video/mp4"
                                              />
                                            </video>
                                          </>
                                        )}
                                        {countfav?.includes(value?.dam) && (
                                          <>
                                            {" "}
                                            <img
                                              className="startimgst updaterecent updaterecentSetDes"
                                              src="/img/startimg.png"
                                            />
                                          </>
                                        )}
                                        <div className="valuename">
                                          <p className="looking_title">
                                            {value?.title}
                                          </p>
                                          <span className="price_contnet11">
                                            <i className="fas fa-shopping-bag"></i>
                                            {value?.job_count}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </>
                            ))}
                          </div>
                          <div className="folder_heading collection_heading">
                            {!hidefolder &&
                              DamCollectionParentImages?.length > 0 && (
                                <>
                                  {" "}
                                  <h4 className="files11_contnet">
                                    Collections{" "}
                                  </h4>
                                </>
                              )}
                          </div>

                          <div className="folderImagesNewDFlex1">
                            {DamCollectionParentImages?.map((item) => (
                              <>
                                <div className="collectionnameimgdiv ">
                                  <div
                                    className="mideaimgsecc"
                                    onClick={() => Collectiondatashow(item?.id)}
                                    onContextMenu={(event) =>
                                      handleFolderContextMenu(
                                        event,
                                        item?.root,
                                        item.company_id,
                                        item.id,
                                        item.is_favourite,
                                        item.dam,
                                        item?.name,
                                        item?.type
                                      )
                                    }
                                  >
                                    <li>
                                      <div className="collectionimageupload">
                                        {item?.dam_media[0]?.is_video ==
                                          false && (
                                            <>
                                              <img
                                                src={
                                                  item?.dam_media[0]?.thumbnail
                                                }
                                              />
                                            </>
                                          )}
                                        {item?.dam_media[0]?.is_video ==
                                          true && (
                                            <>
                                              <video
                                                className="videoSWithDamData"
                                                controls
                                              >
                                                <source
                                                  src={
                                                    item?.dam_media[0].thumbnail
                                                  }
                                                  type="video/mp4"
                                                />
                                              </video>
                                            </>
                                          )}
                                      </div>
                                    </li>

                                    {item.dam_media.length < 1 && (
                                      <li>
                                        {" "}
                                        <div className="collectionimageupload">
                                          <img
                                            // onClick={() => Collectiondatashow(item.id)}
                                            src="/img/dummy_collection.jpg"
                                          />
                                        </div>
                                      </li>
                                    )}

                                    {item.dam_media.length > 1 && (
                                      <li>
                                        {" "}
                                        <div className="collectionimageupload">
                                          {item?.dam_media[1]?.is_video ==
                                            false && (
                                              <>
                                                <img
                                                  src={
                                                    item?.dam_media[1]?.thumbnail
                                                  }
                                                />
                                              </>
                                            )}
                                          {item?.dam_media[1]?.is_video ==
                                            true && (
                                              <>
                                                <video
                                                  className="videoSWithDamData"
                                                  controls
                                                >
                                                  <source
                                                    src={
                                                      item?.dam_media[1].thumbnail
                                                    }
                                                    type="video/mp4"
                                                  />
                                                </video>
                                              </>
                                            )}
                                        </div>
                                      </li>
                                    )}

                                    {item.dam_media.length > 2 && (
                                      <>
                                        <li>
                                          <div className="collectionimageupload">
                                            {item?.dam_media[2]?.is_video ==
                                              false && (
                                                <>
                                                  <img
                                                    src={
                                                      item?.dam_media[2]
                                                        ?.thumbnail
                                                    }
                                                  />
                                                </>
                                              )}
                                            {item?.dam_media[2]?.is_video ==
                                              true && (
                                                <>
                                                  <video
                                                    className="videoSWithDamData"
                                                    controls
                                                  >
                                                    <source
                                                      src={
                                                        item?.dam_media[2]
                                                          .thumbnail
                                                      }
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </>
                                              )}
                                          </div>
                                        </li>
                                      </>
                                    )}
                                  </div>
                                  {countfav?.includes(item?.id) && (
                                    <>
                                      {" "}
                                      <img
                                        className="startimgst updaterecent startimgst2SetBottom"
                                        src="/img/startimg.png"
                                      />
                                    </>
                                  )}
                                  <div className="collectionname">
                                    <p className="looking_contnet">
                                      {item?.name}
                                    </p>
                                    <span className="price_contnetmediasec">
                                      <i className="fas fa-shopping-bag"></i>
                                      {item?.dam_media.length}
                                    </span>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      )}

                      <Dialog
                        className="CDashboard  "
                        open={open2}
                        onClose={handleClose2}
                      >
                        <DialogTitle className="CDashboarddiv1">
                          {DamDataCollectionId?.map((item) => (
                            <>{item.name}</>
                          ))}
                          {!damjobshow && (
                            <>
                              {!parentid && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/admin-media-collectionData`}
                                    className="skillname_contnet skillname_contnetmove"
                                  >
                                    See More
                                  </Link>
                                </>
                              )}

                              {parentid && (
                                <>
                                  {" "}
                                  <Link
                                    to={`/admin-media/${parentid}/collection`}
                                    className="skillname_contnet skillname_contnetmove"
                                  >
                                    See More
                                  </Link>
                                </>
                              )}
                            </>
                          )}
                          <span onClick={handleClose2}>
                            <i className="fa-solid fa-xmark collectioncross"></i>
                          </span>
                        </DialogTitle>
                        <DialogContent>
                          <div className="folderImagesNewDFlex">
                            {DamDataCollectionId?.slice(0, 4).map((item) => (
                              <>
                                <>
                                  {item?.dam_media.slice(0, 4).map((value) => (
                                    <>
                                      <div className="recent_pics1NewImages recent_pics1NewImagesPopRC--">
                                        <div
                                          className={
                                            detailsid == value?.id
                                              ? "react_pics_contnetNewImages selected"
                                              : "react_pics_contnetNewImages"
                                          }
                                        >
                                          {value?.is_video == false && (
                                            <>
                                              <img
                                                className="scene_contnetNew"
                                                src={value?.thumbnail}
                                                onContextMenu={(event) =>
                                                  handleCollectionContextMenu(
                                                    event,
                                                    value?.root,
                                                    value.image_favourite,
                                                    value.id,
                                                    value.dam,
                                                    value?.media,
                                                    value?.description,
                                                    value?.limit_usage,
                                                    value.skill,
                                                    value?.title,
                                                    value?.upload_by,
                                                    value?.files_size,
                                                    value?.created,
                                                    value?.tags,
                                                    value?.usage,
                                                    value?.company
                                                  )
                                                }
                                              />
                                              {isOpenImg && (
                                                <ModalImg
                                                  src={fullview}
                                                  alt="recent images"
                                                  onClose={() =>
                                                    setIsOpenImg(false)
                                                  }
                                                />
                                              )}
                                            </>
                                          )}
                                          {value?.is_video == true && (
                                            <>
                                              <video
                                                className="videoSWithDamData"
                                                controls
                                                onClick={() =>
                                                  countimages(
                                                    value?.id,
                                                    value?.dam,
                                                    value?.type,
                                                    value?.media
                                                  )
                                                }
                                                onContextMenu={(event) =>
                                                  handleCollectionContextMenu(
                                                    event,
                                                    value?.root,
                                                    value.image_favourite,
                                                    value.id,
                                                    value.dam,
                                                    value?.media,
                                                    value?.description,
                                                    value?.limit_usage,
                                                    value.skill,
                                                    value?.title,
                                                    value?.upload_by,
                                                    value?.files_size,
                                                    value?.created,
                                                    value?.tags,
                                                    value?.usage,
                                                    value?.company
                                                  )
                                                }
                                              >
                                                <source
                                                  src={value?.thumbnail}
                                                  type="video/mp4"
                                                />
                                              </video>
                                            </>
                                          )}
                                          {countfav?.includes(value?.id) && (
                                            <>
                                              {" "}
                                              <img
                                                className="startimgst updaterecent updaterecentSetDes"
                                                src="/img/startimg.png"
                                              />
                                            </>
                                          )}
                                          <div className="collectiontitle">
                                            <p className="collection_title">
                                              {value?.title}
                                            </p>
                                            <span className="collectionbag">
                                              <i className="fas fa-shopping-bag"></i>
                                              {value?.job_count}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </>
                              </>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div
                    className={
                      isDisplayDetails
                        ? "activity_main showMediaInfoDetails"
                        : "activity_main closeMediaInfoDetails"
                    }
                  >
                    <div className="close_contnet_icon">
                      <i className="fa fa-close" onClick={detailspageclose}></i>
                    </div>
                    <div className="file_name_contnet">
                      <h3 className="file_path_name">{titlename}</h3>
                      <div className="file_text_contnet">
                        <h6
                          className="detail detail1"
                          style={{ color: "#2472fc" }}
                        >
                          Details
                          {/* <hr className="detaail2" /> */}
                        </h6>
                        {/* <hr className="last_line_hr"/> */}
                        <h5 className="detail ">Activity</h5>
                      </div>
                      <div className="update_file">
                        <h6 className="upload_contnet">
                          <span className="date_contnet"> Uploaded</span>
                          {createddate}
                        </h6>
                        <h6 className="upload_contnet">
                          <span className="date_contnet"> Uploaded by</span>
                          <label>{username}</label>
                        </h6>
                        <h6 className="upload_contnet">
                          <span className="date_contnet"> File size</span>
                          {filesize}
                        </h6>
                        <h6 className="upload_contnet">
                          <span className="date_contnet"> Jobs</span>6
                        </h6>
                      </div>
                      <div className="Createmidebtn11 ">
                        <button className="crbdnmide11">
                          <i className="fa fa-plus"></i>
                          Create
                        </button>
                      </div>
                      <div className="toggle_btn_contnet">
                        <FormGroup className="limiteusage">
                          <FormControlLabel
                            control={<Switch />}
                            label="Limit Usage"
                            onClick={countclick}
                          />
                          {iscount && (
                            <>
                              <div className="title_contnet_name">
                                <input
                                  value={limiteusage}
                                  className="file_text_title"
                                  type="text"
                                  placeholder="Enter Limit"
                                  onChange={(e) => {
                                    setlimitusage(e.target.value);
                                    settitleupdater(true);
                                  }}
                                />
                              </div>
                            </>
                          )}
                          <FormControlLabel
                            control={<Switch />}
                            label="Require Approval"
                          />
                        </FormGroup>
                      </div>
                      <div className="select-box_title1">
                        <p className="useage_contnet">Usage</p>
                        <select
                          value={publicvalue}
                          onChange={publicvalue1}
                          className="company_contnet"
                        >
                          <option value="1">Publicly available</option>
                          <option value="0">Private available</option>
                        </select>
                      </div>
                      <div className="title_contnet_name">
                        <p className="tit_contnet1">Title</p>
                        <input
                          onChange={(e) => {
                            settitleName(e.target.value);
                            settitleupdater(true);
                          }}
                          className="file_text_title"
                          type="text"
                          placeholder="Enter Name"
                          value={titlename}
                        />
                      </div>
                      <div className="message_textarea_content1">
                        <p className="message_content">Description</p>
                        <textarea
                          onChange={(e) => {
                            setdescription(e.target.value);
                            settitleupdater(true);
                          }}
                          className=" Textbox-textarea-content "
                          placeholder=""
                          value={description}
                        >
                          {description}
                        </textarea>
                        <p className="number-count">0/4000</p>
                        <h4 className="Company_name27">Company</h4>{" "}
                        <div className="styled-select Companyname Companyname_1">
                          <Select
                            open={isOpen10}
                            onOpen={() => {
                              setIsOpen10(true);
                            }}
                            onClose={() => {
                              setIsOpen10(false);
                            }}
                            MenuProps={menuProps}
                            value={companydataupdate}
                            onChange={companyimageupdate}
                            displayEmpty
                            inputProps={{
                              "aria-label": "Without label",
                            }}
                          >
                            <MenuItem value={null}>Select Company</MenuItem>
                            {companiesData?.map((item) =>
                              item.is_active ? (
                                <MenuItem key={item.id} value={item.id}>
                                  {item?.name}
                                </MenuItem>
                              ) : null
                            )}
                          </Select>
                        </div>
                      </div>

                      <div className="tag_contnet1">
                        <p className="skil11">Skills</p>
                        <div className="skill_name_contnet11 skill_name_contnet11AutoC">
                          <Autocomplete
                            className="autoSideBarMedia"
                            value={skills}
                            multiple
                            id="tags-outlined"
                            open={isOpenSkill}
                            // open={true}
                            onInputChange={handleInputChangeAutocomplete}
                            filterOptions={filterOptions}
                            options={skillsData.filter(
                              (item) => item.is_active
                            )}
                            getOptionLabel={(option) => option.skill_name}
                            // onChange={(event, value) => setSkills(value)}
                            onChange={(e, v) => {
                              changeHandler(e, v);
                              settitleupdater(true);
                            }}
                            // defaultValue={skills ?? []}
                            // inputValue={skills}
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
                          />
                        </div>
                        <p className="skil2">Tags</p>
                        <div className="Marketing  Marketing_2 display-f">
                          <div className="tags-input-container">
                            {tags?.map((tag, index) => (
                              <div className="tag-item" key={index}>
                                <span className="text">{tag}</span>
                                <span
                                  className="close"
                                  onClick={() => removeTag(index)}
                                >
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
                              onChange={(e, v) => {
                                setSavetagButton(e.target.value);
                                settitleupdater(true);
                              }}
                              type="text"
                              className="tags-input tags_inputSideMedia"
                              placeholder="Type something"
                              value={savetagbutton}
                              ref={inputRef}
                            />
                          </div>
                        </div>

                        <div className="tagSaveButtonwithEntMedia">
                          <button onClick={(e) => handleSaveTag(e, "check")}>
                            {" "}
                            Save Tag
                          </button>
                        </div>
                      </div>
                      <div className="Createmidebtn11 ">
                        <button
                          className="crbdnmide11"
                          type="button"
                          onClick={detailschange}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* {attach && (
              <>
                <button
                  type="button"
                   onClick={createjobadd}
                  className="shareNewPopPublic"
                >
                  Attach
                </button>
              </>
            )} */}
      </>
    </>
  );
}
export default Admin_Media;
