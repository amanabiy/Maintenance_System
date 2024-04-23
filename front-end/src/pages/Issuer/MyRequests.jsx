import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Paper,
  ListSubheader,
} from "@mui/material";

const MyRequests = () => {
  // Dummy data for demonstration
  const requests = [
    { id: 1, avatar: "/avatar1.jpg", text: "Request 1", status: "Pending" },
    { id: 2, avatar: "/avatar2.jpg", text: "Request 2", status: "Approved" },
    { id: 3, avatar: "/avatar3.jpg", text: "Request 3", status: "Rejected" },
    // Add more requests as needed
  ];

  return (
    <Paper>
      <List>
        {/* List header */}
        <ListSubheader>My Requests</ListSubheader>
        {/* List items */}
        {requests.map((request) => (
          <ListItem key={request.id}>
            <ListItemAvatar>
              <Avatar src={request.avatar} alt="Avatar" />
            </ListItemAvatar>
            <ListItemText
              primary={request.text}
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {request.status}
                </Typography>
              }
            />
            {/* Show status element on the right */}
            <ListItemSecondaryAction>
              <Typography variant="body2" color="textSecondary">
                {request.status}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MyRequests;
