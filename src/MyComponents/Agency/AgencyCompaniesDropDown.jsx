import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";

const AgencyCompaniesDropDown = (props) => {
  const { companyData, selectedValue, setSelectedValue, isLoading } = props;

  const ITEM_HEIGHT = 75;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <FormControl fullWidth className="input-fields-wrapper !w-[250px]">
        <InputLabel id="agency_companies">Companies</InputLabel>
        <Select
          labelId={`agency_companies`}
          id="agency_companies"
          value={selectedValue}
          label="Company"
          onChange={(e) => setSelectedValue(e.target.value)}
          MenuProps={MenuProps}
        >
          {companyData?.map((item) => {
            return (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default AgencyCompaniesDropDown;
