import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  useLazyGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../redux/features/user";
import { useGetAllRolesQuery } from "../../redux/features/role";
import { useGetAllDepartmentsQuery } from "../../redux/features/department";
import Loading from "../../components/loading/Loading";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AboveTableHeader from "../../components/headers/AboveTableHeader";
import SaveIcon from "@mui/icons-material/Save";

const EditUser = () => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const { userId } = useParams();
  const [
    getUserById,
    {
      data: currentUser,
      error: currentUserError,
      isLoading: currentUserLoading,
      status,
    },
  ] = useLazyGetUserByIdQuery();
  const [updateUser] = useUpdateUserByIdMutation();

  const {
    data: departments,
    isLoading: departmentLoading,
    error: departmentError,
  } = useGetAllDepartmentsQuery();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    roleId: 0,
    departmentId: 0,
  });

  const {
    data: roles,
    error: roleErr,
    isLoading: roleLoading,
  } = useGetAllRolesQuery();

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [userId, getUserById]);

  useEffect(() => {
    if (currentUser) {
      setUserData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        roleId: currentUser.role?.id || 0,
        departmentId: currentUser.department?.id || 0,
      });
    }
  }, [currentUser, currentUserError]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const id = userId;
      Object.keys(userData).forEach((key) => {
        if (
          (key === "roleId" && userData[key] === 0) ||
          (key === "departmentId" && userData[key] === 0) ||
          (key == "phoneNumber" && userData[key] === "")
        ) {
          delete userData[key];
        }
      });
      const res = await updateUser({ id, user: userData }).unwrap();
      console.log("User updated successfully:", res);
      setOpen(true);
      setSeverity("success");
      setSnackbarMessage("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      setOpen(true);
      setSeverity("error");
      setSnackbarMessage("Error updating user: " + error.message || "");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setSnackbarMessage(`${text} copied to clipboard`);
        setOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (currentUserLoading || roleLoading || departmentLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (currentUserError || roleErr || departmentError)
    return (
      <div>Error fetching user data. {error + roleErr + departmentError}</div>
    );

  console.log("User data:", userData, roles.items, departments.items);

  return (
    <GridParent>
      <GridItem xs={12} style={{ padding: "16px" }}>
        <AboveTableHeader title="Edit User" />
      </GridItem>
      <GridItem xs={12} md={3} style={{ padding: "16px", height: "80%" }}>
        <Paper elevation={1} style={{ padding: "8px", height: "70%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Avatar
              sx={{ width: "96px", height: "96px", marginBottom: "24px" }}
            />
            <Box sx={{ position: "relative", padding: "8px" }}>
              <ContentCopyIcon
                sx={{
                  position: "absolute",
                  top: 4,
                  right: -4,
                  fontSize: 12,
                  cursor: "pointer",
                }}
                onClick={() => copyToClipboard(userData.fullName)}
              />
              <Typography variant="h3">{userData.fullName}</Typography>
            </Box>
            <Box sx={{ position: "relative", padding: "8px" }}>
              <ContentCopyIcon
                sx={{
                  position: "absolute",
                  ttop: 4,
                  right: -4,
                  fontSize: 12,
                  cursor: "pointer",
                }}
                onClick={() => copyToClipboard(userData.email)}
              />
              <Typography variant="h5">{userData.email}</Typography>
            </Box>
            <Box sx={{ position: "relative", padding: "8px" }}>
              <ContentCopyIcon
                sx={{
                  position: "absolute",
                  top: 4,
                  right: -4,
                  fontSize: 12,
                  cursor: "pointer",
                }}
                onClick={() => copyToClipboard(userData.phoneNumber)}
              />

              <Typography variant="h5">{userData.phoneNumber}</Typography>
            </Box>
          </Box>
        </Paper>
      </GridItem>
      <GridItem
        xs={12}
        md={9}
        style={{
          position: "relative",
          padding: "32px",
          borderLeft: "dashed 2px lightGrey",
        }}
      >
        <ManageAccountsIcon />
        <GridParent
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Grid item xs={12}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              value={userData.fullName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              value={userData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="roleId"
                value={userData.roleId}
                onChange={handleChange}
                label="Role"
              >
                {roles.items.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Departments</InputLabel>
              <Select
                name="departmentId"
                value={userData.departmentId}
                onChange={handleChange}
                label="Departments"
              >
                {departments.items.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </GridParent>
      </GridItem>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </GridParent>
  );
};

export default EditUser;
