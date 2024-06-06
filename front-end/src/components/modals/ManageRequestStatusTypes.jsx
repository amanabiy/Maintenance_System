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
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useGetRequestStatusTypesQuery } from "../../redux/features/requestStatusType";

const ManageRequestStatusTypes = ({
  open,
  onClose,
  type,
  transitionState,
  onConfirm,
  data,
}) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTransitions, setSelectedTransitions] = useState([]);
  const roles = ["role1", "role2", "role3"];
  const { data: transitions, status, error } = useGetRequestStatusTypesQuery();
  console.log(transitions);

  useEffect(() => {
    if (transitionState) {
      setSelectedRoles(transitionState?.allowedRoles || []);
      setSelectedTransitions(transitionState?.allowedTransitions || []);
    }
  }, [transitionState]);

  //   console.log(updateRequestStatusTypeById, data);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleRoleChange = (event, value) => {
    setSelectedRoles(value);
  };

  const handleTransitionChange = (event, value) => {
    setSelectedTransitions(value);
  };

  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      allowedRoles: selectedRoles?.map((role) => role.id) || [],
      allowedTransitions:
        selectedTransitions?.map((transition) => transition.id) || [],
    };

    console.log(updatedValues);

    onConfirm(updatedValues);
  };

  const initialValues = {
    name: transitionState?.name || "",
    description: transitionState?.description || "",
    isInitialStatus: transitionState?.isInitialStatus || false,
    hasSchedule: transitionState?.hasSchedule || false,
    needsFile: transitionState?.needsFile || false,
    needsSignatures: transitionState?.needsSignatures || false,
    isInternal: transitionState?.isInternal || false,
    allowChangePriority: transitionState?.allowChangePriority || false,
    allowChangeconfirmationStatus:
      transitionState?.allowChangeconfirmationStatus || false,
    allowChangeverificationStatus:
      transitionState?.allowChangeverificationStatus || false,
    allowsChangeRequestTypes:
      transitionState?.allowsChangeRequestTypes || false,
    allowsForwardToDepartment:
      transitionState?.allowsForwardToDepartment || false,
    allowsForwardToPerson: transitionState?.allowsForwardToPerson || false,
    allowsChangeLocation: transitionState?.allowsChangeLocation || false,
    allowsChangeTitleAndDescription:
      transitionState?.allowsChangeTitleAndDescription || false,
    allowsChangeMedia: transitionState?.allowsChangeMedia || false,
    allowsAddMoreMedia: transitionState?.allowsAddMoreMedia || false,
  };

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
                  <Autocomplete
                    multiple
                    options={roles}
                    value={selectedRoles}
                    onChange={handleRoleChange}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option}
                          label={option}
                          {...getTagProps({ index })}
                          onDelete={() => {
                            setSelectedRoles((prev) =>
                              prev.filter((role) => role !== option)
                            );
                          }}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Roles"
                        placeholder="Select roles"
                      />
                    )}
                  />
                </Box>
              )}

              {type === "transitions" && (
                <Box>
                  <Autocomplete
                    multiple
                    options={(transitions?.items || []).filter(
                      (option) => option.id !== transitionState.id
                    )}
                    getOptionLabel={(option) => option.name}
                    value={selectedTransitions}
                    onChange={handleTransitionChange}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option.id}
                          label={option.name}
                          {...getTagProps({ index })}
                          onDelete={() => {
                            setSelectedTransitions((prev) =>
                              prev.filter((transition) => transition !== option)
                            );
                          }}
                        />
                      ))
                    }
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
