import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Menu, MenuItem, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "role",
    headerName: "Role",
    width: 180,
    renderCell: (params) => <RoleDropdown {...params} />,
  },
  { field: "lastActive", headerName: "Last active", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
];

const rows = [
  {
    id: 1,
    name: "Johnny Bowen",
    email: "sravani@yahoo.com",
    role: "Admin",
    lastActive: "4 days ago",
    status: "",
  },
  {
    id: 2,
    name: "Blanche Hart",
    email: "danzigsim@aol.com",
    role: "Manager",
    lastActive: "40 mins ago",
    status: "",
  },
  {
    id: 3,
    name: "Sandra Gilbert",
    email: "kspitler@live.com",
    role: "Manager",
    lastActive: "5 hours ago",
    status: "",
  },
  {
    id: 4,
    name: "Antonio Erickson",
    email: "doormat@att.net",
    role: "Dispatcher",
    lastActive: "2 days ago",
    status: "",
  },
  {
    id: 5,
    name: "Luz Garner",
    email: "dgatwood@msn.com",
    role: "User",
    lastActive: "6 months ago",
    status: "DISABLED",
  },
  {
    id: 6,
    name: "Kerry Hansen",
    email: "zeitlin@sbcglobal.net",
    role: "User",
    lastActive: "2 years ago",
    status: "",
  },
  {
    id: 7,
    name: "Leah Schultz",
    email: "frostman@mac.com",
    role: "Basic user",
    lastActive: "3 days ago",
    status: "",
  },
  {
    id: 8,
    name: "Irving Carr",
    email: "ewaters@comcast.net",
    role: "Basic user",
    lastActive: "7 days ago",
    status: "DISABLED",
  },
  {
    id: 9,
    name: "Sherman Todd",
    email: "mobileip@mac.com",
    role: "Technician",
    lastActive: "6 months ago",
    status: "",
  },
  {
    id: 10,
    name: "Kelli Dunn",
    email: "willg@icloud.com",
    role: "Technician",
    lastActive: "2 years ago",
    status: "",
  },
];

const RoleDropdown = ({ value }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Admin</MenuItem>
        <MenuItem onClick={handleClose}>Manager</MenuItem>
        <MenuItem onClick={handleClose}>Dispatcher</MenuItem>
        <MenuItem onClick={handleClose}>User</MenuItem>
        <MenuItem onClick={handleClose}>Basic user</MenuItem>
        <MenuItem onClick={handleClose}>Create custom role...</MenuItem>
      </Menu>
    </div>
  );
};

const EditableDataTable = () => {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default EditableDataTable;
