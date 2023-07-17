import { useForm } from "react-hook-form";
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { BACKEND_API_URL } from "../../environment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import {
  getJobDetails,
  getJobAppliedDetails,
} from "../../redux/actions/job-actions";
import Select from "@mui/material/Select";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { validations } from "../../utils";
import moment from "moment";
import { useDropzone } from "react-dropzone";

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
  width: "100%",
  height: "100%",
};

const maxImageFileSize = 10000000;

export default function CreatorApplyJob() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let navigate = useNavigate();

  const drop = useRef(null);

  const [show, setShow] = useState(false);
  const [showdate, setShowdate] = useState(false);
  const [message, setMessage] = useState("");
  const [selects, setselects] = useState(null);
  const [number, setlink] = useState("");
  const [duedeliveryDate, duesetDeliveryDate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coverletter, setcoverletter] = useState("");
  const [deliverydata, setdeliverydata] = useState("");
  const { jobId } = useParams();
  const [deliveryhoursvalue, setdeliveryhoursvalue] = useState("");
  const [deliveryhours, setdeliveryhours] = useState(false);
  const [deliverydatevalue, setdeliverydatevalue] = useState(false);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [daysData, setDaysData] = useState("");
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const [daysdifference, setdaysdifference] = useState();
  const [title, setTitle] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [proposedPrice, setProposedPrice] = useState();
  const [proposedDate, setProposedDate] = useState();
  const [tags, setTags] = useState([]);
  const [datewarning, setdateWarning] = useState(false);
  const [skills, setSkills] = useState([]);
  const [level, setlevel] = useState();
  const [pricevalue, setpricevalue] = useState(true);
  const [dateshow, setdateshow] = useState(true);
  const [per25, set25value] = useState(false);
  const [per75, set75value] = useState(false);
  const [per50, set50value] = useState(false);
  const [per10, set10value] = useState();
  const [per20, set20value] = useState();
  const [per30, set30value] = useState();
  const [dateadd1, setdateadd1] = useState();
  const [dateadd2, setdateadd2] = useState();
  const [dateadd3, setdateadd3] = useState();
  const [jobDocuments, setJobDocuments] = useState();
  const [attachFiles, setAttachFiles] = useState(false);
  const [formSampleUrls, setFormSampleUrls] = useState([]);
  const [fileExtension, setFileExtension] = useState();
  const [sizeError, setSizeError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [sampleimgUrl, setsampleImgUrl] = useState("");
  const [hide, sethide] = useState(true);
  const [question, setquestion] = useState("");
  const [datepricewarning, setdatepricewarning] = useState(false);
  const imgRef = useRef(null);

  const [updateProposal, setUpdateProposal] = useState(false);
  const [jobAppliedId, setJobAppliedId] = useState();
  const [attachmentNameEdit, setAttachmentNameEdit] = useState([]);

  const [printPreData, setPrintPreData] = useState("");

  function btnClick() {
    setShow(true);
  }

  const [formUrls, setFormUrls] = useState([""]);

  const [errors1, setErrors] = useState({
    selects: null,
    price: null,
    message: null,
    formsampleImgUrls: null,
    formSampleUrls: null,
    coverletter: null,
    url: null,
  });

  setTimeout(() => {
    setIsLoading(false);
  }, 1200);

  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsReducer
  );
  const { success: success_job_applied_details, jobAppliedDetails } =
    useSelector((state) => state.jobAppliedDetailsReducer);

  useEffect(() => {
    if (userData?.user?.role !== 1) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getJobDetails(jobId));
  }, []);

  useEffect(() => {
    if (job_detail_success) {
      if (jobDetails.job_applied_id != "False") {
        dispatch(getJobAppliedDetails(jobDetails.job_applied_id));
        setUpdateProposal(true);
        setJobAppliedId(jobDetails?.job_applied_id);
      }
    }
  }, [job_detail_success]);

  useEffect(() => {
    if (success_job_applied_details) {
      // console.log("jobAppliedDetails--", jobAppliedDetails);
      // console.log("first--", jobAppliedDetails?.links);
      if (
        jobAppliedDetails?.job_applied_attachments &&
        jobAppliedDetails?.job_applied_attachments.length > 0
      ) {
        setFiles(jobAppliedDetails?.job_applied_attachments);
        setAttachmentNameEdit(jobAppliedDetails?.job_applied_attachments_name);
      }
      setcoverletter(jobAppliedDetails?.cover_letter);
      setquestion(jobAppliedDetails?.question);
      if (jobAppliedDetails?.links) {
        setFormSampleUrls(jobAppliedDetails?.links.split(","));
      }
      if (jobAppliedDetails?.proposed_price) {
        setlink(jobAppliedDetails?.proposed_price);
        setProposedPrice(jobAppliedDetails?.proposed_price);
        setProposedDate(jobAppliedDetails?.proposed_due_date);
      }

      setStartDate(new Date(jobAppliedDetails?.proposed_due_date));
    }
  }, [success_job_applied_details]);

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
    setShow(true);
    if (number == "") {
      setlink(offerPrice);
    }
  };
  let removeFormFieldsSampleUrls = (i) => {
    let newFormValues = [...formSampleUrls];
    newFormValues.splice(i, 1);
    setFormSampleUrls(newFormValues);
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
        // setsampleImgUrl("");
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
  const [isOpen3, setIsOpen3] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsOpen3(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);
  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
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

  let savevalue = () => {
    const tempErrors = {
      number: !number && show && "Please enter Proposed Price",
      date: !startDate && show && "Please add Proposed Due Date",
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    setProposedPrice(number);
    setProposedDate(startDate);
    setShow(false);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
    setErrors({ ...errors1, message: null });
  };

  const handleChange1 = (evt) => {
    setdatepricewarning(false);
    set25value(false);
    set75value(false);
    set50value(false);
    const { value } = evt.target;
    // console.log(value);

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

  const removeDocument = (e, v) => {
    if (v == "icon") {
      const s = jobDocuments.filter((item, index) => index !== e);
      setJobDocuments(s);

      const s1 = imgRef.current.filter((item, index) => index !== e);
      imgRef.current = s1;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);

      return;
    }
    if (v == "image") {
      const s = jobDocuments.filter((item, index) => index !== e);
      setJobDocuments(s);
      imgRef.current = s;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);

      return;
    }
    if (v == "data") {
      const s = imgRef.filter((item, index) => index !== e);
      setJobDocuments(jobDocuments.filter((el, i) => i !== e));
      setFileExtension(fileExtension.filter((el, i) => i !== e));
      imgRef.current = s;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);
      return;
    }
  };

  const maxDocSize = 10000000;

  const imageMimeType = /image\/(svg|eps|png|jpg|jpeg|gif)/i;

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
          e.target.files[i].name.slice(
            ((e.target.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
      // }
    }
    setJobDocuments(imageList);
    setFileExtension(fileext);
    imgRef.current = imageList;
  };

  const downloadFile = (blob, fileNameDownload) => {
    // console.log("blob--", blob);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.Fsplay = "none";
    a.href = url;
    a.download = fileNameDownload;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
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
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg+xml": [],
      "image/gif": [],
    },
    onDrop: useCallback(
      (acceptedFiles) => {
        // console.log(acceptedFiles[0]);
        if (!acceptedFiles[0].type.match(imageMimeType)) {
          swal({
            title: "Error",
            text: "Image type is not valid",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 5000,
          });
        } else if (acceptedFiles[0].size > maxImageFileSize) {
          swal({
            title: "Error",
            text: "Max file size allowed is 10mb",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 5000,
          });
        } else {
          setFiles([
            ...files,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                title: file.name,
              })
            ),
          ]);
        }
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

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map((file, index) => (
    <div className="jobimgdashboard" style={thumb} key={index}>
      <div style={thumbInner}>
        <button className="jobaplyeclosebuttan" onClick={removeFile(file)}>
          X
        </button>
        <img
          className="imguploadcreatorimg"
          src={file.preview ? file.preview : file}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview ? file.preview : file);
          }}
        />
        {file.title ? file.title : attachmentNameEdit[index + 1]}
      </div>
    </div>
  ));

  const validateSubmit = (e, data) => {
    e.preventDefault();
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
      number: !number && show && "Please enter Proposed Price",
      date: !startDate && show && "Please add Proposed Due Date",
      coverletter: !coverletter && "Please enter Comments",
      formUrls: isValidUrl == null && "Please check the url(s) and try again",
      formSampleUrls:
        isValidSampleUrl == null && "Please check the url(s) and try again",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };

  const submitHandler = async (data, event) => {
    let user = JSON.parse(localStorage.getItem("userData"));

    if (updateProposal) {
      if ((number) => 5) {
        const formData = new FormData();
        if (files) {
          for (const key of Object.keys(files)) {
            formData.append("image", files[key]);
          }
        }
        formData.append("cover_letter", coverletter);
        formData.append("question", question);
        formData.append("links", formSampleUrls);
        formData.append("proposed_price", number);
        formData.append("user", user.user.user_id);
        formData.append("job", jobId);
        formData.append("is_modified", false);
        formData.append(
          "proposed_due_date",
          moment(startDate).format("YYYY-MM-DD")
        );

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData.token}`,
          },
        };

        const success = await axios
          .put(
            `${BACKEND_API_URL}job-applied/${jobAppliedId}/`,
            formData,
            config
          )
          .then((res) => {
            // console.log("res--", res.data);
            swal({
              title: "Successfully Complete",
              text: res.data.message,
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            setTimeout(() => {
              navigate(`/jobs/details/${jobId}`);
            }, 500);
          })
          .catch((err) => {
            // console.log(err.response.data.message);
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
    } else {
      if ((number) => 5) {
        const formData = new FormData();
        if (files) {
          for (const key of Object.keys(files)) {
            formData.append("image", files[key]);
          }
        }
        formData.append("cover_letter", coverletter);
        formData.append("question", question);
        formData.append("links", formSampleUrls);
        formData.append("proposed_price", number);
        formData.append("user", user.user.user_id);
        formData.append("job", jobId);
        formData.append(
          "proposed_due_date",
          moment(startDate).format("YYYY-MM-DD")
        );

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData.token}`,
          },
        };

        const success = await axios
          .post(`${BACKEND_API_URL}job-applied/`, formData, config)
          .then((res) => {
            // console.log("res--", res.data);
            swal({
              title: "Successfully Complete",
              text: res.data.message,
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            setTimeout(() => {
              navigate(`/jobs/details/${jobId}`);
            }, 500);
          })
          .catch((err) => {
            // console.log(err.response.data.message);
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
    }
  };

  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const timer = setTimeout(() => {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const checking = axios
        .get(`${BACKEND_API_URL}jobs/${jobId}/`, config)
        .then((res) => {
          // console.log(res.data.id);
          setTitle(res.data.title);
          setJobDescription(res.data.description);
          setDeliveryDate(res.data.expected_delivery_date);
          setOfferPrice(res.data.price);
          setTags(res.data.tags);
          setSkills(res.data.skills);
          setlevel(res.data.level);
          const start = res.data.expected_delivery_date;
          let today = new Date().toISOString().slice(0, 10);
          const diffInMs = new Date(start) - new Date(today);
          const diffIndeliveryDays = diffInMs / (1000 * 60 * 60 * 24);
          setdeliverydata(diffIndeliveryDays);

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
        .catch((err) => { });
    }, 100);
    return () => clearTimeout(timer);
  }, [lengthError, sizeError]);

  let handleChangeUrls = (i, e) => {
    let newFormValues = [...formUrls];
    newFormValues[i] = e.target.value;
    setFormUrls(newFormValues);
    setErrors({ ...errors1, formUrls: null });
  };

  let addFormFieldsUrls = () => {
    if (formUrls.length < 10) {
      setFormUrls([...formUrls, ""]);
    }
  };

  let removeFormFieldsUrls = (i) => {
    let newFormValues = [...formUrls];
    newFormValues.splice(i, 1);
    setFormUrls(newFormValues);
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
    // console.log(e.dataTransfer.files);
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
        // return;
      } else if (e.dataTransfer.files[i].size > maxDocSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 10mb",
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
          e.dataTransfer.files[i].name.slice(
            ((e.dataTransfer.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
      // }
    }
    setJobDocuments(imageList);
    setFileExtension(fileext);
    // imgRef.current = imageList;
    // imgRef.current = imageList;
  };

  React.useEffect(() => {
    imgRef.current = jobDocuments;
  }, [jobDocuments]);

  // DRAG AND DROP FUNCTIONALITY

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        <div className="SubmitProposalcr">
          <div className="Proposaltitel">
            <h1 className="Submittitletopa">Submit a Proposal</h1>
            <Link className="Back-to-Job-List" to="/jobs/list">
              Back
            </Link>
          </div>
        </div>
        <div className=" FreshJobTop">
          <div className="Remotemarkeitng full-height">
            <div className="bt-Title">
              <div className="creatorapplyjob">
                <h2>{title}</h2>
              </div>
              {/* <div className="ApplyButton">
      <button type="button" className="delJobedeidtbtn "><img className="viewicon" src="/img/viewicon.png" alt=""/></button>
      </div> */}
            </div>
            <div className="RemoteText">
              <p className="PostedDate">Posted on : {deliveryDate}</p>
              <div className="PostedDesc">{jobDescription}</div>
              <div className="Budget-Title">
                <li>
                  <h5>Budget:</h5>
                </li>
                <li>
                  <h5>${offerPrice}</h5>
                </li>
              </div>
              <div className="Budget-Title">
                <li>
                  <h5>Level:</h5>
                </li>
                <li>
                  <h5>{level?.level_name}</h5>
                </li>
              </div>
              <div className="Skill">
                <li>
                  <h5 className="skillsjobde mb-4">Skills:</h5>
                </li>
                {skills?.map((item) => (
                  <li>
                    <Link to="">{item.skill_name}</Link>
                  </li>
                ))}
              </div>
              {/* <div className="Skill mt-2">
                <li>
                  <h5 className="skillsjobde">Tags:</h5>
                </li>
                {tags?.split(",")?.map((tag, index) => (
                          <li key={index}>
                            <Link to="#">{tag}</Link>
                          </li>
                        ))}
                <li>
                  <Link to="#">{tags}</Link>
                </li>
              </div> */}
              <div className="ApplyButton_2">
                <button
                  type="button"
                  className="btn btn-primary Small border-radius"
                >
                  Apply Now
                </button>
              </div>
            </div>
            <hr />

            <div className="bt-Title apply-heading-form">
              <div className="creatorapplyjob">
                <h2></h2>
              </div>
            </div>
            <div className="jobapplysec applyjobnewdiv">
              <div className="jobapplyform jobapplyformn">
                <div className="NegotiateMainDiv NegotiateMainDiv_sec">
                  <div className="negOfferPriceSec">
                    <div
                      className={
                        errors1.number ? "Offer_A_P error" : "Offer_A_P"
                      }
                    >
                      <h4 className="negPriceCreatorHead">Offer Price </h4>
                      <p>${offerPrice}</p>
                    </div>
                  </div>
                  <div className="negDueDateSec">
                    <div className="textContentDatePara">
                      <h4 className="newDueDateNeg">Due Date</h4>
                      <p>{deliveryDate}</p>
                      <p className="threeDaysAway">{deliverydata} days away</p>
                    </div>
                  </div>
                  <div className="NegotiateButtonOne">
                    <button
                      className="negotiateButton"
                      onClick={mainNegotiate}
                      type="button"
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
                        <div className="proposedPriceDueDate proposedPriceDueDatecreator">
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
                              <p className="proposingtext colorsec proposingtext50">
                                You’re proposing a price over {printPreData}%
                                higher . Your Proposal is less likely to be
                                accepted
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
                                      label=""
                                      value={startDate}
                                      format="MM-dd-yyyy"
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
                                      slotProps={{
                                        textField: {
                                          variant: "standard"
                                        }
                                      }}
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
                          </div>
                          {datewarning && (
                            <p className="proposingtext colorsec proposingday7">
                              You’re proposing a due date more than 7 days away.
                              Your Proposal is less likely to be accepted
                            </p>
                          )}
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
                  <div className="containermargin1">
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

                <div className="inciudeapplyjob">
                  <h4 className="creatorapplyjoburl">Or include a URL</h4>
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
                        ? "enterUrlLinkButton1 applyjoblistu applyjoblistu_new  error"
                        : "enterUrlLinkButton1 applyjoblistu applyjoblistu_new"
                    }
                  >
                    {hide && (
                      <input
                        className="joblistinput joblistinput1"
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
                    )}
                    <div className="useButtonAssert">
                      <a
                        onClick={(e) => {
                          handleChangesampleUrls(e);
                        }}
                        className="AddMorebtn"
                      >
                        <img src="/img/plus.png" />
                        Add More
                      </a>
                    </div>
                    {/* <span
                      className="CoverCreator2"
                      style={{
                        color: "#D14F4F",
                        opacity: errors1.url ? 1 : 0,
                      }}
                    >
                      {errors1.url ?? "valid"}
                    </span> */}
                    <div
                      className={
                        errors1.formsampleImgUrls
                          ? "enterUrlLinkButton-error error"
                          : "enterUrlLinkButton-error"
                      }
                    >
                      <span
                        className="formurjobapply2"
                        style={{
                          color: "#D14F4F",
                          opacity: errors1.formsampleImgUrls ? 1 : 0,
                        }}
                      >
                        {errors1.formsampleImgUrls
                          ? errors1.formsampleImgUrls
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="quesOptionalMain">
                    <h4 className="HaveQuesText">Comments</h4>
                  </div>

                  <div
                    className={
                      errors1.coverletter
                        ? "askYourQuestionInput error"
                        : "askYourQuestionInput  "
                    }
                  >
                    <textarea
                      value={coverletter}
                      onChange={(e) => {
                        setcoverletter(e.target.value);
                        setErrors({ ...errors1, coverletter: null });
                      }}
                      className="questionInput questionInput_cover_letter"
                      type="text"
                      placeholder="Enter your comments"
                    />
                  </div>

                  <span
                    className="CoverCreator3"
                    style={{
                      color: "#D14F4F",
                      opacity: errors1.coverletter ? 1 : 0,
                    }}
                  >
                    {errors1.coverletter ?? "valid"}
                  </span>

                  <div className="quesOptionalMain Optionalsec">
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
                      value={question}
                      onChange={(e) => {
                        setquestion(e.target.value);
                      }}
                      className="questionInput questionInput1"
                      type="text"
                      placeholder="Ask your question"
                    />
                  </div>
                </div>

                <div className="jobBtnsub2">
                  <div className="jobBtnsub_Btn">
                    <button
                      className="jobclickBtnsubmint testk"
                      type="submit"
                      value="Send message"
                      onClick={validateSubmit}
                    >
                      Apply Now
                    </button>
                  </div>

                  <div className="Canceljobapply">
                    <Link
                      className="create-account-btn border-radius"
                      to="/jobs/list"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
