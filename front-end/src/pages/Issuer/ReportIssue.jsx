"use client";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

// custom components
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import AboveTableHeader from "../../components/headers/AboveTableHeader";
import ImageUpload from "../../components/form/ImageUpload";
import { useUploadMediaMutation } from "../../redux/features/media";
import { useFuzzySearchMutation } from "../../redux/features/maintenanceRequestTypes";
import { useCreateMaintenanceRequestMutation } from "../../redux/features/maintenanceRequest";

// form schema
import { reportSchema } from "../../schemas";

const ReportIssue = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [uploadMedia] = useUploadMediaMutation();
  const [fuzzySearch] = useFuzzySearchMutation();
  const [createMaintenanceRequest] = useCreateMaintenanceRequestMutation();
  const [type, setType] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const readerPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    });

    Promise.all(readerPromises)
      .then((newBase64Images) => {
        setImageFiles([...imageFiles, ...files]);
        setBase64Images([...base64Images, ...newBase64Images]);
        // handleFileChange([...imageFiles, ...files], [...base64Images, ...newBase64Images]); // Notify parent component of the change
      })
      .catch((error) => console.error("Error reading files:", error));
  };

  const handleRemoveImage = (index) => {
    const updatedImageFiles = imageFiles.filter((_, i) => i !== index);
    const updatedBase64Images = base64Images.filter((_, i) => i !== index);
    setImageFiles(updatedImageFiles);
    setBase64Images(updatedBase64Images);
    // handleFileChange(updatedImages); // Notify parent component of the change
  };

  const handleCheckboxChange = (event) => {
    setFieldValue("locationCreate.isToilet", event.target.checked);
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      subject: "",
      description: "",
      locationCreate: {
        blockNumber: 0,
        roomNumber: "",
        floor: 0,
        isToilet: false,
      },
      mediaIds: [],
      maintenanceRequestTypeIds: [],
    },
    validationSchema: reportSchema,
    onSubmit: (values) => {
      // Handle form submission
      if (values.locationCreate.isToilet) {
        values.locationCreate.roomNumber = "";
      } else {
        values.locationCreate.floor = 0;
      }

      {
        imageFiles.map((image) => {
          const formData = new FormData();
          formData.append("file", image);
          handleUploadImage(formData);
        });
      }

      if (type) {
        handleFuzzySearch(type);
      }

      console.log("Form Submitted", values);
      handleSubmitAll(values);
    },
  });

  const handleSubmitAll = async (values) => {
    console.log(values, "values");
    try {
      const res = await createMaintenanceRequest(values);
      if (res.data.verificationStatus == "PENDING") {
        console.log("Request successful");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleFuzzySearch = async (term) => {
    try {
      const res = await fuzzySearch(term);
      if (res.data && res.data[0].id) {
        values.maintenanceRequestTypeIds.push(res.data[0].id);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleUploadImage = async (formData) => {
    console.log("the data", formData);
    try {
      const res = await uploadMedia(formData);
      console.log(res);
      values.mediaIds.push(res.data.id);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    if (values.locationCreate.isToilet) {
      setFieldValue("locationCreate.floor", value);
    } else {
      setFieldValue("locationCreate.roomNumber", value);
    }
  };

  return (
    <GridParent
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        // backgroundColor: "#f3f4f6",
        padding: "40px",
      }}
    >
      <GridItem xs={12}>
        <AboveTableHeader
          title="Report Issue"
          subTitle="Please leave as much description as you can of the issue you are facing."
        />
      </GridItem>
      <form
        style={{
          padding: "20px",
          border: "solid 1px #e0e0e0",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <GridParent gap={2}>
          <GridItem xs={6}>
            <ImageUpload
              images={base64Images}
              handleFileChange={handleFileChange}
              handleRemoveImage={handleRemoveImage}
              errors={errors}
              touched={touched}
            />
          </GridItem>

          <GridItem xs={12} md={6} style={{ marginBottom: 20 }}>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              value={values.subject}
              id="subject"
              onChange={handleChange}
              placeholder="Enter a short subject explaining the issue."
              onBlur={handleBlur}
              style={{ backgroundColor: "#f9f9f9" }}
            />
          </GridItem>

          <GridItem xs={12} md={6} style={{ marginBottom: 20 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                onBlur={handleBlur}
                id="type"
                name="type"
                style={{ height: "40px" }}
              >
                <MenuItem value="general">General Maintenance</MenuItem>
                <MenuItem value="electric">Electric Maintenance</MenuItem>
                <MenuItem value="sanitary">Sanitary Maintenance</MenuItem>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={4} md={2} style={{ marginBottom: 20 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Block Number</InputLabel>
              <Select
                label="Block Number"
                value={values.locationCreate.blockNumber}
                onChange={(e) =>
                  setFieldValue(
                    "locationCreate.blockNumber",
                    parseInt(e.target.value, 10)
                  )
                }
                onBlur={handleBlur}
                id="locationCreate.blockNumber"
                name="locationCreate.blockNumber"
                style={{ height: "40px" }}
              >
                <MenuItem value="64">64</MenuItem>
                <MenuItem value="47">47</MenuItem>
                <MenuItem value="57">57</MenuItem>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} style={{ marginBottom: 20 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.locationCreate.isToilet}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "#4caf50",
                    "&.Mui-checked": {
                      color: "#4caf50",
                    },
                  }}
                />
              }
              label="Is Toilet"
            />
          </GridItem>

          <GridItem xs={4} md={2} style={{ marginBottom: 20 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>
                {values.locationCreate.isToilet ? "Floor" : "Room Number"}
              </InputLabel>
              <Select
                label={values.locationCreate.isToilet ? "Floor" : "Room Number"}
                value={
                  values.locationCreate.isToilet
                    ? values.locationCreate.floor
                    : values.locationCreate.roomNumber
                }
                onChange={(e) =>
                  values.locationCreate.isToilet
                    ? setFieldValue(
                        "locationCreate.floor",
                        parseInt(e.target.value, 10)
                      )
                    : setFieldValue("locationCreate.roomNumber", e.target.value)
                }
                onBlur={handleBlur}
                id={
                  values.locationCreate.isToilet
                    ? "locationCreate.floor"
                    : "locationCreate.roomNumber"
                }
                name={
                  values.locationCreate.isToilet
                    ? "locationCreate.floor"
                    : "locationCreate.roomNumber"
                }
                style={{ height: "40px" }}
              >
                {values.locationCreate.isToilet
                  ? [0, 1, 2, 3, 4, 5].map((floor) => (
                      <MenuItem key={floor} value={floor}>
                        {floor}
                      </MenuItem>
                    ))
                  : ["R4-005", "R1-003", "R2-010"].map((room) => (
                      <MenuItem key={room} value={room}>
                        {room}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} style={{ marginBottom: 20 }}>
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={values.description}
              id="description"
              onChange={handleChange}
              placeholder="Enter a detailed description of the issue."
              onBlur={handleBlur}
              required
              error={errors.description && touched ? true : false}
              helperText={
                errors.description && touched ? errors.description : ""
              }
              style={{ backgroundColor: "#f9f9f9" }}
            />
          </GridItem>

          <Divider style={{ marginTop: 20, width: "100%" }} />

          <GridItem
            xs={12}
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
            >
              Submit
            </Button>
          </GridItem>
        </GridParent>
      </form>
    </GridParent>
  );
};

export default ReportIssue;
