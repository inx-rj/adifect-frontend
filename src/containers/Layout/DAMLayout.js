import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import DAMHeader from "./DAMHeader";
import { Link } from "react-router-dom";

function DAMLayout(props) {
  const dispatch = useDispatch();
  // const [isToggle, setIsToggle] = useState(false);
  const { loading } = useSelector((state) => state.loaderReducer);
  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);
  return (
    <>
      <>
        <div className="admin_layout_after_loader media">
          <div className="row mlr-un"></div>
          <div
            className="Topdivallpage Topdivallpagemideapage"
            id="Topdivallpage"
          >
            <div
              className={
                props.isToggle
                  ? " sidebar DAMSidebar sidebarmenu2 sidebarmenu88"
                  : " sidebar sidebarmenu2 sidebarmenu88"
              }
            >
              <div className="Damlogo">
                <button
                  type="button"
                  onClick={(e) => props.setIsToggle(!props.isToggle)}
                >
                  <img class=" logoimgdam" src="/img/logonew.svg" alt="" />
                </button>
              </div>
              <div className="Damlogo2">
                <button
                  type="button"
                  onClick={(e) => props.setIsToggle(!props.isToggle)}
                >
                  <img class="logoimgdam" src="/img/logonewtop2.png" alt="" />
                </button>
              </div>
              <Sidebar />
            </div>

            <div
              className={
                props.isToggle
                  ? " Rightbar1 DAMSidebar5 sidebarmenu2 "
                  : " Rightbar1 sidebarmenu2 "
              }
            >
              {/* <div className="toggleSidebarDiv">
                <button
                  type="button"
                  onClick={(e) => props.setIsToggle(!props.isToggle)}
                >
                  <img src="/img/toggleicon.png" />
                </button>
              </div> */}
              <DAMHeader />
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </>
      {/* )} */}
    </>
  );
}
export default DAMLayout;
