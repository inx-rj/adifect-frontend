import React from "react";

const Filters = () => {
  return (
    <>
      {" "}
      <div className="border border-1 rounded-xl p-5">
        <h5 className="text-base font-semibold pb-2">Sort by </h5>
        <div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="All Jobs" />
            <label>All Jobs</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="In Progress" />
            <label>In Progress</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="Expired" />
            <label>Expired</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="Complete" />
            <label>Complete</label>
          </div>
        </div>
      </div>
      <div className="border border-1 rounded-xl p-5">
        <h5 className="text-lg font-semibold pb-2">Filters </h5>
        <h5 className="text-base font-semibold pb-2">Salary</h5>
        <div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="Any" />
            <label>Any</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="3000k" />
            <label>{">"}3000k</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="1000k" />
            <label>{">"}1000k</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="500k" />
            <label>{">"}500k</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="100k" />
            <label>{">"}100k</label>
          </div>
        </div>
        <h5 className="text-base font-semibold pb-2">Work Experience:</h5>
        <div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="Any Experience" />
            <label>Any Experience</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="Beginner Level" />
            <label>Beginner Level</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="Intermediate level" />
            <label>Intermediate level</label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" value="Expert Level" />
            <label>Expert Level</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
