import React, { useEffect, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  IconButton,
  Tooltip,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
// icons
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FlagIcon from "@mui/icons-material/Flag";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SchemaIcon from "@mui/icons-material/Schema";
// data
import { initialState } from "../../data/mockStateData";
// components
import AboveTableHeader from "../../components/headers/AboveTableHeader";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import ManageRequestStatusTypes from "../../components/modals/ManageRequestStatusTypes";
import CustomNode from "../../components/react-flow-custom/CustomNode";

// redux
import {
  useCreateRequestStatusTypeMutation,
  useDeleteRequestStatusTypeMutation,
  useGetRequestStatusTypesQuery,
  useUpdateRequestStatusTypeByIdMutation,
} from "../../redux/features/requestStatusType";

import { useDispatch } from "react-redux";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";

const ManageWorkFlow = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [type, setType] = useState("fields");
  const [transitionState, setTransitionState] = useState(null);
  const firstX = 0;
  const firstY = 0;
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  // redux
  const dispatch = useDispatch();

  const {
    data: requestStatusTypes,
    error: getRequestStatusTypesError,
    status: getRequestStatusTypesStatus,
  } = useGetRequestStatusTypesQuery();

  const [updateRequestStatusTypeById, updateData] =
    useUpdateRequestStatusTypeByIdMutation();

  const [addRequestStatusType, newData] = useCreateRequestStatusTypeMutation();

  const [deleteRequestStatusType, deleteData] =
    useDeleteRequestStatusTypeMutation();

  //  views

  const [nodes, setNodes] = useState(
    requestStatusTypes?.items?.map((state, index) => ({
      id: state.id.toString(),
      data: { label: state.name, isFirst: state.isInitialStatus },
      position: { x: firstX + 250 * index, y: firstY + 10 * index },
      type: "customNode",
    }))
  );

  const [edges, setEdges] = useState(
    requestStatusTypes?.items?.flatMap((state) =>
      state.allowedTransitions.map((target) => {
        const sourceId = state.id;
        const targetId = target.id;
        const direction = sourceId < targetId ? "forward" : "backward";

        return {
          id: `${state.id}-${target.id}`,
          source: sourceId.toString(),
          target: targetId.toString(),
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          type: "default",
          style: {
            strokeWidth: 2,
            stroke: { backward: "#FF0072", forward: "#00FF72" }[direction],
          },
        };
      })
    )
  );

  useEffect(() => {
    setNodes(
      requestStatusTypes?.items?.map((state, index) => ({
        id: state.id.toString(),
        data: { label: state.name, isFirst: state.isInitialStatus },
        position: { x: firstX + 250 * index, y: firstY + 10 * index },
        type: "customNode",
      }))
    );
    setEdges(
      requestStatusTypes?.items?.flatMap((state) =>
        state.allowedTransitions.map((target) => {
          const sourceId = state.id;
          const targetId = target.id;
          const direction = sourceId < targetId ? "forward" : "backward";

          return {
            id: `${state.id}-${target.id}`,
            source: sourceId.toString(),
            target: targetId.toString(),
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            type: "default",
            style: {
              strokeWidth: 2,
              stroke: { backward: "#FF0072", forward: "#00FF72" }[direction],
            },
          };
        })
      )
    );
  }, [requestStatusTypes]);

  console.log(requestStatusTypes, "requestStatusTypes");
  console.log(nodes, "nodes");
  console.log(edges, "edges");

  const initialValues = {
    name: transitionState?.name || "",
    description: transitionState?.description || "",
    isInitialStatus: transitionState?.isInitialStatus || false,
    hasSchedule: transitionState?.hasSchedule || false,
    needsFile: transitionState?.needsFile || false,
    needsSignatures: transitionState?.needsSignatures || false,
    isInternal: transitionState?.isInternal || false,
    allowChangePriority: transitionState?.allowChangePriority || false,
    allowChangeconfirmationStatus:
      transitionState?.allowChangeconfirmationStatus || false,
    allowChangeverificationStatus:
      transitionState?.allowChangeverificationStatus || false,
    allowsChangeRequestTypes:
      transitionState?.allowsChangeRequestTypes || false,
    allowsForwardToDepartment:
      transitionState?.allowsForwardToDepartment || false,
    allowsForwardToPerson: transitionState?.allowsForwardToPerson || false,
    allowsChangeLocation: transitionState?.allowsChangeLocation || false,
    allowsChangeTitleAndDescription:
      transitionState?.allowsChangeTitleAndDescription || false,
    allowsChangeMedia: transitionState?.allowsChangeMedia || false,
    allowsAddMoreMedia: transitionState?.allowsAddMoreMedia || false,
    allowedRolesIds:
      transitionState?.allowedRoles?.map((role) => role.id) || [],
    allowedTransitions:
      transitionState?.allowedTransitions?.map((state) => state.id) || [],
  };

  const handleOpen = (modalType, state) => {
    setTransitionState(state);
    setType(modalType);
    setOpen(true);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const handleSubmit = async (updatedValues) => {
    console.log(
      updatedValues,
      "updatedValues--------------------------------------------------"
    );
    try {
      const response = await updateRequestStatusTypeById({
        id: transitionState.id,
        body: updatedValues,
      });
      console.log(response, "response");
    } catch (error) {
      console.error(error);
    }
  };

  const addNewRequestStatus = async (newValues) => {
    console.log(newValues, "newValues");

    try {
      const response = await addRequestStatusType(newValues);
      console.log(response, "response");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequestStatus = async (id) => {
    try {
      const response = await deleteRequestStatusType(id);
      console.log(response, "response");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (getRequestStatusTypesStatus === "PENDING") {
    return <Loading />;
  }

  // console.log(initialValues, "initialState");
  console.log(transitionState, "transitionState");
  return (
    <ReactFlowProvider>
      <GridParent>
        <GridItem xs={12} style={{ padding: "16px" }}>
          <AboveTableHeader
            title="Manage Workflow"
            subTitle={"Manage all states and Workflow here"}
          />
        </GridItem>
        <GridItem xs={12} sx={{ paddingLeft: "4px", position: "relative" }}>
          <Button
            endIcon={<AddIcon />}
            variant="outlined"
            style={{ position: "absolute", top: 8, left: 16, zIndex: 2 }}
            size="small"
            onClick={() => handleOpen("new", {})}
          >
            Add Status Type
          </Button>

          <Button
            startIcon={
              workflowOpen ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
            variant="text"
            style={{
              position: "absolute",
              top: 8,
              right: 16,
              display: "flex",
              alignItems: "center",
              height: "fit-content",
              fontSize: "10px",
              zIndex: 2,
            }}
            size="small"
            onClick={() => setWorkflowOpen(!workflowOpen)}
          >
            {workflowOpen ? "Hide Workflow" : "Show Workflow"}
          </Button>
          <div
            style={{
              position: "relative",
              //   border: "solid red 1px",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Current Request Status Types
            </Typography>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                padding: "8px",
                width: "100%",
                overflowY: "auto",
                height: "100%",
                marginTop: "16px",
              }}
            >
              {requestStatusTypes?.items?.length > 0 ? (
                requestStatusTypes.items.map((state) => (
                  <Card
                    key={state.id}
                    sx={{
                      minWidth: "300px",
                      flex: 1,
                      padding: "8px",
                      position: "relative",
                    }}
                  >
                    {state.isInitialStatus ? (
                      <FlagIcon
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          color: "green",
                        }}
                      />
                    ) : (
                      <IconButton
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          color: "red",
                        }}
                      >
                        <DeleteIcon
                          onClick={() => {
                            setTransitionState(state);
                            handleOpenDelete();
                          }}
                        />
                      </IconButton>
                    )}
                    <Typography variant="body1">{state.name}</Typography>
                    <CardContent>
                      <Typography variant="body2">
                        {state.description}
                      </Typography>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          padding: "8px",
                          marginTop: "16px",
                          borderRight: "dashed lightgray 2px",
                          borderLeft: "dashed lightgray 2px",
                        }}
                      >
                        <SettingsSuggestIcon
                          style={{
                            position: "absolute",
                            top: -10,
                            left: -10,
                            backgroundColor: "white",
                          }}
                        />

                        <Button
                          endIcon={<EditNoteIcon />}
                          size="small"
                          style={{ width: "fit-content" }}
                          onClick={() => handleOpen("fields", state)}
                        >
                          Edit Fields
                        </Button>
                        <Button
                          endIcon={<AccountTreeIcon />}
                          size="small"
                          style={{ width: "fit-content" }}
                          onClick={() => handleOpen("transitions", state)}
                        >
                          Manage Transitions
                        </Button>
                        <Button
                          endIcon={<AdminPanelSettingsIcon />}
                          size="small"
                          style={{ width: "fit-content" }}
                          onClick={() => handleOpen("roles", state)}
                        >
                          Manage Roles
                        </Button>

                        <SettingsSuggestIcon
                          style={{
                            position: "absolute",
                            bottom: -10,
                            right: -10,
                            padding: "3px",
                            backgroundColor: "white",
                            transform: "rotate(180deg)",
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body1">No Request Status Types</Typography>
              )}
            </div>
          </div>
        </GridItem>

        {/* WorkFlow Display */}
        {workflowOpen && (
          <GridItem
            xs={12}
            style={{
              padding: "16px",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                height: "90%",
                border: "1px dashed lightgrey",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
              >
                <MiniMap />
                <Controls />
                <Background />
              </ReactFlow>

              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                endIcon={<SchemaIcon />}
                onClick={() => handleOpen("new", {})}
                style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}
              >
                Add New Status Type
              </Button>
            </div>
          </GridItem>
        )}
      </GridParent>

      {/* MODALS */}
      <ManageRequestStatusTypes
        open={open}
        onClose={handleClose}
        type={type}
        transitionState={transitionState}
        initialValues={initialValues}
        onConfirm={type === "new" ? addNewRequestStatus : handleSubmit}
        data={type === "new" ? newData : updateData}
      />
      <DeleteConfirmation
        open={openDelete}
        onClose={handleClose}
        onConfirm={() => deleteRequestStatus(transitionState?.id)}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${transitionState?.name} state?`}
      />
    </ReactFlowProvider>
  );
};

export default ManageWorkFlow;
