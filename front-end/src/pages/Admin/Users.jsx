"use client";
import React from "react";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Box, IconButton, Tooltip } from "@mui/material";
import { mockUserData } from "../../data/mockUserData";
// icons
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import {
  useGetAllUsersQuery,
  useDeleteUserByIdMutation,
} from "../../redux/features/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllUsersQuery();
  console.log(isLoading, data, error);
  const [deleteUser] = useDeleteUserByIdMutation();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteUser = async (id) => {
    if (!id) return;
    try {
      const res = await deleteUser(id).unwrap();
      console.log("User deleted successfully:", res);
      setOpenDelete(false);
      setDeleteId(null);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "roleName",
      headerName: "Role",
      renderCell: (params) => params.row.role.roleName,
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      renderCell: (params) => params.row.department?.name,
      flex: 1,
    },
    {
      field: "isVerified",
      headerName: "Verified",
      renderCell: (params) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "70px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: params.value
                ? colors.greenAccent[800]
                : colors.redAccent[800],
              color: params.value ? "white" : "inherit",
              padding: "8px",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            {params.value ? "Verified" : "Not Verified"}
          </Box>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit User">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                navigate(`edit/${params.id}`);
              }}
            >
              <EditIcon style={{ color: colors.primary[500] }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove User">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setOpenDelete(true);
                setDeleteId(params.id);
              }}
            >
              <PersonRemoveIcon style={{ color: colors.redAccent[500] }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <GridParent>
      <GridItem xs={12}>
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
              console.log("clicked");
              navigate("create");
            }}
          >
            Create User
          </button>
        </Box>
        {!isLoading && (
          <DataTable
            rows={data?.items}
            columns={columns}
            title={"All Users"}
            subTitle={"All users in the system"}
            checkboxSelection={true}
          />
        )}
      </GridItem>
      {/* <DeleteConfirmation open={false} /> */}
      <DeleteConfirmation
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => handleDeleteUser(deleteId)}
      />
    </GridParent>
  );
};

export default Users;
