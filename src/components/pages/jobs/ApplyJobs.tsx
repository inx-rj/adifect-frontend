import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axiosPrivate from "api/axios";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { API_URL } from "helper/env";
import moment from "moment";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import swal from "sweetalert";
import { MutableRefObject } from "react";
import { useSingleEffect } from "react-haiku";
import { Images } from "helper/images";
import Title from "components/common/pageTitle/Title";
import {
  Add,
  Close,
  Delete,
  FileUploadOutlined,
  InsertLink,
} from "@mui/icons-material";
import { SET_CREATOR_JOB_APPLIED_SUCCESS } from "redux/reducers/jobs/jobsApplied.slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
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
  width: "100%",
  height: "100%",
  objectfit: "cover !important",
};

const ApplyJobs = (props) => {
  const { open5, setOpen5, isPopupLoading, jobsId } = props;
  console.log("first", { open5, setOpen5 });
  const drop = useRef(null);
  const dispatch = useAppDispatch()
  const userData = useAppSelector(GET_USER_PROFILE_DATA);

  const [jobId, setJobId] = useState();
  const [number, setlink] = useState<any>("");
  const [show, setShow] = useState(false);
  const [showdate, setShowdate] = useState(false);
  const [duedeliveryDate, duesetDeliveryDate] = useState();
  const [jobDocumentsPopup, setJobDocumentsPopup] = useState<any>();
  const [fileExtension, setFileExtension] = useState<any>();
  const [selects, setselects] = useState(null);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState();
  const [datepricewarning, setdatepricewarning] = useState(false);
  const [offerPrice, setOfferPrice] = useState();
  const [datewarning, setdateWarning] = useState(false);
  const [deliverydata, setdeliverydata] = useState();
  const [formSampleUrls, setFormSampleUrls] = useState<any>([]);
  const [jobDescription, setJobDescription] = useState();
  const [daysData, setDaysData] = useState("");
  const [question, setquestion] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<any>();
  const [startDate, setStartDate] = useState(new Date());

  const [proposedPrice, setProposedPrice] = useState<any>();
  const [proposedDate, setProposedDate] = useState<any>();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [deliveryhoursvalue, setdeliveryhoursvalue] = useState<any>("");
  const [deliveryhours, setdeliveryhours] = useState(false);
  const [deliverydatevalue, setdeliverydatevalue] = useState(false);
  const [level, setLevel] = useState();
  const [job_type, setJobType] = useState();
  const [company_type, setCompanyType] = useState();
  const [userdata, setuserdata] = useState();
  const [createddate, setcreateddate] = useState<any>();
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
  const [daysdifference, setdaysdifference] = useState<any>();
  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [sampleimgUrl, setsampleImgUrl] = useState("");
  const [pricevalue, setpricevalue] = useState(true);
  const [dateshow, setdateshow] = useState(true);
  // const [open5, setOpen5] = useState(false);
  const [formUrls, setFormUrls] = useState([""]);
  const [coverletter, setcoverletter] = useState("");
  const [newJobDetails, setNewJobDetails] = useState(false);

  const [printPreData, setPrintPreData] = useState("");

  const [rerender, setRerender] = useState(false);

  const [jobAppliedId, setJobAppliedId] = useState();
  const [updateProposal, setUpdateProposal] = useState(false);

  const [files, setFiles] = useState([]);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobvideoDocuments, setJobDocumentsvideo] = useState([]);
  const [additionalvideoJobDocuments, setAdditionalvideoJobDocuments] =
    useState([]);
  const [jobvideoDocumentsThumbs, setJobDocumentsvideoThumbs] = useState([]);
  const [jobSamplevideoDocumentsThumbs, setJobSamplevideoDocumentsThumbs] =
    useState([]);
  // Define the type for the object that the ref will reference
  interface MyObjectType {
    filter: (a) => void | any; // Define the 'filter' property with its type
  }

  const imgRef = useRef(null);

  const [errors1, setErrors] = useState({
    number: null,
    formsampleImgUrls: null,
    formSampleUrls: null,
    date: null,
    url: null,
    coverletter: null,
    price: null,
  });

  useSingleEffect(() => {
    axiosPrivate.get(`${API_URL.JOBS.JOBS_LIST}${jobsId}/`).then((res) => {
      setJobId(res.data.id);
      setTitle(res.data.title);
      setJobDescription(res.data.description);
      setDeliveryDate(
        moment(res.data.expected_delivery_date).format("DD-MM-YYYY")
      );
      setProposedPrice(res.data.price); // Fix Added
      setProposedDate(new Date(res.data.expected_delivery_date)); // Fix Added
      setOfferPrice(res.data.price);
      setTags(res.data.tags);
      setCategory(res.data.category);
      setSkills(res.data.skills);
      setIndustry(res.data.industry);
      setLevel(res.data.level);
      setJobType(res.data.get_jobType_details);
      setCompanyType(res.data.company_name);
      setuserdata(res.data.username);
      setJobAppliedId(res.data.job_applied_id);
      // jobAppliedId.current = res.data.job_applied_id;

      if (res.data.job_applied_status == "True") {
        // const config = {
        //   headers: {
        //     "Content-type": "application/json",
        //     Authorization: `Bearer ${userData.token}`,
        //   },
        // };
        const checking = axiosPrivate
          .get(`${API_URL.JOBS.JOB_APPLIED}${res.data.job_applied_id}/`)
          .then((res) => {
            setUpdateProposal(true);
            // if (res.data.image) {
            //   setFiles(res.data.image);
            // }
            // if (formSampleUrls) {
            //   setFormSampleUrls(res.data.sample_work_url);
            // }
            setquestion(res.data.question);
            setcoverletter(res.data.cover_letter);
            if (res.data.proposed_price) {
              setlink(res.data.proposed_price);
            }
            // setdeliverydatevalue(res.data.proposed_due_date)
          })
          .catch((error) => {
            console.log("first", error);
          });
      }

      const created: any = moment(res.data.created).format("MM-DD-YYYY");
      setcreateddate(created);
      let arrJobDocuments = [];
      let arrvideoJobDocuments = [];
      let arrAdditionalJobDocuments = [];
      let arrAdditionalvideoJobDocuments = [];
      let arrJobDocumentsThumbs = [];
      let arrvideoJobDocumentsThumbs = [];
      let arrAdditionalJobDocumentsThumbs = [];
      let arrvideoAdditionalJobDocumentsThumbs = [];
      if (res.data.images.length > 0) {
        for (let i = 0; i < res.data.images.length; i++) {
          if (res.data.images[i].is_video == false) {
            // console.log(jobDetails.images[i].job_images)
            arrJobDocuments.push(res.data.images[i].job_images);
            arrAdditionalJobDocuments.push(
              res.data.images[i].work_sample_images
            );
            arrJobDocumentsThumbs.push(res.data.images[i].job_images_thumbnail);
            arrAdditionalJobDocumentsThumbs.push(
              res.data.images[i].work_sample_thumbnail
            );
            setJobDocuments(arrJobDocuments.filter((x) => x !== null));
            setAdditionalJobDocuments(
              arrAdditionalJobDocuments.filter((x) => x !== null)
            );
            setJobDocumentsThumbs(
              arrJobDocumentsThumbs.filter((x) => x !== null)
            );
            setJobSampleDocumentsThumbs(
              arrAdditionalJobDocumentsThumbs.filter((x) => x !== null)
            );
          } else {
            arrvideoJobDocuments.push(res.data.images[i].job_images);
            arrAdditionalvideoJobDocuments.push(
              res.data.images[i].work_sample_images
            );
            arrvideoJobDocumentsThumbs.push(
              res.data.images[i].job_images_thumbnail
            );
            arrvideoAdditionalJobDocumentsThumbs.push(
              res.data.images[i].work_sample_thumbnail
            );
            setJobDocumentsvideo(
              arrvideoJobDocuments.filter((x) => x !== null)
            );
            setAdditionalvideoJobDocuments(
              arrAdditionalvideoJobDocuments.filter((x) => x !== null)
            );
            setJobDocumentsvideoThumbs(
              arrvideoJobDocumentsThumbs.filter((x) => x !== null)
            );
            setJobSamplevideoDocumentsThumbs(
              arrvideoAdditionalJobDocumentsThumbs.filter((x) => x !== null)
            );
          }
        }
      }

      const start = res.data.expected_delivery_date;
      let today = new Date().toISOString().slice(0, 10);
      // @ts-ignore
      const diffInMs = new Date(start) - new Date(today);
      const diffIndeliveryDays: any = diffInMs / (1000 * 60 * 60 * 24);
      const diffInHours = diffInMs / (1000 * 60 * 60);

      const selectTime = new Date();
      selectTime.setHours(24, 0, 0, 0);
      const currentTime = new Date();

      const result1 = selectTime.getTime() - currentTime.getTime();

      const result2 = result1 / (1000 * 60 * 60);

      const resultHours: any = Math.floor(result2);
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
      const coverter1: any = moment(current1).format("MM-DD-YYYY");
      const coverter2: any = moment(current2).format("MM-DD-YYYY");
      const coverter3: any = moment(current3).format("MM-DD-YYYY");
      setdateadd1(coverter1);
      setdateadd2(coverter2);
      setdateadd3(coverter3);

      const per10 = 10;
      const per20 = 20;
      const per30 = 30;
      const n = Number(res.data.price);

      const percentage10: any = n + (n / 100) * per10;
      const percentage20: any = n + (n / 100) * per20;
      const percentage30: any = n + (n / 100) * per30;

      set10value(percentage10);
      set20value(percentage20);
      set30value(percentage30);
    });
    // .catch((err) => {});
    // }, 100);

    // setOpen5(true);
  });
  const handleClose = () => {
    // setJobId();
    // setTitle();
    // setJobDescription();
    // setJobDocuments();
    // setDeliveryDate();
    // setOfferPrice();
    // setTags();
    // setCategory();
    // setSkills();
    // setIndustry();
    // setLevel();
    // setJobType();
    // setCompanyType();
    setOpen5(false);
    // my code
    setdatepricewarning(false);
    set50value(false);
    set25value(false);
    setlink("");
    setShow(false);
    setcoverletter("");
    setquestion("");
    setFormSampleUrls([]);
    // setDeliveryDate();
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

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

  const style: any = useMemo(
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

  let sampleurl: any = "";
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
        const tempErrors: any = {
          formsampleImgUrls:
            sampleurl == null && "Please check the url(s) and try again",
        };
        setErrors(tempErrors);
      }
    } else if (sampleimgUrl == "") {
      setsampleImgUrl("");
      const tempErrors: any = {
        formsampleImgUrls: !sampleimgUrl && "Please enter url",
      };
      setErrors(tempErrors);
    } else {
      setsampleImgUrl("");
      const tempErrors: any = {
        formsampleImgUrls:
          sampleurl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  let removeFormFieldsSampleUrls = (i) => {
    let newFormValues = [...formSampleUrls];
    newFormValues.splice(i, 1);
    setFormSampleUrls(newFormValues);
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
      // @ts-ignore
      const s = imgRef.filter((item, index) => index !== e);
      setJobDocumentsPopup(jobDocumentsPopup.filter((el, i) => i !== e));
      setFileExtension(fileExtension.filter((el, i) => i !== e));
      imgRef.current = s;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);
      return;
    }
  };

  const validateSubmit = (e) => {
    e.preventDefault();
    sethide(false);
    // Urls Validation
    let isValidUrl: any = "";
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
    const tempErrors: any = {
      number: !number && show && "Please enter a number",
      date: !startDate && show && "Please add a valid date",
      coverletter: !coverletter && "Please enter comments",
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }

    // setIsPopupLoading(true);
    submitHandler();
  };

  const submitHandler = async () => {
    let user = JSON.parse(localStorage.getItem("userData"));

    if (updateProposal) {
      const formData = new FormData();

      if (files) {
        for (const key of Object.keys(files)) {
          formData.append("image", files[key]);
        }
      }

      // if (formSampleUrls) {
      //   setFormSampleUrls(formSampleUrls.filter((item) => item));
      //   formData.append("sample_work_url", formSampleUrls);
      // }

      formData.append("question", question);
      formData.append("cover_letter", coverletter);
      formData.append("proposed_price", number);
      formData.append("links", formSampleUrls);
      formData.append("user", user.user.user_id);
      formData.append(
        "proposed_due_date",
        moment(duedeliveryDate).format("YYYY-MM-DD")
      );
      formData.append("job", jobId);

      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${userData?.data?.token}`,
      //   },
      // };

      const success = await axiosPrivate
        .put(`${API_URL.JOBS.JOB_APPLIED}/${jobAppliedId}/`, formData)
        .then((res) => {
          console.log("ressss", res);
          dispatch(SET_CREATOR_JOB_APPLIED_SUCCESS("Job Applied Successfully"));
          swal({
            title: "Successfully Complete",
            text: res.data.message,
            className: "successAlert-login",
            icon: Images.Logo,
            buttons: {
              OK: false,
            },
            timer: 1500,
          });
          // setIsPopupLoading(true);
          handleClose();
          setRerender(true);
          setRerender(false);
        })
        .catch((err) => {
          console.log("ressss", err);
          // setIsPopupLoading(true);
          swal({
            title: "Error",
            text: err.response.data.message,
            className: "errorAlert",
            icon: Images.ErrorLogo,
            buttons: {
              OK: false,
            },
            timer: 2500,
          });
          return;
        });
    } else {
      if ((number) => 5) {
        const formData = new FormData();

        if (files) {
          for (const key of Object.keys(files)) {
            formData.append("image", files[key]);
          }
        }

        // if (formSampleUrls) {
        //   setFormSampleUrls(formSampleUrls.filter((item) => item));
        //   formData.append("sample_work_url", formSampleUrls);
        // }

        formData.append("question", question);
        formData.append("cover_letter", coverletter);
        formData.append("proposed_price", number);
        formData.append("links", formSampleUrls);
        formData.append("user", user.user.user_id);
        formData.append(
          "proposed_due_date",
          moment(startDate).format("YYYY-MM-DD")
        );
        formData.append("job", jobId);

        // const config = {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${userData?.data.token}`,
        //   },
        // };

        const success = await axiosPrivate
          .post(`${API_URL.JOBS.JOB_APPLIED}`, formData)
          .then((res) => {
            console.log("ressss", res);
            swal({
              title: "Successfully Complete",
              text: res.data.message,
              className: "successAlert-login",
              icon: Images.Logo,
              buttons: {
                OK: false,
              },
              timer: 1500,
            });
            handleClose();
            setRerender(true);
            setRerender(false);
            // setTimeout(() => {
            //   navigate("/home");
            // }, 500);
          })
          .catch((err) => {
            console.log("ressss", err);
            swal({
              title: "Error",
              text: err.response.data.message,
              className: "errorAlert",
              icon: Images.ErrorLogo,
              buttons: {
                OK: false,
              },
              timer: 2500,
            });
            return;
          });
      }
    }
  };

  const thumbs = files.map((file) => (
    <div
      className="my-2 flex h-[100px] w-[100px] p-1 border border-[#eaeaea] rounded-sm relative"
      key={file.name}
    >
      <div className="jobimgdashboard" style={thumbInner}>
        <img
          className="imguploadcreatorimg"
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        {file.title}
      </div>
      <button
        className="cursor-pointer w-[20px] h-[20px] absolute top-1 right-1 z-10 bg-[#2472fc] text-[#fff] rounded-full "
        onClick={removeFile(file)}
      >
        <Close fontSize="small" />
      </button>
    </div>
  ));

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
    const preDataValue: any = (firstvalue * 100) / n;
    // console.log(preDataValue)
    const preDataValue1: any = Math.floor(preDataValue);
    setPrintPreData(preDataValue1);

    const start: any = startDate;
    let today: any = new Date(deliveryDate);
    // @ts-ignore
    const diffInMs: any = new Date(start) - new Date(today);
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

  function btnClick() {
    setShow(true);
  }

  const mainNegotiate = () => {
    btnClick();
    setShowdate(true);
    if (number == "") {
      setlink(offerPrice);
    }
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

  let savevalue = () => {
    const tempErrors: any = {
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

  const handleDate = (date) => {
    setStartDate(date);
    const start = date;
    let today = new Date(deliveryDate);
    // @ts-ignore
    const diffInMs = new Date(date) - new Date(today);
    const diffInDays: any = diffInMs / (1000 * 60 * 60 * 24);
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

  return (
    <div>
      <Dialog
        className="CDashboard CDashboard1"
        open={open5}
        onClose={handleClose}
      >
        <DialogTitle className="CDashboarddiv1">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-[#1b4ea8]">Apply to Job</h1>{" "}
            <div className="cursor-pointer">
              <img
                // disabled={!showBlueBox}
                onClick={() => handleClose()}
                src={Images.Close}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="custom-scrollbar">
          <div className="jobapplyform jobapplyformn">
            {isPopupLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="grid grid-cols-5 gap-7">
                  <div className="col-span-3">
                    <Title title={title} />
                    <p className="text-base font-normal text-black">
                      {jobDescription}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="border border-1 rounded-xl p-4 w-full max-w-[290px]">
                      <div className="grid grid-cols-5 gap-2">
                        <p className="text-base font-semibold text-[#A0A0A0] col-span-2">
                          Created
                        </p>
                        <p className="text-base font-bold text-semibold col-span-3">
                          {createddate}
                        </p>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <p className="text-base font-semibold text-[#A0A0A0] col-span-2">
                          Created by
                        </p>
                        <p className="text-base font-bold text-semibold col-span-3">
                          {userdata}
                        </p>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <p className="text-base font-semibold text-[#A0A0A0] col-span-2">
                          Company
                        </p>
                        <p className="text-base font-bold text-semibold col-span-3">
                          {company_type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-[430px]">
                  <div className="w-full flex justify-between gap-3 p-2">
                    <div className="my-2">
                      <div
                        className={
                          errors1.number
                            ? "Offer_A_P neg3 neg4 error  flex gap-2 text-danger"
                            : "Offer_A_P neg3 neg4"
                        }
                      >
                        <h4 className="text-base font-semibold text-[#1b4ea8]">
                          Offer Price{" "}
                        </h4>
                        <p>${offerPrice}</p>
                      </div>
                    </div>

                    <div className="">
                      <div className="my-2">
                        <h4 className="text-base font-semibold text-[#1b4ea8] ">
                          Due Date
                        </h4>
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
                    <div className="my-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={mainNegotiate}
                      >
                        Negotiate
                      </button>
                    </div>
                  </div>

                  {proposedPrice && !show && (
                    <>
                      <div className="flex">
                        <div className="w-full flex justify-between gap-3 p-2 border-dashed border-4 rounded-xl">
                          <div className="">
                            <h4 className="text-base font-semibold text-[#1b4ea8]">
                              Proposed Price{" "}
                            </h4>
                            <p>${proposedPrice}</p>
                          </div>

                          <div className="">
                            <h4 className="text-base font-semibold text-[#1b4ea8]">
                              Proposed Due Date
                            </h4>
                            <p>{moment(proposedDate).format("YYYY-MM-DD")}</p>
                          </div>
                          <div className="">
                            <button
                              className="text-[#d14f4f]"
                              onClick={clearMainNegotiate}
                              type="button"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <>
                  {show ? (
                    <>
                      <div className="w-full max-w-[400px]">
                        <div className="border-4 border-dashed rounded-xl p-5">
                          <div className="grid grid-cols-6 mb-4">
                            <div className="col-span-2 ">
                              <div
                                className={
                                  errors1.number
                                    ? "Offer_A_P error flex gap-2"
                                    : "Offer_A_P"
                                }
                              >
                                <h4 className="text-base font-semibold text-[#1b4ea8]">
                                  Offer Price{" "}
                                </h4>
                                <p>${offerPrice}</p>
                              </div>
                            </div>

                            <div className="col-span-4">
                              <h4 className="text-base font-semibold text-black">
                                Proposed Price
                              </h4>
                              <div className="flex gap-2">
                                <div
                                  className={
                                    errors1.price
                                      ? "flex gap-2   error"
                                      : "flex gap-2"
                                  }
                                >
                                  <input
                                    className="input-style"
                                    type="number"
                                    placeholder="0.00"
                                    id=""
                                    value={number}
                                    onInput={(e) => {
                                      setErrors({
                                        ...errors1,
                                        number: null,
                                      });
                                      // if (
                                      //   e.target.value.length >
                                      //   e.target.maxLength
                                      // )
                                      //   e.target.value = e.target.value?.slice(
                                      //     0,
                                      //     e.target.maxLength
                                      //   );
                                    }}
                                    maxLength={8}
                                    onKeyDown={blockInvalidChar}
                                    onChange={handleChange1}
                                  />
                                  {errors1.number && (
                                    <span>{errors1.number ?? "valid"}</span>
                                  )}
                                  {/* <span
                                  style={{
                                    color: "#D14F4F",
                                    opacity: errors1.number ? 1 : 0,
                                  }}
                                >
                                  {errors1.number ?? "valid"}
                                </span> */}
                                  <span className="text-2xl">$</span>
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
                              <p className="text-[#ff0000] text-xs font-normal mb-1">
                                You’re proposing a price over {printPreData}%
                                higher. Your Proposal is less likely to be
                                accepted.
                              </p>
                            </>
                          )}
                          {datepricewarning && (
                            <>
                              {" "}
                              <p className="text-[#ff0000] font-normal text-xs my-1">
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

                          {/* <div className="creatordashbord"> */}
                          <div className="grid grid-cols-6">
                            <div className="col-span-2">
                              <h4 className="text-base font-semibold text-[#1b4ea8]">
                                Due Date
                              </h4>
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

                            <div
                              className={
                                errors1.date ? "col-span-4 error" : "col-span-4"
                              }
                            >
                              <h4 className="text-base font-semibold">
                                Proposed Due Date
                              </h4>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <label className="joblistinputc">
                                  <DatePicker
                                    label=""
                                    value={startDate}
                                    // format="MM-dd-yyyy"
                                    minDate={new Date()}
                                    onChange={(newValue) => {
                                      {
                                        handleDate(newValue);
                                      }
                                      setErrors({
                                        ...errors1,
                                        date: null,
                                      });
                                    }}
                                    slotProps={{
                                      textField: {
                                        variant: "standard",
                                      },
                                    }}
                                  />
                                </label>
                              </LocalizationProvider>
                              {/* <LocalizationProvider
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
                                          variant: "standard",
                                        },
                                      }}
                                    />
                                  </label>
                                </LocalizationProvider> */}
                              {errors1.date && (
                                <span>{errors1.date ?? "valid"}</span>
                              )}
                              {/* <div>{showData ? <h1>{daysData} days</h1> : null}</div> */}
                            </div>
                            {datewarning && (
                              <p className="proposingtext colorsec proposingday5">
                                You’re proposing a due date more than 7 days
                                away. Your Proposal is less likely to be
                                accepted
                              </p>
                            )}
                          </div>
                          <div className="flex gap-5 mt-4">
                            <button
                              className="btn btn-primary"
                              onClick={savevalue}
                              type="button"
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-outline"
                              onClick={mainProposedCancel}
                            >
                              Cancel
                            </button>
                          </div>
                          {/* </div> */}
                        </div>
                      </div>
                    </>
                  ) : null}
                </>

                <div className="mt-2">
                  <h4 className="text-lg font-semibold">
                    Attach Files
                    <span className="text-base text-[#A0A0A0]">Optional</span>
                  </h4>
                  <p className="text-sm">
                    You may attach up to 10 files under the size of 10MB each.
                    Include work samples or other documents to support your
                    application.
                  </p>
                  {/* <div className="container containermargin1"> */}
                  <div
                    className="mt-2 cursor-pointer"
                    {...getRootProps({ style })}
                  >
                    <input {...getInputProps()} />
                    <p className="flex gap-1 text-base font-semibold text-[#2472fc]">
                      <FileUploadOutlined />
                      Attach Files
                    </p>
                  </div>
                  <aside className="flex flex-row flex-wrap mt-4">
                    {thumbs}
                  </aside>
                  {/* </div> */}
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
                              // index_val={index}
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
                <h4 className="my-2 text-lg font-semibold text-black">
                  or include a URL
                </h4>
                {formSampleUrls.map((element, index) => (
                  <div className="form-inline" key={index}>
                    {element && (
                      <div className="flex justify-between w-full max-w-[400px]">
                        <div className="flex gap-2">
                          <InsertLink />
                          <a className="adifecttesturl">{element}</a>
                        </div>
                        <div
                          className=""
                          onClick={() => removeFormFieldsSampleUrls(index)}
                        >
                          <Delete />
                        </div>
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
                    className="input-style"
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
                        ? "enterUrlLinkButton-error enterUrlLinkButton-error1 flex justify-end error"
                        : "enterUrlLinkButton-error enterUrlLinkButton-error1 flex justify-end"
                    }
                  >
                    <span
                      className="formurjobapply text-[#D14F4F] text-sm"
                      // style={{
                      //   color: "#D14F4F",
                      //   opacity: errors1.formSampleUrls ? 1 : 0,
                      // }}
                    >
                      {errors1.formsampleImgUrls
                        ? errors1.formsampleImgUrls
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between gap-1 mt-1 cursor-pointer">
                    <a
                      type="button"
                      onClick={(e) => {
                        handleChangesampleUrls(e);
                      }}
                      className=" text-[#0d6efd]"
                    >
                      <Add />
                      Add More
                    </a>
                  </div>

                  {/* <span
                    className="text-[#D14F4F]"
                    style={{
                      color: "#D14F4F",
                      opacity: errors1.url ? 1 : 0,
                    }}
                  >
                    {errors1.url ?? ""}
                  </span> */}

                  {errors1.url ? (
                    <>
                      <span className="text-[#D14F4F]">{errors1.url}</span>
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    className={
                      errors1.formsampleImgUrls
                        ? "enterUrlLinkButton-error enterUrlLinkButton-error1  error"
                        : "enterUrlLinkButton-error enterUrlLinkButton-error1"
                    }
                  >
                    <span
                      className="text-[#D14F4F]"
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

                <div className="my-2">
                  <h4 className="text-lg font-semibold text-black">
                    Comments
                    {/* <span className="OptionalHaveQuest">Optional</span> */}
                  </h4>
                </div>

                <div className={errors1.coverletter ? "mb-1 error" : "mb-1"}>
                  <textarea
                    value={coverletter}
                    onChange={(e) => {
                      setcoverletter(e.target.value);
                      setErrors({ ...errors1, coverletter: null });
                    }}
                    className="input-style h-[90px] custom-scrollbar"
                    // type="text"
                    placeholder="Enter your comments"
                  />
                  <span className="flex justify-end text-[#D14F4F]">
                    {errors1.coverletter ?? ""}
                  </span>
                </div>

                <div className="">
                  <h4 className="text-lg font-semibold">
                    Have a question?
                    <span className="text-base text-[#A0A0A0]">Optional</span>
                  </h4>
                  <p className="text-sm font-medium mb-2">
                    Questions will be public on the Job Detail page.
                  </p>
                </div>
                <div className="askYourQuestionInput">
                  <textarea
                    value={question}
                    className="input-style h-[90px]"
                    onChange={(e) => {
                      setquestion(e.target.value);
                    }}
                    // type="text"
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
                  <div className="mt-2 flex gap-4">
                    <span className="btn btn-outline" onClick={handleClose}>
                      Cancel
                    </span>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => validateSubmit(e)}
                      type="button"
                    >
                      Apply Now
                    </button>
                  </div>
                  <div className="jobBtnsub_Btnnew"></div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyJobs;
