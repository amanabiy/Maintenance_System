import React from "react";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

const ReportIssue = () => {
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
      }}
    >
      <GridItem
        xs={12}
        style={{
          padding: "20px",
        }}
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
              <GridItem xs={5}>
                <TextField label="First Name" variant="outlined" fullWidth />
              </GridItem>
              <GridItem xs={5}>
                <TextField label="Last Name" variant="outlined" fullWidth />
              </GridItem>
            </GridParent>
          </GridItem>
          <GridItem xs={12} style={{ marginTop: 10 }}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              style={{ marginTop: 10 }}
            />
          </GridItem>
          <GridItem xs={12} style={{ marginTop: 10 }}>
            <GridParent gap={2} style={{ justifyContent: "space-between" }}>
              <GridItem xs={8}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </GridItem>
              <GridItem xs={3}>
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
              </GridItem>
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
      </GridItem>
    </GridParent>
  );
};

export default ReportIssue;
