import { render } from "@testing-library/react";

const CSVImportField = (props) => {
  const { onChange } = props;
  const handleFiles = (e) => {
    console.log({ e });
    console.log("here");
    var reader = new FileReader();
    reader.onload = function (e1) {
      console.log({ e1 });
      const final = reader.result.split("\r\n");
      onChange(final);
    };
    reader.readAsText(e.target.files[0]);

    console.log({ render });
  };
  return (
    <div>
      <input type="file" onChange={(e) => handleFiles(e)} fileTypes={".csv"} />
    </div>
  );
};

export default CSVImportField;
