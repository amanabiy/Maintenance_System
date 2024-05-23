// import React from "react";
// import {
//   Avatar,
//   Button,
//   Checkbox,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";

// import { useFormik } from "formik";

// // custom components
// import GridParent from "../../components/layout/GridParent";
// import GridItem from "../../components/layout/GridItem";
// import ReusableTextInput from "../../components/form/ReusableTextInput";
// import AboveTableHeader from "../../components/headers/AboveTableHeader";

// // form schema
// import { reportSchema } from "../../schemas";

// // const handleSubmit = () => {
// //   // handle form submission
// //   console.log("Form Submitted");
// // };
// const ReportIssue = () => {
//   const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
//     useFormik({
//       initialValues: {
//         subject: "",
//         description: "",
//       },
//       validationSchema: reportSchema,
//     });
//   return (
//     <GridParent
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f9fbfd",
//         borderRadius: "10px",
//         padding: "60px",
//       }}
//     >
//       <GridItem xs={12}>
//         <AboveTableHeader
//           title="Report Issue"
//           subTitle="Please leave as much description as you can of the issue you are facing."
//         />
//       </GridItem>
//       <form
//         style={{
//           padding: "20px",
//           border: " solid 1px #e0e0e0",
//           borderRadius: "10px",
//           boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
//           width: "100%",
//         }}
//         onSubmit={handleSubmit}
//       >
//         <GridParent>
//           <GridItem
//             xs={12}
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               gap: "15px",
//               alignItems: "center",
//             }}
//           >
//             <Avatar
//               src="/path/to/image.jpg" // Replace with actual image source
//               sx={{ width: 50, height: 50 }}
//             />
//             <Button
//               variant="contained"
//               component="label"
//               style={{ borderRadius: "15px", height: "30px" }}
//             >
//               Add Picture
//               <input type="file" hidden />
//             </Button>
//           </GridItem>
//           <GridItem xs={12} style={{ marginTop: 20 }}>
//             <GridParent style={{ justifyContent: "space-between" }}>
//               <GridItem xs={12} md={6}>
//                 <TextField
//                   label="Subject"
//                   variant="outlined"
//                   fullWidth
//                   value={values.subject}
//                   id="subject"
//                   onChange={handleChange}
//                   placeholder="Enter a short subject explaining the issue."
//                   onBlur={handleBlur}
//                 />
//               </GridItem>
//             </GridParent>
//           </GridItem>
//           <GridItem xs={12} style={{ marginTop: 10 }}>
//             <GridParent gap={2} style={{ justifyContent: "space-between" }}>
//               <GridItem xs={12} md={8}>
//                 <TextField
//                   label="Description"
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   fullWidth
//                   value={values.description}
//                   id="description"
//                   onChange={handleChange}
//                   placeholder="Enter a detailed description of the issue."
//                   onBlur={handleBlur}
//                   required
//                   error={errors.description && touched ? true : false}
//                   helperText={
//                     errors.description && touched ? errors.description : ""
//                   }
//                 />
//               </GridItem>
//               {/* <GridItem xs={3}>
//                 <FormControl variant="outlined" fullWidth>
//                   <InputLabel id="demo-simple-select-outlined-label">
//                     Dropdown
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-outlined-label"
//                     id="demo-simple-select-outlined"
//                     label="Dropdown"
//                   >
//                     <MenuItem value={1}>Option 1</MenuItem>
//                     <MenuItem value={2}>Option 2</MenuItem>
//                     <MenuItem value={3}>Option 3</MenuItem>
//                   </Select>
//                 </FormControl>
//               </GridItem> */}
//             </GridParent>
//           </GridItem>
//         </GridParent>

//         <div
//           style={{ marginTop: 10, display: "flex", alignItems: "center" }}
//         ></div>
//         <div style={{ marginTop: 10 }}>
//           <FormGroup row>
//             <FormControlLabel
//               control={<Checkbox sx={{ borderRadius: "50%" }} />}
//               label="Option 1"
//             />
//             <FormControlLabel
//               control={<Checkbox sx={{ borderRadius: "50%" }} />}
//               label="Option 2"
//             />
//           </FormGroup>
//         </div>
//         <Divider style={{ marginTop: 20 }} />
//         <div
//           style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
//         >
//           <Button variant="contained" color="primary">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </GridParent>
//   );
// };

// export default ReportIssue;
"use client";
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
import AboveTableHeader from "../../components/headers/AboveTableHeader";
import ImageUpload from "../../components/form/ImageUpload";
import { useState } from "react";

// form schema
import { reportSchema } from "../../schemas";

const ReportIssue = () => {
  const [base64Image, setBase64Image] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        subject: "",
        description: "",
        type: "",
        blockNumber: "",
        roomNumber: "",
      },
      validationSchema: reportSchema,
      onSubmit: (values) => {
        // Handle form submission
        console.log("Form Submitted", values);
      },
    });

  return (
    <GridParent
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        borderRadius: "10px",
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
          border: " solid 1px #e0e0e0",
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
              base64Image={base64Image}
              handleFileChange={handleFileChange}
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
              style={{ backgroundColor: "#f9f9f9", height: "40px" }}
            />
          </GridItem>

          <GridItem xs={12} md={6} style={{ marginBottom: 20 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={values.type}
                onChange={handleChange}
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
                value={values.blockNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                id="blockNumber"
                name="blockNumber"
                style={{ height: "40px" }}
              >
                <MenuItem value="B64">B64</MenuItem>
                <MenuItem value="B47">B47</MenuItem>
                <MenuItem value="B57">B57</MenuItem>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={4} md={2} style={{ marginBottom: 20 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Room Number</InputLabel>
              <Select
                label="Room Number"
                value={values.roomNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                id="roomNumber"
                name="roomNumber"
                style={{ height: "40px" }}
              >
                <MenuItem value="R4-005">R4-005</MenuItem>
                <MenuItem value="R1-003">R1-003</MenuItem>
                <MenuItem value="R2-010">R2-010</MenuItem>
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

          <GridItem xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4caf50",
                      "&.Mui-checked": {
                        color: "#4caf50",
                      },
                    }}
                  />
                }
                label="Option 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#f44336",
                      "&.Mui-checked": {
                        color: "#f44336",
                      },
                    }}
                  />
                }
                label="Option 2"
              />
            </FormGroup>
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
