import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import GridParent from "../layout/GridParent";
import GridItem from "../layout/GridItem";
import LeakingPipe1 from "../../assets/images/leakingPipe.jpg";
import LeakingPipe2 from "../../assets/images/leaking-pipe2.webp";
import ImageSlider from "../display/ImageSlider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MapComponent from "../display/MapComponent";
// import Map from "../../components/Map"; // Assuming you have a Map component for displaying the location

const RequestDetails = () => {
  const { requestId } = useParams();

  const maintenanceRequest = {
    createdAt: "2024-05-25T17:45:16.295Z",
    updatedAt: "2024-05-25T17:45:16.295Z",
    subject: "Leaking Pipe",
    description:
      "There is a leak in the pipe in the restroom on the fifth floor.",
    location: {
      createdAt: "2024-05-25T17:45:16.295Z",
      updatedAt: "2024-05-25T17:45:16.295Z",
      blockNumber: "B57",
      floor: 5,
      latitude: 34.0522,
      longitude: -118.2437,
      roomNumber: "204",
      isToilet: true,
    },
    verificationStatus: "PASSED",
    verifiedBy: {
      name: "John Doe",
      role: "Maintenance Supervisor",
    },
    verifiedAt: "2024-05-25T17:45:16.295Z",
    confirmationStatus: "NOT_COMPLETED",
    rating: 4,
    priority: 1,
    feedback: "Fixed in a timely manner.",
    requester: {
      name: "Jane Smith",
      contact: "jane.smith@example.com",
    },
    assignedPersons: ["Mike Johnson", "Emily Davis"],
    maintenanceRequestTypes: ["Plumbing", "Urgent"],
    handlingDepartment: {
      createdAt: "2024-05-25T17:45:16.295Z",
      updatedAt: "2024-05-25T17:45:16.295Z",
      name: "Facilities Management",
    },
    mediaFiles: ["leak_photo1.jpg", "leak_photo2.jpg"],
    requestStatuses: ["Pending", "In Progress", "Completed"],
  };

  return (
    <div style={{ padding: "16px" }}>
      <GridParent>
        <GridItem xs={12} md={7}>
          <Card
            style={{
              maxWidth: "1200px",
              width: "100%",
              aspectRatio: "10 / 6",
              margin: "0 auto",
              borderRadius: "8px",
            }}
          >
            <ImageSlider images={[LeakingPipe1, LeakingPipe2]} />
          </Card>
          <CardContent
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography variant="h3">
              Subject: <u>{maintenanceRequest.subject}</u>
            </Typography>
            <Typography variant="body1" style={{ margin: "8px 0" }}>
              Provided Description:{" "}
              <span>
                <Typography variant="body2">
                  {maintenanceRequest.description}
                </Typography>
              </span>
            </Typography>
            <Typography variant="body1">
              Location:
              <span>
                <Typography variant="body2">
                  <strong>Block: </strong>
                  {maintenanceRequest.location.blockNumber},{" "}
                </Typography>
                <Typography variant="body2">
                  <strong>Room Number: </strong>
                  {maintenanceRequest.location.roomNumber},{" "}
                </Typography>
                <Typography variant="body2">
                  <strong>Floor: </strong>
                  {maintenanceRequest.location.floor}
                </Typography>
              </span>
            </Typography>
            <div>
              <Typography variant="body1">Requester:</Typography>
              <Card
                style={{
                  width: "fit-content",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Avatar style={{ width: "24px", height: "24px" }} />
                <Typography variant="body2">
                  {maintenanceRequest.requester.name}
                </Typography>
                <Tooltip title="View Requester Profile">
                  <IconButton>
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              </Card>
            </div>
          </CardContent>
        </GridItem>
        <GridItem xs={12} md={5}>
          <div
            style={{
              aspectRatio: "1/1.5",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              marginLeft: "10px",
            }}
          >
            <MapComponent
              longitude={maintenanceRequest.location.longitude}
              latitude={maintenanceRequest.location.latitude}
              style={{ height: "100%", width: "100%", borderRadius: "8px" }}
            />
          </div>
        </GridItem>
      </GridParent>
    </div>
  );
};

export default RequestDetails;
