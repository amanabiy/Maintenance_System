"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 36,
  p: 4,
};

const EditStatus = ({ open, onClose, onConfirm, title, status, comment }) => {
  const [recieptStatus, setRecieptStatus] = useState("");
  const [recieptComment, setRecieptComment] = useState("");

  useEffect(
    () => {
      setRecieptStatus(status);
      setRecieptComment(comment);
    },
    [status],
    [comment]
  );

  const handleConfirm = () => {
    // if (!departmentName) return;
    // if (title == "Create Department") {
    //   onConfirm(departmentName, false);
    // } else {
    //   onConfirm(departmentName, true);
    // }
    onConfirm(recieptStatus, recieptComment);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-role-title"
      aria-describedby="create-role-description"
    >
      <Box sx={style}>
        <Typography id="create-role-title" variant="h6" component="h2">
          {title}
        </Typography>
        <TextField
          fullWidth
          label="Status"
          variant="outlined"
          margin="normal"
          value={recieptStatus}
          onChange={(e) => setRecieptStatus(e.target.value)}
        />
        <TextField
          fullWidth
          label="Comment"
          variant="outlined"
          margin="normal"
          value={recieptComment}
          onChange={(e) => setRecieptComment(e.target.value)}
        />
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{ mr: 1 }}
          >
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

EditStatus.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  status: PropTypes.string,
  comment: PropTypes.string,
};

EditStatus.defaultProps = {
  title: "Edit Status",
};

export default EditStatus;
