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
} from "@mui/material";
import {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../redux/features/user";
import { useGetAllRolesQuery } from "../../redux/features/role";
import { useGetAllDepartmentsQuery } from "../../redux/features/department";
import Loading from "../../components/loading/Loading";

const EditUser = () => {
  const { userId } = useParams();
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

  const {
    data: roles,
    error: roleErr,
    isLoading: roleLoading,
  } = useGetAllRolesQuery();
  const { data, error, status, isLoading } = useGetUserByIdQuery(userId);

  useEffect(() => {
    if (!isLoading && status === "fulfilled" && data) {
      setUserData({
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        roleId: data.role.id || 0,
        departmentId: data.department?.id || 0,
      });
    }
  }, [isLoading, data]);

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
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading || roleLoading || departmentLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error || roleErr || departmentError)
    return (
      <div>Error fetching user data. {error + roleErr + departmentError}</div>
    );

  console.log("User data:", userData, roles.items, departments.items);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit User
      </Typography>
      <Grid container spacing={2}>
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
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditUser;
