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
import WorkflowModalFields from "../form/WorkflowModalFields";

const ManageRequestStatusTypes = ({
  open,
  onClose,
  type,
  transitionState,
  onConfirm,
  initialValues,
  data,
}) => {
  useEffect(() => {}, [open, transitionState]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleTransitionChange = (event, value) => {
    setSelectedTransitions(value);
  };

  const handleSubmit = (values) => {
    const uniqueAllowedRoles = Array.from(new Set(values.allowedRolesIds));
    const uniqueAllowedTransitions = Array.from(
      new Set(values.allowedTransitions)
    );
    const updatedValues = {
      ...values,
      allowedRolesIds: uniqueAllowedRoles,
      allowedTransitions: uniqueAllowedTransitions,
    };

    onConfirm(updatedValues);
  };

  console.log(transitionState);

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
          maxWidth: "80%",
          width: "50%",
          maxHeight: "80%",
          overflowY: "auto",
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
              {
                <WorkflowModalFields
                  transitionState={transitionState}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  type={type}
                  initialValues={initialValues}
                />
              }

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
