import {
  IconButton,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/ManageAccounts";
import { useState } from "react";

export function HeaderSettingsButton() {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );
  const handleClose = () => setAnchorElement(null);
  return (
    <>
      <Tooltip title={"Campaign Settings"}>
        <IconButton
          color={"inherit"}
          aria-label={"Settings"}
          onClick={(evt) => {
            setAnchorElement(evt.currentTarget);
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={!!anchorElement}
        anchorEl={anchorElement}
        onClose={handleClose}
        MenuListProps={{
          subheader: (
            <ListSubheader component={"div"} disableSticky>
              Campaign Settings
            </ListSubheader>
          ),
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            // Change Campaign Name
          }}
        >
          <ListItemText>Edit Campaign</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            // Leave Campaign
          }}
        >
          <ListItemText>Leave Campaign</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            // Change Campaign Name
          }}
        >
          <ListItemText>Delete Campaign</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            // Change Campaign Name
          }}
        >
          <ListItemText>Step Down as Guide</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
