import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import GridParent from "../layout/GridParent";
import GridItem from "../layout/GridItem";
import ImageSlider from "../display/ImageSlider";
import MapComponent from "../display/MapComponent";
import Loading from "../loading/Loading";

// functions
import { generateImageLinks } from "../../functions/imageFunctions";

// icons
import BusinessIcon from "@mui/icons-material/Business";
import SensorDoorOutlinedIcon from "@mui/icons-material/SensorDoorOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";

// styles and themes
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import "./styles.scss";

// redux
import { useGetMaintenanceRequestByIdQuery } from "../../redux/features/maintenanceRequest";

const RequestDetails = ({ isEdit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { requestId } = useParams();
  const navigate = useNavigate();
  const {
    data: maintenanceRequest,
    status,
    error,
  } = useGetMaintenanceRequestByIdQuery(requestId);

  console.log(maintenanceRequest, status, error);

  if (error || status === "failed") {
    return (
      <Alert severity="error">
        Can't seem to load the data at the moment. Try refreshing the page.
      </Alert>
    );
  }

  if (!maintenanceRequest || status === "pending") {
    return <Loading />;
  }

  return (
    <div style={{ padding: "16px" }}>
      {status == "fulfilled" && (
        <GridParent>
          <GridItem
            xs={12}
            style={{
              marginBottom: "16px",
            }}
          >
            <Typography variant="h3">
              Subject: <u>{maintenanceRequest.subject}</u>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <GridParent style={{ marginBottom: "20px" }}>
              <GridItem xs={12} md={6}>
                <Card
                  style={{
                    maxWidth: "1200px",
                    width: "100%",
                    aspectRatio: "10 / 6",
                    margin: "0 auto",
                    borderRadius: "8px",
                  }}
                >
                  <ImageSlider
                    images={generateImageLinks(maintenanceRequest.mediaFiles)}
                  />
                </Card>
              </GridItem>
              <GridItem xs={12} md={6}>
                <CardContent
                  style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ margin: "8px 0" }}>
                    <Typography variant="body1">
                      <u>Provided Description: </u>
                      <br />
                    </Typography>
                    <div
                      style={{
                        backgroundColor: colors.secondary[600],
                        border: "dashed lightgrey 0.5px",
                        padding: "8px",
                        borderRadius: "8px",
                        fontFamily: "Arial, sans-serif",
                        lineHeight: "1.5",
                      }}
                    >
                      {maintenanceRequest.description}
                    </div>
                  </div>
                  <Typography variant="body1">Location: </Typography>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        fontSize: "14px",
                      }}
                    >
                      <BusinessIcon style={{ color: colors.primary[700] }} />
                      <strong>Block: </strong>
                      {maintenanceRequest.location.blockNumber},
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        fontSize: "14px",
                      }}
                    >
                      <SensorDoorOutlinedIcon
                        style={{ color: colors.primary[700] }}
                      />
                      <strong>Room Number: </strong>
                      {maintenanceRequest.location.roomNumber},
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        fontSize: "14px",
                      }}
                    >
                      <PublishOutlinedIcon
                        style={{ color: colors.primary[700] }}
                      />
                      <strong>Floor: </strong>
                      {maintenanceRequest.location.floor}
                    </div>
                  </div>
                </CardContent>
              </GridItem>
            </GridParent>

            <Divider />
            {maintenanceRequest && (
              <div className="more-details">
                <Typography variant="h5" className="title">
                  More Details
                </Typography>
                {/* Requests Card */}
                <div className="request-details-card detail-card">
                  <div className="header">
                    <ArticleOutlinedIcon className="icon" />
                    <p className="title">Request Details</p>
                    <Tooltip title="Priority of Request" placement="top">
                      <div className="priority">1</div>
                    </Tooltip>
                  </div>
                  <Divider />
                  <div className="request-details internal">
                    <div className="top">
                      <p className="desc">Request Type:</p>
                      {maintenanceRequest.maintenanceRequestTypes.length > 0 ? (
                        <div className="types">
                          {maintenanceRequest.maintenanceRequestTypes.map(
                            (type, index) => (
                              <>
                                <Chip
                                  key={index}
                                  label={type.name}
                                  className="chip"
                                />
                              </>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="missing">
                          Type wasn't defined{" "}
                          <QuestionMarkOutlinedIcon className="icon" />
                        </div>
                      )}
                    </div>
                    <div className="second">
                      <p className="desc">Request Status:</p>
                      {maintenanceRequest.requestStatuses.length > 0 ? (
                        <div className="status">
                          {maintenanceRequest.requestStatuses.map(
                            (status, index) =>
                              status.statusType && (
                                <Chip
                                  key={index}
                                  label={status.statusType.name}
                                  className="chip"
                                />
                              )
                          )}
                        </div>
                      ) : (
                        <div className="missing">
                          Status unavailable{" "}
                          <QuestionMarkOutlinedIcon className="icon" />
                        </div>
                      )}
                    </div>
                    <div className="third">
                      <p className="desc">Request Date:</p>
                      <div className="date">
                        {new Date(maintenanceRequest.createdAt).toDateString()}
                      </div>
                    </div>
                    <div className="bottom">
                      <p className="desc">More Details:</p>
                      <Tooltip title="View More Details" placement="bottom">
                        <IconButton
                          onClick={() => {
                            navigate(`more-details`);
                          }}
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                {/* Department & Personnel Card */}
                <div className="personnel-details-card detail-card">
                  <div className="header">
                    <AccountBalanceOutlinedIcon className="icon" />
                    <p className="title">Department & Personnel</p>
                  </div>

                  <Divider />
                  <div className="internal">
                    <div className="department-details">
                      <div>
                        <p className="desc">Department Handling Reuqest:</p>
                        {maintenanceRequest.handlingDepartment ? (
                          <div className="dept"></div>
                        ) : (
                          <div className="missing">
                            Department not assigned{" "}
                            <QuestionMarkOutlinedIcon className="icon" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="personnel-details">
                      <div>
                        <p className="desc">Request Assigned To:</p>
                        {maintenanceRequest.assignedPersons.length > 0 ? (
                          <div className="personnel"></div>
                        ) : (
                          <div className="missing">
                            Personnel not assigned{" "}
                            <QuestionMarkOutlinedIcon className="icon" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Verification Card */}
                <div className="verification-details-card detail-card">
                  <div className="header">
                    <VerifiedOutlinedIcon className="icon" />
                    <p className="title">Verification Details</p>
                  </div>
                  <Divider />
                  <div className="verification-details internal">
                    <div className="top">
                      <p className="desc">Verification Status:</p>
                      {maintenanceRequest.verificationStatus ? (
                        <div className="status">
                          <Chip
                            label={maintenanceRequest.verificationStatus}
                            className="chip"
                            style={{
                              backgroundColor:
                                maintenanceRequest.verificationStatus ===
                                "PASSED"
                                  ? colors.greenAccent[500]
                                  : maintenanceRequest.verificationStatus ===
                                    "FAILED"
                                  ? colors.redAccent[500]
                                  : maintenanceRequest.verificationStatus ===
                                    "PENDING"
                                  ? colors.blueAccent[500]
                                  : colors.secondary[500],
                              color:
                                maintenanceRequest.verificationStatus ===
                                "PASSED"
                                  ? colors.secondary[800]
                                  : maintenanceRequest.verificationStatus ===
                                    "FAILED"
                                  ? colors.redAccent[800]
                                  : maintenanceRequest.verificationStatus ===
                                    "PENDING"
                                  ? colors.secondary[800]
                                  : colors.secondary[100],
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="missing">
                          Not Verified{" "}
                          <QuestionMarkOutlinedIcon className="icon" />
                        </div>
                      )}
                    </div>
                    <div className="middle">
                      <p className="desc">Verified By:</p>
                      {maintenanceRequest.verifiedBy ? (
                        <div className="verifiedBy">
                          <Avatar className="avatar" />
                          <p className="name">
                            {maintenanceRequest.verifiedBy.fullName}
                          </p>
                        </div>
                      ) : (
                        <div className="missing">
                          Not Verified{" "}
                          <QuestionMarkOutlinedIcon className="icon" />
                        </div>
                      )}
                    </div>
                    <div className="bottom">
                      <p className="desc">Date Verified:</p>
                      <div className="date">
                        {maintenanceRequest.verfiedAt ? (
                          new Date(maintenanceRequest.verifiedAt).toDateString()
                        ) : (
                          <div className="missing">
                            Unknown
                            <QuestionMarkOutlinedIcon className="icon" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Confirmation Card */}
                <div className="confirmation-details-card detail-card">
                  <div className="header">
                    <AssignmentTurnedInOutlinedIcon className="icon" />
                    <p className="title">Confirmation Details</p>
                  </div>
                  <Divider />
                  <div className="confirmation-details internal">
                    <div className="top">
                      <p className="desc">Confirmation Status:</p>
                      {maintenanceRequest.confirmationStatus ? (
                        <div className="confirmation">
                          <Chip
                            label={maintenanceRequest.confirmationStatus}
                            className="chip"
                          />
                        </div>
                      ) : (
                        <div className="missing">
                          {" "}
                          Not Confirmed{" "}
                          <QuestionMarkOutlinedIcon className="icon" />
                        </div>
                      )}
                    </div>
                    <div className="middle">
                      <p className="desc">Rating:</p>
                      <div className="rating">
                        {maintenanceRequest.rating ? (
                          maintenanceRequest.rating
                        ) : (
                          <div className="missing">
                            Not Rated{" "}
                            <QuestionMarkOutlinedIcon className="icon" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bottom">
                      <p className="desc">Feedback:</p>
                      {maintenanceRequest.feedback ? (
                        <div className="feedback">
                          {maintenanceRequest.feedback}
                        </div>
                      ) : (
                        <div className="missing">
                          No feedback provided yet
                          <QuestionMarkOutlinedIcon className="icon" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </GridItem>
          <GridItem xs={12}>
            <div
              style={{
                aspectRatio: "4/2",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e0e0e0",
                marginLeft: "10px",
              }}
            >
              <MapComponent
                longitude={"38.80974363813618"}
                latitude={"8.885182374885353"}
                style={{ height: "100%", width: "100%", borderRadius: "8px" }}
              />
            </div>
          </GridItem>
        </GridParent>
      )}
      {status === "pending" && <Loading />}
      {status === "failed" && (
        <Alert severity="error">
          Can't seem to load the data at the moment.
        </Alert>
      )}
    </div>
  );
};

export default RequestDetails;
