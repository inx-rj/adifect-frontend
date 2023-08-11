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
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Movemedia from "./MovefolderDam";
// import Movemedia from "../Frontend/MovefolderDam";
import Admin_Movemedia from "./Admin-movefolderdam";
import { DamIDReducer } from "../../redux/reducers/Dam-reducer";
import { relative } from "path";
import { element, elementType } from "prop-types";
import { getdamCollectionDetailswithid } from "../../redux/actions/Dam-action";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import { listAllSkills } from "../../redux/actions/skill-actions";
import TextField from "@mui/material/TextField";
import axios from "axios";

import { listAllCompanies } from "../../redux/actions/Workflow-company-action";

import {
  SuperAdmingetdamDetailswithid,
  SuperAdminDAMParentCollection,
  SuperAdminlistAllROOTDam,
  SuperAdminlistAllCollectionDAM,
  SuperAdminFavorites,
  SuperAdminTitleupdate,
  SuperAdminDamMutipledelete,
  SuperAdmindeleteCollection,
  SuperAdminDAMMovePost,
  SuperAdminDamMoveCollectioninside,
  SuperAdminDamcopypost,
  SuperAdmingetdamCollectionDetailswithid,
  AdminCollectionfilter,
  AdminDamCollectionSearch,
  AdminDamCollectioncount
} from "../../redux/actions/Admin-dam-action";

