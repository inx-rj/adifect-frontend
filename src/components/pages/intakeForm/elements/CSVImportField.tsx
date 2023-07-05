const CSVImportField = (props) => {
  const { onChange } = props;
  const handleFiles = (e) => {
    var reader = new FileReader();
    reader.onload = function (e1) {
      console.log({ e1 });
      const final = reader.result?.["split"]("\r\n");
      onChange(final);
    };
    reader.readAsText(e.target.files[0]);

  };
  return (
    <div>
      <input type="file" onChange={(e) => handleFiles(e)} accept={".csv"} />
    </div>
  );
};

export default CSVImportField;
