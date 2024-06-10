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
  Snackbar,
  Alert,
} from "@mui/material";
import { useCreateUserMutation } from "../../redux/features/auth";
import { useGetAllRolesQuery } from "../../redux/features/role";
import { useGetAllDepartmentsQuery } from "../../redux/features/department";
import Loading from "../../components/loading/Loading";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GridItem from "../../components/layout/GridItem";
import AboveTableHeader from "../../components/headers/AboveTableHeader";

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [
    createUser,
    {
      data: creatUserRes,
      isLoading: createUserLoading,
      isError: createUserError,
    },
  ] = useCreateUserMutation();

  const { data, error, isLoading } = useGetAllDepartmentsQuery();
  const {
    data: roles,
    error: roleErr,
    isLoading: roleLoading,
  } = useGetAllRolesQuery();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleId: 0,
    departmentId: 0,
  });

  // useEffect(() => {
  //   const handleGetAllRoles = async () => {
  //     try {
  //       const res = await getRoles().unwrap();
  //       setRoles(res.items);
  //     } catch (error) {
  //       console.error("Error fetching roles:", error);
  //     }
  //   };
  //   handleGetAllRoles();
  // }, [getRoles]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      for (const key in userData) {
        if (
          (key != "roleId" && key != "departmentId") ||
          (key === "roleId" && userData[key] != 0) ||
          (key === "departmentId" && userData[key] != 0)
        ) {
          formData.append(key, userData[key]);
        }
      }
      console.log("User data:", userData);
      const res = await createUser(userData).unwrap();
      console.log("User created successfully:", res);
      setOpen(true);
      setSnackbarMessage("User created successfully");
      setSeverity("success");
    } catch (error) {
      console.error("Error creating user:", error);
      setOpen(true);
      setSnackbarMessage("Error creating user");
      setSeverity("error");
    }
  };

  if (isLoading || roleLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mt: 4 }}
      style={{
        position: "relative",
        padding: "32px",
        borderLeft: "dashed 2px lightGrey",
      }}
    >
      <GridItem xs={12} style={{ padding: "16px" }}>
        <AboveTableHeader title="Create User" />
      </GridItem>
      <Grid container spacing={2}>
        <PersonAddAlt1Icon />
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
            name="password"
            label="Password"
            fullWidth
            value={userData.password}
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
              {data?.items?.map((department) => (
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
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={snackbarMessage}
      >
        <Alert onClose={() => setOpen(false)} severity={severity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateUser;
