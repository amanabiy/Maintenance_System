"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  Typography,
  Alert,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BuildIcon from "@mui/icons-material/Build";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import Loading from "../../components/loading/Loading";
import { tokens } from "../../theme";
import {
  useGetAllRolesMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useAddPermissionToRoleMutation,
  useRemovePermissionFromRoleMutation,
} from "../../redux/features/role";
import CreateRole from "../../components/modals/createRole";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { useGetAllPermissionsQuery } from "../../redux/features/permission";
import { X } from "@mui/icons-material";

const Roles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [deleteRole] = useDeleteRoleMutation();
  const [requests, setRequests] = useState(null);
  const [changedNewPermissions, setChangedNewPermissions] = useState([]);
  const [getAllRole, { error, status }] = useGetAllRolesMutation();
  const [createRole] = useCreateRoleMutation();
  const [addPermission] = useAddPermissionToRoleMutation();
  const [removePermission] = useRemovePermissionFromRoleMutation();
  const [title, setTitle] = useState("Create Role");
  const [roleName, setRoleName] = useState("");
  const [updateRole] = useUpdateRoleMutation();

  const handleGetAllRole = async () => {
    try {
      const res = await getAllRole().unwrap();
      setRequests(res);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  useEffect(() => {
    handleGetAllRole();
  }, []);

  const { data: permissions } = useGetAllPermissionsQuery();
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [existingRolePermissions, setExistingRolePermissions] = useState([]);

  useEffect(() => {
    if (permissions && permissions.items) {
      const initialPermissions = permissions.items.reduce((acc, permission) => {
        acc[permission.name] = {
          id: permission.id,
          value: existingRolePermissions.includes(permission.name),
        };
        return acc;
      }, {});
      setSelectedPermissions(initialPermissions);
    }
  }, [permissions, existingRolePermissions]);

  const handleCreateRole = async (roleName) => {
    try {
      const res = await createRole({ roleName: roleName }).unwrap();
      const roleId = Number(res.id);
      console.log("the create", roleId);
      return roleId;
    } catch (err) {
      console.error("Failed to create role:", err);
      throw err;
    }
  };

  const handleAddPermission = async (roleId, permissionId) => {
    roleId = Number(roleId);
    permissionId = Number(permissionId);
    try {
      const res = await addPermission({ roleId, permissionId }).unwrap();
      console.log("the add", res);
    } catch (error) {
      console.error("Failed to add permission:", error);
    }
  };

  const handleRemovePermission = async (roleId, permissionId) => {
    const res = await removePermission({ roleId, permissionId });
    console.log("the remove", res);
  };

  const handleUpdateRole = async (id, roleName) => {
    try {
      console.log("Role ID:", id, "Role Name:", roleName);
      const res = await updateRole({ id, roleName }).unwrap();
      console.log("the update", res);
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleOnConfirm = async (
    roleName,
    selectedPermissions,
    changedPermissions,
    roleId
  ) => {
    const newRoleId = roleId;
    if (title === "Create Role") {
      const newRoleId = await handleCreateRole(roleName);
      changedPermissions.forEach((permission) => {
        console.log("Permission:", permission.name, permission.id);
        if (permission.value) {
          handleAddPermission(newRoleId, permission.id);
        } else {
          handleRemovePermission(newRoleId, permission.id);
        }
      });
    } else {
      await handleUpdateRole(newRoleId, roleName);
      changedPermissions.forEach((permission) => {
        console.log("Permission:", permission.name, permission.id);
        if (permission.value) {
          handleAddPermission(newRoleId, permission.id);
        } else {
          handleRemovePermission(newRoleId, permission.id);
        }
      });
    }
    console.log("Changed Permissions:", changedPermissions);
    setOpenCreate(false);
  };

  const handleDelete = async (id) => {
    const res = await deleteRole(id).unwrap();
    console.log("the delete", res);
    setOpenDelete(false);
  };

  const handleEditRole = (params) => {
    console.log(params);
    setTitle("Edit Role");
    setOpenCreate(true);
    setRoleId(params.row.id);
    setRoleName(params.row.roleName);
    params.row.permissions.forEach((permission) => {
      setExistingRolePermissions((prev) => [...prev, permission.name]);
    });
  };

  console.log("existingRolePermissions", existingRolePermissions);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "roleName", headerName: "Role Name", flex: 0.5 },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {params.value.map((permission) => (
            <span key={permission.id}>{permission.name}</span>
          ))}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Edit Role">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  handleEditRole(params);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Role">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenDelete(true);
                  setRoleId(params.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <DeleteConfirmation
              open={openDelete}
              onClose={() => {
                setOpenDelete(false);
              }}
              onConfirm={() => {
                handleDelete(roleId);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <GridParent>
      <GridItem xs={12} style={{ position: "relative" }}>
        {status === "pending" && <Loading />}
        {status === "failed" && (
          <Alert severity="error">
            Can't seem to load the data at the moment.
          </Alert>
        )}
        <Box sx={{ position: "relative" }}>
          <button
            style={{
              position: "absolute",
              top: "100px",
              right: "50px",
              fontSize: "15px",
              // padding: "5px",
            }}
            onClick={() => {
              setOpenCreate(true);
              setTitle("Create Role");
              setRoleName("");
            }}
          >
            Create role
          </button>
          <CreateRole
            title={title}
            open={openCreate}
            onClose={() => {
              setOpenCreate(false), setExistingRolePermissions([]);
            }}
            onConfirm={handleOnConfirm}
            permissions={selectedPermissions}
            setChangedNewPermissions={setChangedNewPermissions}
            role={roleName}
            roleId={roleId}
          />
        </Box>
        {status === "fulfilled" && requests && requests.items && (
          <DataTable
            rows={requests.items}
            columns={columns}
            title={"Roles"}
            subTitle={"All created roles along with their permissions."}
          />
        )}
      </GridItem>
    </GridParent>
  );
};

export default Roles;
