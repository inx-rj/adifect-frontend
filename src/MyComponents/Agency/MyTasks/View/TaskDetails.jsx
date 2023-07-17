import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import TaskQueAndAns from "./TaskQueAndAns";

const TaskDetails = () => {
  const {
    loading: myTaskLoading,
    myTaskDetails,
  } = useSelector((state) => state.myTasksDetailsAgencyReducer);
  return (
    <>
      {myTaskDetails ? (
        <>
          <div className="newJobDetailsParaTextBox">
            <div className="newJobDetailsParaTextDiv mb-3">
              <p>{myTaskDetails?.description}</p>
            </div>
            <div className="twoBoxCreatedJobTaskBox">
              <div className="myTaskDetailsCompanyDateBoxMain">
                <div className="jobDetailsCompanyDateBox">
                  <div className="jobDetailsBoxItemOne">
                    <p className="capitalize">Created</p>
                    <p className="capitalize">Modified Date</p>

                    <p className="capitalize">Form Version </p>

                    <p className="capitalize"> assigned to</p>
                    <p className="capitalize"> Submitted by</p>
                  </div>
                  <div className="jobDetailsBoxItemTwo">
                    <p>
                      {" "}
                      {moment(myTaskDetails?.created).format(
                        "MMMM Do YYYY"
                      )}{" "}
                    </p>
                    <p>
                      {" "}
                      {moment(myTaskDetails?.modified).format(
                        "MMMM Do YYYY"
                      )}{" "}
                    </p>

                    <p>{myTaskDetails?.form_submission?.form_version} </p>

                    {/* <p>
                      <b>{myTaskDetails?.username ?? <b>N/A</b>} </b>
                    </p> */}

                    <p>
                      {myTaskDetails?.user_details?.length > 0 &&
                        myTaskDetails?.user_details?.map((item, index) => (
                          <b>
                            {(index ? ", " : "") +
                              (item?.assign_to?.username ?? "N/A")}{" "}
                          </b>
                        ))}
                      {/* {myTaskDetails?.user_details?.length < 1 && <b>N/A</b>} */}
                    </p>
                    <p>
                      {" "}
                      <b>
                        {
                          myTaskDetails?.form_submission?.submitted_user
                            ?.first_name
                        }{" "}
                        {
                          myTaskDetails?.form_submission?.submitted_user
                            ?.last_name
                        }{" "}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-4 border-t">
            <h4 className="mb-6">Task Submission Data</h4>
            <TaskQueAndAns
              genericForm={myTaskDetails?.form_submission?.submission_data}
            />
          </div>
        </>
      ) : (
        <>
          <div className="job_no_access">Task does not exist</div>
        </>
      )}
    </>
  );
};

export default TaskDetails;
