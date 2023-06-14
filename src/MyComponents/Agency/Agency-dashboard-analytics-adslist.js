import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agencyTopAdsListAction } from "../../redux/actions/Agency-analytics-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";

function Agency_dashboard_analytics_adslist() {
  const { loading: loadingAgencyTopAdsList, agencyTopAdsList } = useSelector(
    (state) => state.AgencyAnalyticsAdsListReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(agencyTopAdsListAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loadingAgencyTopAdsList ? (
        <div className="projectsLoaderCreatorPage">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="Work-In h-100">
          <div className="Work-P-Title"></div>
          {agencyTopAdsList?.length > 0 && (
            <div className="jobnotfound-analytics mh-0 joblist d-flex flex-column p-8 m-0 rounded h-100">
              <h1 className="mb-0">Top Ads List</h1>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="custom-thead">
                    <tr>
                      <th>Ads</th>
                      <th></th>
                      <th>Reach</th>
                    </tr>
                  </thead>
                  <tbody className="custom-tbody">
                    {agencyTopAdsList?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className={`border-${item?.color}`}></div>
                        </td>
                        <td>{item?.title}</td>
                        <td>{item?.reach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {agencyTopAdsList?.length < 1 && (
            <div className="jobnotfound">
              <div className="notfountboder_in_progress"></div>
              <div className="notfounttext">No Top Ads List items</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Agency_dashboard_analytics_adslist;
