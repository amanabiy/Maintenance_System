import React from "react";
import { Avatar, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { convertToReadableTime } from "../../functions/timeFunctions";
import GridParent from "../layout/GridParent";
import GridItem from "../layout/GridItem";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const ProfileDetails = ({ user }) => {
  return (
    <GridParent>
      <GridItem xs={12} sm={6} md={4} style={{ border: "solid red 1px" }}>
        <Card>
          <div className="top">
            <Tooltip title="Change Profile Picture">
              <button className="change-profile-pic-btn">
                <PhotoCameraIcon />
              </button>
            </Tooltip>

            <Avatar className="avatar"></Avatar>
            <div className="fullname">
              <Typography variant="h6" className="first-name">
                {user.firstName}{" "}
              </Typography>
              <Typography variant="h6" className="last-name">
                {user.lastName}{" "}
              </Typography>
            </div>
            <Typography variant="body2">{user.email}</Typography>
          </div>
          <div className="middle"></div>
        </Card>
      </GridItem>
    </GridParent>
  );
};

export default ProfileDetails;
