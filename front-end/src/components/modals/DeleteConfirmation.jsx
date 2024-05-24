import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 36,
  p: 4,
};

const DeleteConfirmation = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      <Box sx={style}>
        <Typography id="delete-confirmation-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
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

DeleteConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

DeleteConfirmation.defaultProps = {
  title: "Confirm Deletion",
  message: "Are you sure you want to delete this item?",
};

export default DeleteConfirmation;
