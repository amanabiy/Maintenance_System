import React, { useEffect } from "react";
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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BuildIcon from "@mui/icons-material/Build";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import Loading from "../../components/loading/Loading";
import { tokens } from "../../theme";
import { useGetMaintenanceRequestsQuery } from "../../redux/features/maintenanceRequest";

const Requests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { data: requests, error, status } = useGetMaintenanceRequestsQuery();

  console.log(requests, error, status);
  // const requests = [];
  // const error = null;
  // const status = "succeeded";

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "createdAt", headerName: "Request Date", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    {
      field: "verificationStatus",
      headerName: "Verification Status",
      renderCell: (params) =>
        params.value ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: "5px",
                backgroundColor: colors.greenAccent[500],
              }}
            >
              <DoneAllIcon /> Verified
            </div>
          </div>
        ) : (
          <div style={{ color: colors.redAccent[500] }}>Not Verified</div>
        ),
    },
    {
      field: "confirmationStatus",
      headerName: "Confirmation Status",
      renderCell: (params) =>
        params.value ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: "5px",
                backgroundColor: colors.blueAccent[800],
              }}
            >
              <BuildIcon /> Confirmed
            </div>
          </div>
        ) : (
          "Not Confirmed"
        ),
    },
    {
      field: "location",
      headerName: "Block Number",
      renderCell: (params) => <div>B-{params.value.blockNumber}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
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
            <Tooltip title="Edit Request">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`edit/${params.id}`);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <GridParent>
      <GridItem xs={12}>
        {status === "loading" && <Loading />}
        {status === "failed" && (
          <Alert severity="error">
            Can't seem to load the data at the moment.
          </Alert>
        )}
        {status === "fulfilled" && requests && requests.items && (
          <DataTable rows={requests.items} columns={columns} />
        )}
      </GridItem>
    </GridParent>
  );
};

export default Requests;
