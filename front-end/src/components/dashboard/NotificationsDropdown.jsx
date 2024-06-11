import React, { useEffect } from "react";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../../redux/features/notification";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useGetNotificationsForUserQuery } from "../../redux/features/notification";

const NotificationsDropdown = () => {
  const {
    data: notifications = [],
    refetch,
    isLoading,
  } = useGetNotificationsForUserQuery(false);
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (id, requestId) => {
    const res = await markAsRead(id);
    // console.log(res, "Marked as read");
    refetch(false); // Refetch notifications after marking as read
    navigate(`/active/all-requests/view/${requestId}`, { replace: true });
    handleClose();
  };

  const unreadNotifications = notifications.items;

  useEffect(() => {
    refetch(false);
  }, []);

  //   console.log(unreadNotifications, "unreadNotifications");

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={
            unreadNotifications.length === 10
              ? `10+`
              : unreadNotifications.length
          }
          color="error"
        >
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "30ch",
          },
        }}
      >
        {unreadNotifications.length > 0 ? (
          unreadNotifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() =>
                handleNotificationClick(
                  notification.id,
                  notification.maintenanceRequest.id
                )
              }
            >
              <ListItemText
                secondary={notification.message}
                primary={notification.subject}
              />
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <ListItemText primary="No new notifications" />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default NotificationsDropdown;
