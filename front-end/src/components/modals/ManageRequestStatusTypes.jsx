import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Autocomplete,
  Chip,
  Alert,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useGetRequestStatusTypesQuery } from "../../redux/features/requestStatusType";
import { useGetAllRolesQuery } from "../../redux/features/role";

const ManageRequestStatusTypes = ({
  open,
  onClose,
  type,
  transitionState,
  onConfirm,
  initialValues,
  data,
}) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTransitions, setSelectedTransitions] = useState([]);
  const {
    data: roles,
    status: fetchAllRolesStatus,
    error: fetchAllRolesError,
  } = useGetAllRolesQuery();
  const { data: transitions, status, error } = useGetRequestStatusTypesQuery();

  useEffect(() => {
    if (transitionState) {
      setSelectedRoles(
        transitionState &&
          transitionState.allowedRoles &&
          transitionState.allowedRoles.length > 0
          ? transitionState.allowedRoles.map((state) => state.id)
          : []
      );
      setSelectedTransitions(
        transitionState &&
          transitionState.allowedTransitions &&
          transitionState.allowedTransitions.length > 0
          ? transitionState.allowedTransitions.map((state) => state.id)
          : []
      );
    }
  }, [open, transitionState]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleRoleInputChange = (event, newInputValue) => {
    handleRoleChange(event, [
      ...selectedRoles,
      roles.items.find((role) => role.roleName === newInputValue),
    ]);
  };
  const handleRoleChange = (event, newValue) => {
    setSelectedRoles([...selectedRoles, newValue]);
  };

  const handleTransitionChange = (event, value) => {
    setSelectedTransitions(value);
  };

  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      allowedRolesIds: selectedRoles || [],
      allowedTransitions: selectedTransitions || [],
    };

    console.log(updatedValues);

    onConfirm(updatedValues);
  };

  // console.log(transitionState);
  // console.log(selectedRoles);
  // console.log(selectedTransitions);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="manage-request-status-types-title"
      aria-describedby="manage-request-status-types-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {data.isError && (
          <Alert severity="error">{"Couldn't submit form try again."}</Alert>
        )}
        {data.isSuccess && (
          <Alert severity="success">
            Request status type updated successfully
          </Alert>
        )}
        {data.isLoading && <Alert severity="info">Updating...</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {type === "fields" && (
                <>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    margin="normal"
                    onChange={(e) => setFieldValue("name", e.target.value)}
                  />
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                  {/* Render checkboxes for all boolean values */}
                  {Object.keys(initialValues).map((key) => {
                    if (typeof initialValues[key] === "boolean") {
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Field
                              name={key}
                              type="checkbox"
                              as={Checkbox}
                              checked={values[key]}
                              onChange={() => setFieldValue(key, !values[key])}
                            />
                          }
                          label={key}
                        />
                      );
                    }
                    return null;
                  })}
                </>
              )}

              {type === "roles" && (
                <Box>
                  {selectedRoles.length > 0 ? (
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {roles?.items &&
                      roles.items.length > 0 &&
                      selectedRoles.length > 0
                        ? roles.items.map(
                            (role) =>
                              selectedRoles.includes(role.id) && (
                                <Chip
                                  key={role.id}
                                  label={role.roleName}
                                  onDelete={() => {
                                    setSelectedRoles((prev) =>
                                      prev.filter(
                                        (roleId) => roleId !== role.id
                                      )
                                    );
                                  }}
                                />
                              )
                          )
                        : null}
                    </div>
                  ) : (
                    <Typography>No Request Types added yet</Typography>
                  )}
                  <Autocomplete
                    // multiple
                    options={(roles?.items || []).filter(
                      (role) => !selectedRoles.includes(role.id)
                    )}
                    getOptionLabel={(option) => option.roleName}
                    // value={selectedRoles}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={handleRoleChange}
                    // onInputChange={handleRoleInputChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Roles"
                        placeholder="Select roles"
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        <strong>{option.roleName}</strong>
                      </li>
                    )}
                  />
                </Box>
              )}

              {type === "transitions" && (
                <Box>
                  <Autocomplete
                    multiple
                    options={(transitions?.items || []).filter(
                      (option) =>
                        option.id !== transitionState.id &&
                        !selectedTransitions.includes(option.id)
                    )}
                    getOptionLabel={(option) => option.name}
                    // value={selectedTransitions}
                    onChange={handleTransitionChange}
                    // renderTags={(value, getTagProps) =>
                    //   value.map((option, index) => (
                    //     <Chip
                    //       key={option.id}
                    //       label={option.name}
                    //       {...getTagProps({ index })}
                    //       onDelete={() => {
                    //         setSelectedTransitions((prev) =>
                    //           prev.filter((transition) => transition !== option)
                    //         );
                    //       }}
                    //     />
                    //   ))
                    // }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Transitions"
                        placeholder="Select transitions"
                      />
                    )}
                  />
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={data.isLoading}
              >
                {data.isLoading ? "Updating..." : "Confirm"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ManageRequestStatusTypes;
