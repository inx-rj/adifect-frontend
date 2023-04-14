//import MUI components and icons
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
export interface propsType {
  anchorEl: null | HTMLElement;
  selectedItem: any;
  showDelete?: boolean;
  showView?: boolean;
  showEdit?: boolean;
  showInActive?: boolean;
  showSetting?: boolean;
  isEditMode?: boolean;
  item?: {
    id: number;
    isActive: boolean;
  };
  setAnchorEl: (newValue: null | HTMLElement | EventTarget) => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
  handleView?: () => void;
  setSelectedItem?: React.Dispatch<React.SetStateAction<any>>;
  handleInactive?: () => void;
  handleActive?: () => void;
  handleSetting?: () => void;
}

const CustomActionComponent = ({
  anchorEl,
  setAnchorEl,
  selectedItem,
  setSelectedItem,
  handleDelete,
  handleEdit,
  handleView,
  handleInactive,
  handleActive,
  handleSetting,
  showSetting = false,
  showDelete = false,
  showView = false,
  showEdit = false,
  showInActive = false,
  isEditMode = false,
  item,
}: propsType) => {
  return (
    <div className="relative">
      <MoreVertIcon
        cursor="pointer"
        onClick={(e) => {
          setAnchorEl(anchorEl ? null : e.currentTarget);
          setSelectedItem({ currentId: item?.id, currentTooltip: item?.id });
        }}
      />
      <Menu
        anchorEl={anchorEl}
        id={`account-menu-${item?.id}`}
        open={selectedItem?.currentTooltip === item?.id}
        onClose={() => {
          setAnchorEl(null);
          setSelectedItem({ ...selectedItem, currentTooltip: null });
        }}
        onClick={() => {
          setAnchorEl(null);
          setSelectedItem({ ...selectedItem, currentTooltip: null });
        }}
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
          <MenuItem onClick={item?.isActive ? handleInactive : handleActive}>
            <ListItemIcon>
              {item?.isActive ? (
                <RemoveCircleOutlineIcon fontSize="small" />
              ) : (
                <AddCircleOutlineOutlinedIcon fontSize="small" />
              )}
            </ListItemIcon>
            {item?.isActive ? "Inactive" : "Active"}
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
        {showSetting && (
          <MenuItem onClick={handleSetting}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Setting
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default CustomActionComponent;
