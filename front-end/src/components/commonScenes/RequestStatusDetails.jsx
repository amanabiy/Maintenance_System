import React, { useEffect, useState } from "react";
import { useGetMaintenanceRequestByIdQuery } from "../../redux/features/maintenanceRequest";
import { useGetRequestStatusTypeByIdQuery } from "../../redux/features/requestStatusType";
import { useParams } from "react-router-dom";

import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Alert,
  Button,
  Hidden,
  SvgIcon,
} from "@mui/material";

// styles and themes
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import "./styles.scss";

import Loading from "../loading/Loading";
import GridParent from "../layout/GridParent";
import GridItem from "../layout/GridItem";

import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import NotesIcon from "@mui/icons-material/Notes";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SignatureIcon from "../../assets/icons/signature.svg";
import MediationIcon from "@mui/icons-material/Mediation";

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

  if (!requestStatuses || status === "PENDING") {
    return <Loading />;
  }

  console.log("Requests", request);
  console.log("current Request Status TYpe", currentRequestStatusType);
  console.log("Request Statuses", requestStatuses);
  console.log("Current Request Status", currentRequestStatus);
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
            .slice()
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((status, index) => (
              <Step
                key={index}
                className="step"
                onClick={() => handleStepClick(index)}
                style={{ position: "relative" }}
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
                  <div style={{ position: "absolute", top: 4, left: 4 }}>
                    {index + 1}
                  </div>
                  <Hidden only={["xs", "sm"]}>
                    <Typography variant="overline">
                      {requestStatuses[index].statusType.name}
                    </Typography>
                  </Hidden>
                </StepLabel>
              </Step>
            ))}
        </Stepper>
      </GridItem>
      <GridItem
        xs={10}
        className="details-section"
        style={{ position: "relative" }}
      >
        {requestStatus === "PENDING" || !currentRequestStatus ? (
          <Loading />
        ) : (
          currentRequestStatusType && (
            <div
              style={{
                borderBottom: "dotted 1px lightgrey",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  marginBottom: "16px",
                  borderBottom: "dotted 1px lightgrey",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {currentRequestStatusType.name}
                </Typography>
                <Typography variant="caption">
                  {new Date(currentRequestStatusType.createdAt).toDateString()}
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  // height: "100%",
                }}
              >
                <Box
                  style={{
                    borderBottom: "dashed lightgrey 2px",
                    borderLeft: "dashed lightgrey 2px",
                    borderRadius: "0 8px",
                    position: "relative",
                    padding: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <DateRangeIcon
                    sx={{
                      position: "absolute",
                      fontSize: "24px",
                      bottom: -12,
                      right: -12,
                      backgroundColor: colors.secondary[600],
                    }}
                  />

                  <Box style={{ display: "flex", marginBottom: "8px" }}>
                    <Typography variant="h6">Scheduling</Typography>
                  </Box>
                  <Typography variant="body1">
                    <strong>Start Date:</strong>{" "}
                    {currentRequestStatus.scheduleMaintenanceStartDateTime
                      ? new Date(
                          currentRequestStatus.scheduleMaintenanceStartDateTime
                        ).toDateString()
                      : "Not Scheduled"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>End Date:</strong>{" "}
                    {currentRequestStatus.scheduleMaintenanceEndDateTime
                      ? new Date(
                          currentRequestStatus.scheduleMaintenanceEndDateTime
                        ).toDateString()
                      : "Not Scheduled"}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ maxWidth: "500px" }}>
                <Box>
                  <Typography variant="h6">Comment</Typography>
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
                    {currentRequestStatus.externalNote}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Internal Note</Typography>
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
                    {currentRequestStatus.internalNote}
                  </Typography>
                </Box>
                <Box sx={{ position: "absolute", right: 4, top: 4 }}>
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
                  <Box className="transition-container">
                    <MediationIcon
                      style={{
                        position: "absolute",
                        top: -11,
                        right: 2,
                        backgroundColor: "white",
                      }}
                    />
                    <Typography variant="h6" className="transition-label">
                      Transition To:
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "70px",
                        fontSize: "10px",
                        gap: "4px",
                      }}
                      className="transition-buttons"
                    >
                      {currentRequestStatusType.allowedTransitions.length >
                      0 ? (
                        currentRequestStatusType.allowedTransitions.map(
                          (transitionState) => {
                            return (
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                className="transition-line"
                              >
                                <DoubleArrowIcon style={{ width: "10px" }} />
                                <Button
                                  key={transitionState.id}
                                  variant="text"
                                  onClick={() => {
                                    console.log(
                                      "Transitioning State to",
                                      transitionState.id
                                    );
                                    setCurrentTransitionState(transitionState);
                                    setTransitionModalOpen(true);
                                  }}
                                  size="small"
                                  style={{ fontSize: "8px" }}
                                  className="transition-button"
                                >
                                  {transitionState.name}
                                </Button>
                              </Box>
                            );
                          }
                        )
                      ) : (
                        <div>This is a Final State.</div>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ position: "absolute", bottom: 24, right: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <img src={SignatureIcon} style={{ width: "25px" }}></img>
                  <Typography variant="h6">Signed By</Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    fontFamily: "cursive",
                  }}
                >
                  {currentRequestStatus.signatureByName || "Not Signed"}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                style={{ position: "absolute", bottom: -16, right: 8 }}
              >
                Most Recent Update:{" "}
                {new Date(currentRequestStatusType.updatedAt).toDateString()}
              </Typography>
            </div>
          )
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
