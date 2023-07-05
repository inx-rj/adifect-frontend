import React from "react";
import Title from "components/common/pageTitle/Title";
import BadgeUI from "components/common/badge/BadgeUI";

const JobsDetailInfo = (props) => {
  const { companyData } = props;
  console.log("companyData", companyData);
  return (
    <>
      <div className="flex py-5 gap-4">
        <div className="max-w-[cal(100% - 400px)] w-full gap-4 grid">
          <div className="border rounded ">
            <div className="w-full p-5 ">
              <div className="flex gap-5">
                <div className="">
                  {companyData?.details?.image_url !== "" ? (
                    <img
                      className="h-[75px] w-[75px] border border-none rounded-xl"
                      src={companyData?.details?.image_url?.split(",")[0]}
                      alt=""
                    />
                  ) : (
                    <div className="bg-gray-100 h-[75px] w-[75px] border border-none rounded-lg"></div>
                  )}
                </div>
                <div className="w-full max-w-[calc(100% - 75px)] ">
                  <div className="flex gap-4">
                    <div className="flex gap-4">
                      <Title
                        title={
                          companyData?.details?.title.length > 25
                            ? companyData?.details?.title.substring(0, 25) +
                              "..."
                            : companyData?.details?.title
                        }
                      />
                      {companyData?.details?.level?.level_name && (
                        <BadgeUI variant="primary">
                          {companyData?.details?.level?.level_name}
                        </BadgeUI>
                      )}
                    </div>
                  </div>
                  <div className="text-base font-medium text-[#A0A0A0] break-all">
                    {companyData?.details?.company_name?.length > 25
                      ? companyData?.details?.company_name?.substring(0, 25) +
                        "..."
                      : companyData?.details?.company_name}
                  </div>
                </div>
              </div>
              <div className="text-base font-medium text-[#A0A0A0] break-all mt-4">
                {companyData?.details?.description}
              </div>
            </div>
          </div>
          <div className="border rounded">
            <div className="w-full p-5">
              <span className="text-base font-semibold text-[#000]">
                Skills:{" "}
              </span>
              <div className="flex flex-wrap gap-2">
                {companyData?.details?.skills?.length > 0 ? (
                  companyData?.details?.skills?.map((item, index) => (
                    <BadgeUI variant="primary" key={index}>
                      {item?.skill_name}
                    </BadgeUI>
                  ))
                ) : (
                  <>N/A</>
                )}
              </div>
            </div>
          </div>
          <div className="border rounded">
            <div className="w-full p-5">
              <span className="text-base font-semibold text-[#000]">
                Skills:{" "}
              </span>
              <div className="flex flex-wrap gap-2">
                {companyData?.details?.skills?.length > 0 ? (
                  companyData?.details?.skills?.map((item, index) => (
                    <BadgeUI variant="primary" key={index}>
                      {item?.skill_name}
                    </BadgeUI>
                  ))
                ) : (
                  <>N/A</>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[400px] w-full gap-4 grid">
          <div className="border rounded-lg p-5">
            <Title title="Job Details" customClass="pb-5" />
            <div className="grid gap-2">
              <div>
                <div className="capitalize detailPageTitle ">Created</div>
                <div className="text-[#000]">
                  {companyData?.details?.created}
                </div>
              </div>
              <div>
                <div className="capitalize detailPageTitle">Due Date</div>
                <div className="text-[#000]">
                  {companyData?.details?.expected_delivery_date}
                </div>
              </div>
              <div>
                <div className="capitalize detailPageTitle">Pricing Type</div>
                <div className="text-[#000]">
                  {companyData?.details?.get_jobType_details}
                </div>
              </div>
              <div>
                <div className="capitalize detailPageTitle">Price</div>
                <div className="text-[#000]">
                  <b>$</b>
                  {companyData?.details?.price}
                </div>
              </div>
              <div>
                <div className="capitalize detailPageTitle">Created by</div>
                <div className="text-[#000]">
                  {companyData?.details?.username}
                </div>
              </div>
              <div>
                <div className="capitalize detailPageTitle">Company</div>
                <div className="text-[#000]">
                  {companyData?.details?.company_name}
                </div>
              </div>
              <div>
                <div className="capitalize">Job Assigned to</div>
                <div className="">
                  {companyData?.details?.hired_users?.length > 0 &&
                    companyData?.details?.hired_users?.map((item, index) => (
                      <b>{(index ? ", " : "") + item.user__username} </b>
                    ))}
                  {companyData?.details?.hired_users?.length < 1 && <b>N/A</b>}
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded">
            <div className="w-full p-5">
              <span className="text-base font-semibold text-[#000]">
                Tags:{" "}
              </span>

              <div className="flex flex-wrap gap-2">
                {companyData?.details?.tags?.length > 0
                  ? companyData?.details?.tags
                      ?.split(",")
                      ?.map((item, index) => (
                        <BadgeUI variant="primary" key={index}>
                          {item}
                        </BadgeUI>
                      ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsDetailInfo;
