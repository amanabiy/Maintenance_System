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
  Alert,
} from "@mui/material";
import GridParent from "../layout/GridParent";
import GridItem from "../layout/GridItem";
import ImageSlider from "../display/ImageSlider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MapComponent from "../display/MapComponent";
// import Map from "../../components/Map"; // Assuming you have a Map component for displaying the location

// redux
import { useGetMaintenanceRequestByIdQuery } from "../../redux/features/maintenanceRequest";
import Loading from "../loading/Loading";
import { generateImageLinks } from "../../functions/imageFunctions";

const RequestDetails = () => {
  const { requestId } = useParams();
  const {
    data: maintenanceRequest,
    status,
    error,
  } = useGetMaintenanceRequestByIdQuery(requestId);

  return (
    <div style={{ padding: "16px" }}>
      {status == "fulfilled" && (
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
              <ImageSlider
                images={generateImageLinks(maintenanceRequest.mediaFiles)}
              />
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
                  {/* <Typography variant="body2"> */}
                  {maintenanceRequest.description}
                  {/* </Typography> */}
                </span>
              </Typography>
              <Typography variant="body1">
                Location:
                <span>
                  {/* <Typography variant="body2"> */}
                  <strong>Block: </strong>
                  {maintenanceRequest.location.blockNumber},{" "}
                  {/* </Typography> */}
                  {/* <Typography variant="body2"> */}
                  <strong>Room Number: </strong>
                  {maintenanceRequest.location.roomNumber},{" "}
                  {/* </Typography> */}
                  {/* <Typography variant="body2"> */}
                  <strong>Floor: </strong>
                  {maintenanceRequest.location.floor}
                  {/* </Typography> */}
                </span>
              </Typography>
              {maintenanceRequest.requester && (
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
              )}
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
