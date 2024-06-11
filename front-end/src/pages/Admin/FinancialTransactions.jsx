"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  Typography,
  Alert,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BuildIcon from "@mui/icons-material/Build";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import Loading from "../../components/loading/Loading";
import { tokens } from "../../theme";
import {
  useGetAllPaymentsQuery,
  useDeletePaymentMutation,
} from "../../redux/features/payment";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";

const FinancialTransactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [deletePayment] = useDeletePaymentMutation();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const {
    data: payments,
    error: paymentError,
    status: paymentStatus,
  } = useGetAllPaymentsQuery();
  console.log(payments, paymentError, paymentStatus);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "createdAt", headerName: "Request Date", flex: 1 },
    {
      field: "fullName",
      headerName: "Paid By",
      flex: 1,
      renderCell: (params) => (
        <div>{params.row.request.requester.fullName}</div>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 1,
    },
    {
      field: "receiptApprovalStatus",
      headerName: "Reciept Approval Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        console.log(params.row.id);
        return (
          <div>
            <Tooltip title="View Request">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`view/${params.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Request">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenDelete(true);
                  setDeleteId(params.row.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleDeletePayment = async (id) => {
    try {
      const res = await deletePayment(id).unwrap();
      console.log(res);
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GridParent>
      <GridItem xs={12}>
        {paymentStatus === "pending" && <Loading />}
        {paymentStatus === "failed" && (
          <Alert severity="error">
            Can't seem to load the data at the moment.
          </Alert>
        )}
        <Box sx={{ position: "relative" }}>
          <button
            style={{
              position: "absolute",
              top: "100px",
              right: "50px",
              fontSize: "15px",
            }}
            onClick={() => {
              navigate("create");
            }}
          >
            Create Payment
          </button>
        </Box>
        {paymentStatus === "fulfilled" && payments && payments.items && (
          <DataTable
            rows={payments.items}
            columns={columns}
            title={"All Financial Transactions"}
            subTitle={"All financial transactions and payments made by users."}
          />
        )}
      </GridItem>
      <DeleteConfirmation
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          handleDeletePayment(deleteId);
        }}
      />
    </GridParent>
  );
};

export default FinancialTransactions;
