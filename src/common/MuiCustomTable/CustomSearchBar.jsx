import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onChange }) => {
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
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
export default SearchBar;
