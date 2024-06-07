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
import { useCreateUserMutation } from "../../redux/features/auth";
import { useGetAllRolesMutation } from "../../redux/features/role";
import { useGetAllDepartmentsQuery } from "../../redux/features/department";

const CreateUser = () => {
  const [createUser] = useCreateUserMutation();
  const [roles, setRoles] = useState([]);
  const [getRoles] = useGetAllRolesMutation();

  const { data, error, isLoading } = useGetAllDepartmentsQuery();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleId: 0,
    departmentId: 0,
  });

  useEffect(() => {
    const handleGetAllRoles = async () => {
      try {
        const res = await getRoles().unwrap();
        setRoles(res.items);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    handleGetAllRoles();
  }, [getRoles]);

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
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create User
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
              {roles.map((role) => (
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
    </Container>
  );
};

export default CreateUser;
