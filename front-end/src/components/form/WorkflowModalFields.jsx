import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetAllRolesQuery } from "../../redux/features/role";
import { useGetRequestStatusTypesQuery } from "../../redux/features/requestStatusType";

const WorkflowModalFields = ({
  transitionState,
  values,
  errors,
  touched,
  setFieldValue,
  type,
  initialValues,
}) => {
  const fields = [];
  //   console.log(values);

  if (type === "fields" || type === "new") {
    fields.push(
      <>
        <TextField
          name="name"
          label="Name"
          value={values.name}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          fullWidth
          margin="normal"
          onChange={(e) => setFieldValue("name", e.target.value)}
        />
        <TextField
          name="description"
          label="Description"
          value={values.description}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
          fullWidth
          margin="normal"
          onChange={(e) => setFieldValue("description", e.target.value)}
        />
        {/* Render checkboxes for all boolean values */}
        {Object.keys(initialValues).map((key) => {
          if (typeof initialValues[key] === "boolean") {
            return (
              <FormControl>
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      name={key}
                      as={Checkbox}
                      checked={values[key]}
                      onChange={() => setFieldValue(key, !values[key])}
                    />
                  }
                  label={key}
                />
              </FormControl>
            );
          }
          return null;
        })}
      </>
    );
  }

  if (type === "roles" || type === "new") {
    const [selectedRoles, setSelectedRoles] = useState(
      transitionState?.allowedRoles || []
    );
    const {
      data: roles,
      status: fetchAllRolesStatus,
      error: fetchAllRolesError,
    } = useGetAllRolesQuery();
    const handleAddRole = (event, newValue) => {
      if (newValue && !selectedRoles.some((role) => role.id === newValue.id)) {
        setSelectedRoles([...selectedRoles, newValue]);
        setFieldValue("allowedRolesIds", [
          ...values.allowedRolesIds,
          newValue.id,
        ]);
      }
    };

    const handleRemoveRole = (index, id) => {
      const updatedRoles = values.allowedRolesIds.filter((_, i) => i !== index);
      setFieldValue("allowedRolesIds", updatedRoles);
      setSelectedRoles((prev) => prev.filter((prevRole) => prevRole.id !== id));
    };

    console.log(values);
    console.log(transitionState.allowedRoles);
    console.log(selectedRoles);

    fields.push(
      <Box>
        {selectedRoles.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedRoles.length > 0
              ? selectedRoles.map((role, index) => (
                  <Chip
                    key={role.id}
                    label={role.roleName}
                    onDelete={() => {
                      handleRemoveRole(index, role.id);
                    }}
                    // deleteIcon={<CloseIcon />}
                  />
                ))
              : null}
          </div>
        ) : (
          <Typography>No Request Types added yet</Typography>
        )}
        <Autocomplete
          options={roles?.items || []}
          getOptionLabel={(option) => option.roleName}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleAddRole}
          renderInput={(params) => (
            <TextField {...params} label="Roles" placeholder="Select roles" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <strong>{option.roleName}</strong>
            </li>
          )}
        />
      </Box>
    );
  }

  if (type === "transitions" || type === "new") {
    const [selectedTransitions, setSelectedTransitions] = useState(
      transitionState?.allowedTransitions || []
    );
    const {
      data: transitions,
      status,
      error,
    } = useGetRequestStatusTypesQuery();
    const handleAddTransition = (event, newValue) => {
      if (
        newValue &&
        !selectedTransitions.some((state) => state.id === newValue.id)
      ) {
        setSelectedTransitions([...selectedTransitions, newValue]);
        setFieldValue("allowedTransitions", [
          ...values.allowedTransitions,
          newValue.id,
        ]);
      }
    };
    const handleRemoveTransition = (index, id) => {
      const updatedTransitions = values.allowedTransitions.filter(
        (_, i) => i !== index
      );
      setFieldValue("allowedTransitions", updatedTransitions);
      setSelectedTransitions((prev) =>
        prev.filter((prevState) => prevState.id !== id)
      );
    };

    console.log(values);
    console.log(transitionState.allowedTransitions);
    console.log(selectedTransitions);

    fields.push(
      <Box>
        {selectedTransitions.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedTransitions.length > 0
              ? selectedTransitions.map((state, index) => (
                  <Chip
                    key={state.id}
                    label={state.name}
                    onDelete={() => {
                      handleRemoveTransition(index, state.id);
                    }}
                  />
                ))
              : null}
          </div>
        ) : (
          <Typography>No Transition States added yet</Typography>
        )}
        <Autocomplete
          options={(transitions?.items || []).filter(
            (option) => option.id !== transitionState.id
          )}
          getOptionLabel={(option) => option.name}
          //   isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleAddTransition}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Transition States"
              placeholder="Select Transition States"
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <strong>{option.name}</strong>
            </li>
          )}
        />
      </Box>
    );
  }

  return fields;
};

export default WorkflowModalFields;
