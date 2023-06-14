import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";

export default function CreatorTransactions() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(defaultPageLoader());
  // }, []);

  // const { loading } = useSelector((state) => state.loaderReducer);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1200);

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading && <LoadingSpinner />}

      <div className="Category_p">
        <div className="CategorylistName">
          <h1>Transactions</h1>
        </div>
      </div>
      <div className="Topallpage Custompage">
        <div className="ContentDiv">
          <div className="allpageTitle">
            <h2>COMING SOON</h2>
          </div>
        </div>
      </div>
    </>
  );
}