function Admin_collectionData() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { parentid } = useParams();
  let navigate = useNavigate();

  const { DamDataCollectionId } = useSelector(
    (state) => state.SuperAdminDamIDCollectionReducer
  );

  const { success: dialogdata } = useSelector(
    (state) => state.SuperAdminDamIDIMAGESReducer
  );
  
  const { CollectionDamFilter } = useSelector(
    (state) => state.AdminCollectionDamFilter
  );

  const handleFileCloseVideo = () => {
    setFileVideoContextMenu(null);
    setdetailsid();
  };

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };
  
  const { CollectionDamCount } = useSelector(
    (state) => state.AdminCollectioncountFilter
  );

  const [isOpen10, setIsOpen10] = useState(false);
  const [imagelink, setimagelink] = useState("");
  const [username, setusername] = useState("");
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const [folderdeleteid, setfolderdeleteid] = useState();
  const [createddate, setcreateddate] = useState();
  const [movefileid, setmovefileid] = useState();
  const [folderdeletedam, setfolderdeletedam] = useState();
  const [fullview, setFullview] = useState();
  const [favouritefolder, setisfavouritefolder] = useState();
  const [folderContextMenu, setFolderContextMenu] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setcount] = useState([]);
  const [publicvalue, setpublicvalue] = useState();
  const [moveFolder, setmoveFolder] = React.useState(false);
  const [deletevalue, setdeletevalue] = useState([]);
  const [countfav, setcountfav] = useState([]);
  const [detailsid, setdetailsid] = useState();
  const [collectiondamid, setcollectiondamid] = useState();
  const [isDisplayDetails, setIsDisplayDetails] = useState(false);
  const [skills, setSkills] = useState([]);
  const [limiteusage, setlimitusage] = useState();
  const [description, setdescription] = useState("");
  const [titlename, settitleName] = useState();
  const [filesize, setfilesize] = useState();
  const [tags, setTags] = useState([]);
  const { skillsData } = useSelector((state) => state.skillReducer);

  const { companyData, success: stagesLoading } = useSelector(
    (state) => state.agencyCompanyReducer
  );

  const handleFolderContextMenu = (
    event,
    id,
    image_favourite,
    dam,
    media,
    files_size,
    upload_by,
    created,
    title,
    description,
    limit_usage,
    skill,
    usage
  ) => {
    event.preventDefault();
    setfolderdeleteid(id);
    setmovefileid(dam);
    setcreateddate(moment(created).format("MMMM Do YYYY"));
    setusername(upload_by);
    settitleName(title);
    if (description == null) {
      setdescription("");
    } else {
      setdescription(description);
    }
    if (usage == 0) {
      setimagelink();
    } else {
      setimagelink(media);
    }
    setpublicvalue(usage);
    setSkills(skill);
    setlimitusage(limit_usage);
    setfolderdeletedam(dam);
    if (countfav.includes(id)) {
      setisfavouritefolder("UnFavorite");
    } else {
      setisfavouritefolder("Favorite");
    }
    setdetailsid(id);
    setcollectiondamid(dam);
    setFullview(media);
    setFolderContextMenu(
      folderContextMenu === null
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
  };

  const [name, setName] = useState("Share link");
  function doublefunction() {
    setTimeout(() => {
      setName("Share link");
    }, 2000);
    setName("Copied");
    navigator.clipboard
      .writeText(imagelink)
      .then(() => {})
      .catch(() => {});
    setFolderContextMenu(null);
  }

  const [companydataupdate, setcompanydataupdate] = useState(null);

  const companyimageupdate = (e) => {
    if (e.target.value == null) {
      setcompanydataupdate(null);
    } else {
      setcompanydataupdate(e.target.value);
    }
    };

  const publicvalue1 = (e) => {
    setpublicvalue(e.target.value);
  };

  const { CollectionDamSearch } = useSelector(
    (state) => state.AdminCollectionsearchFilter
  );


  const [iscount, setiscount] = useState(false);
  const countclick = () => {
    setiscount((current) => !current);
  };

  const handleInputChangeAutocomplete = (event, newInputValue) => {
    // setSkills(newInputValue);
    if (newInputValue.length > 0) {
      setIsOpenSkill(true);
    } else {
      setIsOpenSkill(false);
    }
  };

  const [images5, setimages5] = useState([]);
  useEffect(() => {
    if (DamDataCollectionId) {
      DamDataCollectionId.map((item) => {
        setimages5(
          item?.dam_media?.filter((item) => item.image_favourite == true)
        );
      });
    }
  }, [dialogdata]);

  useEffect(() => {
    let storer = [];

    {
      images5.map((item) => storer.push(item.id));
    }

    if (images5.length > 0) {
      setcountfav(storer);
    }
  }, [images5]);

  const movedialogclose = () => {
    setmoveFolder(false);
  };

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
    setFolderContextMenu(false);
    setFolderContextMenu(null);
    // setImageData(thumbnail);
    // alert("passed");
  };

  const [fileVideoContextMenu, setFileVideoContextMenu] = React.useState(null);

  const handleFileVideoContextMenu = (
    event,
    id,
    image_favourite,
    dam,
    media,
    files_size,
    upload_by,
    created,
    title,
    description,
    limit_usage,
    skill,
    usage
  ) => {
    event.preventDefault();
    setfolderdeleteid(id);
    setmovefileid(dam);
    setcreateddate(moment(created).format("MMMM Do YYYY"));
    setusername(upload_by);
    settitleName(title);
    if (description == null) {
      setdescription("");
    } else {
      setdescription(description);
    }
    if (usage == 0) {
      setimagelink()
    } else {
      setimagelink(media);
    }
    setpublicvalue(usage);
    setSkills(skill);
    setlimitusage(limit_usage);
    setfolderdeletedam(dam);
    if (countfav.includes(dam)) {
      setisfavouritefolder("UnFavorite");
    } else if (countfav.includes(id)) {
      setisfavouritefolder("UnFavorite");
    } else {
      setisfavouritefolder("Favorite");
    }
    setdetailsid(id);
    setcollectiondamid(dam);
    setFullview(media);
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

  const movefilelocation = () => {
    let collectionid = localStorage.getItem("collectionid");
    let user = localStorage.getItem("userData");
    let user_id = JSON.parse(user);
    localStorage.removeItem("imageshow");
    let collectiontrue = localStorage.getItem("collectiontrue");
    let moveparentfileid = localStorage.getItem("moveparentid");
    const formData = new FormData();
    if (count.length > 0) {
      formData.append("dam_images", count);
    }
    formData.append("dam_images", movefileid);
    formData.append("type", 3);
    formData.append("parent", moveparentfileid);
    formData.append("user", user_id.user?.user_id);
    dispatch(SuperAdminDamMoveCollectioninside(formData));
    setIsLoading(true);
    setmoveFolder(false);
    setcount([]);
    setFolderContextMenu(null);
    setdeletevalue([]);

    setTimeout(() => {
      dispatch(SuperAdmingetdamCollectionDetailswithid(collectionid));
    }, 1800);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };


  const detailspageclose = (e) => {
    setIsDisplayDetails(!isDisplayDetails);
    setdetailsid();
  };

  const [addedSkill, setAddedSkill] = useState(false);

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
    // setIsOpenSkill(false);
  };

  const favouritefile = () => {
    if (countfav.includes(folderdeleteid)) {
      setcountfav(countfav.filter((el, i) => el !== folderdeleteid));
    } else {
      setcountfav([...countfav, folderdeleteid]);
    }
    let collectionid = localStorage.getItem("collectionid");
    setFolderContextMenu(null);
    const formData = new FormData();
    if (favouritefolder === "Favorite") {
      formData.append("image_favourite", true);
    } else if (favouritefolder === "UnFavorite") {
      formData.append("image_favourite", false);
    }
    dispatch(SuperAdminTitleupdate(formData, folderdeleteid));
    setisfavouritefolder();
    setTimeout(() => {
      dispatch(AdminDamCollectioncount(collectionid));
    }, 500);
    setdetailsid()
  };

  const detailschange = () => {
    let collectionid = localStorage.getItem("collectionid");
    const formData = new FormData();
    formData.append("title", titlename);
    for (var i = 0; i < skills.length; i++) {
      formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
    }
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("usage", publicvalue);
    formData.append("limit_usage", limiteusage);
    formData.append("limit_usage_toggle", count);
    if (companydataupdate) {
      formData.append("company", companydataupdate);
    } else {
      formData.append("company", "");
    }    formData.append("dam", movefileid);
    setIsDisplayDetails(false);
    dispatch(SuperAdminTitleupdate(formData, detailsid));
    setIsLoading(true);
    setTimeout(() => {
      dispatch(SuperAdmingetdamCollectionDetailswithid(collectionid));
    }, 1200);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const moveimages = () => {
    setmoveFolder(true);
  };

  const [isfiles, setisfiles] = useState(true);
  const countimages = (id, dam) => {
    setfolderdeletedam(dam);
    if (count.includes(id)) {
      setcount(count.filter((el, i) => el !== id));
    } else {
      setcount([...count, id]);
    }
  };

  const deleteimage = () => {
    let collectionid = localStorage.getItem("collectionid");
    setFolderContextMenu(null);
    swal({
      title: "",
      text: "Are you sure you want to delete this image?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (DamDataCollectionId[0].dam_media.length <= 1) {
          dispatch(SuperAdmindeleteCollection(folderdeletedam));
          setIsLoading(true);
        } else {
          if (count.length > 0) {
            dispatch(SuperAdminDamMutipledelete(count));
            setIsLoading(true);
          } else {
            dispatch(SuperAdminDamMutipledelete(folderdeleteid));
            setIsLoading(true);
          }
        }
        if (DamDataCollectionId[0].dam_media.length == count.length) {
          dispatch(SuperAdmindeleteCollection(folderdeletedam));
          setIsLoading(true);
        }
        setcount([]);
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });

        setTimeout(() => {
          dispatch(SuperAdmingetdamCollectionDetailswithid(collectionid));
        }, 1200);

        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        setTimeout(() => {
          dispatch(AdminDamCollectioncount(collectionid));
        }, 1500);
      }
    });
  };

  const imageinsidevalue = () => {
    setIsDisplayDetails(true);
    setFolderContextMenu(null);
  };

  const duplicateCollectionimage = () => {
    let collectionid = localStorage.getItem("collectionid");
    dispatch(
      SuperAdminDamcopypost({
        id: detailsid,
        parent: collectiondamid,
        type: 2,
        type_new: 2,
      })
    );
    setFolderContextMenu(null);
    setIsLoading(true);
    setTimeout(() => {
      dispatch(SuperAdmingetdamCollectionDetailswithid(collectionid));
    }, 1200);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
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

  useEffect(() => {
    let collectionid = localStorage.getItem("collectionid");
    if (parentid) {
      dispatch(SuperAdmingetdamCollectionDetailswithid("",parentid)); 
    } else {
      dispatch(SuperAdmingetdamCollectionDetailswithid(collectionid,""));
    }
    dispatch(AdminDamCollectioncount(collectionid));
    dispatch(listAllCompanies());
  }, []);

  const [users, setUsers] = useState([]);

  const userName = [
    { name: "Your Favorites" },
    { name: "Photo" },
    { name: "Videos" },
  ];

  useEffect(() => {
    setUsers(userName);
  }, []);

  const [searchvalue, setsearchvalue] = useState("");

  const [searchfile, setIssearchfile] = useState(false);
  const getvalue1 = (e) => {
    let collectionid = localStorage.getItem("collectionid");
    if (e.target.value == null) {
      setIssearchfile(false);
      setisfiles(true)
    } else {
      dispatch(AdminDamCollectionSearch(collectionid,e.target.value));
      setIssearchfile(true);
      setisfiles(true)
    }
    setsearchvalue(e.target.value);
  };

  const [sortby, setsortby] = useState("");
  const [total, settotal] = useState([]);
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
          setisfiles(false)
        } else {
          settotal([...total, name]);
  
        }
      } else {
        if (name === "allSelect") {
          settotal([]);
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
  
    const bestmatch = () => {
      setsortby("mostused");
    };
  
    const Newest = (e) => {
      setsortby("new");
    };
  
    const oldest = (e) => {
      setsortby("old");
    };
  
    useEffect(() => {
      let params = "";
      if (sortby == "new") {
        setisfiles(false);
        setIssearchfile(false)
        params += "&ordering=-created";
      } else if (sortby == "old") {
        setisfiles(false);
        setIssearchfile(false)
        params += "&ordering=created";
      } else if (sortby == "mostused") {
        setisfiles(false);  
        setIssearchfile(false) 
        params += "&ordering=-job_count";
      }
      if (total.includes("Your Favorites")) {
        setisfiles(false);
        setIssearchfile(false)
        params += "&image_favourite=true";
      }
      if (total.includes("Photo")) {
        setisfiles(false);
        setIssearchfile(false)
        params += "&photos=1";
      }
      if (total.includes("Videos")) {
        setisfiles(false);
        setIssearchfile(false)
        params += "&videos=1";
      }
  
      if (total.includes("allSelect")) {
        params += "&image_favourite=true";
        params += "&type=3";
        params += "&is_video=true";
        params += "&type=2";
        params += "&folders=1";
        setisfiles(false);
        setIssearchfile(false)
        setcount([]);
      }
      let collectionid = localStorage.getItem("collectionid");
  
    dispatch(AdminCollectionfilter(collectionid,params))
  
      // if (companylistid.length) {
      //   params += `&company=${companylistid}`;
      //   setisfiles(false);
      //   setcompanyshow(false);
      //   if (parentid || jobshow) {
      //     if (jobshow) {
      //       dispatch(CountCompaniesID(jobshow, companylistid));
      //     } else {
      //       dispatch(CountCompaniesID(parentid, companylistid));
      //     }
      //   } else {
      //     dispatch(CountCompanies(companylistid));
      //   }
      // } else if (!companylistid.length) {
      //   setcompanyshow(true);
      //   dispatch(DamFilterFavourateCountID(params));
      // } else {
      //   if (
      //     !total.includes("Photo") &&
      //     !sortby &&
      //     !total.includes("Your Favorites") &&
      //     !total.includes("Videos") &&
      //     !total.includes("Collections")
      //   ) {
      //     setisfiles(true);
      //   }
      // }
    }, [total,sortby]);
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
        "image/svg+xml": [],
        "image/gif": [],
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
  
  
    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );
  

    const [showprogressbox, setshowprogressbox] = React.useState(false);

    const UploadProgress = () => {
      setshowprogressbox((current) => !current);
    };
  
  
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
              class="icon_asdsdasd"
              title="Remove"
            >
              <i class="fa-solid fa-circle-xmark" onClick={removeFile(file)}></i>
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
  

    const handleClick = (event) => {
      setCreatedropdown(event.currentTarget);
    };
  
    function checkAge(age) {
      return age == 100;
    }
    const [openUploadFile, setopenUploadFile] = React.useState(false);
    const [createdropdown, setCreatedropdown] = React.useState(null);
    const [showprogress, setshowprogress] = useState(false);
    const [showprogressdata, setshowprogressdata] = useState(false);
    const [progress3, setProgress3] = useState(0);
    const indexvalue = useRef(0);
    const [progress, setProgress] = React.useState(10);
    const open = Boolean(createdropdown);
    const [showprogressheader, setshowprogressheader] = useState([]);
  
    const handleClickOpenUpload = () => {
      setFolderContextMenu(null);
      setopenUploadFile(true);
      setCreatedropdown(null);
    };
  
    const handleClose = () => {
      setCreatedropdown(null);
    };
  
    const handleFileSubmit = () => {
      let user = localStorage.getItem("userData");
      let collectionid1 = localStorage.getItem("collectionid");
      let user_id = JSON.parse(user);
      const myArr = [];
      let startIndex = inputRef.current.length ? inputRef.current.length : 0;

        myArr.push({
          id: startIndex,
          progress2: progress3,
          title: files[0].name,
        });
    
      if (inputRef.current.length) {
        const total = myArr.concat(inputRef.current);
        inputRef.current = total;
        setshowprogressheader(total);
      } else {
        inputRef.current = myArr;
        setshowprogressheader(myArr);
      }
  
     
        const formData = new FormData();
        if (files) {
          for (const key of Object.keys(files)) {
            formData.append("media", files[key]);
          }
        }
        formData.append("name", "");
        formData.append("type", 3);
        formData.append("dam", collectionid1);
        formData.append("title", files[0].name);
        formData.append("agency", user_id.user?.user_id);
        indexvalue.current = indexvalue.current + 1;
       
      
          let list = inputRef.current;
          list.id = indexvalue.current;
          axios
            .post(`${BACKEND_API_URL}super-admin-dam-media/`, formData, {
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
             
              let lengthstore = [];
  
              {
                inputRef.current?.map((file, index) =>
                  lengthstore.push(file?.progress2)
                );
                setshowprogressheader(lengthstore);
                let collectionid = localStorage.getItem("collectionid");
      dispatch(SuperAdmingetdamCollectionDetailswithid(collectionid));
      dispatch(AdminDamCollectioncount(collectionid));
              }
            });
    
            setopenUploadFile(false);
            setFiles([]);
            setshowprogress(true);
        setshowprogressdata(true);
        setProgress("10");
  
      
    };
  
    useEffect(() => {
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("20");
        }
      }, 1000);
  
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("30");
        } else if ( showprogress && progress == "100") {
          setProgress("100");
        }
      }, 2000);
  
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("40");
        } else if ( showprogress && progress == "100") {
          setProgress("100");
        }
      }, 3000);
  
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("50");
        } else if ( showprogress && progress == "100") {
          setProgress("100");
        }
      }, 4000);
  
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("60");
        } else if ( showprogress && progress == "100") {
          setProgress("100");
        }
      }, 5000);
  
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("70");
        } else if ( showprogress && progress == "100") {
          setProgress("100");
        }
      }, 6000);
  
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("80");
        } else if ( showprogress && progress == "100") {
          setProgress("100");
        }
      }, 7000);
  
      setTimeout(() => {
        if (! showprogress && progress != "100") {
          setProgress("90");
        } else if ( showprogress && progress == "100") {
          setProgress("100");
        }
      }, 8000);
  
      setInterval(() => {
        if ( showprogress) {
          setProgress("100");
        }
      }, 8200);
    }, [showprogressdata]);
  
    const handleCloseUpload = () => {
      setopenUploadFile(false);
      setFiles([]);
    };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
                {showprogress && (
                  <>
                    {inputRef.current?.length && (
                      <>
                        {inputRef.current?.slice(0, 1).map((file, index) => (
                          <>
                            <>
                              {!showprogressheader.every(checkAge) && (
                                <>
                                      <div className="collectionprogressbar">
                                    <h6>({file.title.substring(0, 5)})</h6>
                                      
                                      <ProgressBar
                                        now={file?.progress2}
                                        label={`${file?.progress2}%`}
                                      />{" "}
                                  
                                    <div className="progressbarricon">
                                      <i
                                        class="fa fa-caret-down dropdown"
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
                        <div className="fixedclass collectiondatainsidebar">
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

          <div className="upperclasscoll">
            <div className="upperclass">
              <div className="backbtnallcollfav collectionpage">
              <div class="Createmidebtn btncreatesec">
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
                        <MenuItem onClick={handleClickOpenUpload}>
                          <img src="/img/uploadfileRC.png" /> Upload a file
                        </MenuItem>
                      </Menu>
                    </Link>
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
                  </div>
                <div className="Createjobfilemedia">
                  {count.length > 0 && (
                    <div className="files_selected1">
                      <div className="sharedampage">
                        <>
                          <div className="job_select_contnet">
                            <h6 className="files_selct_content11">
                              <span className="number22">{count.length}</span>
                              files selected
                            </h6>
                            <h6 className="files_selct_content11">
                              Create Job
                            </h6>
                            <h6
                              className="files_selct_content11"
                              // onClick={handleCreateCollection}
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
                      </div>
                    </div>
                  )}
                </div>
                <div className="collectionbtn">
                  {!parentid && (
                    <>
                      {" "}
                      <Link
                        to={`/admin-media`}
                        className="skillname_contnetmideaback"
                      >
                        <button type="button">Back</button>
                      </Link>
                    </>
                  )}

                  {parentid && (
                    <>
                      {" "}
                      <Link
                        to={`/admin-media/${parentid}`}
                        className="skillname_contnetmideaback"
                      >
                        <button type="button">Back</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <Menu
                className="mediaRightClickCreateUploadPortF newoneadd"
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
                <MenuItem onClick={deleteimage}>
                  {" "}
                  <img src="/img/deleterc.png" />
                  Delete
                </MenuItem>
                <MenuItem onClick={favouritefile}>
                  <img src="/img/favouriterc.png" /> {favouritefolder}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <img src="/img/copytorc.png" /> Copy
                </MenuItem>
                <MenuItem onClick={moveimages}>
                  {" "}
                  <img src="/img/movetorc.png" /> Move
                </MenuItem>
                <MenuItem onClick={sizeincrease}>
                  {" "}
                  <img src="/img/detailsrc.png" /> View
                </MenuItem>
                <MenuItem onClick={duplicateCollectionimage}>
                  {" "}
                  <img src="/img/duplicaterc.png" /> Duplicate
                </MenuItem>
                <MenuItem onClick={imageinsidevalue}>
                  {" "}
                  <img src="/img/detailsrc.png" /> Details
                </MenuItem>
                {imagelink && (
                  <>
                    {" "}
                    <MenuItem onClick={doublefunction}>
                      {" "}
                      <img src="/img/sharelinkrc.png" /> {name}
                    </MenuItem>
                  </>
                )}
              </Menu>
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
                <MenuItem onClick={deleteimage}>
                  {" "}
                  <img src="/img/deleterc.png" />
                  Delete
                </MenuItem>
                <MenuItem onClick={favouritefile}>
                  <img src="/img/favouriterc.png" /> {favouritefolder}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <img src="/img/copytorc.png" /> Copy
                </MenuItem>
                <MenuItem onClick={moveimages}>
                  {" "}
                  <img src="/img/movetorc.png" /> Move
                </MenuItem>
                <MenuItem onClick={duplicateCollectionimage}>
                  {" "}
                  <img src="/img/duplicaterc.png" /> Duplicate
                </MenuItem>
                <MenuItem onClick={imageinsidevalue}>
                  {" "}
                  <img src="/img/detailsrc.png" /> Details
                </MenuItem>
                {imagelink && (
                  <>
                    {" "}
                    <MenuItem onClick={doublefunction}>
                      {" "}
                      <img src="/img/sharelinkrc.png" /> {name}
                    </MenuItem>
                  </>
                )}
              </Menu>
              <div className="media-collection-all-data">
                <div class="main_slider">
                  <div class="Sort_by_content">
                    <h4 class="sort_contnet">Sort by</h4>
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
                  <div class="borderBottomFileTypesTwo">
                    <div class="container my-4 mediaFileTypesChecks">
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
                              checked={
                                total == user.name
                                  ? true
                                  : user?.isChecked || false
                              }
                              onChange={handleChange}
                            />
                            <label className="form-check-label ms-1 textDarkFileTypesData textDarkFileTypesDataSecondmedia">
                              <span className="companyDataDynamic">
                                {user.name}
                              </span>

                              <span className="countingDataDynamic">
                              {index == 0 && (
                                          <> {CollectionDamCount?.favourites} </>
                                        )}
                                        {index == 1 && (
                                          <> {CollectionDamCount?.images} </>
                                        )}
                                        {index == 2 && (
                                          <> {CollectionDamCount?.videos} </>
                                        )}
                              </span>
                            </label>
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>
                </div>
              <div className="collectiondataimg sliderleftsec">

        
                <div className="folderImagesNewDFlex folderImagesNewDFlexnewdiv Collectionbackground ">
                {!searchfile && isfiles &&  (
                    <>
                      {DamDataCollectionId?.map((item) => (
                        <>
                          <>
                            {item?.dam_media.map((value) => (
                              <>
                                <div
                                  className={
                                    count.includes(value?.id) ||
                                    detailsid == value?.id
                                      ? "recent_pics1NewImages recent_pics1NewImagesPopRC--  selected"
                                      : "recent_pics1NewImages recent_pics1NewImagesPopRC-- "
                                  }
                                >
                                  <img
                                    className="selected_check_icon"
                                    src="/img/allok.png"
                                  />
                                  <div className="collectiondatallimg">
                                    {value.is_video == false && (
                                      <>
                                        <img
                                          className="scene_contnetNew"
                                          src={value?.thumbnail}
                                          onContextMenu={(event) =>
                                            handleFolderContextMenu(
                                              event,
                                              value.id,
                                              value.image_favourite,
                                              value.dam,
                                              value.media,
                                              value.files_size,
                                              value.upload_by,
                                              value.created,
                                              value.title,
                                              value.description,
                                              value.limit_usage,
                                              value.skill,
                                              value.usage
                                            )
                                          }
                                          onClick={() =>
                                            countimages(value?.id, value?.dam)
                                          }
                                        />
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
                                            handleFileVideoContextMenu(
                                              event,
                                              value.id,
                                              value.image_favourite,
                                              value.dam,
                                              value.media,
                                              value.files_size,
                                              value.upload_by,
                                              value.created,
                                              value.title,
                                              value.description,
                                              value.limit_usage,
                                              value.skill,
                                              value.usage
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
                                    {isOpenImg && (
                                      <ModalImg
                                        src={fullview}
                                        alt="recent images"
                                        onClose={() => setIsOpenImg(false)}
                                      />
                                    )}
                                    {countfav?.includes(value?.id) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst startimgstCollectionC"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectiontitle">
                                      <p className="collection_title1 collection_width">
                                        {value?.title}
                                      </p>
                                      <span className="collectionbag collectionbagnewdiv">
                                        <i className="fas fa-shopping-bag"></i>
                                        1,324
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

{searchfile && isfiles && (
                    <>
                      {CollectionDamSearch?.photos?.map((value) => (
                        <>
                          <>
                                <div
                                  className={
                                    count.includes(value?.id) ||
                                    detailsid == value?.id
                                      ? "recent_pics1NewImages recent_pics1NewImagesPopRC--  selected"
                                      : "recent_pics1NewImages recent_pics1NewImagesPopRC-- "
                                  }
                                >
                                  <img
                                    className="selected_check_icon"
                                    src="/img/allok.png"
                                  />
                                  <div className="collectiondatallimg">
                                  
                                        <img
                                          className="scene_contnetNew"
                                          src={value?.thumbnail}
                                          onContextMenu={(event) =>
                                            handleFolderContextMenu(
                                              event,
                                              value.id,
                                              value.image_favourite,
                                              value.dam,
                                              value.media,
                                              value.files_size,
                                              value.upload_by,
                                              value.created,
                                              value.title,
                                              value.description,
                                              value.limit_usage,
                                              value.skill,
                                              value.usage
                                            )
                                          }
                                          onClick={() =>
                                            countimages(value?.id, value?.dam)
                                          }
                                        />
                                    {isOpenImg && (
                                      <ModalImg
                                        src={fullview}
                                        alt="recent images"
                                        onClose={() => setIsOpenImg(false)}
                                      />
                                    )}
                                    {countfav?.includes(value?.id) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst startimgstCollectionC"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectiontitle">
                                      <p className="collection_title1 collection_width">
                                        {value?.title}
                                      </p>
                                      <span className="collectionbag collectionbagnewdiv">
                                        <i className="fas fa-shopping-bag"></i>
                                        1,324
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              
                        
                          </>
                        </>
                      ))}
                    </>
                  )}

{searchfile && isfiles &&  (
                    <>
                      {CollectionDamSearch?.videos?.map((value) => (
                        <>
                          <>
                                <div
                                  className={
                                    count.includes(value?.id) ||
                                    detailsid == value?.id
                                      ? "recent_pics1NewImages recent_pics1NewImagesPopRC--  selected"
                                      : "recent_pics1NewImages recent_pics1NewImagesPopRC-- "
                                  }
                                >
                                  <img
                                    className="selected_check_icon"
                                    src="/img/allok.png"
                                  />
                                   <div className="collectiondatallimg">
                                    {value?.is_video == true && (
                                      <>
                                        <video
                                          className="videoSWithDamData"
                                          controls
                                          onClick={() =>
                                            countimages(value?.id, value?.dam)
                                          }
                                          onContextMenu={(event) =>
                                            handleFileVideoContextMenu(
                                              event,
                                              value.id,
                                              value.image_favourite,
                                              value.dam,
                                              value.media,
                                              value.files_size,
                                              value.upload_by,
                                              value.created,
                                              value.title,
                                              value.description,
                                              value.limit_usage,
                                              value.skill,
                                              value.usage
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
                                    {isOpenImg && (
                                      <ModalImg
                                        src={fullview}
                                        alt="recent images"
                                        onClose={() => setIsOpenImg(false)}
                                      />
                                    )}
                                    {countfav?.includes(value?.id) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst startimgstCollectionC"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectiontitle">
                                      <p className="collection_title1 collection_width">
                                        {value?.title}
                                      </p>
                                      <span className="collectionbag collectionbagnewdiv">
                                        <i className="fas fa-shopping-bag"></i>
                                        1,324
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              
                        
                          </>
                        </>
                      ))}
                    </>
                  )}

{!searchfile && !isfiles &&  (
                    <>
                      {CollectionDamFilter?.photos?.map((value) => (
                        <>
                          <>
                                <div
                                  className={
                                    count.includes(value?.id) ||
                                    detailsid == value?.id
                                      ? "recent_pics1NewImages recent_pics1NewImagesPopRC--  selected"
                                      : "recent_pics1NewImages recent_pics1NewImagesPopRC-- "
                                  }
                                >
                                  <img
                                    className="selected_check_icon"
                                    src="/img/allok.png"
                                  />
                                  <div className="collectiondatallimg">
                                  
                                        <img
                                          className="scene_contnetNew"
                                          src={value?.thumbnail}
                                          onContextMenu={(event) =>
                                            handleFolderContextMenu(
                                              event,
                                              value.id,
                                              value.image_favourite,
                                              value.dam,
                                              value.media,
                                              value.files_size,
                                              value.upload_by,
                                              value.created,
                                              value.title,
                                              value.description,
                                              value.limit_usage,
                                              value.skill,
                                              value.usage
                                            )
                                          }
                                          onClick={() =>
                                            countimages(value?.id, value?.dam)
                                          }
                                        />
                                    {isOpenImg && (
                                      <ModalImg
                                        src={fullview}
                                        alt="recent images"
                                        onClose={() => setIsOpenImg(false)}
                                      />
                                    )}
                                    {countfav?.includes(value?.id) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst startimgstCollectionC"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectiontitle">
                                      <p className="collection_title1 collection_width">
                                        {value?.title}
                                      </p>
                                      <span className="collectionbag collectionbagnewdiv">
                                        <i className="fas fa-shopping-bag"></i>
                                        1,324
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              
                        
                          </>
                        </>
                      ))}
                    </>
                  )}

{!searchfile && !isfiles &&  (
                    <>
                      {CollectionDamFilter?.videos?.map((value) => (
                        <>
                          <>
                                <div
                                  className={
                                    count.includes(value?.id) ||
                                    detailsid == value?.id
                                      ? "recent_pics1NewImages recent_pics1NewImagesPopRC--  selected"
                                      : "recent_pics1NewImages recent_pics1NewImagesPopRC-- "
                                  }
                                >
                                  <img
                                    className="selected_check_icon"
                                    src="/img/allok.png"
                                  />
                                   <div className="collectiondatallimg">
                                    {value?.is_video == true && (
                                      <>
                                        <video
                                          className="videoSWithDamData"
                                          controls
                                          onClick={() =>
                                            countimages(value?.id, value?.dam)
                                          }
                                          onContextMenu={(event) =>
                                            handleFileVideoContextMenu(
                                              event,
                                              value.id,
                                              value.image_favourite,
                                              value.dam,
                                              value.media,
                                              value.files_size,
                                              value.upload_by,
                                              value.created,
                                              value.title,
                                              value.description,
                                              value.limit_usage,
                                              value.skill,
                                              value.usage
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
                                    {isOpenImg && (
                                      <ModalImg
                                        src={fullview}
                                        alt="recent images"
                                        onClose={() => setIsOpenImg(false)}
                                      />
                                    )}
                                    {countfav?.includes(value?.id) && (
                                      <>
                                        {" "}
                                        <img
                                          className="startimgst startimgstCollectionC"
                                          src="/img/startimg.png"
                                        />
                                      </>
                                    )}
                                    <div className="collectiontitle">
                                      <p className="collection_title1 collection_width">
                                        {value?.title}
                                      </p>
                                      <span className="collectionbag collectionbagnewdiv">
                                        <i className="fas fa-shopping-bag"></i>
                                        1,324
                                      </span>
                                    </div>
                                  </div>
                                </div>
                          </>
                        </>
                      ))}
                    </>
                  )}
                </div>
                <div
                  className={
                    isDisplayDetails
                      ? "activity_main showMediaInfoDetails activity_main2"
                      : "activity_main closeMediaInfoDetails activity_main2"
                  }
                >
                  <div
                    className="close_contnet_icon"
                  >
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
                          className="autoSideBarMedia "
                          value={skills}
                          multiple
                          id="tags-outlined"
                          open={isOpenSkill}
                          // open={true}
                          onInputChange={handleInputChangeAutocomplete}
                          filterOptions={filterOptions}
                          options={skillsData.filter((item) => item.is_active)}
                          getOptionLabel={(option) => option.skill_name}
                          // onChange={(event, value) => setSkills(value)}
                          onChange={(e, v) => {
                            changeHandler(e, v);
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

            <Dialog
              className="profileImgDialogagency popupclass profileImgDialogagencymove"
              open={moveFolder}
              // onClick={movedialogclose}
            >
              <DialogTitle className="profileImgfolder imgsizefixer imgsizefixermediafolder">
                <h2>
                  Move Image
                  {!parentid && (
                    <>
                      {" "}
                      <Link to={`/admin-media`} className="closebuttonsec">
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
                      <Admin_Movemedia />
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
                    <Button className="shareNewPop" onClick={movefilelocation}>
                      Move
                    </Button>
                  </div>
                </DialogActions>
              </div>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
}
export default Admin_collectionData;
