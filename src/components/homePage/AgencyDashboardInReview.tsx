import React from "react";
import Title from "../../components/common/PageTitle/Title";
import BadgeUI from "../../components/common/badge/BadgeUI";

function AgencyDashboardInReview() {
  const dummyData = [
    {
      name: "Marketing",
      id: 1,
    },
    {
      name: "Marketing",
      id: 2,
    },
    {
      name: "Marketing",
      id: 3,
    },
    {
      name: "Marketingggggggggggggggggggggggggg",
      id: 4,
    },
    {
      name: "Marketing",
      id: 5,
    },
    {
      name: "Marketing",
      id: 6,
    },
  ];
  return (
    <>
      <div className="">
        <div className="pb-4">
          <Title title="In Review" />
        </div>
        <div className="border-l-8 rounded border-[#D99836] bg-white p-8 h-full max-h-[580px]">
          <div className="pb-3">
            <Title title="Run Campaign for a jewellery business" />
          </div>
          <h5 className="h-full max-h-[80px] overflow-y-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h5>
          <div className="my-2">
            <BadgeUI variant="review" customClass="max-w-max text-sm font-semibold">
              In Review
            </BadgeUI>
          </div>
          <div className="mb-2">Due to: </div>
          <div className="mb-2 flex gap-2">
            Assigned to:{" "}
            <h5 className="capitalize text-theme font-semibold">John snow</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {dummyData?.map((data, index) => {
              return (
                <span className="">
                  <BadgeUI
                    variant="primary"
                    customClass="max-w-max text-sm font-semibold"
                  >
                    {data?.name}
                  </BadgeUI>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AgencyDashboardInReview;
