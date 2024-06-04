import { useState, useCallback } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemAvatar,
  Avatar,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";
import { ErrorMessage } from "formik";
import { generateMediaLinks } from "../../functions/mediaFunctions";
import {
  useGetAllUsersQuery,
  useGetUsersFuzzyQuery,
} from "../../redux/features/user";
import { useGetAllDepartmentsQuery } from "../../redux/features/department";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const TransitionModalFields = (
  values,
  setFieldValue,
  transitionState,
  currentRequestStatusType,
  currentRequest,
  errors
) => {
  const fields = [];

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  //   PRIORITY INPUT----------------------------------------------------------
  if (transitionState.allowChangePriority) {
    fields.push(
      <FormControl key="priority" fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          name="priority"
          value={values.priority}
          onChange={(e) => setFieldValue("priority", e.target.value)}
          error={Boolean(errors.priority)}
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <ErrorMessage
          name="priority"
          component="div"
          style={{ color: "red", fontSize: "10px" }}
        />
      </FormControl>
    );
  }

  //   CONFIRMATION STATUS INPUT----------------------------------------------------------
  if (transitionState.allowChangeconfirmationStatus) {
    fields.push(
      <FormControl key="confirmationStatus" fullWidth margin="normal">
        <InputLabel>Confirmation Status</InputLabel>
        <Select
          label="Confirmation Status"
          name="confirmationStatus"
          value={values.confirmationStatus}
          onChange={(e) => setFieldValue("confirmationStatus", e.target.value)}
          error={Boolean(errors.confirmationStatus)}
        >
          {["NOT_COMPLETED", "DONE"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <ErrorMessage
          name="confirmationStatus"
          component="div"
          style={{ color: "red", fontSize: "10px" }}
        />
      </FormControl>
    );
  }

  //   VERIFICATION STATUS INPUT----------------------------------------------------------

  if (transitionState.allowChangeverificationStatus) {
    fields.push(
      <FormControl key="verificationStatus" fullWidth margin="normal">
        <InputLabel>Verification Status</InputLabel>
        <Select
          label="Verification Status"
          name="verificationStatus"
          value={values.verificationStatus}
          onChange={(e) => setFieldValue("verificationStatus", e.target.value)}
          error={Boolean(errors.verificationStatus)}
        >
          {["PASSED", "FAILED", "PENDING", "NOT_REQUIRED"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <ErrorMessage
          name="verificationStatus"
          component="div"
          style={{ color: "red", fontSize: "10px" }}
        />
      </FormControl>
    );
  }

  //   LOCATION INPUT----------------------------------------------------------
  if (transitionState.allowsChangeLocation) {
    fields.push(
      <div key="location" style={{ margin: "16px 0" }}>
        <TextField
          fullWidth
          margin="normal"
          label="Block Number"
          type="number"
          name="blockNumber"
          value={values.blockNumber}
          onChange={(e) => setFieldValue("blockNumber", e.target.value)}
          error={Boolean(errors.blockNumber)}
          helperText={<ErrorMessage name="blockNumber" />}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Floor Number"
          type="number"
          name="floorNumber"
          value={values.floorNumber}
          onChange={(e) => setFieldValue("floorNumber", e.target.value)}
          error={Boolean(errors.floorNumber)}
          helperText={<ErrorMessage name="floorNumber" />}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Room Number"
          type="number"
          name="roomNumber"
          value={values.roomNumber}
          onChange={(e) => setFieldValue("roomNumber", e.target.value)}
          error={Boolean(errors.roomNumber)}
          helperText={<ErrorMessage name="roomNumber" />}
        />
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="isToilet"
                label="Is Toilet"
                checked={Boolean(values.isToilet)}
                onChange={(e) => setFieldValue("isToilet", e.target.checked)}
                checkedIcon={<ThumbUpIcon />}
              />
            }
            label="Is Toilet"
          />
        </FormControl>
      </div>
    );
  }

  //   MEDIA INPUT----------------------------------------------------------

  if (transitionState.allowsChangeMedia) {
    const medias =
      currentRequest.mediaFiles.length > 0
        ? generateMediaLinks(currentRequest.mediaFiles)
        : [];
    fields.push(
      <div key="media" style={{ margin: "16px 0" }}>
        {currentRequest.mediaFiles.length > 0 ? (
          <>
            <Typography variant="h6">Current Media</Typography>
            <List>
              {currentRequest.mediaFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={file.filename}
                    onClick={() => {
                      window.open(medias[index], "_blank");
                    }}
                    style={{ cursor: "pointer" }}
                    secondary={"Click to view"}
                  />
                  <Button
                    onClick={() =>
                      setFieldValue(
                        "mediaFiles",
                        values.mediaFiles.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="h6">No Media Added Yet</Typography>
        )}
      </div>
    );
  }

  //  REQUEST TYPES INPUT----------------------------------------------------------

  //   if (transitionState.allowsChangeRequestTypes) {
  //     fields.push(
  //       <div key="requestTypes" style={{ margin: "16px 0" }}>
  //         <Typography variant="h6">Request Types</Typography>
  //         {currentRequest.maintenanceRequestTypes.map((type, index) => (
  //           <div key={index} style={{ display: "inline-block", margin: "4px" }}>
  //             <Button
  //               variant="contained"
  //               color="secondary"
  //               onClick={() =>
  //                 setFieldValue(
  //                   "maintenanceRequestTypes",
  //                   values.maintenanceRequestTypes.filter((_, i) => i !== index)
  //                 )
  //               }
  //             >
  //               {type.name}
  //             </Button>
  //           </div>
  //         ))}
  //         {/* Add logic to search and add new request types */}
  //       </div>
  //     );
  //   }

  //   SUBJECT AND DESCRIPTION INPUT----------------------------------------------------------
  if (transitionState.allowsChangeTitleAndDescription) {
    fields.push(
      <div key="titleDescription" style={{ margin: "16px 0" }}>
        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={(e) => setFieldValue("subject", e.target.value)}
          error={Boolean(errors.subject)}
          helperText={<ErrorMessage name="subject" />}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={values.description}
          multiline
          rows={4}
          onChange={(e) => setFieldValue("description", e.target.value)}
          error={Boolean(errors.description)}
          helperText={<ErrorMessage name="description" />}
        />
      </div>
    );
  }

  //   DEPARTMENT INPUT----------------------------------------------------------
  if (transitionState.allowsForwardToDepartment) {
    const {
      data: departments,
      error: departmentError,
      status: departmentStatus,
    } = useGetAllDepartmentsQuery();

    console.log(departments, "departments");

    fields.push(
      <FormControl key="department" fullWidth margin="normal">
        <InputLabel>Assign to Department</InputLabel>
        <Select
          label="Assign to Department"
          name="handlingDepartment"
          value={values.handlingDepartment}
          onChange={(e) => setFieldValue("handlingDepartment", e.target.value)}
          disabled={departmentStatus === "PENDING"}
        >
          {departments &&
            departments.items.length > 0 &&
            departments.items.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }

  //   ASSIGNED PERSONS INPUT----------------------------------------------------------
  if (transitionState.allowsForwardToPerson) {
    const [selectedPersonnel, setSelectedPersonnel] = useState(
      currentRequest.assignedPersons || []
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const {
      data: personnelList,
      error,
      status,
    } = useGetUsersFuzzyQuery(debouncedSearchTerm);

    // Debounce the search term
    const handleSearchChange = useCallback(
      debounce((term) => {
        setDebouncedSearchTerm(term);
      }, 500),
      []
    );

    const handleInputChange = (event, value) => {
      setSearchTerm(value);
      handleSearchChange(value);
    };

    const handleAddPerson = (event, newValue) => {
      if (
        newValue &&
        !selectedPersonnel.some((person) => person.id === newValue.id)
      ) {
        setSelectedPersonnel([...selectedPersonnel, newValue]);
        setFieldValue("assignedPersons", [...values.assignedPersons, newValue]);
      }
    };

    const handleRemovePerson = (index) => {
      const updatedPersonnel = values.assignedPersons.filter(
        (_, i) => i !== index
      );
      setFieldValue("assignedPersons", updatedPersonnel);
      setSelectedPersonnel(updatedPersonnel);
    };

    fields.push(
      <div key="assignedPersons" style={{ margin: "16px 0" }}>
        <Typography variant="h6">Assign to Personnel</Typography>
        {selectedPersonnel.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedPersonnel.map((person, index) => (
              <Chip
                key={index}
                avatar={<Avatar src={person.avatarUrl} />}
                label={person.fullName}
                onDelete={() => handleRemovePerson(index)}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </div>
        ) : (
          <Typography>No Assigned Personnel yet</Typography>
        )}
        <Autocomplete
          options={personnelList || []}
          getOptionLabel={(option) => option.fullName}
          onInputChange={handleInputChange}
          onChange={handleAddPerson}
          loading={status === "PENDING"}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add Personnel"
              variant="outlined"
              style={{ marginTop: "16px" }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {status === "PENDING" ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </div>
    );
  }

  //   SCHEDULE INPUT----------------------------------------------------------
  if (transitionState.hasSchedule) {
  }

  //   FILE INPUT----------------------------------------------------------
  if (transitionState.needsFile) {
    fields.push(
      <div key="fileInput" style={{ margin: "16px 0" }}>
        <input
          type="file"
          name="requiredFile"
          accept="*/*"
          required
          onChange={(e) =>
            setFieldValue("requiredFile", e.currentTarget.files[0])
          }
        />
      </div>
    );
  }

  //   SIGNATURE INPUT----------------------------------------------------------
  if (transitionState.needsSignatures) {
    fields.push(
      <TextField
        key="signature"
        fullWidth
        margin="normal"
        label="Signature"
        name="signature"
        value={values.signature}
        onChange={(e) => setFieldValue("signature", e.target.value)}
        error={Boolean(errors.signature)}
        helperText={<ErrorMessage name="signature" />}
      />
    );
  }

  //  COMMENT INPUT----------------------------------------------------------

  fields.push(
    <TextField
      key="externalNote"
      fullWidth
      margin="normal"
      label="Comment"
      name="comment"
      value={values.comment}
      onChange={(e) => setFieldValue("externalNote", e.target.value)}
      error={Boolean(errors.externalNote)}
      helperText={<ErrorMessage name="externalNote" />}
    />
  );

  return fields;
};

export default TransitionModalFields;
