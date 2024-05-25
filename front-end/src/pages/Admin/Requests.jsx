import React from "react";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import { mockRequestData } from "../../data/mockRequestData";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import BuildIcon from "@mui/icons-material/Build";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const Requests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "createdAt", headerName: "Request Date", flex: 1 },
    { field: "Subject", headerName: "Subject", flex: 1 },
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
          <div style={{ color: colors.redAccent[500] }}>Not Verified </div>
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
      field: "blockNumber",
      headerName: "Block Number",
      renderCell: (params) => <div>B-{params.value}</div>,
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
                  // Add your edit user logic here
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
                  // Add your edit user logic here
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
        <DataTable rows={mockRequestData} columns={columns} />
      </GridItem>
    </GridParent>
  );
};

export default Requests;
