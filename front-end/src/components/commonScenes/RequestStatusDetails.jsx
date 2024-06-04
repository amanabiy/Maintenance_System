import React, { useEffect, useState } from "react";
import { useGetMaintenanceRequestByIdQuery } from "../../redux/features/maintenanceRequest";
import { useParams } from "react-router-dom";

import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Alert,
  Button,
} from "@mui/material";

// styles and themes
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import "./styles.scss";

import Loading from "../loading/Loading";
import GridParent from "../layout/GridParent";
import GridItem from "../layout/GridItem";

import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import GetAppIcon from "@mui/icons-material/GetApp";

const RequestStatusDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { requestId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: requests,
    error,
    status,
  } = useGetMaintenanceRequestByIdQuery(requestId);
  const requestStatuses = requests?.requestStatuses || [];

  console.log("Request Statuses", requestStatuses);

  const handleStepClick = (index) => {
    setActiveStep(index);
    console.log("Step clicked", index);
  };

  if (error || status === "failed") {
    return (
      <Alert severity="error">
        Can't seem to load the data at the moment. Try refreshing the page.
      </Alert>
    );
  }

  if (!requestStatuses || status === "pending") {
    return <Loading />;
  }

  return (
    <GridParent className="request-status-details">
      <GridItem
        xs={12}
        style={{
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Request Status Details</Typography>
      </GridItem>
      <GridItem xs={2} className="steppers-section">
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className="stepper"
        >
          {requestStatuses
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((status, index) => (
              <Step
                key={index}
                className="step"
                onClick={() => handleStepClick(index)}
              >
                <StepLabel
                  className="step-label"
                  StepIconProps={{
                    style: {
                      color:
                        activeStep === index
                          ? colors.primary[600]
                          : colors.primary[200],
                      backgroundColor:
                        activeStep === index
                          ? colors.primary[600]
                          : colors.primary[200],
                      borderRadius: "50%",
                    },
                  }}
                  sx={{
                    "& .MuiStepIcon-text": {
                      display: "none",
                    },
                  }}
                >
                  {requestStatuses.length - index}
                </StepLabel>
              </Step>
            ))}
        </Stepper>
      </GridItem>
      <GridItem xs={10} className="details-section">
        {requestStatuses.length > 0 && (
          <Box>
            <Typography variant="h5">
              {requestStatuses[activeStep].statusType.name}
            </Typography>
            <Typography variant="caption">
              {new Date(requestStatuses[activeStep].updatedAt).toDateString()}
            </Typography>
            <Box>
              <Typography
                variant="body1"
                style={{
                  width: "50%",
                  position: "relative",
                  backgroundColor: colors.secondary[600],
                  border: "dashed lightgrey 0.5px",
                  padding: "8px",
                  margin: "4px 0",
                  borderRadius: "8px",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: "1.5",
                }}
              >
                <EditNoteOutlinedIcon
                  style={{ position: "absolute", top: "0", right: "0" }}
                />
                {requestStatuses[activeStep].externalNote}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  width: "50%",
                  position: "relative",
                  backgroundColor: colors.secondary[600],
                  border: "dashed lightgrey 0.5px",
                  padding: "8px",
                  margin: "4px 0",
                  borderRadius: "8px",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: "1.5",
                }}
              >
                <EditNoteOutlinedIcon
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                />
                {requestStatuses[activeStep].internalNote}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<GetAppIcon />}
              onClick={() => {}}
              size="small"
            >
              Download Files
            </Button>

            <Box>
              <Typography variant="h6">Scheduling</Typography>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {requestStatuses[activeStep].scheduleMaintenanceStartDateTime
                  ? new Date(
                      requestStatuses[
                        activeStep
                      ].scheduleMaintenanceStartDateTime
                    ).toDateString()
                  : "Not Scheduled"}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {requestStatuses[activeStep].scheduleMaintenanceEndDateTime
                  ? new Date(
                      requestStatuses[activeStep].scheduleMaintenanceEndDateTime
                    ).toDateString()
                  : "Not Scheduled"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">Signed By</Typography>
              <Typography variant="body1">
                {requestStatuses[activeStep].signatureByName || "Not Signed"}
              </Typography>
            </Box>

            <Typography variant="caption">
              Most Recent Update:{" "}
              {new Date(requestStatuses[activeStep].updatedAt).toDateString()}
            </Typography>
          </Box>
        )}
      </GridItem>
    </GridParent>
  );
};

export default RequestStatusDetails;
