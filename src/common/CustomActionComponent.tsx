//import MUI components and icons
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export interface propsType {
  anchorEl: null | HTMLElement;
  setAnchorEl: (newValue: null | HTMLElement | EventTarget) => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
  handleView?: () => void;
  setCurrentTooltip?: (id: number) => void;
  handleInactive?: () => void;
  currentTooltip: number | null;
  showDelete?: boolean;
  showView?: boolean;
  showEdit?: boolean;
  showInActive?: boolean;
  isEditMode?: boolean;
  id?: number;
}

const CustomActionComponent = ({
  anchorEl,
  setAnchorEl,
  currentTooltip,
  setCurrentTooltip,
  handleDelete,
  handleEdit,
  handleView,
  handleInactive,
  showDelete = false,
  showView = false,
  showEdit = false,
  showInActive = false,
  isEditMode = false,
  id,
}: propsType) => {
  return (
    <div className="relative">
      <MoreVertIcon
        cursor="pointer"
        onClick={(e) => {
          setAnchorEl(anchorEl ? null : e.currentTarget);
          setCurrentTooltip(id);
        }}
      />
      <Menu
        anchorEl={anchorEl}
        id={`account-menu-${id}`}
        open={currentTooltip === id && !isEditMode}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {showView && (
          <MenuItem
            sx={{
              "&.MuiMenuItem-root": {
                fontFamily: "Figtree",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "17px",
              },
            }}
            onClick={handleView}
          >
            <ListItemIcon>
              <RemoveRedEyeOutlinedIcon fontSize="small" />
            </ListItemIcon>
            View
          </MenuItem>
        )}
        {showEdit && (
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
        )}
        {showInActive && (
          <MenuItem onClick={handleInactive}>
            <ListItemIcon>
              <RemoveCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            Inactive
          </MenuItem>
        )}
        {showDelete && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default CustomActionComponent;
