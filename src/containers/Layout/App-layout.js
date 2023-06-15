import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";

function AppLayout(props) {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  // setTimeout(function () {
  //   setIsLoading(false);
  // }, 1000);
  const location = useLocation();

  const { loading } = useSelector((state) => state.loaderReducer);
  useEffect(() => {
    dispatch(defaultPageLoader());

    console.log({ loading, location, storeState: store.getState() }, "--- Inside AppLayout");

  }, [location, store]);

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
          <div className="row mlr-un">
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
            </div>
          </div>
          <div className="Topdivallpage" id="Topdivallpage">
            <div
              className={
                props.isToggle
                  ? " sidebar DAMSidebar sidebarmenu2"
                  : " sidebar sidebarmenu2"
              }
            >
              <Sidebar />
            </div>
            <div
              className={
                props.isToggle ? " Rightbar DAMSidebar2 " : " Rightbar "
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
