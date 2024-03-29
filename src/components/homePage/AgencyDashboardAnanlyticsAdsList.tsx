import React from "react";
import Title from "../common/pageTitle/Title";

function AgencyDashboardAnalyticsAdsList() {
  const dummyData = [
    {
      name: "Marketing Job",
      id: 1,
      reach: 567890,
      color: "pink",
    },
    {
      name: "Marketing Job",
      id: 2,
      reach: 567890,
      color: "blue",
    },
    {
      name: "Marketing Job",
      id: 3,
      reach: 567890,
      color: "green",
    },
    {
      name: "Marketingggggggggggggggggggggggggg Job",
      id: 4,
      reach: 567890,
      color: "pink",
    },
    {
      name: "Marketing Job",
      id: 5,
      reach: 567890,
      color: "pink",
    },
    {
      name: "Marketing Job",
      id: 6,
      reach: 567890,
      color: "pink",
    },
  ];
  return (
    <>
      <div>
        <Title title="Top Ads List" />
        {/* <div className="grid grid-cols-3 pl-5">
          <div className="col-span-2">
            <h5 className="font-semibold">Ads</h5>
            {}
          </div>
          <div className="grid grid-cols-1">
            <h5 className="font-semibold">Reach</h5>
          </div>
        </div> */}
        <div>
          <div className="flex justify-between items-center my-2">
            <h5 className="font-bold">Ads</h5>
            <h5 className="font-bold">Reach</h5>
          </div>
          {dummyData?.map((i, index) => (
            <div
              className="flex justify-between items-center gap-2"
              key={index}
            >
              <div className="flex gap-5 items-center">
                <span
                  className={`!border border-${i?.color}-500 h-4 w-4 rounded-full`}
                ></span>
                <h5 className="text-base font-normal break-all">{i.name}</h5>
              </div>
              <h5 className="text-base font-normal">{i.reach}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AgencyDashboardAnalyticsAdsList;
