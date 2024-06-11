"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Summarize from "@mui/icons-material/Summarize";
import People from "@mui/icons-material/People";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPaymentByIdQuery,
  useChangeStatusMutation,
} from "../../redux/features/payment";
import EditStatus from "../modals/EditStatus";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const paymentId = useParams().paymentId;
  const [open, setOpen] = useState(false);
  const [changeStatus] = useChangeStatusMutation();
  console.log(paymentId);
  const { data: payment, error, status } = useGetPaymentByIdQuery(paymentId);
  console.log(payment, error, status);
  if (status === "pending") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !payment) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          Failed to load payment details.
        </Typography>
      </Box>
    );
  }

  const handleEditStatus = async (status, comment) => {
    try {
      const res = await changeStatus({
        id: paymentId,
        body: { status, comment },
      }).unwrap();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div style={{ margin: 20 }}>
            <Typography variant="h6">Created At: </Typography>
            <Typography style={{ margin: 10 }}>{payment.createdAt}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Amount:
            </Typography>
            <Typography style={{ margin: 10 }}>
              {payment.amount} birr
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Reason:
            </Typography>
            <Typography style={{ margin: 10 }}>{payment.reason}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Payment Method:
            </Typography>
            <Typography style={{ margin: 10 }}>
              {payment.paymentMethod}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Receipt Approval Status:
            </Typography>
            <Typography style={{ margin: 10 }}>
              {payment.receiptApprovalStatus}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <Button
              style={{ border: "1px solid black" }}
              onClick={() => setOpen(true)}
            >
              Change Status
            </Button>
          </Box>
          {payment.additionalInfo && (
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                boxShadow: "5px 5px 10px rgba(78, 36, 225, 0.2)",
                mb: 4,
              }}
            >
              <Typography variant="h6">Additional Info</Typography>
              <Typography>{payment.additionalInfo}</Typography>
            </Paper>
          )}
          {payment.recieptComment && (
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                boxShadow: "5px 5px 10px rgba(78, 36, 225, 0.2)",
              }}
            >
              <Typography variant="h6">Receipt Comment</Typography>
              <Typography>{payment.receiptComment}</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ marginTop: 4, padding: 4 }}>
            <Typography variant="h6" style={{ color: "#4e24e1" }}>
              Paid By:
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    gap: 10,
                    border: "1px solid #4e24e1",
                    backgroundColor: "white",
                    color: "#4e24e1",
                  }}
                  onClick={() => {
                    navigate(
                      `/active/all-users/edit/${payment?.request?.requester?.id}`
                    );
                  }}
                >
                  <AccountCircle />
                  {payment.request.requester.fullName}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 4, padding: 4 }}>
            <Typography variant="h6" style={{ color: "#4e24e1" }}>
              Request:
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    gap: 10,
                    border: "1px solid #4e24e1",
                    backgroundColor: "white",
                    color: "#4e24e1",
                  }}
                  onClick={() => {
                    navigate(
                      `/active/all-requests/view/${payment?.request?.id}`
                    );
                  }}
                >
                  <Summarize />
                  {payment.request.subject}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 4, padding: 4 }}>
            <Typography variant="h6" style={{ color: "#4e24e1" }}>
              Verified By:
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    gap: 10,
                    border: "1px solid #4e24e1",
                    backgroundColor: "white",
                    color: "#4e24e1",
                  }}
                  onClick={() => {
                    navigate(
                      `/active/all-users/edit/${payment?.request?.verifiedBy?.id}`
                    );
                  }}
                >
                  <FaceIcon />
                  {payment.request.verifiedBy.fullName}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 4, padding: 4 }}>
            <Typography variant="h6" style={{ color: "#4e24e1" }}>
              Handling Department:
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    gap: 10,
                    border: "1px solid #4e24e1",
                    backgroundColor: "white",
                    color: "#4e24e1",
                  }}
                >
                  <People />
                  {payment.request.handlingDepartment.name} DEPARTMENT
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <EditStatus
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleEditStatus}
        status={payment.receiptApprovalStatus}
        comment={payment.receiptComment}
      />
    </Box>
  );
};

export default PaymentDetails;
