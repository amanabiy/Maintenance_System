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

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role" },
    { field: "department", headerName: "Department" },
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
      renderCell: () => (
        <Box>
          <Tooltip title="Edit User">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                // Add your edit user logic here
              }}
            >
              <EditIcon style={{ color: colors.primary[500] }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove User">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                // Add your edit user logic here
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
        <DataTable
          rows={mockUserData}
          columns={columns}
          title={"All Users"}
          subTitle={"All users in the system"}
          checkboxSelection={true}
        />
      </GridItem>
      <DeleteConfirmation open={false} />
    </GridParent>
  );
};

export default Users;
