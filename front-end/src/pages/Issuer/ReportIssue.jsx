import React from "react";
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
import ReusableTextInput from "../../components/form/ReusableTextInput";
import AboveTableHeader from "../../components/headers/AboveTableHeader";

// form schema
import { reportSchema } from "../../schemas";

// const handleSubmit = () => {
//   // handle form submission
//   console.log("Form Submitted");
// };
const ReportIssue = () => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        subject: "",
        description: "",
      },
      validationSchema: reportSchema,
    });
  return (
    <GridParent
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fbfd",
        borderRadius: "10px",
        padding: "60px",
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
          border: " solid 1px #e0e0e0",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <GridParent>
          <GridItem
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Avatar
              src="/path/to/image.jpg" // Replace with actual image source
              sx={{ width: 50, height: 50 }}
            />
            <Button
              variant="contained"
              component="label"
              style={{ borderRadius: "15px", height: "30px" }}
            >
              Add Picture
              <input type="file" hidden />
            </Button>
          </GridItem>
          <GridItem xs={12} style={{ marginTop: 20 }}>
            <GridParent style={{ justifyContent: "space-between" }}>
              <GridItem xs={12} md={6}>
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  value={values.subject}
                  id="subject"
                  onChange={handleChange}
                  placeholder="Enter a short subject explaining the issue."
                  onBlur={handleBlur}
                />
              </GridItem>
            </GridParent>
          </GridItem>
          <GridItem xs={12} style={{ marginTop: 10 }}>
            <GridParent gap={2} style={{ justifyContent: "space-between" }}>
              <GridItem xs={12} md={8}>
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
                />
              </GridItem>
              {/* <GridItem xs={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Dropdown
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Dropdown"
                  >
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <MenuItem value={3}>Option 3</MenuItem>
                  </Select>
                </FormControl>
              </GridItem> */}
            </GridParent>
          </GridItem>
        </GridParent>

        <div
          style={{ marginTop: 10, display: "flex", alignItems: "center" }}
        ></div>
        <div style={{ marginTop: 10 }}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox sx={{ borderRadius: "50%" }} />}
              label="Option 1"
            />
            <FormControlLabel
              control={<Checkbox sx={{ borderRadius: "50%" }} />}
              label="Option 2"
            />
          </FormGroup>
        </div>
        <Divider style={{ marginTop: 20 }} />
        <div
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </GridParent>
  );
};

export default ReportIssue;
