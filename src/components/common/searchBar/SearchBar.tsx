import { initialTableConfigInterface } from 'helper/types/common/tableType';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface searchBarPropTypes {
  tableFilters: initialTableConfigInterface;
  setTableFilters: React.Dispatch<React.SetStateAction<initialTableConfigInterface>>;
  [restProps: string]: any;
}

const SearchBar = ({ setTableFilters, tableFilters, ...restProps }: searchBarPropTypes) => {
  // Clears input content
  const handleClear = () => {
    setTableFilters({
      ...tableFilters,
      search: ''
    });
  };

  // Stores input value into state
  const handleSearch = ({ target: { name, value } }) => {
    setTableFilters({
      ...tableFilters,
      [name]: value
    });
  };

  return (
    <TextField
      name="search"
      type="text"
      placeholder="Search"
      variant="outlined"
      size="small"
      value={tableFilters.search}
      onChange={handleSearch}
      InputProps={{
        style: { paddingRight: 0 },
        endAdornment: (
          <InputAdornment position="end">
            {tableFilters.search && (
              <IconButton onClick={handleClear} size="small">
                <ClearIcon />
              </IconButton>
            )}
            <SearchIcon
              sx={{
                marginRight: '10px'
              }}
              color="disabled"
            />
          </InputAdornment>
        )
      }}
      {...restProps}
    />
  );
};
export default SearchBar;
