"use client";
import React from "react";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { mockUserData } from "../../data/mockUserData";
// icons
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import {
  useGetAllUsersQuery,
  useDeleteUserByIdMutation,
} from "../../redux/features/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AboveTableHeader from "../../components/headers/AboveTableHeader";
import Loading from "../../components/loading/Loading";

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

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <GridParent>
      <GridItem xs={12} style={{ padding: "16px" }}>
        <AboveTableHeader
          title={"All Users"}
          subTitle={"All users in the system"}
        />
      </GridItem>
      <GridItem xs={12} sx={{ position: "relative", height: "40px" }}>
        <Button
          variant="contained"
          style={{
            position: "absolute",
            top: 0,
            right: 16,
            fontSize: "15px",
            backgroundColor: colors.primary[500],
            // padding: "5px",
          }}
          endIcon={<PersonAddAlt1Icon />}
          onClick={() => {
            console.log("clicked");
            navigate("create");
          }}
          size="small"
        >
          Create User
        </Button>
        {/* </Box> */}
      </GridItem>
      <GridItem xs={12}>
        {!isLoading && (
          <DataTable
            rows={data?.items ? data.items : []}
            columns={columns}
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
