import React, { useEffect, useState } from "react";
import { useGetMaintenanceRequestByIdQuery } from "../../redux/features/maintenanceRequest";
import { useGetRequestStatusTypeByIdQuery } from "../../redux/features/requestStatus";
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
import { transformation } from "leaflet";
import TransitionModal from "../modals/TransitionModal";

const RequestStatusDetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentRequestStatusId, setRequestCurrentStatusId] = useState(null);
  const [currentRequestStatus, setCurrentRequestStatus] = useState({});
  const [currentTransitionState, setCurrentTransitionState] = useState({});
  const [transitionModalOpen, setTransitionModalOpen] = useState(false);
  const { requestId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: request,
    error,
    status,
  } = useGetMaintenanceRequestByIdQuery(requestId);
  const requestStatuses = request?.requestStatuses || [];

  const {
    data: currentRequestStatusType,
    status: requestStatus,
    error: requestError,
  } = useGetRequestStatusTypeByIdQuery(currentRequestStatusId, {
    skip: !currentRequestStatusId,
  });

  useEffect(() => {
    if (requestStatuses.length > 0) {
      setRequestCurrentStatusId(requestStatuses[activeStep]?.statusType?.id);
      setCurrentRequestStatus(requestStatuses[activeStep]);
    }
  }, [activeStep, requestStatuses]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setRequestCurrentStatusId(requestStatuses[index]?.statusType?.id);
    setCurrentRequestStatus(requestStatuses[index]);
    console.log("Step clicked", index);
  };
  const handleTransitionModalClose = () => {
    setTransitionModalOpen(false);
  };

  if (error || requestError || status === "failed") {
    console.log("Error", error, requestError);
    return (
      <Alert severity="error">
        Can't seem to load the data at the moment. Try refreshing the page.
      </Alert>
    );
  }

  if (!requestStatuses || requestStatus === "pending" || status === "pending") {
    return <Loading />;
  }

  console.log("Requests", request);
  console.log("current Request Status TYpe", currentRequestStatusType);
  // console.log("Request Statuses", requestStatuses, currentRequestStatusId);
  // console.log("Current Request Status", currentRequestStatusType);
  // console.log("current Reaest status and error", requestStatus, requestError);
  // console.log("current transition state", currentTransitionState);
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
        {currentRequestStatusType && (
          <Box
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Typography variant="h5">
              {currentRequestStatusType.name}
            </Typography>
            <Typography variant="caption">
              {new Date(currentRequestStatusType.updatedAt).toDateString()}
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
                {currentRequestStatusType.externalNote}
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
                {currentRequestStatusType.internalNote}
              </Typography>
            </Box>

            <Box>
              <Button
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={() => {}}
                size="small"
              >
                Download Files
              </Button>
            </Box>

            <Box>
              <Typography variant="h6">Scheduling</Typography>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {currentRequestStatusType.scheduleMaintenanceStartDateTime
                  ? new Date(
                      requestStatuses[
                        activeStep
                      ].scheduleMaintenanceStartDateTime
                    ).toDateString()
                  : "Not Scheduled"}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {currentRequestStatusType.scheduleMaintenanceEndDateTime
                  ? new Date(
                      currentRequestStatusType.scheduleMaintenanceEndDateTime
                    ).toDateString()
                  : "Not Scheduled"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">Signed By</Typography>
              <Typography variant="body1">
                {currentRequestStatusType.signatureByName || "Not Signed"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6">Transition To:</Typography>
              {currentRequestStatusType.allowedTransitions.length > 0 ? (
                currentRequestStatusType.allowedTransitions.map(
                  (transitionState) => {
                    return (
                      <Button
                        key={transitionState.id}
                        variant="contained"
                        onClick={() => {
                          console.log(
                            "Transitioning State to",
                            transitionState.id
                          );
                          setCurrentTransitionState(transitionState);
                          setTransitionModalOpen(true);
                        }}
                        size="small"
                      >
                        {transitionState.name}
                      </Button>
                    );
                  }
                )
              ) : (
                <div>This is a Final State.</div>
              )}
            </Box>

            <Typography variant="caption">
              Most Recent Update:{" "}
              {new Date(currentRequestStatusType.updatedAt).toDateString()}
            </Typography>
          </Box>
        )}
      </GridItem>
      <TransitionModal
        open={transitionModalOpen}
        transitionState={currentTransitionState}
        currentRequest={request}
        currentRequestStatus={currentRequestStatus}
        currentRequestStatusType={currentRequestStatusType}
        onClose={handleTransitionModalClose}
      />
    </GridParent>
  );
};

export default RequestStatusDetails;
