import React from "react";
import GenericForm from "../../IntakeFormDynamic/global/GlobalForm";

const TaskQueAndAns = ({ genericForm }) => {
  return (
    <div>
      <GenericForm genericForm={genericForm} previewMode={true} />
    </div>
  );
};

export default TaskQueAndAns;
