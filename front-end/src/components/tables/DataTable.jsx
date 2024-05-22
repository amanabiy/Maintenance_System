import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { mockRequestData } from "../../data/mockRequestData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AboveTableHeader from "../headers/AboveTableHeader";

const DataTable = ({ title, subTitle, rows, columns }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tempColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "requestTitle",
      headerName: "Request Title",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    { field: "requestStatus", headerName: "Request Status", flex: 1 },
    { field: "locationId", headerName: "Location ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: () => (
        <Box>
          <AdminPanelSettingsOutlinedIcon style={{ color: colors.primary }} />
          <LockOpenOutlinedIcon style={{ color: colors.primary }} />
          <SecurityOutlinedIcon style={{ color: colors.primary }} />
        </Box>
      ),
    },
  ];

  console.log(mockRequestData);
  return (
    <Box m="20px">
      <AboveTableHeader title={title} subTitle={subTitle} />
      <Box
        m="40px 0 0 0 "
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          sx={{
            "& .name-column-cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderTop: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.secondary[700],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
