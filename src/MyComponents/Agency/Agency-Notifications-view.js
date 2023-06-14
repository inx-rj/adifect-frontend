import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  listAllcount,
  listAllAgencycount,
  updateAllAgencycount,
  Deletenotification,
  DeletenotificationAll,
} from "../../redux/actions/Notification-action";
import swal from "sweetalert";

const Agency_Notifications_view = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.authReducer);

  const [number, setnumber] = React.useState(5);
  const [rowadd, setrowadd] = useState([]);
  const [todayrowadd, setTodayRowadd] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [dataShow, setDataShow] = useState(false);
  const [tabelId, setTableId] = useState([]);
  const [error, setError] = useState({
    checkError: null,
  });

  const { agencyCountData, success: successCount } = useSelector(
    (state) => state.listAllAgencycountReducer
  );

  const {
    success: successDelete,
    message: messageDelete,
    error: deleteErrorData,
  } = useSelector((state) => state.DeleteReducer);
  const {
    success: successDeleteAll,
    message: messageAllDelete,
    error: deleteErrorDataAll,
  } = useSelector((state) => state.AllDeleteReducer);

  useEffect(() => {
    dispatch(listAllAgencycount(userData?.user?.user_id, number));
  }, [successDelete, successDeleteAll]);

  const deletenotified = (id) => {
    dispatch(Deletenotification(id, userData?.user?.user_id));
    // setTimeout(() => {
    //     dispatch(listAllAgencycount(userData?.user?.user_id, number));
    // }, 300);
  };

  const [fileGallery, setFileGallery] = useState([]);
  const removesampleFile = (file, fileId) => () => {
    const newfileGallery = [...rowadd];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setrowadd(newfileGallery);
    dispatch(Deletenotification(fileId));
  };

  const removesampleFileToDay = (file, fileId) => () => {
    const newfileGallery = [...todayrowadd];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setTodayRowadd(newfileGallery);
    dispatch(Deletenotification(fileId));
  };

  useEffect(() => {
    if (messageDelete == "Deleted Successfully" && dataShow) {
      swal({
        title: "Successfully Complete",
        text: messageDelete,
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
      setTableId([]);
      setAlldata([]);
      setrowadd([]);
      setTodayRowadd([]);
    } else if (deleteErrorData && dataShow) {
      swal({
        // title: "Successfully Complete",
        text: deleteErrorData,
        className: "warning",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    }
  }, [deleteErrorData, successDelete]);

  useEffect(() => {
    if (messageAllDelete == "Deleted Successfully" && dataShow) {
      swal({
        title: "Successfully Complete",
        text: messageAllDelete,
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
      setTableId([]);
      setAlldata([]);
      setrowadd([]);
      setTodayRowadd([]);
    } else if (deleteErrorDataAll && dataShow) {
      swal({
        // title: "Successfully Complete",
        text: deleteErrorDataAll,
        className: "warning",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    }
  }, [successDeleteAll, deleteErrorDataAll]);

  useEffect(() => {
    let myArr = [];
    // if (agencyCountData?.data?.length) {
    setAlldata(agencyCountData?.data);
    setrowadd(agencyCountData?.earlier);
    setTodayRowadd(agencyCountData?.today);
    // }
  }, [successCount, successDelete, dataShow, successDeleteAll]);

  const adddata = (id) => {
    setnumber(number + 5);
    dispatch(listAllAgencycount(userData?.user?.user_id, number + 5));
  };

  const DataTableGet = (id) => {
    if (tabelId.includes(id)) {
      setTableId(tabelId.filter((item) => item !== id));
    } else {
      setTableId([...tabelId, id]);
      setError({ ...error, checkError: null });
    }
  };

  const handleClearValidation = (e) => {
    e.preventDefault();
    const tempErrors = {
      checkError: tabelId.length == 0 && "Please Select a notification",
    };
    setError(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    handleClearDataDelete();
  };

  const handleClearDataDelete = () => {
    if (tabelId.length > 0) {
      swal({
        title: "",
        text: "Are you sure you want to clear these Notifications?",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: ["No", "Yes"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(Deletenotification(tabelId));
          setDataShow(true);
          setTableId([]);
        }
      });
    } else {
    }
  };

  const handleClearDataDeleteAll = () => {
    swal({
      title: "",
      text: "Are you sure you want to clear all?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeletenotificationAll(userData?.user?.user_id));
        setDataShow(true);
      }
    });
  };

  // const handleClearDataDeleteAll = () => {
  //   console.log("All Data");
  // };

  return (
    <>
      <div>
        <h1 className="Notificationstitle">Notifications</h1>

        {todayrowadd && todayrowadd?.length > 0 && (
          <>
            <div className="Category_p notificationpgae">
              <h3 className="todaynotificationdiv">Today Notifications</h3>
              <div className="notificatonssec">
                {todayrowadd?.map((item) => (
                  <>
                    <div className="Notifications">
                      <div className="notificationboxandaddData">
                        <input
                          type="checkbox"
                          // checked={tabelId.find((item) => item == item?.id)}
                          checked={tabelId.includes(item?.id)}
                          // value={item?.id}
                          onClick={() => {
                            DataTableGet(item?.id);
                          }}
                        />
                      </div>
                      <Link
                        to={
                          item.notification_type == "asset_uploaded"
                            ? `/media`
                            : `/jobs/details/${item.redirect_id}`
                        }
                        className="Notifications_left"
                      >
                        <img
                          className="userimgnot"
                          src="/img/userimg2.png"
                          alt=""
                        />
                        <h3>
                          {item?.notification}
                          <br />
                          {moment(item?.created).format("DD MMM, YYYY, h:mm")}
                        </h3>
                        <p></p>
                      </Link>
                      <div
                        className="Notifications_right"
                        onClick={removesampleFileToDay(item, item?.id)}
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              {rowadd && rowadd?.length < 1 && (
                <>
                  <div className="clearClassDivDataMain">
                    <div className="clearClassDivData">
                      <button onClick={(e) => handleClearValidation(e)}>Clear</button>
                    </div>
                    <div className="clearAllClassDivData">
                      <button onClick={handleClearDataDeleteAll}>Clear All</button>
                    </div>
                  </div>
                  <div className="clearErrorDivClear">
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: error.checkError ? 1 : 0,
                      }}
                    >
                      {error.checkError ?? "valid"}
                    </span>
                  </div>
                </>
              )}

            </div>
          </>
        )}

        {rowadd && rowadd?.length > 0 && (
          <>
            <div className="Category_p notificationpgae">
              <h3 className="earliernotificationdiv">Earlier Notifications</h3>
              <div className="notificatonssec">
                {rowadd?.map((item) => (
                  <>
                    <div className="Notifications">
                      <div className="notificationboxandaddData">
                        <input
                          type="checkbox"
                          // checked={tabelId.find((item) => item == item?.id)}
                          checked={tabelId.includes(item?.id)}
                          // value={item?.id}
                          onClick={() => {
                            DataTableGet(item?.id);
                          }}
                        />
                      </div>
                      <Link
                        to={
                          item.notification_type == "asset_uploaded"
                            ? `/media`
                            : `/jobs/details/${item.redirect_id}`
                        }
                        className="Notifications_left"
                      >
                        <img
                          className="userimgnot"
                          src="/img/userimg2.png"
                          alt=""
                        />
                        <h3>
                          {item?.notification}
                          <br />
                          {moment(item?.created).format("DD MMM, YYYY, h:mm")}
                        </h3>
                        <p></p>
                      </Link>
                      <div
                        className="Notifications_right"
                        onClick={removesampleFile(item, item?.id)}
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="clearClassDivDataMain">
                <div className="clearClassDivData">
                  <button onClick={(e) => handleClearValidation(e)}>Clear</button>
                </div>
                <div className="clearAllClassDivData">
                  <button onClick={handleClearDataDeleteAll}>Clear All</button>
                </div>
              </div>
              <div className="clearErrorDivClear">
                <span
                  style={{
                    color: "#D14F4F",
                    opacity: error.checkError ? 1 : 0,
                  }}
                >
                  {error.checkError ?? "valid"}
                </span>
              </div>

              {/* <div className="readmorebtn">
                <button onClick={(event) => adddata(event)}>Read More</button>
              </div> */}
              {agencyCountData?.read_more == "True" && (
                <>
                  <div className="readmorebtn">
                    <button onClick={(event) => adddata(event)}>
                      Read More
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {alldata?.length < 1 && (
          <span className="norecords">No Latest Notification</span>
        )}
      </div>
    </>
  );
};
export default Agency_Notifications_view;
