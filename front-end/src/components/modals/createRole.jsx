"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
  maxWidth: "80%",
  width: 600,
  maxHeight: "80%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 36,
  p: 4,
};

const CreateRole = ({
  open,
  onClose,
  onConfirm,
  title,
  permissions,
  setChangedNewPermissions,
  role,
  roleId,
}) => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [changedPermissions, setChangedPermissions] = useState([]);

  useEffect(() => {
    setSelectedPermissions(permissions);
  }, [permissions]);

  useEffect(() => {
    setRoleName(role);
  }, [role]);

  // console.log(role, roleId, roleName);

  const handlePermissionChange = (permissionName) => {
    setSelectedPermissions((prev) => {
      const newValue = !prev[permissionName].value;
      return {
        ...prev,
        [permissionName]: {
          ...prev[permissionName],
          value: newValue,
        },
      };
    });

    setChangedPermissions((prev) => {
      const newValue = !selectedPermissions[permissionName].value;
      const newId = selectedPermissions[permissionName].id;
      const index = prev.findIndex((perm) => perm.name === permissionName);
      if (index === -1) {
        return [...prev, { name: permissionName, value: newValue, id: newId }];
      } else {
        return prev.filter((perm) => perm.name !== permissionName);
      }
    });
  };

  const handleConfirm = () => {
    setChangedNewPermissions(changedPermissions);
    onConfirm(roleName, selectedPermissions, changedPermissions, roleId);
    // setRoleName(role);
    setSelectedPermissions(permissions);
    setChangedPermissions([]);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-role-title"
      aria-describedby="create-role-description"
    >
      <Box sx={style}>
        <Typography id="create-role-title" variant="h6" component="h2">
          {title}
        </Typography>
        <TextField
          fullWidth
          label="Role Name"
          variant="outlined"
          margin="normal"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Permissions:
        </Typography>
        {Object.keys(selectedPermissions).map((permissionName) => (
          <FormControlLabel
            key={selectedPermissions[permissionName].id}
            control={
              <Switch
                checked={selectedPermissions[permissionName].value}
                onChange={() => handlePermissionChange(permissionName)}
                name={permissionName}
              />
            }
            label={permissionName}
          />
        ))}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{ mr: 1 }}
          >
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

CreateRole.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  permissions: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

CreateRole.defaultProps = {
  title: "Create Role",
};

export default CreateRole;
