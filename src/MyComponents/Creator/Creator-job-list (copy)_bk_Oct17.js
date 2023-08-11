import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAllAvailableJobs } from "../../redux/actions/job-actions";
import { MDBDataTable } from "mdbreact";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { ROLE } from "../../constants/other-constants";
import swal from "sweetalert";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { deleteJob } from "../../redux/actions/job-actions";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import MenuItem from "@mui/material/MenuItem";
import { getJobDetails } from "../../redux/actions/job-actions";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Slide from "@mui/material/Slide";
import { AVAILABLE_JOB_LIST_RESET } from "../../constants/job-constants";
import { useDropzone } from "react-dropzone";
// import { Item } from "react-bootstrap/lib/Breadcrumb";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

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
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function Creator_job_list() {
  const [isLoading1, setIsLoading1] = useState(true);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [attachFiles, setAttachFiles] = useState(false);
  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsReducer
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const drop = useRef(null);

  const [jobId, setJobId] = useState();
  const [number, setlink] = useState("");
  const [show, setShow] = useState(false);
  const [showdate, setShowdate] = useState(false);
  const [duedeliveryDate, duesetDeliveryDate] = useState();
  const [jobDocumentsPopup, setJobDocumentsPopup] = useState();
  const [fileExtension, setFileExtension] = useState();
  const [selects, setselects] = useState(null);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState();
  const [datepricewarning, setdatepricewarning] = useState(false);
  const [offerPrice, setOfferPrice] = useState();
  const [datewarning, setdateWarning] = useState(false);
  const [deliverydata, setdeliverydata] = useState("");
  const [formSampleUrls, setFormSampleUrls] = useState([""]);
  const [jobDescription, setJobDescription] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [daysData, setDaysData] = useState("");
  const [question, setquestion] = useState("");
  const [deliveryDate, setDeliveryDate] = useState();

  const [proposedPrice, setProposedPrice] = useState();
  const [proposedDate, setProposedDate] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [deliveryhoursvalue, setdeliveryhoursvalue] = useState("");
  const [deliveryhours, setdeliveryhours] = useState(false);
  const [deliverydatevalue, setdeliverydatevalue] = useState(false);
  const [level, setLevel] = useState();
  const [job_type, setJobType] = useState();
  const [company_type, setCompanyType] = useState();
  const [userdata, setuserdata] = useState();
  const [createddate, setcreateddate] = useState();
  const [open3, setOpen3] = useState(false);
  const [per25, set25value] = useState(false);
  const [per75, set75value] = useState(false);
  const [per50, set50value] = useState(false);
  const [per10, set10value] = useState();
  const [per20, set20value] = useState();
  const [per30, set30value] = useState();
  const [dateadd1, setdateadd1] = useState();
  const [dateadd2, setdateadd2] = useState();
  const [dateadd3, setdateadd3] = useState();
  const [hide, sethide] = useState(true);
  const [daysdifference, setdaysdifference] = useState();
  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [sampleimgUrl, setsampleImgUrl] = useState("");
  const [pricevalue, setpricevalue] = useState(true);
  const [dateshow, setdateshow] = useState(true);
  const [open5, setOpen5] = useState(false);
  const [formUrls, setFormUrls] = useState([""]);
  const [coverletter, setcoverletter] = useState("");
  const [newJobDetails, setNewJobDetails] = useState(false);

  const [printPreData, setPrintPreData] = useState("");

  const imgRef = useRef(null);
  const handleClose = () => {
    setJobId();
    setTitle();
    setJobDescription();
    setJobDocuments();
    setDeliveryDate();
    setOfferPrice();
    setTags();
    setCategory();
    setSkills();
    setIndustry();
    setLevel();
    setJobType();
    setCompanyType();
    setOpen5(false);
    // my code
    setdatepricewarning(false);
    set50value(false);
    set25value(false);
    setlink("");
    setShow(false);
  };
  const maxDocSize = 25000000;
  const handleChange1 = (evt) => {
    setdatepricewarning(false);
    set25value(false);
    set75value(false);
    set50value(false);
    const { value } = evt.target;

    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split(".");

      if (decimal?.length > 2) {
        return;
      }
    }
    Number(offerPrice);
    const per50 = 50;
    const per = 25;
    const per75 = 75;
    const per100 = 100;
    const n = Number(offerPrice);

    const percentage25 = n + (n / 100) * per;
    const percentage50 = n + (n / 100) * per50;
    const percentage75 = n + (n / 100) * per75;
    const percentage100 = n + (n / 100) * per100;

    // my change in project 28/9
    const firstvalue = value - n;
    const preDataValue = (firstvalue * 100) / n;
    // console.log(preDataValue)
    const preDataValue1 = Math.floor(preDataValue);
    setPrintPreData(preDataValue1);

    const start = startDate;
    let today = new Date(deliveryDate);
    const diffInMs = new Date(start) - new Date(today);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInDate = Math.floor(diffInDays);

    if (value > percentage25 && Math.floor(diffInDays) < 0 && start != null) {
      setdatepricewarning(true);
      set50value(false);
      set25value(false);
    } else if (
      (value < percentage50 && value > percentage25) ||
      number == percentage25
    ) {
      set25value(true);
      setdatepricewarning(false);
    } else if (value > percentage50 || value == percentage50) {
      set50value(true);
      setdatepricewarning(false);
    }
    setlink(value);
  };

  const handleDiv = (id) => {
    if (id === "1") {
      setlink(per10);
    } else if (id === "2") {
      setlink(per20);
    } else if (id === "3") {
      setlink(per30);
    } else if (id === "4") {
      setpricevalue(false);
    }
  };

  const handleDate = (date) => {
    setStartDate(date);
    const start = date;
    let today = new Date(deliveryDate);
    const diffInMs = new Date(date) - new Date(today);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInDate = Math.floor(diffInDays);
    setdaysdifference(Math.floor(diffInDays));

    const per50 = 50;
    const per = 25;
    const per75 = 75;
    const per100 = 100;
    const n = Number(offerPrice);

    const percentage25 = n + (n / 100) * per;
    const percentage50 = n + (n / 100) * per50;

    if (number > percentage25 && Math.floor(diffInDays) < 0 && date != null) {
      setdatepricewarning(true);
      set25value(false);
      set50value(false);
    } else if (
      (number > percentage25 && number < percentage50) ||
      number == percentage25
    ) {
      set25value(true);
      set50value(false);
      setdatepricewarning(false);
    } else if (number > percentage50 || number == percentage50) {
      set50value(true);
      set25value(false);
      setdatepricewarning(false);
    }
  };

  useEffect(() => {
    const start = startDate;
    let today = new Date(deliveryDate);
    const diffInMs = new Date(start) - new Date(today);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInDate = Math.floor(diffInDays);
    setdaysdifference(Math.floor(diffInDays));
    if (diffInDate === 7) {
      setdateWarning(true);
    } else if (diffInDate > 7) {
      setdateWarning(true);
    } else {
      setdateWarning(false);
    }
  }, [startDate]);

  function btnClick() {
    setShow(true);
  }

  let removeFormFieldsSampleUrls = (i) => {
    let newFormValues = [...formSampleUrls];
    newFormValues.splice(i, 1);
    setFormSampleUrls(newFormValues);
  };

  let savevalue = () => {
    const tempErrors = {
      number: !number && show && "Please enter Proposed Price",
      date: !startDate && show && "Please add Proposed Due Date",
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }

    setProposedPrice(number);
    setProposedDate(startDate);
    setShow(false);
  };

  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
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
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

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
      <div className="jobimgdashboard" style={thumbInner}>
        <button className="jobaplyeclosebuttan" onClick={removeFile(file)}>
          X
        </button>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        {file.title}
      </div>
    </div>
  ));

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  // const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const start = startDate;
    let today = new Date(deliveryDate);
    const diffInMs = new Date(start) - new Date(today);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInDate = Math.floor(diffInDays);
    if (diffInDate === 7) {
      setdateWarning(true);
    } else if (diffInDate > 7) {
      setdateWarning(true);
    } else {
      setdateWarning(false);
    }
  }, [startDate]);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const clearMainNegotiate = () => {
    setlink("");
    setStartDate(new Date());
    setProposedPrice("");
    setProposedDate("");

    setShowdate(false);
    setdatepricewarning(false);
    set50value(false);
    set25value(false);
  };

  const mainNegotiate = () => {
    btnClick();
    setShowdate(true);
  };
  const onSelectFile = async (e) => {
    setAttachFiles(true);
    var imageList = [];
    var previewImages = [];
    let fileext = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.target.files[i].name.split(".").at(-1);
      const allowedFileTypes = ["eps"];

      if (
        !e.target.files[i].type.match(imageMimeType) &&
        !allowedFileTypes.includes(fileExtension)
      ) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
      } else if (e.target.files[i].size > maxDocSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 25mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 2500,
        });
      }
      // Max files 10
      else if (e.target.files.length > 10) {
        swal({
          title: "Error",
          text: "Maximum 10 files allowed",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 2500,
        });
      }

      if (previewImages.length < 10 && e.target.files[i].size <= maxDocSize) {
        previewImages.push(URL.createObjectURL(e.target.files[i]));
      }

      if (imageList.length < 10 && e.target.files[i].size <= maxDocSize) {
        imageList.push(e.target.files[i]);
      }

      if (fileext.length < 10 && e.target.files[i].size <= maxDocSize) {
        fileext.push(
          e.target.files[i]?.name?.slice(
            ((e.target.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
      // }
    }
    setJobDocumentsPopup(imageList);
    setFileExtension(fileext);
    imgRef.current = imageList;
  };

  const mainProposedCancel = () => {
    setShow(false);
    setShowdate(false);
    setdatepricewarning(false);
    set50value(false);
    set25value(false);
    // setlink("");

    setlink(proposedPrice);
    setStartDate(proposedDate);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
    setErrors({ ...errors1, message: null });
  };
  const [errors1, setErrors] = useState({
    number: null,
    formsampleImgUrls: null,
    formSampleUrls: null,
    date: null,
    url: null,
    coverletter: null,
  });

  let handleChangeUrls = (i, e) => {
    let newFormValues = [...formUrls];
    newFormValues[i] = e.target.value;
    setFormUrls(newFormValues);
  };

  let removeFormFieldsUrls = (i) => {
    let newFormValues = [...formUrls];
    newFormValues.splice(i, 1);
    setFormUrls(newFormValues);
  };

  let addFormFieldsUrls = () => {
    if (formUrls.length < 10) {
      setFormUrls([...formUrls, ""]);
    }
  };

  const validateSubmit = (e, data) => {
    e.preventDefault();
    sethide(false);
    // Urls Validation
    let isValidUrl = "";
    let newFormValues = formUrls.filter((n) => n);
    setFormUrls(newFormValues);
    if (formUrls) {
      for (let i = 0; i < formUrls.length; i++) {
        if (formUrls[i] != "") {
          isValidUrl = formUrls[i].match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
        }
      }
    }
    // SampleUrls Validation
    let isValidSampleUrl = "";
    let newFormSampleValues = formSampleUrls.filter((n) => n);
    setFormSampleUrls(newFormSampleValues);
    if (formSampleUrls) {
      for (let i = 0; i < formSampleUrls.length; i++) {
        if (formSampleUrls[i] != "") {
          isValidSampleUrl = formSampleUrls[i].match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
        }
      }
    }
    const tempErrors = {
      number: !number && show && "Please enter a number",
      date: !startDate && show && "Please add a valid date",
      coverletter: !coverletter && "Please enter comments",
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }

    submitHandler();
  };

  const { userData } = useSelector((state) => state.authReducer);
  const handleClickOpen = async (item_id) => {
    const timer = setTimeout(() => {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const checking = axios
        .get(`${BACKEND_API_URL}jobs/${item_id}/`, config)
        .then((res) => {
          setJobId(res.data.id);
          setTitle(res.data.title);
          setJobDescription(res.data.description);
          setDeliveryDate(res.data.expected_delivery_date);
          setOfferPrice(res.data.price);
          setTags(res.data.tags);
          setCategory(res.data.category);
          setSkills(res.data.skills);
          setIndustry(res.data.industry);
          setLevel(res.data.level);
          setJobType(res.data.get_jobType_details);
          setCompanyType(res.data.company_name);
          setuserdata(res.data.username);

          const created = moment(res.data.created).format("MM-DD-YYYY");
          setcreateddate(created);
          let arrJobDocuments = [];
          let arrAdditionalJobDocuments = [];
          if (res.data.images.length > 0) {
            for (let i = 0; i < res.data.images.length; i++) {
              arrJobDocuments.push(res.data.images[i].job_images);
              arrAdditionalJobDocuments.push(
                res.data.images[i].work_sample_images
              );
            }
          }

          setJobDocuments(arrJobDocuments.filter((x) => x !== null));
          setAdditionalJobDocuments(
            arrAdditionalJobDocuments.filter((x) => x !== null)
          );

          const start = res.data.expected_delivery_date;
          let today = new Date().toISOString().slice(0, 10);
          const diffInMs = new Date(start) - new Date(today);
          const diffIndeliveryDays = diffInMs / (1000 * 60 * 60 * 24);
          const diffInHours = diffInMs / (1000 * 60 * 60);

          const selectTime = new Date();
          selectTime.setHours(24, 0, 0, 0);
          const currentTime = new Date();

          const result1 = selectTime.getTime() - currentTime.getTime();

          const result2 = result1 / (1000 * 60 * 60);

          const resultHours = Math.floor(result2);
          if (diffIndeliveryDays < 1 && diffIndeliveryDays > 0) {
            setdeliveryhoursvalue(resultHours);
            setdeliveryhours(true);
            setdeliverydatevalue(false);
          } else if (diffIndeliveryDays > 1) {
            setdeliverydata(diffIndeliveryDays);
            setdeliveryhours(false);
            setdeliverydatevalue(true);
          } else if (diffIndeliveryDays < 0) {
            setdeliveryhours(false);
            setdeliverydatevalue(false);
          } else {
            setdeliveryhours(false);
            setdeliverydatevalue(false);
          }

          const current1 = new Date(res.data.expected_delivery_date);
          const current2 = new Date(res.data.expected_delivery_date);
          const current3 = new Date(res.data.expected_delivery_date);

          // it adds 1 day to the current date
          current1.setDate(current1.getDate() + 1);
          current2.setDate(current2.getDate() + 2);
          current3.setDate(current3.getDate() - 1);
          const coverter1 = moment(current1).format("MM-DD-YYYY");
          const coverter2 = moment(current2).format("MM-DD-YYYY");
          const coverter3 = moment(current3).format("MM-DD-YYYY");
          setdateadd1(coverter1);
          setdateadd2(coverter2);
          setdateadd3(coverter3);

          const per10 = 10;
          const per20 = 20;
          const per30 = 30;
          const n = Number(res.data.price);

          const percentage10 = n + (n / 100) * per10;
          const percentage20 = n + (n / 100) * per20;
          const percentage30 = n + (n / 100) * per30;

          set10value(percentage10);
          set20value(percentage20);
          set30value(percentage30);
        })
        .catch((err) => {});
    }, 100);
    setOpen5(true);
    return () => clearTimeout(timer);
  };

  const submitHandler = async (data, event) => {
    let user = JSON.parse(localStorage.getItem("userData"));

    if ((number) => 5) {
      const formData = new FormData();

      if (files) {
        for (const key of Object.keys(files)) {
          formData.append("image", files[key]);
        }
      }

      if (formSampleUrls) {
        setFormSampleUrls(formSampleUrls.filter((item) => item));
        formData.append("sample_work_url", formSampleUrls);
      }

      formData.append("question", question);
      formData.append("cover_letter", coverletter);
      formData.append("proposed_price", number);
      formData.append("user", user.user.user_id);
      formData.append(
        "proposed_due_date",
        moment(duedeliveryDate).format("YYYY-MM-DD")
      );
      formData.append("job", jobId);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const success = await axios
        .post(`${BACKEND_API_URL}job-applied/`, formData, config)
        .then((res) => {
          swal({
            title: "Successfully Complete",
            text: res.data.message,
            className: "successAlert-login",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/home");
          }, 500);
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: err.response.data.message,
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 2500,
          });
          return;
        });
    }
  };
  let sampleurl = "";
  let handleChangesampleUrls = (e) => {
    sethide(true);
    if (sampleimgUrl != "") {
      if (
        (sampleurl = sampleimgUrl.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        ))
      ) {
        setFormSampleUrls([...formSampleUrls, sampleimgUrl]);
        setsampleImgUrl("");
      } else {
        const tempErrors = {
          formsampleImgUrls:
            sampleurl == null && "Please check the url(s) and try again",
        };
        setErrors(tempErrors);
      }
    } else if (sampleimgUrl == "") {
      setsampleImgUrl("");
      const tempErrors = {
        formsampleImgUrls: !sampleimgUrl && "Please enter url",
      };
      setErrors(tempErrors);
    } else {
      setsampleImgUrl("");
      const tempErrors = {
        formsampleImgUrls:
          sampleurl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  const [usersForRender, setUsersForRender] = useState([]);
  // const { jobData, loading, success } = useSelector(
  //   (state) => state.jobReducer
  // );
  const {
    availableJobList,
    count,
    loading: jobLoading,
  } = useSelector((state) => state.availableJobListReducer);
  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { loading } = useSelector((state) => state.loaderReducer);

  useEffect(() => {
    dispatch({ type: AVAILABLE_JOB_LIST_RESET });
  }, []);

  useEffect(() => {
    // dispatch(defaultPageLoader());
    dispatch(listAllAvailableJobs(currentPage));
  }, [success, currentPage]);

  useEffect(() => {
    if (availableJobList) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [availableJobList]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        width: 500,
      },
      {
        label: "Offer Price",
        field: "price",
        sort: "asc",
        width: 500,
      },
      {
        label: "Due Date",
        field: "expected_delivery_date",
        sort: "asc",
        width: 500,
      },
      // {
      //   label: "Updated At",
      //   field: "updated_at",
      //   sort: "asc",
      //   width: 500,
      // },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: usersForRender,
  };

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this job?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      timer: 1500,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteJob(id));
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
  };

  const removeDocument = (e, v) => {
    if (v == "icon") {
      const s = jobDocumentsPopup.filter((item, index) => index !== e);
      setJobDocumentsPopup(s);

      const s1 = imgRef.current.filter((item, index) => index !== e);
      imgRef.current = s1;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);

      return;
    }
    if (v == "image") {
      const s = jobDocumentsPopup.filter((item, index) => index !== e);
      setJobDocumentsPopup(s);
      imgRef.current = s;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);

      return;
    }
    if (v == "data") {
      const s = imgRef.filter((item, index) => index !== e);
      setJobDocumentsPopup(jobDocumentsPopup.filter((el, i) => i !== e));
      setFileExtension(fileExtension.filter((el, i) => i !== e));
      imgRef.current = s;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);
      return;
    }
  };

  const imageMimeType = /image\/(svg|eps|png|jpg|jpeg|gif)/i;

  const [isOpen, setIsOpen] = useState(false);
  const openPopup = async (item_id) => {
    setJobId(item_id);
    await dispatch(getJobDetails(item_id));
    setNewJobDetails(true);

    setIsOpen(!isOpen);
  };

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  useEffect(() => {
    const handler = () => {
      setOpen3(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    if (job_detail_success) {
      setTitle(jobDetails.title);
      setJobDescription(jobDetails.description);
      // setJobDocuments(jobDetails.images);
      setDeliveryDate(jobDetails.expected_delivery_date);
      setOfferPrice(jobDetails.price);
      setTags(jobDetails.tags);
      setCategory(jobDetails.category);
      setSkills(jobDetails.skills);
      setIndustry(jobDetails.industry);
      setLevel(jobDetails.level);
      setJobType(jobDetails.get_jobType_details);
      setCompanyType(jobDetails.company_name);

      let arrJobDocuments = [];
      let arrAdditionalJobDocuments = [];
      if (jobDetails.images.length > 0) {
        for (let i = 0; i < jobDetails.images.length; i++) {
          arrJobDocuments.push(jobDetails.images[i].job_images);
          arrAdditionalJobDocuments.push(
            jobDetails.images[i].work_sample_images
          );
        }
      }

      setJobDocuments(arrJobDocuments.filter((x) => x !== null));
      setAdditionalJobDocuments(
        arrAdditionalJobDocuments.filter((x) => x !== null)
      );
      setNewJobDetails(false);
    }
  }, [job_detail_success, newJobDetails]);

  const closePopup = () => {
    // setIsLoading(true);
    // setTimeout(function () {
    //   setIsLoading(false);
    // }, 1200);

    setIsOpen(false);
    setJobId();
    setTitle();
    setJobDescription();
    setJobDocuments([]);
    setAdditionalJobDocuments([]);
    setDeliveryDate();
    setOfferPrice();
    setTags();
    setCategory();
    setSkills();
    setIndustry();
    setLevel();
    setJobType();
    setCompanyType();
  };

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  const goToPrevPage = (prevpage) => {
    setCurrentPage(prevpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", prevpage);
    navigate(`/jobs/list?${urlParams}`);
  };

  const goToNextPage = (nextpage) => {
    setCurrentPage(nextpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", nextpage);
    navigate(`/jobs/list?${urlParams}`);
  };

  // DRAG AND DROP FUNCTIONALITY

  React.useEffect(() => {
    drop.current?.addEventListener("dragover", handleDragOver);
    drop.current?.addEventListener("drop", handleDrop);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // const { files } = e.dataTransfer;
    setAttachFiles(true);
    var imageList = [];
    var previewImages = [];
    let fileext = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.dataTransfer.files[i].name.split(".").at(-1);
      const allowedFileTypes = ["eps"];

      if (
        !e.dataTransfer.files[i].type.match(imageMimeType) &&
        !allowedFileTypes.includes(fileExtension)
      ) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return
      } else if (e.dataTransfer.files[i].size > maxDocSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 25mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 2500,
        });
      }
      // Max files 10
      else if (e.dataTransfer.files.length > 10) {
        swal({
          title: "Error",
          text: "Maximum 10 files allowed",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 2500,
        });
      }

      if (
        previewImages.length < 10 &&
        e.dataTransfer.files[i].size <= maxDocSize
      ) {
        previewImages.push(URL.createObjectURL(e.dataTransfer.files[i]));
      }

      if (imageList.length < 10 && e.dataTransfer.files[i].size <= maxDocSize) {
        imageList.push(e.dataTransfer.files[i]);
      }

      if (fileext.length < 10 && e.dataTransfer.files[i].size <= maxDocSize) {
        fileext.push(
          e.dataTransfer.files[i]?.name?.slice(
            ((e.dataTransfer.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
      // }
    }
    setJobDocumentsPopup(imageList);
    setFileExtension(fileext);
    imgRef.current = imageList;
    // imgRef.current = imageList;
  };

  React.useEffect(() => {
    imgRef.current = jobDocumentsPopup;
  }, [jobDocumentsPopup]);

  // DRAG AND DROP FUNCTIONALITY

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading || jobLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Topallpage bak_h">
            <div className="ContentDiv TopM">
              <div className="Fresh">
                <div className="Jobs">
                  <h1 className="Freshtitle">Job List</h1>
                  <div className="FreshBtn"></div>
                </div>
              </div>
              <div className="AllPageHight FreshJobTop">
                {availableJobList?.map((item, index) => (
                  <div
                    className="Remotemarkeitng"
                    key={index}
                    // onClick={() => openPopup(item.id)}
                  >
                    <div className="bt-Title">
                      <div className="joblistcreator">
                        <Link to={`/jobs/details/${item.id}`}>
                          <h2>{item.title}</h2>
                        </Link>
                      </div>

                      <div className="jopapplycreator">
                        <>
                          {item?.job_applied_status == "True" ? (
                            <span className="jobappied">Job Applied</span>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary Small border-radius applynowbtn_M"
                              onClick={() => handleClickOpen(`${item?.id}`)}
                            >
                              Apply Now
                            </button>
                          )}
                          {/* <Link
                                className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                                to={`/jobs/apply/${jobId}`}
                              >
                                {" "}
                                Submit a Proposal{" "}
                              </Link> */}
                        </>
                        {/* <a href={`/jobs/details/${item.id}`}> */}

                        {/* </a> */}
                        <button
                          type="button"
                          className="delJobedeidtbtn "
                          onClick={() => openPopup(item.id)}
                        >
                          <img
                            className="viewicon"
                            src={process.env.PUBLIC_URL + "/img/viewicon.png"}
                            alt=""
                          />
                        </button>
                        {/* <a onClick={() => deleteHandler(item.id)}>
                          <button type="button" className="delJob">
                            <img
                              className="editicon"
                              src={process.env.PUBLIC_URL + "/img/delet.png"}
                              alt=""
                            />
                          </button>
                        </a> */}
                      </div>
                    </div>
                    <div className="RemoteText">
                      <p className="PostedDate">
                        {/* Posted on: {item.expected_delivery_date} */}
                        Posted on: {moment(item?.created).format("yyyy-MM-DD")}
                      </p>
                      <div className="PostedDesc">
                        {item.description?.length > 200
                          ? item.description?.substring(0, 200) + "..."
                          : item.description}
                      </div>
                      <div className="Budget-Title">
                        <li>
                          <h5>Budget:</h5>
                        </li>
                        <li>
                          <h5>${item.price}</h5>
                        </li>
                      </div>
                      <div className="Budget-Title">
                        <li>
                          <h5>Level:</h5>
                        </li>
                        <li>
                          <h5>{item?.level?.level_name}</h5>
                        </li>
                      </div>

                      <div className="Skill mt-4">
                        <li>
                          <h5>Skills:</h5>
                        </li>

                        {item.skills?.map((item, index) => (
                          <li key={index}>
                            <Link to="">{item.skill_name}</Link>
                          </li>
                        ))}
                      </div>
                      {/* </div> */}
                      <div className="Skill mt-4">
                        <li>
                          <h5>Tags:</h5>
                        </li>
                        {item.tags.split(",").map((tag, index) => (
                          <li key={index}>
                            <Link to="#">{tag}</Link>
                          </li>
                        ))}
                      </div>
                      <div className="ApplyButton_2">
                        <button
                          type="button"
                          className="btn btn-primary Small border-radius"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!availableJobList?.length && (
                  <div className="Topallpage Custompage">
                    <h2 className="nonew">NO DATA FOUND</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
          {pages > 1 && (
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
          )}
          <div className="Topallpage"></div>
          <Dialog
            className="job-custom_popup"
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={closePopup}
            aria-describedby="alert-dialog-slide-description "
          >
            <DialogContent>
              <div className="Topallpage creator-joblist">
                <div className="MarketingDetails-popup ContentDiv border-radius">
                  <div className="Marketingcamaign">
                    <div className="CategorylistName">
                      <div className="jobdcreator_joblist">
                        <h2>{jobDetails?.title}</h2>
                      </div>

                      <div className="submitcreatorlist">
                        <>
                          {jobDetails?.job_applied_status == "True" ? (
                            <span className="jobappied">Job Applied</span>
                          ) : (
                            <Link to={`/jobs/apply/${jobId}`}>
                              <button
                                type="button"
                                className="btn btn-primary Small border-radius Small_new_bt"
                              >
                                Apply Now
                              </button>
                            </Link>
                          )}
                        </>
                      </div>
                    </div>

                    <p className="duedate duedate_sec">
                      Due on: {jobDetails?.expected_delivery_date}
                    </p>
                    <div className="jobdetailsInProgress">
                      <Link className="jobdetailsInProgressBtn" to="">
                        In Progress
                      </Link>
                    </div>
                    <p className=" INvehicula">{jobDetails?.description}</p>
                    <h5 className="ProvidedTitle">Provided Media:</h5>
                    <h6>Job Documents</h6>

                    <div className="mediaimg Providedmediaimg">
                      {jobDocuments?.length > 0 &&
                        jobDocuments?.map((item, index) => (
                          <div key={index}>
                            <a
                              index_item={index}
                              target="_blank"
                              href={`${item}`}
                              // href={item}
                            >
                              <li key={index}>
                                <img className="" src={`${item}`} alt="" />
                              </li>
                            </a>
                          </div>
                        ))}
                    </div>
                    {jobDocuments?.length < 1 && <div>N/A</div>}
                    <h6>Additional Job Documents</h6>
                    <div className="mediaimg Providedmediaimg">
                      {additionalJobDocuments?.length > 0 &&
                        additionalJobDocuments?.map((item, index) => (
                          <div key={index}>
                            <a
                              index_item={index}
                              target="_blank"
                              href={`${item}`}
                              // href={item}
                            >
                              <li key={index}>
                                <img className="" src={`${item}`} alt="" />
                              </li>
                            </a>
                          </div>
                        ))}
                    </div>
                    {additionalJobDocuments?.length < 1 && <div>N/A</div>}
                    {/* <div className="mediaimg">
                      {jobDetails?.images?.map((item, index) => (
                        <div key={index}>
                          {item.job_images
                            ?.slice(
                              ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
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
                            ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
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
                                {item?.job_images?.slice(
                                  ((item.job_images.lastIndexOf("/") - 1) >>>
                                    0) +
                                    2
                                )}
                              </span>
                            </a>
                          </p>
                        )}
                      </div>
                    ))} */}
                  </div>
                  <hr className="b-top" />
                  <table>
                    <tr className="Pricetable">
                      <td>
                        <h5 className="colortype">Job Type:</h5>
                      </td>
                      <td>
                        <p className="fixedpriceDetail">
                          {jobDetails?.get_jobType_details}
                        </p>
                      </td>
                      <td>
                        <h5 className="colortype">Industry:</h5>
                      </td>
                      <td>
                        <p className="fixedpriceDetail">
                          {jobDetails?.industry_name}
                        </p>
                      </td>
                    </tr>
                    <tr className="Pricetable">
                      <td>
                        <h5 className="colortype">Offered Price:</h5>
                      </td>
                      <td>
                        <p className="fixedpriceDetail">${jobDetails?.price}</p>
                      </td>
                      <td>
                        <h5 className="colortype">Level:</h5>
                      </td>
                      <td>
                        <p className="fixedpriceDetail">
                          {jobDetails?.level?.level_name}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <hr className="b-top" />
                  <table>
                    <tr className="Pricetable">
                      <td>
                        <h5 className="colortype CompanyName">Company:</h5>
                      </td>
                      <td>
                        <p className="fixedpriceDetail CompanyNameIn">
                          {/* ABC Industries */}
                          {jobDetails?.company_name}
                        </p>
                      </td>
                    </tr>
                  </table>
                  <hr className="b-top" />
                  <div className="Skill">
                    <h5 className="skillsjobde mb-4">Skills:</h5>
                    {jobDetails?.skills?.map((item) => (
                      <li>
                        <Link to="">{item.skill_name}</Link>
                      </li>
                    ))}
                  </div>
                  <div className="Skill SkillbtMc">
                    <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                    {jobDetails?.tags?.split(",").map((tag, index) => (
                      <li key={index}>
                        <Link to="#">{tag}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={closePopup}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            className="CDashboard CDashboard1"
            open={open5}
            onClose={handleClose}
          >
            <DialogTitle className="CDashboarddiv1">
              <div className="ApplyTitledashboardnewdiv">
                <h1 className="ApplyTitledashboard1">Apply to Job</h1>{" "}
                <span className="closebtnjoblist" onClick={handleClose}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
            </DialogTitle>
            <DialogContent className="applytojb">
              <div className="jobapplyform jobapplyformn">
                <div className="amzingBannerAdMain">
                  <div className="amzingBannerText">
                    <h4>{title}</h4>
                    <p className="amzingBannerParagraph">{jobDescription}</p>
                  </div>
                  <div className="createrBoxAmazingBanner">
                    <div className="createrBoxContent">
                      <div className="createdTextDate">
                        <p>Created</p>
                        <p className="dateCreated">{createddate}</p>
                      </div>
                      <div className="createdJohnDoe">
                        <p>Created by</p>
                        <p className="johnDeoCreator">{userdata}</p>
                      </div>
                      <div className="createdBoxCompany">
                        <p>Company</p>
                        <p className="starkIndusties">{company_type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="NegotiateMainDiv NegotiateMainDiv2  warning errordate">
                  <div className="negOfferPriceSec negOfferPriceSec2 neg3">
                    <div
                      className={
                        errors1.number
                          ? "Offer_A_P neg3 error"
                          : "Offer_A_P neg3"
                      }
                    >
                      <h4 className="negPriceCreatorHead negPriceCreatorHead2">
                        Offer Price{" "}
                      </h4>
                      <p>${offerPrice}</p>
                    </div>
                  </div>
                  <div className="negDueDateSec negDueDateSec2">
                    <div className="textContentDatePara">
                      <h4 className="newDueDateNeg ">Due Date</h4>
                      <p>{deliveryDate}</p>

                      {deliveryhours && (
                        <p className="colorsec">
                          {deliveryhoursvalue} hours away
                        </p>
                      )}

                      {deliverydatevalue && (
                        <p
                          className={
                            deliverydata == 1 ? "colorsec" : "threeDaysAway"
                          }
                        >
                          {deliverydata} days away
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="NegotiateButtonOne NegotiateButtonOne2">
                    <button
                      type="button"
                      className="negotiateButton"
                      onClick={mainNegotiate}
                    >
                      Negotiate
                    </button>
                  </div>
                </div>

                {proposedPrice && !show && (
                  <>
                    <div className="NegotiateMainDiv NegotiateMainDiv_sec proposed_section proposedPriceDueDate">
                      <div className="negOfferPriceSec">
                        <div className="Offer_A_P">
                          <h4 className="negPriceCreatorHead">
                            Proposed Price{" "}
                          </h4>
                          <p>${proposedPrice}</p>
                        </div>
                      </div>
                      <div className="negDueDateSec">
                        <div className="textContentDatePara">
                          <h4 className="newDueDateNeg">Proposed Due Date</h4>
                          <p>{moment(proposedDate).format("YYYY-MM-DD")}</p>
                        </div>
                      </div>
                      <div className="NegotiateButtonOne">
                        <button
                          className="negotiateButton clear"
                          onClick={clearMainNegotiate}
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="proposedPriceDueDateMainDiv">
                  <div className="proposedPriceContent2">
                    {show ? (
                      <>
                        <div className="proposedPriceDueDate">
                          <div className="creatorhomepage creatorhomepageH">
                            <div className="negOfferPriceSec negOffer21">
                              <div
                                className={
                                  errors1.number
                                    ? "Offer_A_P error"
                                    : "Offer_A_P"
                                }
                              >
                                <h4 className="negPriceCreatorHead">
                                  Offer Price{" "}
                                </h4>
                                <p>${offerPrice}</p>
                              </div>
                            </div>

                            <div className="ProposedPriceDiv">
                              <h4 className="ProposedtextPrice">
                                Proposed Price
                              </h4>
                              <div className="TopPriceFirst">
                                <div
                                  className={
                                    errors1.price
                                      ? "priceDoller   error"
                                      : "priceDoller"
                                  }
                                >
                                  <input
                                    className="inputPriceDoller"
                                    type="number"
                                    placeholder="0.00"
                                    id=""
                                    value={number}
                                    onInput={(e) => {
                                      setErrors({
                                        ...errors1,
                                        number: null,
                                      });
                                      if (
                                        e.target.value.length >
                                        e.target.maxLength
                                      )
                                        e.target.value = e.target.value?.slice(
                                          0,
                                          e.target.maxLength
                                        );
                                    }}
                                    maxLength={8}
                                    onKeyDown={blockInvalidChar}
                                    onChange={handleChange1}
                                  />
                                  <div className="creatorProposedE">
                                    <span
                                      style={{
                                        color: "#D14F4F",
                                        opacity: errors1.number ? 1 : 0,
                                      }}
                                    >
                                      {errors1.number ?? "valid"}
                                    </span>
                                  </div>
                                  <span className="pricetag pricetagss4 pricetagu">
                                    $
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {per25 && (
                            <>
                              {" "}
                              <p className="proposingtext proposingtext1">
                                You’re proposing a price over {printPreData}%
                                higher.
                              </p>
                            </>
                          )}
                          {per50 && (
                            <>
                              {" "}
                              <p className="proposingtext proposingtext1 colorsec">
                                You’re proposing a price over {printPreData}%
                                higher. Your Proposal is less likely to be
                                accepted.
                              </p>
                            </>
                          )}
                          {datepricewarning && (
                            <>
                              {" "}
                              <p className="proposingtext colorsec proposingtext1">
                                You’re proposing a price over {printPreData}%
                                higher. Consider proposing a closer due date.
                              </p>
                            </>
                          )}

                          {/* <div className="Negotiatestates">
                                              <li
                                                onClick={() => handleDiv("1")}
                                                className="Negotiatestates1"
                                              >
                                                <p>
                                                  +10%
                                                  <br />
                                                  <span>{per10}</span>
                                                </p>
                                              </li>
                                              <li
                                                onClick={() => handleDiv("2")}
                                              >
                                                <p>
                                                  {" "}
                                                  +20%
                                                  <br />
                                                  <span>{per20}</span>
                                                </p>
                                              </li>
                                              <li
                                                onClick={() => handleDiv("3")}
                                              >
                                                <p>
                                                  +30%
                                                  <br />
                                                  <span>{per30}</span>
                                                </p>
                                              </li>
                                              <li
                                                onClick={() => handleDiv("4")}
                                                className="Negotiatestates2"
                                              >
                                                <p>Custom</p>
                                              </li>
                                            </div> */}

                          <div className="creatordashbord">
                            <div className="creatorjoblistdate creatorjoblistdateH">
                              <div className="duejoblist5">
                                <div className="textContentDatePara">
                                  <h4 className="newDueDateNeg">Due Date</h4>
                                  <p>{deliveryDate}</p>
                                  {deliveryhours && (
                                    <p className="colorsec">
                                      {deliveryhoursvalue} hours away
                                    </p>
                                  )}

                                  {deliverydatevalue && (
                                    <p
                                      className={
                                        deliverydata == 1
                                          ? "colorsec"
                                          : "threeDaysAway"
                                      }
                                    >
                                      {deliverydata} days away
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div
                                className={
                                  errors1.date
                                    ? "ProposedDueDateContent ProposedDueDateContent1 error"
                                    : "ProposedDueDateContent ProposedDueDateContent1"
                                }
                              >
                                <h4 className="proposedDuedateText">
                                  Proposed Due Date
                                </h4>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <label className="joblistinputc">
                                    <DatePicker
                                      mask="__-__-____"
                                      label=""
                                      value={startDate}
                                      inputFormat="MM-dd-yyyy"
                                      formatDate={(duedeliveryDate) =>
                                        moment(new Date()).format("DD-MM-YYYY")
                                      }
                                      // inputFormat="MM-dd-yyyy"
                                      minDate={new Date()}
                                      onChange={(date) => {
                                        {
                                          handleDate(date);
                                        }
                                        setErrors({
                                          ...errors1,
                                          date: null,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          variant="standard"
                                          {...params}
                                        />
                                      )}
                                    />
                                  </label>
                                </LocalizationProvider>
                                <div className="Price_AE">
                                  <span
                                    style={{
                                      color: "#D14F4F",
                                      opacity: errors1.date ? 1 : 0,
                                    }}
                                  >
                                    {errors1.date ?? "valid"}
                                  </span>
                                </div>
                                {/* <div>{showData ? <h1>{daysData} days</h1> : null}</div> */}
                              </div>
                            </div>
                            {datewarning && (
                              <p className="proposingtext colorsec proposingday5">
                                You’re proposing a due date more than 7 days
                                away. Your Proposal is less likely to be
                                accepted
                              </p>
                            )}
                          </div>
                          <div className="creatordasbosavecancel">
                            <div className="creatorsavebutton">
                              <div className="negoCancelButtonDiv">
                                <button
                                  className="negoCancelButton"
                                  onClick={mainProposedCancel}
                                >
                                  Cancel
                                </button>
                              </div>

                              <div>
                                <button
                                  className="negoCancelButton1"
                                  onClick={savevalue}
                                  type="button"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="applyJobImgAttach">
                  <h4 className="attachPortfolioFiles">
                    Attach Files
                    <span className="OptionalAttachtext">Optional</span>
                  </h4>
                  <p className="attachfilesCreatorText">
                    You may attach up to 10 files under the size of 10MB each.
                    Include work samples or other documents to support your
                    application.
                  </p>
                  <div className="container containermargin1">
                    <div
                      className="uploadimgcreator"
                      {...getRootProps({ style })}
                    >
                      <input {...getInputProps()} />
                      <p>
                        <img
                          className="uploadImageProfile uploadImageProfile2"
                          src={process.env.PUBLIC_URL + "/img/uploadimg.png"}
                          alt=""
                        />
                        Attach Files
                      </p>
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  </div>
                </div>

                <div className="job-documents-imgtotle">
                  {imgRef &&
                    // !imageChanged &&
                    imgRef?.current?.map((item, index) => (
                      <>
                        {fileExtension[index].match(
                          /(svg|eps|png|jpg|jpeg|gif)$/i
                        ) && (
                          <>
                            <div
                              index_val={index}
                              className="job-documents-img f-16 image-item"
                              key={index}
                            >
                              <a
                                target="_blank"
                                href={URL.createObjectURL(item)}
                              >
                                {/* <a target="_blank" href={item}> */}
                                <img
                                  className="w-100"
                                  src={URL.createObjectURL(item)}
                                  // src={item}
                                />
                              </a>
                              <div
                                className="overlay"
                                onClick={() => removeDocument(index, "image")}
                              >
                                <Link to="#" className="icon" title="Remove">
                                  <i className="fa-solid fa-circle-xmark"></i>
                                </Link>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ))}
                </div>

                {/* <div className="jobdocumentupl"></div> */}
                <h4 className="includeurltest">or include a URL</h4>
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

                <div
                  className={
                    errors1.formsampleImgUrls
                      ? "enterUrlLinkButton1 enterUrlLinkButtonnew error"
                      : "enterUrlLinkButton1 enterUrlLinkButtonnew"
                  }
                >
                  <input
                    className="joblistinput"
                    type="text"
                    value={sampleimgUrl}
                    placeholder="Enter URL"
                    onChange={(e) => {
                      setsampleImgUrl(e.target.value);
                      setErrors({
                        ...errors1,
                        formsampleImgUrls: null,
                      });
                      setErrors({
                        ...errors1,
                        url: null,
                      });
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleChangesampleUrls(e);
                      }
                    }}
                  />
                  <div
                    className={
                      errors1.formsampleImgUrls
                        ? "enterUrlLinkButton-error enterUrlLinkButton-error1  error"
                        : "enterUrlLinkButton-error enterUrlLinkButton-error1"
                    }
                  >
                    <span
                      className="formurjobapply"
                      style={{
                        color: "#D14F4F",
                        opacity: errors1.formSampleUrls ? 1 : 0,
                      }}
                    >
                      {errors1.formsampleImgUrls
                        ? errors1.formsampleImgUrls
                        : ""}
                    </span>
                  </div>
                  <div className="useButtonAssert">
                    <a
                      type="button"
                      onClick={(e) => {
                        handleChangesampleUrls(e);
                      }}
                      className=" AddMorebtn"
                    >
                      <img src="/img/plus.png" />
                      Add More
                    </a>
                  </div>

                  <span
                    className="urlCreator"
                    style={{
                      color: "#D14F4F",
                      opacity: errors1.url ? 1 : 0,
                    }}
                  >
                    {errors1.url ?? "valid"}
                  </span>
                  <div
                    className={
                      errors1.formsampleImgUrls
                        ? "enterUrlLinkButton-error enterUrlLinkButton-error1  error"
                        : "enterUrlLinkButton-error enterUrlLinkButton-error1"
                    }
                  >
                    <span
                      className="formurjobapply"
                      style={{
                        color: "#D14F4F",
                        opacity: errors1.formSampleUrls ? 1 : 0,
                      }}
                    >
                      {errors1.formsampleImgUrls
                        ? errors1.formsampleImgUrls
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="quesOptionalMain">
                  <h4 className="HaveQuesText">
                    Comments
                    <span className="OptionalHaveQuest">Optional</span>
                  </h4>
                </div>

                <div
                  className={
                    errors1.coverletter
                      ? "askYourQuestionInput error"
                      : "askYourQuestionInput"
                  }
                >
                  <textarea
                    onChange={(e) => {
                      setcoverletter(e.target.value);
                      setErrors({ ...errors1, coverletter: null });
                    }}
                    className="questionInput"
                    type="text"
                    placeholder="Enter your comments"
                  />
                  <span
                    className="CoverCreator4"
                    style={{
                      color: "#D14F4F",
                      opacity: errors1.coverletter ? 1 : 0,
                    }}
                  >
                    {errors1.coverletter ?? "valid"}
                  </span>
                </div>

                <div className="quesOptionalMain quesOptionalMainjoblist">
                  <h4 className="HaveQuesText">
                    Have a question?
                    <span className="OptionalHaveQuest">Optional</span>
                  </h4>
                  <p className="haveQuestCreatorText">
                    Questions will be public on the Job Detail page.
                  </p>
                </div>
                <div className="askYourQuestionInput">
                  <textarea
                    className="questionInput"
                    onChange={(e) => {
                      setquestion(e.target.value);
                    }}
                    type="text"
                    placeholder="Ask your question"
                  />
                </div>

                {/* 
                <div className="PriceCD">
                  {show ? (
                    <>
                      <div className="ProposedPriceCDA">
                        <h4 className="ProposedtextC">Proposed Price</h4>
                        <div className="TopPriceF">
                          <div className="pricename">
                            <input
                              type="number"
                              placeholder="0.00"
                              id="number"
                              name="number"
                              value={number}
                              onInput={(e) => {
                                setErrors({
                                  ...errors1,
                                  number: null,
                                });
                                if (e.target.value.length > e.target.maxLength)
                                  e.target.value = e.target.value?.slice(
                                    0,
                                    e.target.maxLength
                                  );
                              }}
                              maxLength={8}
                              onKeyDown={blockInvalidChar}
                              onChange={handleChange1}
                            />

                            <span className="pricetag pricetagss4">$</span>
                          </div>
                          <button
                            className="CancelACjob"
                            onClick={() => setShow(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div> */}

                <div className="jobBtnsub_newbtntop">
                  <div className="Canceljobapply Canceljobapply_1">
                    <span
                      className="create-accountclosebtn testk"
                      onClick={handleClose}
                    >
                      Cancel
                    </span>
                  </div>
                  <div className="jobBtnsub_Btnnew">
                    <button
                      className="jobclickBtnsubmint"
                      onClick={validateSubmit}
                      type="button"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
