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
import Select from "@mui/material/Select";
import Movemedia from "./MovefolderDam";
import Media from "./Media";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { listAllCompanies } from "../../redux/actions/Workflow-company-action";
import axios from "axios";

import {
  listAllDam,
  listAllROOTDam,
  getdamDetailswithid,
  DAMParentPost,
  listAllDamImages,
  getdamImageswithid,
  DAMParentPostCollection,
  DAMPost,
  DAMCollectionPost,
  listAllCollectionDAM,
  getdamCollectionDetailswithid,
  listAllRootImages,
  DAMParentCollection,
  collectionfilespost,
  deletedam,
  Favorites,
  Titleupdate,
  deleteCollection,
  CollectionView,
  DAMMovePost,
  DamMoveMultiple,
  Damcopypost,
  Renamefolder,
  DamMutipledelete,
  DamSearch,
  DamSearchfolder,
  DamMoveCollectioninside,
  DamFilterFavourate,
  DamFilterFavourate1,
  DamFilterFavourateCount,
  DamFilterFavourateCountID,
  listAllMostUsedcount,
  listAllParentFilter,
  listCompanies,
  listCompaniesID,
  CountCompanies,
  CountCompaniesID,
  DamDataDetails,
} from "../../redux/actions/Dam-action";
import { listAllSkills } from "../../redux/actions/skill-actions";
import { DamIDReducer } from "../../redux/reducers/Dam-reducer";


import { element, elementType } from "prop-types";

