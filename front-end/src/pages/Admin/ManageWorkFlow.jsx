import React, { useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider,
  NodeResizer,
  NodeResizeControl,
  NodeToolbar,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  IconButton,
  Tooltip,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
// icons
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FlagIcon from "@mui/icons-material/Flag";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EditNoteIcon from "@mui/icons-material/EditNote";
// data
import { initialState } from "../../data/mockStateData";
// components
import AboveTableHeader from "../../components/headers/AboveTableHeader";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import ManageRequestStatusTypes from "../../components/modals/ManageRequestStatusTypes";

// redux
import {
  useGetRequestStatusTypesQuery,
  useUpdateRequestStatusTypeByIdMutation,
} from "../../redux/features/requestStatusType";

import { useDispatch } from "react-redux";

const ManageWorkFlow = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("fields");
  const [transitionState, setTransitionState] = useState(null);

  const dispatch = useDispatch();

  const {
    data: requestStatusTypes,
    error: getRequestStatusTypesError,
    status: getRequestStatusTypesStatus,
  } = useGetRequestStatusTypesQuery();

  const [updateRequestStatusTypeById, data] =
    useUpdateRequestStatusTypeByIdMutation();

  const [nodes, setNodes] = useState(
    initialState.map((state) => ({
      id: state.id,
      data: { label: state.label, isFirst: state.isFirst },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: "default",
    }))
  );

  const [edges, setEdges] = useState(
    initialState.flatMap((state) =>
      state.transitionTo.map((targetId) => ({
        id: `${state.id}-${targetId}`,
        source: state.id,
        target: targetId,
        animated: true,
        arrowHeadType: "arrowclosed",
        type: "smoothstep",
      }))
    )
  );

  //   const [open, setOpen] = useState(false);
  const [newStateLabel, setNewStateLabel] = useState("");
  //   const { project } = useReactFlow();

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const onNodesChange = (changes) =>
    setNodes((nds) =>
      nds.map((node) => {
        const change = changes.find((change) => change.id === node.id);
        return change ? { ...node, ...change } : node;
      })
    );

  const onEdgesChange = (changes) =>
    setEdges((eds) =>
      eds.map((edge) => {
        const change = changes.find((change) => change.id === edge.id);
        return change ? { ...edge, ...change } : edge;
      })
    );

  const addState = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: newStateLabel, isFirst: false },
      //   position: project({ x: 250, y: 250 }),
    };
    setNodes((nds) => [...nds, newNode]);
    setOpen(false);
    setNewStateLabel("");
  };

  const deleteState = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const handleOpen = (modalType, state) => {
    setTransitionState(state);
    setType(modalType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (updatedValues) => {
    try {
      const response = await updateRequestStatusTypeById({
        id: transitionState.id,
        body: updatedValues,
      });
      console.log(response, "response");
      setTimeout(() => {
        console.log("Request status type updated successfully");
      }),
        400;
      setOpen(false);
    } catch (error) {
      console.error(error);
      setOpen(false);
    }
  };

  if (getRequestStatusTypesStatus === "PENDING") {
    return <Loading />;
  }

  return (
    <ReactFlowProvider>
      <GridParent>
        <GridItem xs={12} style={{ padding: "16px" }}>
          <AboveTableHeader
            title="Manage Workflow"
            subTitle={"Manage all states and Workflow here"}
          />
        </GridItem>
        <GridItem xs={12} md={4} sx={{ paddingLeft: "4px" }}>
          <Button
            endIcon={<AddIcon />}
            variant="outlined"
            style={{ width: "150px", fontSize: "10px" }}
            size="small"
          >
            Add Status Type
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
                flexDirection: "column",
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
                        <DeleteIcon />
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
        {/* <GridItem
          xs={12}
          md={8}
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
              onConnect={onConnect}
              // onNodesChange={onNodesChange}
              // onEdgesChange={onEdgesChange}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background />

              {nodes.map(
                (node) =>
                  !node.data.isFirst && (
                    <Tooltip title="Delete State" key={`delete-${node.id}`}>
                      <IconButton
                        onClick={() => deleteState(node.id)}
                        style={{
                          position: "absolute",
                          left: node.position.x + 145,
                          top: node.position.y + 165,
                          zIndex: 10,
                          borderRadius: "50%",
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )
              )}
            </ReactFlow>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}
            >
              Add New State
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Add New State</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="State Label"
                  fullWidth
                  value={newStateLabel}
                  onChange={(e) => setNewStateLabel(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={addState} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </GridItem> */}
      </GridParent>
      <ManageRequestStatusTypes
        open={open}
        onClose={handleClose}
        type={type}
        transitionState={transitionState}
        onConfirm={handleSubmit}
        data={data}
      />
    </ReactFlowProvider>
  );
};

export default ManageWorkFlow;
