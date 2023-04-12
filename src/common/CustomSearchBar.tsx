import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TablePaginationType } from "helper/types/muiCustomTable/muiCustomTable";

interface searchBarPropTypes {
  paginationData: TablePaginationType;
  setPaginationData: React.Dispatch<React.SetStateAction<TablePaginationType>>
  [restProps: string]: any;
}

const SearchBar = ({
  setPaginationData,
  paginationData,
}: searchBarPropTypes) => {
  return (
    <TextField
      type="search"
      label="Search"
      variant="outlined"
      size="small"
      InputProps={{
        style: { paddingRight: 0 },
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon
              sx={{
                marginRight: "10px",
              }}
              color="disabled"
            />
          </InputAdornment>
        ),
      }}
      onChange={(e) =>
        setPaginationData({
          ...paginationData,
          search: e.target.value,
        })
      }
    />
  );
};
export default SearchBar;