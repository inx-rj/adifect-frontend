import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  listAllcount,
  listAllAgencycount,
  updateAllAgencycount,
  Deletenotification,
} from "../../redux/actions/Notification-action";

const Agency_Notifications_view = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.authReducer);

  const [number, setnumber] = React.useState(5);

  

  const { agencyCountData, success: successCount } = useSelector(
    (state) => state.listAllAgencycountReducer
  );

  const { success: successDelete } = useSelector(
    (state) => state.DeleteReducer
  );


  useEffect(() => {
    dispatch(listAllAgencycount(userData?.user?.user_id, number));
  }, [successDelete]);
  
  const [rowadd, setrowadd] = useState([]);
  const [todayrowadd, setTodayRowadd] = useState([]);
  const [alldata, setAlldata] = useState([]);

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
    let myArr = [];
    if (agencyCountData?.data?.length) {
      setAlldata(agencyCountData?.data);
      setrowadd(agencyCountData?.earlier);
      setTodayRowadd(agencyCountData?.today);
    }
  }, [successCount,successDelete]);

  const adddata = (id) => {
    setnumber(number + 5);
    dispatch(listAllAgencycount(userData?.user?.user_id, number + 5));
  };

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
                      <Link
                        to={
                          item.notification_type == "asset_uploaded"
                            ? `/media`
                            : `/jobs/details/${item.redirect_id}`
                        }
                        className="Notifications_left"
                      >
                        <img
                          class="userimgnot"
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
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>
                  </>
                ))}
              </div>
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
                      <Link
                        to={
                          item.notification_type == "asset_uploaded"
                            ? `/media`
                            : `/jobs/details/${item.redirect_id}`
                        }
                        className="Notifications_left"
                      >
                        <img
                          class="userimgnot"
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
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              
              {/* <div className="readmorebtn">
                <button onClick={(event) => adddata(event)}>Read More</button>
              </div> */}
              {agencyCountData?.read_more == "True" && 
              <>
                <div className="readmorebtn">
                  <button onClick={(event) => adddata(event)}>Read More</button>
                </div>
                </>
              }
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
