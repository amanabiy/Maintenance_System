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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BuildIcon from "@mui/icons-material/Build";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import Loading from "../../components/loading/Loading";
import { tokens } from "../../theme";
import {
  useGetAllDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentByIdMutation,
  useDeleteDepartmentByIdMutation,
} from "../../redux/features/department";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateDepartment from "../../components/modals/createDepartment";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";

const Departments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentByIdMutation();
  const [deleteDepartment] = useDeleteDepartmentByIdMutation();
  const [title, setTitle] = useState("Create Department");
  const [departmentName, setDepartmentName] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const [id, setId] = useState(0);

  const handleDepartmentCreate = async (departmentName, edit) => {
    if (edit) {
      try {
        const res = await updateDepartment({
          id,
          name: departmentName,
        }).unwrap();
      } catch (err) {
        console.log(err);
      }
      return;
    } else {
      try {
        const res = await createDepartment({ name: departmentName }).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDepartmentDelete = async (deleteId) => {
    try {
      const res = await deleteDepartment(deleteId).unwrap();
    } catch (err) {
      console.log(err);
    }
    setOpenDelete(false);
  };

  const { data: department, error, status } = useGetAllDepartmentsQuery();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Edit Request">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenCreate(true);
                  setTitle("Edit Department");
                  setDepartmentName(params.row.name);
                  setId(params.row.id);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Role">
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

  return (
    <GridParent>
      <GridItem xs={12}>
        {status === "pending" && <Loading />}
        {status === "failed" && (
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
              // padding: "5px",
            }}
            onClick={() => {
              setOpenCreate(true);
              setTitle("Create Department");
              console.log("create department");
            }}
          >
            Create Department
          </button>
          <CreateDepartment
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            onConfirm={handleDepartmentCreate}
            title={title}
            name={departmentName}
          />
        </Box>
        {status === "fulfilled" && department && department.items && (
          <DataTable
            rows={department.items}
            columns={columns}
            title={"All Departments"}
            subTitle={"All Departments in the system."}
          />
        )}
        <DeleteConfirmation
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={() => handleDepartmentDelete(deleteId)}
        />
      </GridItem>
    </GridParent>
  );
};

export default Departments;
