import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import React, { useEffect } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { useDispatch, useSelector } from "react-redux";

function AppLayout(props) {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  // setTimeout(function () {
  //   setIsLoading(false);
  // }, 1000);
  const { loading } = useSelector((state) => state.loaderReducer);
  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  // const [isToggle, setIsToggle] = useState(false);

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {/* <LoadingSpinner /> */}
      {/* <LoadingSpinner /> */}
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : ( */}
      <>
        <div className="admin_layout_after_loader">
          <div className="row mlr-un sticky top-0 z-[1010]">
            <div
              className={
                props.isToggle
                  ? " sidebar DAMSidebar sidebarmenu2 headerTop"
                  : " sidebar sidebarmenu2 headerTop"
              }
            >
              <div className="Damlogo">
                <button
                  className="allpagetoggle"
                  type="button"
                  onClick={(e) => props.setIsToggle(!props.isToggle)}
                >
                  <img className="logoimg mx-auto" src="/img/logonew.svg" alt="" />
                </button>
              </div>
              <div className="Damlogo2">
                <button
                  className="allpagetoggle"
                  type="button"
                  onClick={(e) => props.setIsToggle(!props.isToggle)}
                >
                  <img className="logoimg" src="/img/logonewtop2.png" alt="" />
                </button>
              </div>
              <Header
                headerCompany={props.headerCompany}
                setHeaderCompany={props.setHeaderCompany}
              />
              {/* <div className="toggleSidebarDiv">
                <button
                  className="allpagetoggle"
                  type="button"
                  onClick={(e) => props.setIsToggle(!props.isToggle)}
                >
                  <img src="/img/toggleicon.png" />
                </button>
              </div> */}
            </div>
          </div>
          <div className="Topdivallpage" id="Topdivallpage">
            <div
              className={
                props.isToggle
                  ? " sidebar DAMSidebar sidebarmenu2 collapsedBar"
                  : " sidebar sidebarmenu2"
              }
            >
              <Sidebar />
            </div>
            <div
              className={
                props.isToggle ? " Rightbar DAMSidebar2" : " Rightbar "
              }
            >
              {/* <div className=" Rightbar" style={{ height: "100vh" }}> */}
              <Outlet context={[props.headerCompany, props.setHeaderCompany]} />
            </div>
          </div>
          <Footer />
        </div>
      </>
      {/* )} */}
    </>
  );
}
export default AppLayout;
