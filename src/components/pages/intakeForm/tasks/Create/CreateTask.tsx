import React, { useMemo, useState } from "react";
import TextInput from "./Elements/TextInput";
import { useSingleEffect } from "react-haiku";
import axiosPrivate from "api/axios";
import MuiAutoCompleteComponent from "components/common/muiAutocomplete/MuiAutoCompleteComponent";

const CreateTask = ({
  taskDetails,
  handleInputChange,
  selectedOption,
  setSelectedOption,
}) => {
  const [userList, setUserList] = useState([]);
  const [userLoader, setUserLoader] = useState(true);

  const fetchUser = () => {
    axiosPrivate
      .get("intake-forms/users/")
      .then((res) => setUserList(res.data.data))
      .catch((err) => console.log("error user List", err))
      .finally(() => {
        setUserLoader(false);
      });
  };

  //To store memorized value of filtered(searched) data array, this helps when other then dependencies, state of this component changes will not filter again.
  const filteredData = useMemo(
    () =>
      userList?.map((e) => {
        return { value: e.id, label: `${e.first_name} ${e.last_name}` };
      }) || [],
    [userList]
  );

  useSingleEffect(() => {
    fetchUser();
  });
  return (
    <div className="mt-2 flex flex-col gap-3">
      <TextInput
        label="Task Name"
        placeHolder="Name"
        required
        type="text"
        name="name"
        handleInputChange={(e) => handleInputChange(e)}
        value={taskDetails.name}
      />
      <TextInput
        label="Task Description"
        placeHolder="Description"
        required
        type="textarea"
        name="description"
        handleInputChange={(e) => handleInputChange(e)}
        value={taskDetails.description}
      />
      <div className="">
        <label className="capitalize mb-1">Assign user</label>

        <MuiAutoCompleteComponent
          loading={userLoader}
          placeholder={"Assign to"}
          options={filteredData}
          handleChange={setSelectedOption}
          selectedOption={selectedOption}
          customClass="assign_select"
          disableClearable
        />
      </div>
    </div>
  );
};

export default CreateTask;