const Media_datatable = () => {
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

  useEffect(() => {
    let jobshow = localStorage.getItem("damon");
    if (jobshow == "on") {
      setdamjobshow(true);
    }
  }, []);

  const { skillsData } = useSelector((state) => state.skillReducer);
  const [rootid, setrootid] = useState();
  const [isShown, setIsShown] = useState(false);
  const [hidecheck, sethidecheck] = useState(true);
  const [FavFolder, setfavfolder] = useState(true);
  const [tags, setTags] = useState([]);
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const [skillsMove, setSkillsMove] = useState();
  const [showprogressheader, setshowprogressheader] = useState([]);
  const [collectionerror, setcollectionerror] = useState(false);
  const [videotrue, setvideotrue] = useState(false);
  const [checkedvalue, setchecked] = useState(false);
  const [imagelink, setimagelink] = useState("");
  const [imagelink1, setimagelink1] = useState();
  const [companydataupdate, setcompanydataupdate] = useState(null);
  const [publicvalue, setpublicvalue] = useState();
  const [companylistid, setcompanylistid] = useState([]);
  const [deleteicontext, setdeleteicontext] = useState(false);
  const [skills, setSkills] = useState([]);
  const [titleupdater, settitleupdater] = React.useState(false);
  const [collectionShowIdData, setCollectionShowIdData] = useState();
  const [fileVideoContextMenu, setFileVideoContextMenu] = React.useState(null);
  const [companyvalue, setcompanyvalue] = useState(null);
  const [comapnyChange, setCompanyChange] = React.useState(false);

  const handleInputChangeAutocomplete = (event, newInputValue) => {
    // setSkills(newInputValue);
    if (newInputValue?.length > 0) {
      setIsOpenSkill(true);
    } else {
      setIsOpenSkill(false);
    }
  };

  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const { companyData, success: stagesLoading } = useSelector(
    (state) => state.agencyCompanyReducer
  );

  const { success: Collectionfilessucess } = useSelector(
    (state) => state.Collectionfilespostreducer
  );
  const { success: damrenameupdate } = useSelector(
    (state) => state.damrenamereducer
  );

  const { success: reducertitleupdate } = useSelector(
    (state) => state.Titlereducer
  );

  const { userData: userDataFromStore } = useSelector(
    (state) => state.authReducer
  );

  function handleKeyDownSkills(e) {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    setIsOpenSkill(true);
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    const filteredCurrentSkills = skills?.filter((str) =>
      str.skill_name.toLowerCase().includes(value.toLowerCase().trim())
    );
    // console.log("filteredCurrentSkills", filteredCurrentSkills);
    const filteredDatabaseSkills = skillsData?.filter((str) => {
      if (str.skill_name.toLowerCase() === value.toLowerCase().trim()) {
        return true;
      }
    });
    // console.log("filteredDatabaseSkills", filteredDatabaseSkills);
    if (filteredDatabaseSkills?.length > 0 && filteredCurrentSkills?.length > 0) {
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
    for (var i = 0; i < skillsData?.length; i++) {
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
        const addedSkill = skillsData?.filter((item) => item.id === value);
        // setSkills([...skills, res.data]);
      });
    e.target.value = "";
  }


  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.skill_name,
  });

  const changeHandler = (e, v) => {
    setSkills(v);
    // setIsOpenSkill(false);
  };

  const companyimageupdate = (e) => {
    if (e.target.value == null) {
      setcompanydataupdate(null);
    } else {
      setcompanydataupdate(e.target.value);
    }
  };

  const handleClickShowMediaTable = () => {
    if (damjobshow == false) {
      if (parentid) {
        navigate(`/media/${parentid}`);
      } else {
        navigate(`/media`);
      }
    } else {
      setIsShown(true);
    }
    // setIsShown((current) => !current);
    if (parentid == undefined) {
      sethidefolder(true);
      dispatch(listAllROOTDam());
      dispatch(listAllDamImages());
      dispatch(listAllCollectionDAM());

      setLastElemenetChk();
    } else if (parentid) {
      setParentidvalue(parentid);
      sethidefolder(false);
      setLastElemenetChk(parentid);
      dispatch(listAllDam(parentid));
      dispatch(getdamImageswithid(parentid));
      dispatch(getdamDetailswithid(parentid));
      dispatch(DAMParentCollection(parentid));
      dispatch(listAllMostUsedcount(parentid));
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

  const [showprogressbox, setshowprogressbox] = React.useState(false);
  const [showprogress, setshowprogress] = useState(false);
  const [showprogressdata, setshowprogressdata] = useState(false);

  const UploadProgress = () => {
    setshowprogressbox((current) => !current);
  };
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [viewerror, setviewerror] = useState(false);

  const checkvalue = (event) => {
    if (event.target.checked) {
      if (parentid) {
        dispatch(DamFilterFavourate1(parentid));
        sethidecheck(false);
      } else {
        dispatch(DamFilterFavourate());
        sethidecheck(false);
      }
    } else {
      sethidecheck(true);
    }
    setIsSubscribed((current) => !current);
  };

  const checkvalue1 = (event) => {
    if (event.target.checked) {
      setvideotrue(false);
      if (hidecheck == true) {
        sethidecheck(true);
      } else {
        sethidecheck(false);
      }
    } else {
      setvideotrue(false);
      if (hidecheck == true) {
        sethidecheck(true);
      } else {
        sethidecheck(false);
      }
    }
  };

  const checkbyall = (event) => {
    if (event.target.checked) {
      setchecked(true);
    } else {
      setchecked(false);
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
    dispatch(listCompaniesID(parentid));
    // dispatch(
    //   DamFilterFavourateCountID("is_favourite=true&type=3&is_video=true&type=2")
    // );
  }, []);

  const [yourfav, setyourfav] = useState(false);
  const [yourphotos, setyourphotos] = useState(false);
  const [yourvideos, setyourvides] = useState(false);
  const [yourcollections, setyourcollections] = useState(false);
  const [yourfilter, setyourfilter] = useState(true);
  const [total, settotal] = useState([]);
  const [sortby, setsortby] = useState("");
  const [companylist, setcompanylist] = useState([]);
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
        settotal(total?.filter((el, i) => el !== name));
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
      setcompanylistid(companylistid?.filter((el, i) => el !== id));
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
    if (total.includes("Photo")) {
      params += "&photos=1";
      companyparams += "&photos=1";
      setisfiles(false);
      setcount([]);
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
      params += "&is_favourite=true";
      params += "&type=3";
      params += "&is_video=true";
      params += "&type=2";
      params += "&folders=1";
      companyparams += "&folders=1";
      companyparams += "&videos=1";
      companyparams += "&photos=1";
      companyparams += "favourite=true";
      companyparams += "&collections=1";
      setisfiles(false);
      setcount([]);
    }

    if (companylistid?.length) {
      params += `&company=${companylistid}`;
      setisfiles(false);
      setcompanyshow(false);
      if (parentid || jobshow) {
        if (jobshow) {
          dispatch(CountCompaniesID(jobshow, companylistid));
        } else {
          dispatch(CountCompaniesID(parentid, companylistid));
        }
      } else {
        dispatch(CountCompanies(companylistid));
      }
    } else if (!companylistid?.length) {
      setcompanyshow(true);
      dispatch(DamFilterFavourateCountID(params));
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
        dispatch(listAllParentFilter(params, jobshow));
      } else {
        dispatch(listAllParentFilter(params, parentid));
      }
    } else {
      dispatch(DamFilterFavourateCountID(params));
    }

    if (companyparams) {
      if (parentid) {
        dispatch(listCompaniesID(parentid, companyparams));
      } else {
        dispatch(listCompanies(companyparams));
      }
    } else {
      if (parentid) {
        dispatch(listCompaniesID(parentid));
      } else {
        dispatch(listCompanies());
      }
    }
  }, [total, sortby, companylistid, damrenameupdate]);

  useEffect(() => {
    if (parentid == undefined) {
      dispatch(listAllCollectionDAM());
    } else if (parentid) {
      dispatch(DAMParentCollection(parentid));
    }
  }, [damrenameupdate]);

  useEffect(() => {
    let arrJobPrevDocuments = [];
    let prev_files = JSON.parse(localStorage.getItem("prev_vault"));
    if (prev_files) {
      prev_files?.map((file) => arrJobPrevDocuments.push(file.id));
    }
    setcount(arrJobPrevDocuments);
  }, []);

  const getvalue1 = (e) => {
    if (e.target.value == null) {
    } else {
      setsearchfolder(e.target.value);
      if (parentid) {
        dispatch(DamSearch(e.target.value, parentid));
        dispatch(DamSearchfolder(e.target.value, parentid));
      } else {
        dispatch(DamSearch(e.target.value, ""));
        dispatch(DamSearchfolder(e.target.value, ""));
      }
    }
    setsearchvalue(e.target.value);
  };

  useEffect(() => {
    const handler = () => {
      setFileContextMenu(null);
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
  const [addedSkill, setAddedSkill] = useState(false);
  // const [fileContextMenu, setFileContextMenu] = React.useState(null);

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
  const { loading: deleteloader } = useSelector(
    (state) => state.DamDeleteReducer
  );
  const { success: deleteCollectionloader } = useSelector(
    (state) => state.CollectionDelete
  );
  const { success: moveon } = useSelector((state) => state.PostDamReducer);
  const { loading: moveonbro } = useSelector((state) => state.PostDamReducer);
  const { success: moveit } = useSelector(
    (state) => state.Collectionviewreducer
  );

  // useEffect(() => {
  //   if (total.includes("Your Favourates")) {
  //       alert("1")
  //   }
  //   if (total.includes("Photo")) {
  //     params += "&type=3";
  //     alert("2")
  //   }
  // }, [moveon]);

  const { success: moveparent } = useSelector(
    (state) => state.PostDamParentReducer
  );

  const { loading: getdatawhere } = useSelector(
    (state) => state.PostDamParentReducer
  );

  const { DamCountData } = useSelector(
    (state) => state.DamFilterFavourateCount
  );

  const { DamCountDataid } = useSelector(
    (state) => state.DamFilterFavourateCountID
  );

  const { loading: parentloader } = useSelector(
    (state) => state.DamFilterFavourateCountID
  );

  const userData = [
    { name: "Your Favorites" },
    { name: "Photo" },
    { name: "Videos" },
    { name: "Collections" },
    { name: "Folders" },
  ];

  const { loading: rootimages } = useSelector((state) => state.DamRootImages);

  const { success: collectiondata } = useSelector(
    (state) => state.PostDamCollectionReducer
  );

  const { loading: checkok } = useSelector(
    (state) => state.PostDamCollectionReducer
  );

  const { Collectionviewdata } = useSelector(
    (state) => state.Collectionviewreducer
  );

  const { DamDataCollectionId } = useSelector(
    (state) => state.DamIDCollectionReducer
  );

  const { success: dialogdata } = useSelector(
    (state) => state.DamIDCollectionReducer
  );

  const [addNew, setAddNew] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { RootDamData } = useSelector((state) => state.RootDamReducer);

  const { DamImageData } = useSelector((state) => state.DamimageReducer);

  const { success: favpass } = useSelector((state) => state.DamimageReducer);

  const { DamFiltering } = useSelector((state) => state.DamFilterFavourate);
  const { DamFilterFavourateId } = useSelector(
    (state) => state.DamFilterFavourateID
  );

  const { DamDataImages } = useSelector((state) => state.DamIDIMAGESReducer);

  const { loading: checkof } = useSelector((state) => state.DamIDIMAGESReducer);

  const { loading: collectionparentpost } = useSelector(
    (state) => state.PostDamIdCollectionReducer
  );
  const { success: collectionparentpostsucess } = useSelector(
    (state) => state.PostDamIdCollectionReducer
  );

  const { DamRootImages } = useSelector((state) => state.DamRootImages);
  const { DamCollectionParentImages } = useSelector(
    (state) => state.DamParentCollection
  );

  const { loading: collectionparent } = useSelector(
    (state) => state.DamParentCollection
  );

  const { DamData } = useSelector((state) => state.DamReducer);
  const { DamData1 } = useSelector((state) => state.DamIDReducer);

  const { DamPostCollectionData } = useSelector(
    (state) => state.DamCollectionReducer
  );

  const { loading: collectionloader } = useSelector(
    (state) => state.DamCollectionReducer
  );

  const [isOpenImg, setIsOpenImg] = useState(false);
  const [isOpenFullVideo, setIsOpenFullVideo] = useState(false);

  function checkAge(age) {
    return age == 100;
  }

  const closepopup = () => {
    setIsOpenImg(false);
    setTimeout(() => {
      setcount([]);
      setdetailsid();
    }, 100);
  };

  const showModalImg = () => {
    setIsOpenImg(true);
  };

  const showModalVideo = () => {
    setIsOpenFullVideo(true);
  };
  const videFullCloseFun = () => {
    setIsOpenFullVideo(false);
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

  const fullWidthVideo = () => {
    showModalVideo();
    setFileVideoContextMenu(null);
  };

  const [isDisplayDetails, setIsDisplayDetails] = useState(false);
  const [hidefolder, sethidefolder] = useState(true);
  const [searchfolder, setsearchfolder] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");
  const [selectimages, setselectimages] = useState([]);
  const [insidefolder, setinsideFolderdata] = useState();
  const [copyfolderdata, setcopyFolderdata] = useState(false);
  const [copyfolderdata1, setcopyFolderdata1] = useState(false);
  const [copyfolderdata2, setcopyFolderdata2] = useState(false);
  const [copydata, setcopydata] = useState(false);
  const [movedata, setmovedata] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [CollectionName, setCollectionName] = useState("");
  const [CollectionNameShow, setCollectionNameShow] = useState("");
  const [folderdata, setFolderdata] = useState();
  const [Parentid, setParentid] = useState();
  const [favouritefolder, setisfavouritefolder] = useState();
  const [favouritecollection, setisfavouritecollection] = useState();
  const [folderdeleteid, setfolderdeleteid] = useState();
  const [Renamechange, setrenamechange] = useState();
  const [folderdeletedam, setfolderdeletedam] = useState();
  const [imagefav, setimagefav] = useState();
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [movefoldershow, setmovefoldershow] = useState(true);
  const [foldertransfer, setfoldertransfer] = useState(null);
  const [folderroottransfer, setfolderroottransfer] = useState(null);
  const [count, setcount] = useState([]);
  const [countfav, setcountfav] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [moveid, setmoveid] = useState();
  const [parentidvalue, setParentidvalue] = useState();
  const [parentvalue, setparentvalue] = useState();
  const [collectionlength, setcollectionlength] = useState();
  const [folderModal, setShowFolderModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState([]);
  const [createddate, setcreateddate] = useState();
  const [username, setusername] = useState("");
  const [copydropdownshow, setcopydropdownshow] = useState(false);
  const [rootdropdown, setrootdropdown] = useState(false);
  const [filesize, setfilesize] = useState();
  const [open2, setOpen2] = useState(false);
  const [titlename, settitleName] = useState();
  const [thumbnailview, setthumbnailview] = useState();
  const [fullview, setFullview] = useState();
  const [limiteusage, setlimitusage] = useState();
  const [description, setdescription] = useState("");
  const [detailsid, setdetailsid] = useState();
  const [favouritevalue, setisfavourite] = useState();
  const [idstore, setidstore] = useState();
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
    alert(e.target.value, "hello");
    setfolderroottransfer(e.target.value);
    dispatch(getdamDetailswithid(e.target.value));
  };
  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const [createdropdown, setCreatedropdown] = React.useState(null);
  const open = Boolean(createdropdown);

  const [openFolder, setOpenFolder] = React.useState(false);
  const [moveFolder, setmoveFolder] = React.useState(false);
  const [moveFolder1, setmoveFolder1] = React.useState(false);
  const [moveFolder2, setmoveFolder2] = React.useState(false);

  const [openUploadFile, setopenUploadFile] = React.useState(false);

  const [openUploadCollection, setopenUploadCollection] = React.useState(false);

  const handleClickOpen = () => {
    setOpenFolder(true);
  };

  const [isfiles, setisfiles] = useState(true);
  const [iscount, setiscount] = useState(false);

  const [showcollection, setshowcollection] = useState(true);

  const handleClickfiles = (event) => {
    setisfiles((current) => !current);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const detailspopupclose = () => {
    setIsDisplayDetails(!isDisplayDetails);
    setdetailsid()
    setcount([])
  };



  const countclick = () => {
    setiscount((current) => !current);
  };

  const seemore = () => { };

  const handleCloseFolder = () => {
    setOpenFolder(false);
    setFolderName("");
    setFolderContextMenu(null);
    setisfavouritefolder();
    setisfavouritecollection();
    setcompanyvalue(null);
  };

  const handleClosecopyFolder = () => {
    setmoveFolder(false);
    setmovefoldershow(true);
    setFolderContextMenu(null);
  };

  const imageinsidevalue = () => {
    setIsDisplayDetails(true);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
  };

  const detailschange = () => {
    const formData = new FormData();
    formData.append("title", titlename);
    for (var i = 0; i < skills?.length; i++) {
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
      formData.append("company", 0);
    }
    formData.append("dam", movefileid);
    setIsDisplayDetails(false);
    setdetailsid();
    dispatch(Titleupdate(formData, detailsid));
    setIsLoading(true);
    setTimeout(() => {
      // dispatch(listAllDamImages());
      // dispatch(listAllRootImages());
      setdeletevalue([]);
      setdetailsid();
      setcount([]);
      setdeletevaluesingle();
      setcompanydataupdate();
      setiscount(false);
      // if (parentid) {
      //   dispatch(getdamImageswithid(parentid));
      // }
    }, 2000);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (parentid) {
      dispatch(CountCompaniesID(parentid, companylistid));
    } else {
      dispatch(CountCompanies(companylistid));
    }
    if (parentid) {
      dispatch(listCompaniesID(parentid));
    } else {
      dispatch(listCompanies());
    }

    if (titleupdater) {
      let jobshow = localStorage.getItem("jobdamid");
      if (jobshow) {
        dispatch(getdamImageswithid(jobshow));
      } else {
        dispatch(listAllRootImages());
        dispatch(listAllDamImages());
        if (parentid) {
          dispatch(getdamImageswithid(parentid));
        }
      }
    }
    settitleupdater(false)
  }, [reducertitleupdate]);
  const duplicateCollectionimage = () => {
    dispatch(
      Damcopypost({
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
      dispatch(listAllROOTDam());
      dispatch(listAllDamImages());
      dispatch(listAllRootImages());
      dispatch(listAllCollectionDAM());
      setdeletevalue([]);
      setdeletevaluesingle();
      setcount([]);
      if (parentid) {
        dispatch(listAllDam(parentid));
        dispatch(getdamImageswithid(parentid));
        dispatch(getdamDetailswithid(parentid));
        dispatch(DAMParentCollection(parentidvalue));
      }
    }, 1800);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setTimeout(() => {
      if (parentid) {
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
      }
    }, 1000);
  };

  const handleCloseUpload = () => {
    setopenUploadFile(false);
    setFiles([]);
  };
  const companydatavalue = (e) => {
    setcompanyvalue(e.target.value);
  };
  const handleCloseCollection = () => {
    setFileGallery([]);
    setCollectionName("");
    setopenUploadCollection(false);
    setdetailsid()
    setFolderContextMenu(null);
    setisfavouritefolder();
    setisfavouritecollection();
    setCollectionShowIdData()
    setviewerror(false);
    // setCollections([]);
  };

  useEffect(() => {
    dispatch(listAllSkills());
  }, [addedSkill]);

  const { DamIdCompany, success: companylistall1 } = useSelector(
    (state) => state.CompanyIDreducer
  );
  const { mediaCreate, error } = useSelector(
    (state) => state.mediaCreateReducer
  );

  const { DamIdCompanylist, success: companycountlist } = useSelector(
    (state) => state.CompanyCountreducer
  );

  const { DamSearch1 } = useSelector((state) => state.DamSearch);
  const { DamSearchnew } = useSelector((state) => state.DamSearchfolder);

  const { Dammostused } = useSelector((state) => state.listAllMostUsed);

  const { DamParentFilter } = useSelector((state) => state.AllParentFilter);

  const { loading: filterloader } = useSelector(
    (state) => state.AllParentFilter
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

  // setTimeout(function () {
  //   setIsLoading(false);
  // }, 3000);

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
    width: "100%",
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

  const publicvalue1 = (e) => {
    setpublicvalue(e.target.value);
    settitleupdater(true)
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


  // const thumbs = files.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <span index="0" className="removeFileXbtn">
  //         <a
  //           href="#"
  //           onClick={removeFile(file)}
  //           className="icon_asdsdasd"
  //           title="Remove"
  //         >
  //           <i className="fa-solid fa-circle-xmark"></i>
  //         </a>
  //       </span>

  //       <img
  //         src={file.preview}
  //         style={img}

  //         onLoad={() => {
  //           URL.revokeObjectURL(file.preview);
  //         }}
  //       />
  //       {file.title}
  //       {file.name}
  //     </div>
  //   </div>
  // ));

  const [localname, setlocalname] = useState([]);
  const [localid, setlocalid] = useState([]);
  const [localparentid, setlocalparentid] = useState([]);
  const [moveparentid, setmoveparentid] = useState();
  const [movefileid, setmovefileid] = useState();
  const [attach, setattach] = useState(false);
  const [movefiledamid, setmovefiledamid] = useState();
  const [deletevalue, setdeletevalue] = useState([]);
  const [deletevaluesingle, setdeletevaluesingle] = useState();
  const [damjobshow, setdamjobshow] = useState(false);
  const [sorting, setsorting] = useState(true);
  const [ordering1, setordering1] = useState(true);
  const [companylistnull, setcompanylistnull] = useState([]);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      setParentidvalue(jobshow);
      sethidefolder(false);
      dispatch(listAllCompanies());
      setLastElemenetChk(jobshow);
      dispatch(listAllDam(jobshow));
      dispatch(getdamImageswithid(jobshow));
      dispatch(getdamDetailswithid(jobshow));
      dispatch(DAMParentCollection(jobshow));
      dispatch(listAllMostUsedcount(jobshow));
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
        dispatch(listAllROOTDam());
        dispatch(listAllDamImages());
        dispatch(listAllCollectionDAM());
        dispatch(listCompanies());
        dispatch(listCompaniesID(parentid));
        dispatch(listAllCompanies());
        setLastElemenetChk();
      } else if (parentid) {
        setParentidvalue(parentid);
        sethidefolder(false);
        dispatch(listAllCompanies());
        setLastElemenetChk(parentid);
        dispatch(listAllDam(parentid));
        dispatch(getdamImageswithid(parentid));
        dispatch(getdamDetailswithid(parentid));
        dispatch(DAMParentCollection(parentid));
        dispatch(listAllMostUsedcount(parentid));
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
  }, [moveon]);

  useEffect(() => {
    dispatch(listAllDamImages());
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(listAllDam(jobshow));
    } else {
      dispatch(listAllDam(parentid));
    }
  }, [moveon]);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(DamFilterFavourateCountID(jobshow));
    } else {
      if (parentid) {
        dispatch(DamFilterFavourateCountID(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
      }
    }
  }, [moveon]);

  useEffect(() => {
    let attach = localStorage.getItem("dam");
    if (attach) {
      setattach(true);
    }
  }, [moveon]);

  useEffect(() => {
    dispatch(listAllDamImages());
  }, [moveon]);

  useEffect(() => {
    let jobshow = localStorage.getItem("damon");
    if (jobshow) {
      setdamjobshow(true);
    }
  }, [moveon]);

  useEffect(() => {
    dispatch(listAllCollectionDAM());
  }, [collectiondata]);

  useEffect(() => {
    dispatch(listAllRootImages());
  }, [moveon]);

  useEffect(() => {
    dispatch(listAllRootImages());
  }, [collectionparentpostsucess]);

  useEffect(() => {
    setexistingmediafile(Collectionviewdata);
  }, [moveit]);
  const { DamCompany, success: companylistall } = useSelector(
    (state) => state.Companyreducer
  );

  const [progress1, setProgress1] = useState([]);
  const [progress3, setProgress3] = useState(0);
  const indexvalue = useRef(0);

  const [rowadd, setrowadd] = useState([]);

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

  const handleFileSubmit = () => {
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    setyourfilter(true);
    const myArr = [];

    let startIndex = inputRef.current?.length ? inputRef.current?.length : 0;

    for (let index = 0; index < files?.length; index++) {
      myArr.push({
        id: startIndex,
        progress2: progress3,
        title: files[index].name,
      });
    }



    if (inputRef.current?.length) {
      const total = myArr.concat(inputRef.current);
      inputRef.current = total;
      setshowprogressheader(total);
    } else {
      inputRef.current = myArr;
      setshowprogressheader(myArr);
    }
    // setrowadd(myArr);
    for (let index = 0; index < files?.length; index++) {
      const formData = new FormData();
      if (files) {
        formData.append("dam_files", files[index]);
      }
      if (parentidvalue) {
        formData.append("parent", parentidvalue);
      }
      formData.append("name", "");
      formData.append("type", 3);
      setCollectionNameShow(CollectionName)
      formData.append("dam_files_name", files[index].name);
      formData.append("agency", user_id.user?.user_id);
      indexvalue.current = indexvalue.current + 1;
      if (companyvalue) {
        formData.append("company", companyvalue);
      } else {
        formData.append("company", "");
      }
      if (parentid) {
        let list = inputRef.current;
        list[index].id = indexvalue.current;
        axios
          .post(`${BACKEND_API_URL}agency/dam/?parent=${parentid}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userDataFromStore.token}`,
            },
            onUploadProgress: (progressEvent) => {
              let percentComplete = progressEvent.loaded / progressEvent.total;
              percentComplete = parseInt(percentComplete * 100);
              list[index].progress2 = percentComplete;
            },
          })
          .then((response) => {
            dispatch(getdamImageswithid(parentid));
            dispatch(listCompaniesID(parentid));
            setyourfilter(true);
            let lengthstore = [];

            {
              inputRef.current?.map((file, index) =>
                lengthstore.push(file?.progress2)
              );
            }
            setshowprogressheader(lengthstore);
            if (parentid) {
              dispatch(listAllMostUsedcount(parentid));
            } else {
              dispatch(DamFilterFavourateCount());
            }
            if (parentid) {
              dispatch(CountCompaniesID(parentid, companylistid));
            } else {
              dispatch(CountCompanies(companylistid));
            }
            setTimeout(() => {
              setProgress1();
            }, 1000);
          });
        setShowModal(false);
        setopenUploadFile(false);
        setIsLoading(true);
        setcompanyvalue(null);
        setFiles([]);
        setshowprogress(true);
        setshowprogressdata(true);
        setProgress("10");
      } else {
        let list = inputRef.current;
        list[index].id = indexvalue.current;
        axios
          .post(`${BACKEND_API_URL}agency/dam/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userDataFromStore.token}`,
            },
            onUploadProgress: (progressEvent) => {
              let percentComplete = progressEvent.loaded / progressEvent.total;
              percentComplete = parseInt(percentComplete * 100);
              list[index].progress2 = percentComplete;
              // setrowadd({ id: index, progress2: percentComplete });
            },
          })
          .then((response) => {
            dispatch(listAllRootImages());
            dispatch(listAllDamImages());
            dispatch(listCompanies());
            let lengthstore = [];

            {
              inputRef.current?.map((file, index) =>
                lengthstore.push(file?.progress2)
              );
            }
            setshowprogressheader(lengthstore);
            if (parentid) {
              dispatch(listAllMostUsedcount(parentid));
            } else {
              dispatch(DamFilterFavourateCount(companylistid));
            }
            if (parentid) {
              dispatch(CountCompaniesID(parentid, companylistid));
            } else {
              dispatch(CountCompanies(companylistid));
            }
          });

        setopenUploadFile(false);
        setFiles([]);
        setshowprogress(true);
        setshowprogressdata(true);
        setProgress("10");
        setIsLoading(true);
        setcompanyvalue(null);
      }
    }
  };

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(getdamImageswithid(jobshow));
    } else {
      dispatch(getdamImageswithid(parentid));
    }
  }, [getdatawhere, deleteloader]);

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(listAllMostUsedcount(jobshow));
    } else {
      if (parentid) {
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
      }
    }
    dispatch(listAllDamImages());
    dispatch(listAllRootImages());
    dispatch(listAllCollectionDAM());
  }, [getdatawhere, deleteloader]);

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
    dispatch(listAllCollectionDAM());
    dispatch(listAllDamImages());
    dispatch(listAllROOTDam())
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(getdamImageswithid(jobshow));
    } else {
      if (parentid) {
        dispatch(getdamImageswithid(parentid));
      }
    }
  }, [deleteCollectionloader]);

  const [images, setimages] = useState();
  const [bro, setbro] = useState(true);

  const validateSubmit = (e, data) => {
    const tempErrors = {
      folderName: !folderName && "Please enter Folder Name",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors)?.filter((value) => value)?.length) {
      return;
    }
    handleFolderSubmit();
  };

  const handleFolderSubmit = (e) => {
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    setimages();
    if (folderName) {
      if (parentidvalue) {
        if (companyvalue) {
          dispatch(
            DAMParentPost(
              {
                dam_files: images,
                name: folderName,
                type: 1,
                agency: user_id.user?.user_id,
                parent: parentidvalue,
                company: companyvalue,
              },
              parentidvalue
            )
          );
        } else {
          dispatch(
            DAMParentPost(
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
          dispatch(getdamDetailswithid(parentidvalue));
        }, 1500);
      } else {
        if (companyvalue) {
          dispatch(
            DAMPost({
              dam_files: images,
              name: folderName,
              type: 1,
              agency: user_id.user?.user_id,
              parent: "",
              company: companyvalue,
            })
          );
        } else {
          dispatch(
            DAMPost({
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
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
      }
    }, 1000);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setcompanyvalue(null);
  };

  const handleClose = () => {
    setCreatedropdown(null);
  };

  const mostused = () => {
    // setsorting(false);
    // setordering1(true);
    // dispatch(listAllMostUsed());
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
      dispatch(getdamCollectionDetailswithid("", parentid));
    } else {
      dispatch(getdamCollectionDetailswithid(id, ""));
    }
  };

  const movefilelocation = (value) => {
    localStorage.removeItem("imageshow");
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    let collectiontrue = localStorage.getItem("collectiontrue");

    let moveparentfileid = ''
    if (value == "2") {
      moveparentfileid = localStorage.getItem("moveparentid");
    } else {
      moveparentfileid = "";
    }
    const formData = new FormData();
    if (collectiontrue && copydata) {
      dispatch(
        Damcopypost({
          id: detailsid,
          parent: moveparentfileid,
          type: 3,
          type_new: 2,
        })
      );
    } else if (collectiontrue) {
      dispatch(
        Titleupdate(
          {
            dam: moveparentfileid,
          },
          detailsid
        )
      );
    } else if (copydata) {
      dispatch(
        Damcopypost({
          id: detailsid,
          parent: moveparentfileid,
          type: 3,
          type_new: 3,
        })
      );
    } else if (movedata && count?.length <= 0) {
      dispatch(
        DAMMovePost(
          {
            parent: moveparentfileid,
          },
          movefileid
        )
      );
    } else if (count?.length > 0) {
      dispatch(
        DamMoveMultiple({
          id: deletevalue,
          parent: moveparentfileid,
        })
      );
    } else if (open2 == true) {
      formData.append("dam_images", imagefav);
      formData.append("type", 3);
      formData.append("parent", moveparentfileid);
      formData.append("user", user_id.user?.user_id);
      dispatch(DamMoveCollectioninside(formData));
    } else {
      dispatch(
        DAMMovePost(
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
    setdetailsid()
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
    setmovedata(false);
    setcopyFolderdata2(false);
    setCollectionContextMenu(null);
    setTimeout(() => {
      if (parentid == undefined) {
        dispatch(listAllROOTDam());
        dispatch(listAllDamImages());
        dispatch(listAllCollectionDAM());
        dispatch(listAllRootImages());
        dispatch(getdamCollectionDetailswithid(idstore));
      } else if (parentid) {
        dispatch(listAllDam(parentid));
        dispatch(getdamImageswithid(parentid));
        dispatch(getdamDetailswithid(parentid));
        dispatch(DAMParentCollection(parentid));
        dispatch(getdamCollectionDetailswithid(idstore));
      }
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
      if (total.includes("Photo")) {
        params += "&photos=1";
        companyparams += "&photos=1";
        setisfiles(false);
        setcount([]);
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
        params += "&is_favourite=true";
        params += "&type=3";
        params += "&is_video=true";
        params += "&type=2";
        params += "&folders=1";
        companyparams += "&folders=1";
        companyparams += "&videos=1";
        companyparams += "&photos=1";
        companyparams += "favourite=true";
        companyparams += "&collections=1";
        setisfiles(false);
        setcount([]);
      }

      if (companylistid?.length) {
        params += `&company=${companylistid}`;
        setisfiles(false);
        setcompanyshow(false);
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(CountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(CountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(CountCompanies(companylistid));
        }
      } else if (!companylistid?.length) {
        setcompanyshow(true);
        if (parentid) {
          dispatch(listAllMostUsedcount(parentid));
        } else {
          dispatch(DamFilterFavourateCount());
        }
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
          dispatch(listAllParentFilter(params, jobshow));
        } else {
          dispatch(listAllParentFilter(params, parentid));
        }
      } else {
        dispatch(DamFilterFavourateCountID(params));
      }

      if (companyparams) {
        if (parentid) {
          dispatch(listCompaniesID(parentid, companyparams));
        } else {
          dispatch(listCompanies(companyparams));
        }
      } else {
        if (parentid) {
          dispatch(listCompaniesID(parentid));
        } else {
          dispatch(listCompanies());
        }
      }
    }, 1500);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

  };

  const renamedone = () => {
    dispatch(
      Renamefolder(
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
        dispatch(listAllROOTDam());
      } else if (parentid) {
        dispatch(listAllDam(parentid));
        dispatch(getdamDetailswithid(parentid));
      }
    }, 1500);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setcompanyvalue(null);
    setCompanyChange(false)

  };

  const foldernavigate = (parent, is_parent, id, name) => {
    let jobshow = localStorage.getItem("jobdamid");
    setsearchfolder();
    dispatch(DamFilterFavourateCountID(id));
    setsearchvalue("");
    setLastElemenetChk(id);
    setlocalid(parent);
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
    setyourfilter(true);
    dispatch(listAllDam(id));
    if (damjobshow == false) {
      navigate(`/media-table/${id}`);
    } else {
      localStorage.setItem("jobdamid", id);
    }
    sethidefolder(false);
    setParentid(parent);
    setAddNew([...addNew]);
    setparentvalue(is_parent);
    if (companylistid?.length) {
      setisfiles(false);
      setcompanyshow(false);
      if (parentid) {
        dispatch(CountCompaniesID(id, companylistid));
      }
    }
    setParentidvalue(id);
    dispatch(getdamImageswithid(id));
    dispatch(getdamDetailswithid(id));
    dispatch(DAMParentCollection(id));
    dispatch(listCompaniesID(id));
    dispatch(listAllMostUsedcount(id));
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

      if (companylistid?.length) {
        params += `&company=${companylistid}`;
        setisfiles(false);
        setcompanyshow(false);
        if (parentid || jobshow) {
          dispatch(CountCompaniesID(id, companylistid));
        } else {
          dispatch(CountCompanies(companylistid));
        }
      } else if (!companylistid?.length) {
        setcompanyshow(true);
        dispatch(DamFilterFavourateCountID(params));
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
        dispatch(listAllParentFilter(params, id));
      } else {
        dispatch(DamFilterFavourateCountID(params));
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
    setshowcollection(false);
    let parentidbreedcrumbs = localparentid[key];
    setIsDisplayDetails(false);
    let passed = stateid[key];
    const person = {
      firstName: localname,
    };
    const propertyNames = Object.keys(person);
    var lastelement = stateparentid[stateparentid?.length - 1];
    setLastElemenetChk(lastelement);
    if (parentidbreedcrumbs) {
      setParentidvalue(parentidbreedcrumbs);
      dispatch(getdamDetailswithid(parentidbreedcrumbs));
      dispatch(DamFilterFavourateCountID(parentidbreedcrumbs));
      dispatch(getdamImageswithid(parentidbreedcrumbs));
      dispatch(DAMParentCollection(parentidbreedcrumbs));
      dispatch(listAllMostUsedcount(parentidbreedcrumbs));
      sethidefolder(false);
      if (damjobshow == false) {
        navigate(`/media-table/${parentidbreedcrumbs}`);
      } else {
        localStorage.setItem("jobdamid", parentidbreedcrumbs);
      }
      localname.splice(key, localname?.length);
      localparentid.splice(key, localparentid?.length);
      stateid.splice(key, stateid?.length);
      state.splice(key, state?.length);
      stateparentid.splice(key, stateparentid?.length);
      localStorage.setItem("name", JSON.stringify(localname));
      localStorage.setItem("id", JSON.stringify(stateid));
      localStorage.setItem("parentid", JSON.stringify(localparentid));
    }
  };

  const countimages = (id, dam) => {
    setIsDisplayDetails(false);
    if (count.includes(id)) {
      setcount(count?.filter((el, i) => el !== id));
      localStorage.setItem(
        "useimage",
        count?.filter((el, i) => el !== id)
      );
    } else {
      setcount([...count, id]);
      localStorage.setItem("useimage", [...count, id]);
    }
    setdetailsid();

    if (deletevalue.includes(dam)) {
      setdeletevalue(deletevalue?.filter((el, i) => el !== dam));
    } else {
      setdeletevalue([...deletevalue, dam]);
    }
  };

  const resetcount = () => {
    setcount([]);
    setdeletevaluesingle();
    setdeletevalue([]);
  };

  const companyChangeFile = () => {
    setCompanyChange(true)
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setIsDisplayDetails(false);
    setFolderContextMenu(null);
  }
  const handleCloseCompanyChange = () => {
    setCompanyChange(false)
    setcompanyvalue(null)
  };

  const rootfolder = () => {
    setmoveFolder(true);
    setcount([]);
    setdeletevalue([]);
    setdeletevaluesingle();
    setshowcollection(false);
    setIsDisplayDetails(false);
    sethidefolder(true);
    dispatch(listAllROOTDam());
    dispatch(listAllDamImages());
    dispatch(listAllDam());
    dispatch(DamFilterFavourateCount());
    if (damjobshow == false) {
      navigate(`/media-table`);
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
      dispatch(DamFilterFavourateCountID(params));
      setyourfilter(false);
    }
    // setShowFolderModal(true);
  };

  const movedialogclose = () => {
    setmoveFolder(false);
    setdetailsid()
    setSkillsMove()
    localStorage.removeItem("imageshow");
    localStorage.removeItem("disableid");
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
    setdetailsid()
    setContextMenu(null);
    setSkillsMove()
    setFileContextMenu(null);
    setdetailsid()
    setFolderContextMenu(null);
    setFileVideoContextMenu(null)
  };

  const movedialogclose2 = () => {
    setmoveFolder2(false);
    setSkillsMove()
    setdetailsid()
    localStorage.removeItem("asset");
    setContextMenu(null);
    setdetailsid()
    setFileContextMenu(null);
    setFolderContextMenu(null);
    setFileVideoContextMenu(null)
  };

  const sampleassetclick = () => {
    localStorage.setItem("asset", "sampleasset");
    navigate(`/jobs/add`);
    setContextMenu(null);
    setCreatedropdown(null);
    setContextMenu(null);
    setFileContextMenu(null);
    setdetailsid()
    setFileVideoContextMenu(null);
    setFolderContextMenu(null);
  };

  const fileassetclick = () => {
    localStorage.setItem("asset", "fileasset");
    navigate(`/jobs/add`);
    setContextMenu(null);
    setCreatedropdown(null);
    setdetailsid()
    setContextMenu(null);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setFolderContextMenu(null);
  };

  const handleCreateFolder = () => {
    setContextMenu(null);
    setOpenFolder(true);
    setcompanyvalue(null);
    setCreatedropdown(null);
    // setShowFolderModal(true);
  };
  const handleClickOpenUpload = () => {
    setContextMenu(null);
    setopenUploadFile(true);
    setCreatedropdown(null);
  };

  const handleCreateCollection = () => {
    let view = [];
    if (count?.length > 0) {
      dispatch(CollectionView(count));
    } else {
      dispatch(CollectionView(collectionShowIdData));
    }
    setexistingmediafile(Collectionviewdata);
    setContextMenu(null);
    setopenUploadCollection(true);
    // setCollectionShowIdData()
    setviewerror(false);
    setCreatedropdown(null);
    setContextMenu(null);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setFileVideoContextMenu(null);
    setFolderContextMenu(null);
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
    if (count?.length > 0) {
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
      setimages1(DamImageData?.filter((item) => item.is_favourite == true));
    }
    if (DamImageData) {
      setimages8(DamImageData?.filter((item) => item.image_favourite == true));
    }
    if (RootDamData) {
      setimages2(RootDamData?.filter((item) => item.is_favourite == true));
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

    if (images1?.length > 0) {
      setcountfav(storer);
    }

    if (images2?.length > 0) {
      setcountfav(storer);
    }

    if (images3?.length > 0) {
      setcountfav(storer);
    }
    if (images4?.length > 0) {
      setcountfav(storer);
    }
    if (images5?.length > 0) {
      setcountfav(storer);
    }
    if (images6?.length > 0) {
      setcountfav(storer);
    }
    if (images7?.length > 0) {
      setcountfav(storer);
    }
  }, [images1, images2, images3, images4, images5, images6, images7]);

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
    if (Object.values(tempErrors)?.filter((value) => value)?.length) {
      return;
    }
    handleCollectionSubmit();
  };

  const { InsideData, success: damdatainside } = useSelector(
    (state) => state.DaminsideData
  );


  const handleCollectionSubmit = () => {
    setcollectionerror(true);
    setviewerror(true);
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    const myArr = [];
    let startIndex = inputRef.current?.length ? inputRef.current?.length : 0;

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
    if (inputRef.current?.length) {
      const total = myArr.concat(inputRef.current);
      inputRef.current = total;
      setshowprogressheader(total);
    } else {
      inputRef.current = myArr;
      setshowprogressheader(myArr);
    }
    setrowadd(myArr);
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

    // if (count?.length > 0) {
    //   formData.append("dam_images", count);
    // }
    if (count?.length > 0) {
      formData.append("dam_images", count);
    } else if (collectionShowIdData) {
      formData.append("dam_images", collectionShowIdData);
    }
    setCollectionNameShow(CollectionName)
    formData.append("name", CollectionName);
    formData.append("type", 2);
    formData.append("agency", user_id.user?.user_id);
    if (fileGallery) {
      for (const key of Object.keys(fileGallery)) {
        formData.append("dam_files", fileGallery[key]);
      }
    }
    if (companyvalue) {
      formData.append("company", companyvalue);
    } else {
      formData.append("company", "");
    }
    indexvalue.current = indexvalue.current + 1;
    if (count?.length > 0) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(`${BACKEND_API_URL}agency/dam/create_collection/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userDataFromStore.token}`,
          },
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total;
            percentComplete = parseInt(percentComplete * 100);
            list[0].progress2 = percentComplete;
          },
        })
        .then((response) => {
          dispatch(DAMParentCollection(parentid));
          dispatch(listAllCollectionDAM());
          let lengthstore = [];

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setshowprogressheader(lengthstore);
          if (parentid) {
            dispatch(listAllMostUsedcount(parentid));
          } else {
            dispatch(DamFilterFavourateCount(companylistid));
          }
          if (parentid) {
            dispatch(CountCompaniesID(parentid, companylistid));
          } else {
            dispatch(CountCompanies(companylistid));
          }
          setTimeout(() => {
            setProgress1();
          }, 1000);
        });
      setopenUploadFile(false);
      setFiles([]);
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setIsLoading(true);
      setcompanyvalue(null);
      setcount([]);
      setCollectionShowIdData()
      setdeletevalue([]);
      setdeletevaluesingle();
    } else if (collectionShowIdData) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(`${BACKEND_API_URL}agency/dam/create_collection/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userDataFromStore.token}`,
          },
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total;
            percentComplete = parseInt(percentComplete * 100);
            list[0].progress2 = percentComplete;
          },
        })
        .then((response) => {
          dispatch(DAMParentCollection(parentid));
          dispatch(listAllCollectionDAM());
          let lengthstore = [];

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setshowprogressheader(lengthstore);
          if (parentid) {
            dispatch(listAllMostUsedcount(parentid));
          } else {
            dispatch(DamFilterFavourateCount(companylistid));
          }
          if (parentid) {
            dispatch(CountCompaniesID(parentid, companylistid));
          } else {
            dispatch(CountCompanies(companylistid));
          }
          setTimeout(() => {
            setProgress1();
          }, 1000);
        });
      setopenUploadFile(false);
      setFiles([]);
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setIsLoading(true);
      setcompanyvalue(null);
      setcount([]);
      setdeletevalue([]);
      setCollectionShowIdData()
      setdeletevaluesingle();
    } else if (parentidvalue) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(`${BACKEND_API_URL}agency/dam/?parent=${parentid}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userDataFromStore.token}`,
          },
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total;
            percentComplete = parseInt(percentComplete * 100);
            list[0].progress2 = percentComplete;
          },
        })
        .then((response) => {
          dispatch(DAMParentCollection(parentid));
          if (parentid) {
            dispatch(listAllMostUsedcount(parentid));
          } else {
            dispatch(DamFilterFavourateCount(companylistid));
          }
          let lengthstore = [];

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setcount([]);
          setshowprogressheader(lengthstore);
          if (parentid) {
            dispatch(CountCompaniesID(parentid, companylistid));
          } else {
            dispatch(CountCompanies(companylistid));
          }
          setTimeout(() => {
            setProgress1();
          }, 1000);
        });
      setopenUploadFile(false);
      setFiles([]);
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setIsLoading(true);
      setcompanyvalue(null);
      setCollectionShowIdData()
      // setTimeout(function () {
      //   dispatch(DAMParentCollection(parentidvalue));
      // }, 2500);
    } else if (!parentidvalue) {
      let list = inputRef.current;
      list.id = indexvalue.current;
      axios
        .post(`${BACKEND_API_URL}agency/dam/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userDataFromStore.token}`,
          },
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total;
            percentComplete = parseInt(percentComplete * 100);
            list[0].progress2 = percentComplete;
          },
        })
        .then((response) => {
          dispatch(listAllCollectionDAM());
          if (parentid) {
            dispatch(listAllMostUsedcount(parentid));
          } else {
            dispatch(DamFilterFavourateCount(companylistid));
          }
          let lengthstore = [];

          {
            inputRef.current?.map((file, index) =>
              lengthstore.push(file?.progress2)
            );
          }
          setshowprogressheader(lengthstore);
          if (parentid) {
            dispatch(CountCompaniesID(parentid, companylistid));
          } else {
            dispatch(CountCompanies(companylistid));
          }
          setTimeout(() => {
            setProgress1();
          }, 1000);
        });
      setopenUploadFile(false);
      setFiles([]);
      setcount([]);
      setshowprogress(true);
      setshowprogressdata(true);
      setProgress("10");
      setIsLoading(true);
      setcompanyvalue(null);
      setCollectionShowIdData()
    }
    setopenUploadCollection(false);
    setFileGallery([]);
    setCollectionShowIdData()
    setCollectionName("");
    // setTimeout(function () {
    //   dispatch(listAllCollectionDAM());
    // }, 2500);
    setdetailsid()
    setTimeout(() => {
      if (parentid) {
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
      }
    }, 700);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    // if (InsideData?.dam_media[0]?.company == "") {
    //   setcompanydataupdate(null);
    // } else {
    setcompanydataupdate(InsideData?.dam_media[0]?.company);
    // }
  }, [damdatainside]);

  const [newone, setnewone] = useState(false);
  const [fileContextMenu, setFileContextMenu] = React.useState(null);
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
    company
  ) => {
    if (root != null) {
      setrootid(root)
    } else {
      setrootid()
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
    if (count?.length > 0) {
      setdetailsid();
    } else {
      setdetailsid(id);
    }
    setCollectionShowIdData(id);
    if (file_type == 2) {
      setimagefav(id);
      setnewone(true);
    } else {
      setimagefav(dam);
      setnewone(false);
    }
    setdeletevaluesingle(dam);
    // setdeletevalue(dam)
    setcreateddate(moment(created).format("MMMM Do YYYY"));
    setusername(upload_by);
    settitleName(title);
    dispatch(DamDataDetails(dam));
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
    if (countfav.includes(dam)) {
      setisfavourite("UnFavorite");
    } else if (countfav.includes(id)) {
      setisfavourite("UnFavorite");
    } else {
      setisfavourite("Favorite");
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
  const handleFileClose = () => {
    setFileContextMenu(null);
    setdetailsid();
    setisfavourite();
    setCollectionShowIdData()
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
    company
  ) => {
    if (root != null) {
      setrootid(root)
    } else {
      setrootid()
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
    if (count?.length > 0) {
      setdetailsid();
    } else {
      setdetailsid(id);
    }
    setCollectionShowIdData(id);
    if (file_type == 2) {
      setimagefav(id);
      setnewone(true);
    } else {
      setimagefav(dam);
      setnewone(false);
    }
    // if (deletevalue?.length <= 0) {
    setdeletevaluesingle(dam);
    // }
    setcreateddate(moment(created).format("MMMM Do YYYY"));
    setusername(upload_by);
    setdeleteicontext(true);
    settitleName(title);
    dispatch(DamDataDetails(dam));
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

  const handleFileCloseVideo = () => {
    setFileVideoContextMenu(null);
    setisfavourite();
    setdetailsid();
    setCollectionShowIdData()
  };

  useEffect(() => {
    if (parentid == undefined) {
      sethidefolder(true);
      dispatch(listCompanies());
      dispatch(listAllCompanies());
      dispatch(listAllCollectionDAM());
      setLastElemenetChk();
    } else if (parentid) {
      dispatch(listCompaniesID(parentid));
      dispatch(listAllCompanies());
      dispatch(DAMParentCollection(parentid));
    }
  }, [collectionparentpostsucess, collectiondata, Collectionfilessucess]);

  const [folderContextMenu, setFolderContextMenu] = React.useState(null);

  const handleFolderContextMenu = (event, root, company_id, id, is_favourite, dam, name) => {
    if (root != null) {
      setrootid(root)
    } else {
      setrootid()
    }
    if (company_id) {
      setcompanyvalue(company_id)
    } else {
      setcompanyvalue(null)
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
  const handleCollectionContextMenu = (event, root, image_favourite, id, dam) => {
    event.preventDefault();
    if (root != null) {
      setrootid(root)
    } else {
      setrootid()
    }
    setTimeout(() => {
      setContextMenu(null);
    }, 10);
    setimagefav(id);
    setfolderdeleteid(id);
    setdetailsid(id);
    dispatch(DamDataDetails(dam));
    if (countfav.includes(id)) {
      setisfavouritecollection("UnFavorite");
    } else {
      setisfavouritecollection("Favorite");
    }
    setcollectiondamid(dam);
    setCollectionContextMenu(
      CollectionContextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : null
    );
  };

  const handleFolderClose = () => {
    setFolderContextMenu(null);
    setcompanyvalue(null)
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
    if (count?.length > 0) {
      formData.append("id_list", deletevalue);
      if (deleteicontext) {
        swal({
          title: "",
          text: "Are you sure you want to delete this Video",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(deletedam(formData));
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
          text: "Are you sure you want to delete this Image",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(deletedam(formData));
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
          text: "Are you sure you want to delete this Video",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(deleteCollection(deletevaluesingle));
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
          text: "Are you sure you want to delete this Image",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(deleteCollection(deletevaluesingle));
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
        if (item?.dam_media?.length <= 1) {
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
        if (item?.dam_media?.length <= 1) {
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
          if (DamDataCollectionId[0].dam_media?.length <= 1) {
            dispatch(deleteCollection(folderdeletedam));
          } else {
            dispatch(DamMutipledelete(folderdeleteid));
          }
        }
        dispatch(deleteCollection(folderdeleteid));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        setdeletevalue([]);
        setdeletevaluesingle();
        setcount([]);
        // setIsLoading(true);
        // setTimeout(() => {
        //   dispatch(listAllROOTDam());
        //   dispatch(listAllDamImages());
        //   dispatch(listAllRootImages());
        //   dispatch(listAllCollectionDAM());
        //   setdeletevalue([]);
        //   setcount([]);
        //   if (parentid) {
        //     dispatch(listAllDam(parentid));
        //     dispatch(getdamImageswithid(parentid));
        //     dispatch(getdamDetailswithid(parentid));
        //     dispatch(DAMParentCollection(parentidvalue));
        //   }
        // }, 1400);
        setTimeout(() => {
          if (parentid) {
            dispatch(listAllMostUsedcount(parentid));
          } else {
            dispatch(DamFilterFavourateCount());
          }
        }, 700);
      }
    });
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  };

  const favourite = () => {
    if (countfav.includes(imagefav)) {
      setcountfav(countfav?.filter((el, i) => el !== imagefav));
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
    if (favouritevalue === "Favorite") {
      formData.append("is_favourite", true);
    } else if (favouritevalue === "UnFavorite") {
      formData.append("is_favourite", false);
    }
    dispatch(Favorites(formData, imagefav));
    setdeletevalue([]);
    setdeletevaluesingle();
    setnewone(false);
    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    setTimeout(() => {
      if (companylistid?.length) {
        params += `&company=${companylistid}`;
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(CountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(CountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(CountCompanies(companylistid));
        }
      } else if (!companylistid?.length) {
        if (parentid) {
          dispatch(listAllMostUsedcount(parentid));
        } else {
          dispatch(DamFilterFavourateCount());
        }
      }
    }, 500);
    setdetailsid()
    // setimagefav();
  };

  const favouritecollection1 = () => {
    if (countfav.includes(imagefav)) {
      setcountfav(countfav?.filter((el, i) => el !== imagefav));
    } else {
      setcountfav([...countfav, imagefav]);
    }
    setCollectionContextMenu(null);
    setFileContextMenu(null);
    setFileVideoContextMenu(null);
    setContextMenu(null);
    setFolderContextMenu(null);
    setIsDisplayDetails(false);
    const formData = new FormData();
    if (favouritecollection === "Favorite") {
      formData.append("image_favourite", true);
    } else if (favouritecollection === "UnFavorite") {
      formData.append("image_favourite", false);
    }
    dispatch(Titleupdate(formData, imagefav));
    setisfavourite();
    setdeletevalue([]);
    setdeletevaluesingle();
    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    setTimeout(() => {
      if (companylistid?.length) {
        params += `&company=${companylistid}`;
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(CountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(CountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(CountCompanies(companylistid));
        }
      } else if (!companylistid?.length) {
        if (parentid) {
          dispatch(listAllMostUsedcount(parentid));
        } else {
          dispatch(DamFilterFavourateCount());
        }
      }
    }, 500);
    setdetailsid()
  };

  useEffect(() => {
    let jobshow = localStorage.getItem("jobdamid");
    if (jobshow) {
      dispatch(getdamImageswithid(jobshow));
    } else {
      dispatch(listAllRootImages());
      dispatch(listAllDamImages());
      if (parentid) {
        dispatch(getdamImageswithid(parentid));
      }
    }
  }, [collectionparentpostsucess]);

  const favouritefile = () => {
    if (countfav.includes(folderdeleteid)) {
      setcountfav(countfav?.filter((el, i) => el !== folderdeleteid));
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
    dispatch(Favorites(formData, folderdeleteid));
    setisfavouritefolder();
    setisfavouritecollection();
    setdeletevaluesingle();
    setdeletevalue([]);
    setfolderdeletedam();

    let jobshow = localStorage.getItem("jobdamid");
    let params = "";
    let companyparams = "";
    setTimeout(() => {
      if (companylistid?.length) {
        params += `&company=${companylistid}`;
        if (parentid || jobshow) {
          if (jobshow) {
            dispatch(CountCompaniesID(jobshow, companylistid));
          } else {
            dispatch(CountCompaniesID(parentid, companylistid));
          }
        } else {
          dispatch(CountCompanies(companylistid));
        }
      } else if (!companylistid?.length) {
        if (parentid) {
          dispatch(listAllMostUsedcount(parentid));
        } else {
          dispatch(DamFilterFavourateCount());
        }
      }
    }, 500);
    setdetailsid()
  };

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
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
      }
    }, 1000);
  };

  const duplicateFile = () => {
    dispatch(
      Damcopypost({
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
    setTimeout(() => {
      dispatch(listAllROOTDam());
      dispatch(listAllDamImages());
      dispatch(listAllRootImages());
      dispatch(listAllCollectionDAM());
      setdeletevalue([]);
      setdeletevaluesingle();
      setcount([]);
      if (parentid) {
        dispatch(listAllDam(parentid));
        dispatch(getdamImageswithid(parentid));
        dispatch(getdamDetailswithid(parentid));
        dispatch(DAMParentCollection(parentidvalue));
      }
    }, 1800);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setTimeout(() => {
      if (parentid) {
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
      }
    }, 1000);
  };

  const movefile = () => {
    setcopyFolderdata(true);
    setcopyFolderdata1(false);
    setcopyFolderdata2(false);
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
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
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
        dispatch(listAllMostUsedcount(parentid));
      } else {
        dispatch(DamFilterFavourateCount());
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

  const getvalue = (e) => {
    setrootdropdown(true);
    setfoldertransfer(e.target.value);
    dispatch(getdamDetailswithid(e.target.value));
  };

  const [savetagbutton, setSavetagButton] = useState("");
  function handleSaveTag(e, v) {
    if (savetagbutton?.length < 1) return;

    const filteredTags = tags?.filter(
      (str) => str.toLowerCase() == savetagbutton.toLowerCase()
    );

    if (filteredTags?.length > 0) {
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

    const filteredTags = tags?.filter(
      (str) => str.toLowerCase() == value.toLowerCase()
    );

    if (filteredTags?.length > 0) {
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
    setTags(tags?.filter((el, i) => i !== index));
  }

  return (
    <>
      {/* {moveonbro ||
      checkok ||
      collectionparentpost ||
      getdatawhere ||
      deleteloader ||
      deleteCollectionloader ||
      rootimages ||
      filterloader ||
      parentloader ? (
        <LoadingSpinner />
      ) : ( */}
      <>
        <>
          {/* {JSON.stringify(DamImageData)} */}

          {/* <div className="vector_toggleNew">
            {!isShown && <>
            <img
              onClick={handleClickShowMediaTable}
              className="vector_img"
              src="/img/mediaimagevector.png"
            />
            </>}
          </div> */}

          {isShown ? (
            <>
              <Media />
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
              {/* {json.stringify(DamRootImages)} */}
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
                              <img src="/img/createfolder.png" /> Create a folder
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
                    </>)}
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
                            <Link to={`/media-table`} className="closebuttonsec">
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
                              to={`/media-table/${parentid}`}
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
                            <Movemedia setSkillsMove={setSkillsMove} />
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
                          {(skillsMove || parentid) && <>
                            <Button
                              className="shareNewPop"
                              onClick={() =>
                                movefilelocation(
                                  "2"
                                )
                              }
                            >
                              {copyfolderdata && <> Move </>}
                              {copyfolderdata1 && !open2 && <> Copy </>}
                              {copyfolderdata2 && <> Move </>}
                              {open2 && copyfolderdata1 && <>Copy</>}
                              {open2 && !copyfolderdata1 && <>Move</>}
                            </Button>
                            {rootid != "Null" && <>
                              <Button
                                className="shareNewPop move-to-media-btn"
                                onClick={() =>
                                  movefilelocation(
                                    "1"
                                  )
                                }
                              >
                                {copyfolderdata && <> Move to main Media </>}
                                {copyfolderdata1 && !open2 && <> Copy to main media </>}
                                {copyfolderdata2 && <> Move to main media </>}
                                {open2 && copyfolderdata1 && <>Copy to main media</>}
                                {open2 && !copyfolderdata1 && <>Move to main media</>}
                              </Button>
                            </>}
                          </>}
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
                                {companyData?.map((item) =>
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
                          <Button
                            className="shareNewPop"
                            onClick={renamedone}
                          >
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
                                MenuProps={menuProps}
                                value={companyvalue}
                                onChange={companydatavalue}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                              >
                                <MenuItem value={null}>Select Company</MenuItem>
                                {companyData?.map((item) =>
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
                                MenuProps={menuProps}
                                value={companyvalue}
                                onChange={companydatavalue}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                              >
                                <MenuItem value={null}>Select Company</MenuItem>
                                {companyData?.map((item) =>
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
                                MenuProps={menuProps}
                                value={companyvalue}
                                onChange={companydatavalue}
                                displayEmpty
                                inputProps={{
                                  "aria-label": "Without label",
                                }}
                              >
                                <MenuItem value={null}>Select Company</MenuItem>
                                {companyData?.map((item) =>
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
                      {count?.length > 0 && (
                        <>
                          <div className="job_select_contnet">
                            <h6 className="files_selct_content11">
                              <span className="number22">{count?.length}</span>
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
                              </>)}
                          </div>
                          <div className="delete_share_contnet">
                            <i className="fa fa-share-alt"></i>
                            <i
                              className="fa fa-trash-o"
                              onClick={deleteimage}
                            ></i>
                            <i className="fa fa-close" onClick={resetcount}></i>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sidebarclass">
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
                            //   users?.filter((user) => user?.isChecked !== true)?.length < 1
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
                            <label className="form-check-label ms-1 textDarkFileTypesData">
                              <span> {user.name}</span>

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
                <div className="dataTableMediaMainDiv  addedone newPositionToggle">
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
                      Select All
                    </MenuItem>
                  </Menu>
                  {count?.length > 0 && (
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
                            <MenuItem onClick={handleCreateCollection}>
                              {" "}
                              <img src="/img/createjobrc.png" />
                              Create Collection
                            </MenuItem>
                          </>)}
                        <MenuItem onClick={favourite}>
                          {" "}
                          <img src="/img/favouriterc.png" /> {favouritevalue}
                        </MenuItem>
                        <MenuItem>
                          {" "}
                          <img src="/img/sharelinkrc.png" /> Share link
                        </MenuItem>
                        <MenuItem onClick={moveimages}>
                          {" "}
                          <img src="/img/movetorc.png" />
                          Move
                          {/* {count?.length > 0 && <>Move All</>}
   {count?.length <= 0 && <>Move </>} */}
                        </MenuItem>

                        <MenuItem onClick={copyFile}>
                          {" "}
                          <img src="/img/copytorc.png" /> Copy
                        </MenuItem>

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

                  {count?.length <= 0 && (
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
                        <MenuItem>
                          {" "}
                          <img src="/img/sharelinkrc.png" /> Share link
                        </MenuItem>
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
                          {/* {count?.length > 0 && <>Move All</>}
   {count?.length <= 0 && <>Move </>} */}
                        </MenuItem>

                        <MenuItem onClick={copyFile}>
                          {" "}
                          <img src="/img/copytorc.png" /> Copy
                        </MenuItem>
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
                        <MenuItem onClick={handleCreateCollection}>
                          {" "}
                          <img src="/img/createjobrc.png" />
                          Create Collection
                        </MenuItem>
                      </>)}
                    <MenuItem onClick={favourite}>
                      {" "}
                      <img src="/img/favouriterc.png" /> {favouritevalue}
                    </MenuItem>
                    <MenuItem onClick={fullWidthVideo}>
                      {" "}
                      <img src="/img/copytorc.png" /> Video View
                    </MenuItem>
                    {/* {imagelink && (
                      <>
                        {" "}
                        <MenuItem onClick={handleOpenShareMedia}>
                          {" "}
                          <img src="/img/sharelinkrc.png" /> {name}
                        </MenuItem>
                      </>
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
                    <MenuItem onClick={renamefile}>
                      {" "}
                      <img src="/img/movetorc.png" /> Rename
                    </MenuItem>
                    <MenuItem onClick={movefile}>
                      {" "}
                      <img src="/img/movetorc.png" /> Move
                    </MenuItem>
                    <MenuItem onClick={companyChangeFile}>
                      {" "}
                      <img src="/img/movetorc.png" />Company
                    </MenuItem>
                  </Menu>

                  <Menu
                    className="mediaRightClickCreateUploadPortF heightadjustment"
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
                    {/* <MenuItem>
                    {" "}
                    <img src="/img/copytorc.png" /> Copy to
                  </MenuItem> */}
                  </Menu>

                  {!hidefolder && (
                    <>
                      <div className="AllDriveContent">
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
                      </div>
                    </>
                  )}
                  {/* {inputRef.current && <>
                  {JSON.stringify(inputRef?.current)}
                  </>} */}

                  {showprogress && (
                    <>
                      {inputRef.current?.length && (
                        <>
                          {inputRef.current?.slice(0, 1).map((file, index) => (
                            <>
                              <>
                                {!showprogressheader.every(checkAge) && (
                                  <>
                                    <div className="agencyprogress">
                                      {CollectionNameShow && <>({CollectionNameShow.substring(0, 5)})</>}
                                      {!CollectionNameShow && <> <h6>({file.title.substring(0, 5)})</h6></>}
                                      <div className="agencynewdiv">
                                        <ProgressBar
                                          now={file?.progress2}
                                          label={`${file?.progress2}%`}
                                        />{" "}
                                      </div>
                                      <div className="progressbarricon">
                                        <i
                                          className="fa fa-caret-down dropdown"
                                          onClick={UploadProgress}
                                        ></i>
                                      </div>
                                    </div>
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
                  )}
                  <div className="vector_toggleNewUppers vector_toggleNewUppers1">
                    {!isShown && (
                      <>
                        <img
                          onClick={handleClickShowMediaTable}
                          className="vector_img"
                          src="/img/mediaimagevector.png"
                        />
                        <span className="table-view-text">Table view</span>
                      </>
                    )}
                  </div>
                  {/* <div className="folder_heading folder_headingmedia">
                    {hidefolder && RootDamData?.length > 0 && !searchfolder && (
                      <>
                        {" "}
                        <h4 className="files11_contnet">Folders</h4>
                      </>
                    )}
                    {!hidefolder && DamData1?.length > 0 && !searchfolder && (
                      <>
                        {" "}
                        <h4 className="files11_contnet">Folders</h4>
                      </>
                    )}
                  </div> */}
                  {/* <h4 className="Foldersnametable">Folders</h4> */}
                  {/* <div className="foldershowclass">
                    {hidefolder &&
                      !searchfolder &&
                      RootDamData?.map((item) => (
                        <>
                          <div
                            className="yourFavDayDayTime"
                            onClick={() =>
                              foldernavigate(
                                item.parent,
                                item.is_parent,
                                item.id,
                                item.name
                              )
                            }
                            onContextMenu={(event) =>
                              handleFolderContextMenu(
                                event,
                                item.id,
                                item.is_favourite,
                                item?.dam,
                                item?.name
                              )
                            }
                          >
                            <div className="yourFavDayDiv">
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
                              <span>{item?.name}</span>
                            </div>
                          </div>
                        </>
                      ))}

                    {searchfolder &&
                      DamSearchnew?.map((item) => (
                        <>
                          {item?.type == 1 && (
                            <>
                              <div
                                className="yourFavDayDayTime"
                                onClick={() =>
                                  foldernavigate(
                                    item.parent,
                                    item.is_parent,
                                    item.id,
                                    item.name
                                  )
                                }
                                onContextMenu={(event) =>
                                  handleFolderContextMenu(
                                    event,
                                    item.id,
                                    item.is_favourite,
                                    item?.dam,
                                    item?.name
                                  )
                                }
                              >
                                <div className="yourFavDayDiv">
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
                                  <span>{item?.name}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}

                    {!hidefolder &&
                      !searchfolder &&
                      DamData1?.map((item) => (
                        <>
                          <div
                            className="yourFavDayDayTime"
                            onClick={() =>
                              foldernavigate(
                                item.parent,
                                item.is_parent,
                                item.id,
                                item.name
                              )
                            }
                            onContextMenu={(event) =>
                              handleFolderContextMenu(
                                event,
                                item.id,
                                item.is_favourite,
                                item?.dam,
                                item?.name
                              )
                            }
                          >
                            <div className="yourFavDayDiv">
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
                              <span>{item?.name}</span>
                            </div>
                          </div>
                        </>
                      ))}
                  </div> */}

                  <div className="ForMobileview">
                    <div className="dataTableMediaDiv">
                      <div className="nameWithArrowTable">
                        <h5>
                          Name
                          <img src="/img/arrow-up.png" />
                        </h5>
                      </div>
                      <div className="UploadWithArrowTable">
                        <h5>Upload by</h5>
                      </div>
                      <div className="JobsWithArrowTable">
                        <h5>Jobs</h5>
                      </div>
                      <div className="ModifiedWithArrowTable">
                        <h5>Last Modified</h5>
                      </div>
                      <div className="NumberWithArrowTable">
                        <h5>Number of Files</h5>
                      </div>
                      <div className="NumberWithArrowTable">
                        <h5>File Type</h5>
                      </div>
                    </div>

                    {hidefolder && !searchfolder && yourfilter && (
                      <>
                        {RootDamData?.map((item) => (
                          <>
                            <div
                              className={
                                count.includes(item?.id)
                                  ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                  : "firstRowMediaDataTable"
                              }
                              onClick={() =>
                                foldernavigate(
                                  item.parent,
                                  item.is_parent,
                                  item.id,
                                  item.name
                                )
                              }
                              onContextMenu={(event) =>
                                handleFolderContextMenu(
                                  event,
                                  item.root,
                                  item.company_id,
                                  item.id,
                                  item.is_favourite,
                                  item?.dam,
                                  item?.name
                                )
                              }
                            >
                              <div className="logoGallerywithText">
                                {countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/folder1.png" />
                                  </>
                                )}
                                {!countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}

                                <span>
                                  {item?.name}
                                  {/* {item?.name?.length > 20
                                      ? item?.name?.substring(0, 20)
                                      : item?.name} */}
                                </span>
                              </div>
                              <h3 className="johndoenameTable">
                                {item?.upload_by}
                              </h3>
                              <h3 className="onethreetwofour">-</h3>

                              <h3 className="lastmodifiedDatejuly">
                                {moment(item?.created).format("YYYY-MM-DD")}
                              </h3>
                              <h3 className="oneFiveNumber">
                                {item.total_obj}
                              </h3>
                              <h3 className="oneSixNumber">-</h3>
                            </div>
                          </>
                        ))}
                      </>
                    )}

                    {hidefolder && searchfolder && yourfilter && (
                      <>
                        {DamSearchnew?.map((item) => (
                          <>
                            {
                              (item.type = 1 && (
                                <>
                                  <div
                                    className={
                                      count.includes(item?.id)
                                        ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                        : "firstRowMediaDataTable"
                                    }
                                    onClick={() =>
                                      foldernavigate(
                                        item.parent,
                                        item.is_parent,
                                        item.id,
                                        item.name
                                      )
                                    }
                                    onContextMenu={(event) =>
                                      handleFolderContextMenu(
                                        event,
                                        item.root,
                                        item.company_id,
                                        item.id,
                                        item.is_favourite,
                                        item?.dam,
                                        item?.name
                                      )
                                    }
                                  >
                                    <div className="logoGallerywithText">
                                      {countfav?.includes(item?.id) && (
                                        <>
                                          <img src="/img/folder1.png" />
                                        </>
                                      )}
                                      {!countfav?.includes(item?.id) && (
                                        <>
                                          <img src="/img/foldericon.png" />
                                        </>
                                      )}
                                      <span>
                                        {item?.name}
                                        {/* {item?.name?.length > 20
                                      ? item?.name?.substring(0, 20)
                                      : item?.name} */}
                                      </span>
                                    </div>
                                    <h3 className="johndoenameTable">
                                      {item?.upload_by}
                                    </h3>
                                    <h3 className="onethreetwofour">-</h3>

                                    <h3 className="lastmodifiedDatejuly">
                                      {moment(item?.created).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </h3>
                                    <h3 className="oneFiveNumber">
                                      {item.total_obj}
                                    </h3>
                                    <h3 className="oneSixNumber">-</h3>
                                  </div>
                                </>
                              ))
                            }
                          </>
                        ))}
                      </>
                    )}

                    {!hidefolder && !searchfolder && yourfilter && (
                      <>
                        {DamData1?.map((item) => (
                          <>
                            <div
                              className={
                                count.includes(item?.id)
                                  ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                  : "firstRowMediaDataTable"
                              }
                              onClick={() =>
                                foldernavigate(
                                  item.parent,
                                  item.is_parent,
                                  item.id,
                                  item.name
                                )
                              }
                              onContextMenu={(event) =>
                                handleFolderContextMenu(
                                  event,
                                  item.root,
                                  item.company_id,
                                  item.id,
                                  item.is_favourite,
                                  item?.dam,
                                  item?.name
                                )
                              }
                            >
                              <div className="logoGallerywithText">
                                {countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/folder1.png" />
                                  </>
                                )}
                                {!countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}
                                <span>
                                  {item?.name}
                                  {/* {item?.name?.length > 20
                                      ? item?.name?.substring(0, 20)
                                      : item?.name} */}
                                </span>
                              </div>
                              <h3 className="johndoenameTable">
                                {item?.upload_by}
                              </h3>
                              <h3 className="onethreetwofour">-</h3>

                              <h3 className="lastmodifiedDatejuly">
                                {moment(item?.created).format("YYYY-MM-DD")}
                              </h3>
                              <h3 className="oneFiveNumber">
                                {item.total_obj}
                              </h3>
                              <h3 className="oneSixNumber">-</h3>
                            </div>
                          </>
                        ))}
                      </>
                    )}

                    {hidefolder && !searchfolder && yourfilter && (
                      <>
                        {DamRootImages?.map((item) => (
                          <>
                            {item?.dam_media.map((value) => (
                              <>
                                {item?.is_video == false && (
                                  <>
                                    <div
                                      className={
                                        count.includes(value?.id) || detailsid == value?.id
                                          ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                          : "firstRowMediaDataTable"
                                      }
                                      onContextMenu={(event) =>
                                        handleFileContextMenu(
                                          value.root,
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
                                        countimages(value?.id, value?.dam)
                                      }
                                    >
                                      {isOpenImg && (
                                        <ModalImg
                                          src={fullview}
                                          alt="recent images"
                                          onClose={closepopup}
                                        />
                                      )}
                                      <div className="logoGallerywithText">
                                        <img src="/img/assertgallery.png" />
                                        <span>
                                          {value?.title?.length > 20
                                            ? value?.title?.substring(0, 20)
                                            : value?.title}
                                        </span>
                                        <span className="smallStarMargin">
                                          {countfav?.includes(value?.dam) && (
                                            <>
                                              {" "}
                                              <img src="/img/startimg1.png" />
                                            </>
                                          )}
                                        </span>
                                      </div>
                                      <h3 className="johndoenameTable">
                                        {value?.upload_by}
                                      </h3>
                                      <h3 className="onethreetwofour">
                                        {value?.job_count}
                                      </h3>

                                      <h3 className="lastmodifiedDatejuly">
                                        {moment(value?.created).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h3>
                                      <h3 className="oneFiveNumber">1</h3>
                                      <h3 className="oneSixNumber">
                                        {value?.get_file_extension}
                                      </h3>
                                    </div>
                                  </>
                                )}

                                {item?.is_video == true && (
                                  <>
                                    <div
                                      className={
                                        count.includes(value?.id) || detailsid == value?.id
                                          ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                          : "firstRowMediaDataTable"
                                      }
                                      onContextMenu={(event) =>
                                        handleFileVideoContextMenu(
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
                                        countimages(value?.id, value?.dam)
                                      }
                                    >
                                      {isOpenImg && (
                                        <ModalImg
                                          src={fullview}
                                          alt="recent images"
                                          onClose={closepopup}
                                        />
                                      )}
                                      <div className="logoGallerywithText">
                                        <img src="/img/video.png" />
                                        <span>
                                          {value?.title?.length > 20
                                            ? value?.title?.substring(0, 20)
                                            : value?.title}
                                        </span>
                                        <span className="smallStarMargin">
                                          {countfav?.includes(value?.dam) && (
                                            <>
                                              {" "}
                                              <img src="/img/startimg1.png" />
                                            </>
                                          )}
                                        </span>
                                      </div>
                                      <h3 className="johndoenameTable">
                                        {value?.upload_by}
                                      </h3>
                                      <h3 className="onethreetwofour">
                                        {value?.job_count}
                                      </h3>

                                      <h3 className="lastmodifiedDatejuly">
                                        {moment(value?.created).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h3>
                                      <h3 className="oneFiveNumber">1</h3>
                                      <h3 className="oneSixNumber">
                                        {value?.get_file_extension}
                                      </h3>
                                    </div>
                                  </>
                                )}
                              </>
                            ))}
                          </>
                        ))}
                        {isOpenFullVideo && (
                          <div className="fullVideoPlaydivVodeo">
                            <div className="videoview">
                              <video
                                className="videoSWithDamDataFullVideo"
                                controls
                              >
                                <source src={fullview} type="video/mp4" />
                              </video>
                              {/* <div className="fullVideoCloseTagDiv">
                                <h5 onClick={videFullCloseFun}>X</h5>
                              </div> */}
                            </div>
                            <div className="fullVideoCloseTagDiv mediadatat">
                              <h5 onClick={videFullCloseFun}>X</h5>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {hidefolder && !searchfolder && !yourfilter && (
                      <>
                        {DamCountDataid?.folders?.map((item) => (
                          <>
                            <div
                              className={
                                count.includes(item?.id)
                                  ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                  : "firstRowMediaDataTable"
                              }
                              onClick={() =>
                                foldernavigate(
                                  item.parent,
                                  item.is_parent,
                                  item.id,
                                  item.name
                                )
                              }
                              onContextMenu={(event) =>
                                handleFolderContextMenu(
                                  event,
                                  item.root,
                                  item.company_id,
                                  item.id,
                                  item.is_favourite,
                                  item?.dam,
                                  item?.name
                                )
                              }
                            >
                              <div className="logoGallerywithText">
                                {countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/folder1.png" />
                                  </>
                                )}
                                {!countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}

                                <span>
                                  {item?.name}
                                  {/* {item?.name?.length > 20
                                      ? item?.name?.substring(0, 20)
                                      : item?.name} */}
                                </span>
                              </div>
                              <h3 className="johndoenameTable">
                                {item?.upload_by}
                              </h3>
                              <h3 className="onethreetwofour">-</h3>

                              <h3 className="lastmodifiedDatejuly">
                                {moment(item?.created).format("YYYY-MM-DD")}
                              </h3>
                              <h3 className="oneFiveNumber">
                                {item.total_obj}
                              </h3>
                              <h3 className="oneSixNumber">-</h3>
                            </div>
                          </>
                        ))}
                      </>
                    )}

                    {!hidefolder && !searchfolder && !yourfilter && (
                      <>
                        {DamParentFilter?.folders?.map((item) => (
                          <>
                            <div
                              className={
                                count.includes(item?.id)
                                  ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                  : "firstRowMediaDataTable"
                              }
                              onClick={() =>
                                foldernavigate(
                                  item.parent,
                                  item.is_parent,
                                  item.id,
                                  item.name
                                )
                              }
                              onContextMenu={(event) =>
                                handleFolderContextMenu(
                                  event,
                                  item.root,
                                  item.company_id,
                                  item.id,
                                  item.is_favourite,
                                  item?.dam,
                                  item?.name
                                )
                              }
                            >
                              <div className="logoGallerywithText">
                                {countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/folder1.png" />
                                  </>
                                )}
                                {!countfav?.includes(item?.id) && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}

                                <span>
                                  {item?.name}
                                  {/* {item?.name?.length > 20
                                      ? item?.name?.substring(0, 20)
                                      : item?.name} */}
                                </span>
                              </div>
                              <h3 className="johndoenameTable">
                                {item?.upload_by}
                              </h3>
                              <h3 className="onethreetwofour">-</h3>

                              <h3 className="lastmodifiedDatejuly">
                                {moment(item?.created).format("YYYY-MM-DD")}
                              </h3>
                              <h3 className="oneFiveNumber">
                                {item.total_obj}
                              </h3>
                              <h3 className="oneSixNumber">-</h3>
                            </div>
                          </>
                        ))}
                      </>
                    )}

                    {hidefolder && !searchfolder && !yourfilter && (
                      <>
                        <div>
                          {DamCountDataid?.photos?.length > 0 && (
                            <>
                              {DamCountDataid?.photos?.map((item) => (
                                <>
                                  <>
                                    {item?.dam_media.map((value) => (
                                      <>
                                        <div
                                          className={
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                          onContextMenu={(event) =>
                                            handleFileContextMenu(
                                              value.root,
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
                                            countimages(value?.id, value?.dam)
                                          }
                                        >
                                          {isOpenImg && (
                                            <ModalImg
                                              src={fullview}
                                              alt="recent images"
                                              onClose={closepopup}
                                            />
                                          )}
                                          <div className="logoGallerywithText">
                                            <img src="/img/assertgallery.png" />
                                            <span>{value?.title}</span>
                                            <span className="smallStarMargin">
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img src="/img/startimg1.png" />
                                                  </>
                                                )}
                                            </span>
                                          </div>
                                          <h3 className="johndoenameTable">
                                            {value?.upload_by}
                                          </h3>
                                          <h3 className="onethreetwofour">
                                            {value?.job_count}
                                          </h3>

                                          <h3 className="lastmodifiedDatejuly">
                                            {moment(value?.created).format(
                                              "YYYY-MM-DD"
                                            )}
                                          </h3>
                                          <h3 className="oneFiveNumber">1</h3>
                                          <h3 className="oneSixNumber">
                                            {value?.get_file_extension}
                                          </h3>
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
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                          onContextMenu={(event) =>
                                            handleFileContextMenu(
                                              value.root,
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
                                            countimages(value?.id, value?.dam)
                                          }
                                        >
                                          {isOpenImg && (
                                            <ModalImg
                                              src={fullview}
                                              alt="recent images"
                                              onClose={closepopup}
                                            />
                                          )}
                                          <div className="logoGallerywithText">
                                            <img src="/img/assertgallery.png" />
                                            <span>{value?.title}</span>
                                            <span className="smallStarMargin">
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img src="/img/startimg1.png" />
                                                  </>
                                                )}
                                            </span>
                                          </div>
                                          <h3 className="johndoenameTable">
                                            {value?.upload_by}
                                          </h3>
                                          <h3 className="onethreetwofour">
                                            {value?.job_count}
                                          </h3>

                                          <h3 className="lastmodifiedDatejuly">
                                            {moment(value?.created).format(
                                              "YYYY-MM-DD"
                                            )}
                                          </h3>
                                          <h3 className="oneFiveNumber">1</h3>
                                          <h3 className="oneSixNumber">
                                            {value?.get_file_extension}
                                          </h3>
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

                    {hidefolder && !searchfolder && !yourfilter && (
                      <>
                        <div>
                          {DamCountDataid?.videos?.length > 0 && (
                            <>
                              {DamCountDataid?.videos?.map((item) => (
                                <>
                                  <>
                                    {item?.dam_media.map((value) => (
                                      <>
                                        <div
                                          onClick={() =>
                                            countimages(value?.id, value?.dam)
                                          }
                                          onContextMenu={(event) =>
                                            handleFileVideoContextMenu(
                                              value.root,
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
                                          className={
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                        >
                                          {value?.is_video == true && (
                                            <>
                                              <div className="logoGallerywithText">
                                                <img src="/img/video.png" />
                                                <span>{value?.title}</span>
                                              </div>
                                              <h3 className="johndoenameTable">
                                                {value?.upload_by}
                                              </h3>
                                              <h3 className="onethreetwofour">
                                                {value?.job_count}
                                              </h3>

                                              <h3 className="lastmodifiedDatejuly">
                                                {moment(value?.created).format(
                                                  "YYYY-MM-DD"
                                                )}
                                              </h3>
                                              <h3 className="oneFiveNumber">
                                                1
                                              </h3>
                                              <h3 className="oneSixNumber">
                                                {value?.get_file_extension}
                                              </h3>
                                            </>
                                          )}
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
                              {DamCountDataid?.photos?.map((item) => (
                                <>
                                  <>
                                    {item?.dam_media.map((value) => (
                                      <>
                                        <div
                                          className={
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                          onContextMenu={(event) =>
                                            handleFileContextMenu(
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
                                            countimages(value?.id, value?.dam)
                                          }
                                        >
                                          {isOpenImg && (
                                            <ModalImg
                                              src={fullview}
                                              alt="recent images"
                                              onClose={closepopup}
                                            />
                                          )}
                                          <div className="logoGallerywithText">
                                            <img src="/img/assertgallery.png" />
                                            <span>{value?.title}</span>
                                            <span className="smallStarMargin">
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img src="/img/startimg1.png" />
                                                  </>
                                                )}
                                            </span>
                                          </div>
                                          <h3 className="johndoenameTable">
                                            {value?.upload_by}
                                          </h3>
                                          <h3 className="onethreetwofour">
                                            {value?.job_count}
                                          </h3>

                                          <h3 className="lastmodifiedDatejuly">
                                            {moment(value?.created).format(
                                              "YYYY-MM-DD"
                                            )}
                                          </h3>
                                          <h3 className="oneFiveNumber">1</h3>
                                          <h3 className="oneSixNumber">
                                            {value?.get_file_extension}
                                          </h3>
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

                    {hidefolder && !searchfolder && !yourfilter && (
                      <>
                        <div>
                          {DamCountDataid?.is_favourite?.length > 0 && (
                            <>
                              {DamCountDataid?.photos?.map((item) => (
                                <>
                                  <>
                                    {item?.dam_media.map((value) => (
                                      <>
                                        <div
                                          className={
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                          onContextMenu={(event) =>
                                            handleFileContextMenu(
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
                                            countimages(value?.id, value?.dam)
                                          }
                                        >
                                          {isOpenImg && (
                                            <ModalImg
                                              src={fullview}
                                              alt="recent images"
                                              onClose={closepopup}
                                            />
                                          )}
                                          <div className="logoGallerywithText">
                                            <img src="/img/assertgallery.png" />
                                            <span>{value?.title}</span>
                                            <span className="smallStarMargin">
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img src="/img/startimg1.png" />
                                                  </>
                                                )}
                                            </span>
                                          </div>
                                          <h3 className="johndoenameTable">
                                            {value?.upload_by}
                                          </h3>
                                          <h3 className="onethreetwofour">
                                            {value?.job_count}
                                          </h3>

                                          <h3 className="lastmodifiedDatejuly">
                                            {moment(value?.created).format(
                                              "YYYY-MM-DD"
                                            )}
                                          </h3>
                                          <h3 className="oneFiveNumber">1</h3>
                                          <h3 className="oneSixNumber">-</h3>
                                        </div>
                                      </>
                                    ))}
                                  </>
                                </>
                              ))}
                            </>
                          )}
                          {DamCountDataid?.collections?.length > 0 && (
                            <>
                              {DamCountDataid?.collections?.map((item) => (
                                <>
                                  <div
                                    className="yourFavDayDayTime collectionnewone"
                                    onClick={() => Collectiondatashow(item?.id)}
                                    onContextMenu={(event) =>
                                      handleFolderContextMenu(
                                        event,
                                        item.root,
                                        item.company_id,
                                        item.id,
                                        item.is_favourite,
                                        item.dam,
                                        item?.name
                                      )
                                    }
                                  >
                                    <div className="yourFavDayDivcollection ">
                                      <div className="frame">
                                        <img src="/img/Frame.png" />
                                        <span>{item?.name}</span>
                                        <span className="smallStarMargin">
                                          {countfav?.includes(item?.id) && (
                                            <>
                                              {" "}
                                              <img src="/img/startimg1.png" />
                                            </>
                                          )}
                                        </span>
                                      </div>
                                      <h3 className="johndoenameTable">
                                        {item?.upload_by}
                                      </h3>
                                      <h3 className="onethreetwofour">0</h3>

                                      <h3 className="lastmodifiedDatejuly">
                                        {moment(item?.created).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h3>
                                      <h3 className="oneFiveNumber">
                                        {" "}
                                        {item?.dam_media?.length}
                                      </h3>
                                      <h3 className="oneSixNumber">-</h3>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </>
                          )}


                        </div>
                      </>
                    )}

                    {!hidefolder && !searchfolder && !yourfilter && (
                      <>
                        <div>
                          {DamParentFilter?.photos?.length > 0 && (
                            <>
                              {DamParentFilter?.photos?.map((item) => (
                                <>
                                  <>
                                    {item?.dam_media.map((value) => (
                                      <>
                                        <div
                                          className={
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                          onContextMenu={(event) =>
                                            handleFileContextMenu(
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
                                            countimages(value?.id, value?.dam)
                                          }
                                        >
                                          {isOpenImg && (
                                            <ModalImg
                                              src={fullview}
                                              alt="recent images"
                                              onClose={closepopup}
                                            />
                                          )}
                                          <div className="logoGallerywithText">
                                            <img src="/img/assertgallery.png" />
                                            <span>{value?.title}</span>
                                            <span className="smallStarMargin">
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img src="/img/startimg1.png" />
                                                  </>
                                                )}
                                            </span>
                                          </div>
                                          <h3 className="johndoenameTable">
                                            {value?.upload_by}
                                          </h3>
                                          <h3 className="onethreetwofour">
                                            {value?.job_count}
                                          </h3>

                                          <h3 className="lastmodifiedDatejuly">
                                            {moment(value?.created).format(
                                              "YYYY-MM-DD"
                                            )}
                                          </h3>
                                          <h3 className="oneFiveNumber">1</h3>
                                          <h3 className="oneSixNumber">
                                            {value?.get_file_extension}
                                          </h3>
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
                        <div>
                          {DamParentFilter?.collections?.length > 0 && (
                            <>
                              {DamParentFilter?.collections?.map((item) => (
                                <>
                                  <div
                                    className="yourFavDayDayTime collectionnewone"
                                    onClick={() => Collectiondatashow(item?.id)}
                                    onContextMenu={(event) =>
                                      handleFolderContextMenu(
                                        event,
                                        item.root,
                                        item.company_id,
                                        item.id,
                                        item.is_favourite,
                                        item.dam,
                                        item?.name
                                      )
                                    }
                                  >
                                    <div className="yourFavDayDivcollection ">
                                      <div className="frame">
                                        <img src="/img/Frame.png" />
                                        <span>{item?.name}</span>
                                        <span className="smallStarMargin">
                                          {countfav?.includes(item?.id) && (
                                            <>
                                              {" "}
                                              <img src="/img/startimg1.png" />
                                            </>
                                          )}
                                        </span>
                                      </div>
                                      <h3 className="johndoenameTable">
                                        {item?.upload_by}
                                      </h3>
                                      <h3 className="onethreetwofour">0</h3>

                                      <h3 className="lastmodifiedDatejuly">
                                        {moment(item?.created).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h3>
                                      <h3 className="oneFiveNumber">
                                        {item?.dam_media?.length}
                                      </h3>
                                      <h3 className="oneSixNumber">-</h3>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </>
                          )}

                          {DamParentFilter?.is_favourite?.length > 0 && (
                            <>
                              {DamParentFilter?.is_favourite?.map((item) => (
                                <>
                                  <>
                                    {item?.dam_media.map((value) => (
                                      <>
                                        <div
                                          className={
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                          onContextMenu={(event) =>
                                            handleFileContextMenu(
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
                                            countimages(value?.id, value?.dam)
                                          }
                                        >
                                          {isOpenImg && (
                                            <ModalImg
                                              src={fullview}
                                              alt="recent images"
                                              onClose={closepopup}
                                            />
                                          )}
                                          <div className="logoGallerywithText">
                                            <img src="/img/assertgallery.png" />
                                            <span>{value?.title}</span>
                                            <span className="smallStarMargin">
                                              {countfav?.includes(
                                                value?.dam
                                              ) && (
                                                  <>
                                                    {" "}
                                                    <img src="/img/startimg1.png" />
                                                  </>
                                                )}
                                            </span>
                                          </div>
                                          <h3 className="johndoenameTable">
                                            {value?.upload_by}
                                          </h3>
                                          <h3 className="onethreetwofour">
                                            {value?.job_count}
                                          </h3>

                                          <h3 className="lastmodifiedDatejuly">
                                            {moment(value?.created).format(
                                              "YYYY-MM-DD"
                                            )}
                                          </h3>
                                          <h3 className="oneFiveNumber">1</h3>
                                          <h3 className="oneSixNumber">
                                            {value?.get_file_extension}
                                          </h3>
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
                        <div>
                          {DamParentFilter?.videos?.length > 0 && (
                            <>
                              {DamParentFilter?.videos?.map((item) => (
                                <>
                                  <>
                                    {item?.dam_media.map((value) => (
                                      <>
                                        <div
                                          onClick={() =>
                                            countimages(value?.id, value?.dam)
                                          }
                                          className={
                                            count.includes(value?.id) || detailsid == value?.id
                                              ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                              : "firstRowMediaDataTable"
                                          }
                                        >
                                          {value?.is_video == true && (
                                            <>
                                              <div className="logoGallerywithText">
                                                <img src="/img/video.png" />
                                                <span>{value?.title}</span>
                                              </div>
                                              <h3 className="johndoenameTable">
                                                {value?.upload_by}
                                              </h3>
                                              <h3 className="onethreetwofour">
                                                {value?.job_count}
                                              </h3>

                                              <h3 className="lastmodifiedDatejuly">
                                                {moment(value?.created).format(
                                                  "YYYY-MM-DD"
                                                )}
                                              </h3>
                                              <h3 className="oneFiveNumber">
                                                1
                                              </h3>
                                              <h3 className="oneSixNumber">
                                                {value?.get_file_extension}
                                              </h3>
                                            </>
                                          )}
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

                    {!hidefolder && yourfilter && (
                      <>
                        {DamDataImages?.map((item) => (
                          <>
                            {item?.dam_media.map((value) => (
                              <>
                                {item?.is_video == false && (
                                  <>
                                    <div
                                      className={
                                        count.includes(value?.id) || detailsid == value?.id
                                          ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                          : "firstRowMediaDataTable"
                                      }
                                      onContextMenu={(event) =>
                                        handleFileContextMenu(
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
                                        countimages(value?.id, value?.dam)
                                      }
                                    >
                                      {isOpenImg && (
                                        <ModalImg
                                          src={fullview}
                                          alt="recent images"
                                          onClose={closepopup}
                                        />
                                      )}
                                      <div className="logoGallerywithText">
                                        <img src="/img/assertgallery.png" />
                                        <span>
                                          {value?.title?.length > 20
                                            ? value?.title?.substring(0, 20)
                                            : value?.title}
                                        </span>
                                        <span className="smallStarMargin">
                                          {countfav?.includes(value?.dam) && (
                                            <>
                                              {" "}
                                              <img src="/img/startimg1.png" />
                                            </>
                                          )}
                                        </span>
                                      </div>
                                      <h3 className="johndoenameTable">
                                        {value?.upload_by}
                                      </h3>
                                      <h3 className="onethreetwofour">
                                        {value?.job_count}
                                      </h3>

                                      <h3 className="lastmodifiedDatejuly">
                                        {moment(value?.created).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h3>
                                      <h3 className="oneFiveNumber">1</h3>
                                      <h3 className="oneSixNumber">
                                        {value?.get_file_extension}
                                      </h3>
                                    </div>
                                  </>
                                )}

                                {item?.is_video == true && (
                                  <>
                                    <div
                                      className={
                                        count.includes(value?.id) || detailsid == value?.id
                                          ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                          : "firstRowMediaDataTable"
                                      }
                                      onContextMenu={(event) =>
                                        handleFileVideoContextMenu(
                                          value.root,
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
                                        countimages(value?.id, value?.dam)
                                      }
                                    >
                                      {isOpenImg && (
                                        <ModalImg
                                          src={fullview}
                                          alt="recent images"
                                          onClose={closepopup}
                                        />
                                      )}
                                      <div className="logoGallerywithText">
                                        <img src="/img/video.png" />
                                        <span>
                                          {value?.title?.length > 20
                                            ? value?.title?.substring(0, 20)
                                            : value?.title}
                                        </span>
                                        <span className="smallStarMargin">
                                          {countfav?.includes(value?.dam) && (
                                            <>
                                              {" "}
                                              <img src="/img/startimg1.png" />
                                            </>
                                          )}
                                        </span>
                                      </div>
                                      <h3 className="johndoenameTable">
                                        {value?.upload_by}
                                      </h3>
                                      <h3 className="onethreetwofour">
                                        {value?.job_count}
                                      </h3>

                                      <h3 className="lastmodifiedDatejuly">
                                        {moment(value?.created).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h3>
                                      <h3 className="oneFiveNumber">1</h3>
                                      <h3 className="oneSixNumber">
                                        {value?.get_file_extension}
                                      </h3>
                                    </div>
                                  </>
                                )}
                              </>
                            ))}
                          </>
                        ))}
                      </>
                    )}

                    {searchfolder && (
                      <>
                        {DamSearchnew?.map((item) => (
                          <>
                            {item.type == 2 && (
                              <>
                                <div
                                  className="yourFavDayDayTime collectionnewone"
                                  onClick={() => Collectiondatashow(item?.id)}
                                  onContextMenu={(event) =>
                                    handleFolderContextMenu(
                                      event,
                                      item.root,
                                      item.company_id,
                                      item.id,
                                      item.is_favourite,
                                      item.dam,
                                      item?.name
                                    )
                                  }
                                >
                                  <div className="yourFavDayDivcollection">
                                    <div className="frame">
                                      <img src="/img/Frame.png" />
                                      <span>{item?.name}</span>
                                      <span className="smallStarMargin">
                                        {countfav?.includes(item?.id) && (
                                          <>
                                            {" "}
                                            <img src="/img/startimg1.png" />
                                          </>
                                        )}
                                      </span>
                                    </div>
                                    <h3 className="johndoenameTable">
                                      {item?.upload_by}
                                    </h3>
                                    <h3 className="onethreetwofour">0</h3>

                                    <h3 className="lastmodifiedDatejuly">
                                      {moment(item?.created).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </h3>
                                    <h3 className="oneFiveNumber">
                                      {item?.dam_media?.length}
                                    </h3>
                                    <h3 className="oneSixNumber">-</h3>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        ))}
                      </>
                    )}

                    {searchfolder && (
                      <>
                        {DamSearch1?.map((item) => (
                          <>
                            <>
                              <div
                                className={
                                  count.includes(item?.id)
                                    ? "firstRowMediaDataTable BorderOnfirstRowMediaDataTable"
                                    : "firstRowMediaDataTable"
                                }
                                onContextMenu={(event) =>
                                  handleFileContextMenu(
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
                                onClick={() => countimages(item?.id, item?.dam)}
                              >
                                <div className="logoGallerywithText">
                                  <img src="/img/assertgallery.png" />
                                  <span>{item?.title}</span>
                                  <span className="smallStarMargin">
                                    {countfav?.includes(item?.id) && (
                                      <>
                                        {" "}
                                        <img src="/img/startimg1.png" />
                                      </>
                                    )}
                                  </span>
                                </div>
                                <h3 className="johndoenameTable">
                                  {item?.upload_by}
                                </h3>
                                <h3 className="onethreetwofour">
                                  {item?.job_count}
                                </h3>

                                <h3 className="lastmodifiedDatejuly">
                                  {moment(item?.created).format("YYYY-MM-DD")}
                                </h3>
                                <h3 className="oneFiveNumber">1</h3>
                                <h3 className="oneSixNumber">-</h3>
                              </div>
                            </>
                          </>
                        ))}
                      </>
                    )}

                    {hidefolder &&
                      !searchfolder &&
                      yourfilter &&
                      DamPostCollectionData?.map((item) => (
                        <>
                          <div
                            className="yourFavDayDayTime collectionnewone"
                            onClick={() => Collectiondatashow(item?.id)}
                            onContextMenu={(event) =>
                              handleFolderContextMenu(
                                event,
                                item.root,
                                item.company_id,
                                item.id,
                                item.is_favourite,
                                item.dam,
                                item?.name
                              )
                            }
                          >
                            <div className="yourFavDayDivcollection ">
                              <div className="frame">
                                <img src="/img/Frame.png" />
                                <span>{item?.name}</span>
                                <span className="smallStarMargin">
                                  {countfav?.includes(item?.id) && (
                                    <>
                                      {" "}
                                      <img src="/img/startimg1.png" />
                                    </>
                                  )}
                                </span>
                              </div>
                              <h3 className="johndoenameTable">
                                {item?.upload_by}
                              </h3>
                              <h3 className="onethreetwofour">0</h3>

                              <h3 className="lastmodifiedDatejuly">
                                {moment(item?.created).format("YYYY-MM-DD")}
                              </h3>
                              <h3 className="oneFiveNumber">
                                {" "}
                                {item?.dam_media?.length}
                              </h3>
                              <h3 className="oneSixNumber">-</h3>
                            </div>
                          </div>
                        </>
                      ))}

                    {!hidefolder &&
                      !searchfolder &&
                      yourfilter &&
                      DamCollectionParentImages?.map((item) => (
                        <>
                          <div
                            className="yourFavDayDayTime collectionnewone"
                            onClick={() => Collectiondatashow(item?.id)}
                            onContextMenu={(event) =>
                              handleFolderContextMenu(
                                event,
                                item.root,
                                item.company_id,
                                item.id,
                                item.is_favourite,
                                item.dam,
                                item?.name
                              )
                            }
                          >
                            <div className="yourFavDayDivcollection ">

                              <div className="frame">
                                <img src="/img/Frame.png" />
                                <span>{item?.name}</span>
                                <span className="smallStarMargin">
                                  {countfav?.includes(item?.id) && (
                                    <>
                                      {" "}
                                      <img src="/img/startimg1.png" />
                                    </>
                                  )}
                                </span>
                              </div>
                              <h3 className="johndoenameTable">
                                {item?.upload_by}
                              </h3>
                              <h3 className="onethreetwofour">0</h3>

                              <h3 className="lastmodifiedDatejuly">
                                {moment(item?.created).format("YYYY-MM-DD")}
                              </h3>
                              <h3 className="oneFiveNumber">
                                {item?.dam_media?.length}
                              </h3>
                              <h3 className="oneSixNumber">-</h3>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <Dialog className="CDashboard  " open={open2} onClose={handleClose2}>
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
                        to={`/Media-tableview/collection`}
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
                        to={`/media-tableview/${parentid}/collection`}
                        className="skillname_contnet skillname_contnetmove"
                      >
                        See More
                      </Link>
                    </>
                  )}
                </>)}
              <span onClick={handleClose2}>
                <i className="fa-solid fa-xmark collectioncross"></i>
              </span>
            </DialogTitle>
            <DialogContent>
              <div className="folderImagesNewDFlex5">
                <div className="dataTableMediaDiv">
                  <div className="nameWithArrowTable1">
                    <h5>
                      Name
                      <img src="/img/arrow-up.png" />
                    </h5>
                  </div>
                  <div className="UploadWithArrowTable1">
                    <h5>Upload by</h5>
                  </div>
                  <div className="JobsWithArrowTable1">
                    <h5>Jobs</h5>
                  </div>
                  <div className="ModifiedWithArrowTable1">
                    <h5>Last Modified</h5>
                  </div>
                  <div className="NumberWithArrowTable1">
                    <h5>Number of Files</h5>
                  </div>
                  <div className="NumberWithArrowTable1">
                    <h5>File Type</h5>
                  </div>
                </div>

                {DamDataCollectionId?.slice(0, 4).map((item) => (
                  <>
                    <>
                      {item?.dam_media.slice(0, 4).map((value) => (
                        <>
                          <div
                            className="yourFavDayDayTime collectionnewone "
                            onContextMenu={(event) =>
                              handleCollectionContextMenu(
                                event,
                                value.root,
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
                            <div className="yourFavDayDivcollection ">
                              <div className="frame1">
                                {value.is_video == true && (
                                  <>
                                    <img src="/img/video.png" />
                                  </>
                                )}
                                {value.is_video == false && (
                                  <>
                                    <img src="/img/assertgallery.png" />
                                  </>
                                )}

                                <span>{value?.title.substring(0, 5)}</span>
                              </div>
                              <h3 className="frame1">{value?.upload_by}</h3>
                              <h3 className="frame1">0</h3>
                              <span className="smallStarMargin">
                                {countfav?.includes(value?.id) && (
                                  <>
                                    {" "}
                                    <img src="/img/startimg1.png" />
                                  </>
                                )}
                              </span>
                              <h3 className="frame1">
                                {moment(value?.created).format("YYYY-MM-DD")}
                              </h3>
                              <h3 className="frame1">1</h3>
                              <h3 className="oneSixNumber">
                                {value?.get_file_extension}
                              </h3>
                            </div>
                          </div>

                          {/* 
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
                                        value.image_favourite,
                                        value.id,
                                        value.dam,
                                        value?.media,
                                        value?.description,
                                        value?.limit_usage,
                                        value.skills,
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
                                      onClose={() => setIsOpenImg(false)}
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
                                      countimages(value?.id, value?.dam)
                                    }
                                    onContextMenu={(event) =>
                                      handleCollectionContextMenu(
                                        event,
                                        value.image_favourite,
                                        value.id,
                                        value.dam,
                                        value?.media,
                                        value?.description,
                                        value?.limit_usage,
                                        value.skills,
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
                          </div> */}
                        </>
                      ))}
                    </>
                  </>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <div
            className={
              isDisplayDetails
                ? "activity_main showMediaInfoDetails  newone"
                : "activity_main closeMediaInfoDetails"
            }
          >
            <div
              className="close_contnet_icon"
              onClick={detailspopupclose}
            >
              <i className="fa fa-close"></i>
            </div>
            <div className="file_name_contnet">
              <h3 className="file_path_name">{titlename}</h3>
              <div className="file_text_contnet">
                <h6 className="detail detail1" style={{ color: "#2472fc" }}>
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
                            settitleupdater(true)
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
                <select className="company_contnet" value={publicvalue}
                  onChange={publicvalue1}>
                  <option value="volvo">Publicly available</option>
                  <option value="saab">Private available</option>
                </select>
              </div>
              <div className="title_contnet_name">
                <p className="tit_contnet1">Title</p>
                <input
                  onChange={(e) => {
                    settitleName(e.target.value);
                    settitleupdater(true)
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
                    settitleupdater(true)
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
                    {companyData?.map((item) =>
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
                    options={skillsData?.filter(
                      (item) => item.is_active
                    ) || []}
                    getOptionLabel={(option) => option.skill_name}
                    // onChange={(event, value) => setSkills(value)}
                    onChange={(e, v) => {
                      changeHandler(e, v);
                      settitleupdater(true)
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
                        settitleupdater(true)
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
        </>
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
};
export default Media_datatable;
