import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Handle, Position } from "reactflow";
import FlagIcon from "@mui/icons-material/Flag";

const CustomNode = ({ data }) => {
  return (
    <Card
      style={{
        width: "300px",
        minHeight: "300px",
        padding: "10px",
        borderRadius: "8px",
        // backgroundColor: data.isFirst ? "green" : "blue",
        color: "black",
        textAlign: "center",
        position: "relative",
      }}
    >
      {data.isFirst && (
        <FlagIcon
          style={{ position: "absolute", top: 4, left: 4, color: "green" }}
        />
      )}

      <Typography variant="h4">
        <strong>{data.label}</strong>
      </Typography>
      <Typography variant="h6">Allowed Roles:</Typography>
      <div style={{ display: "flex", marginTop: "16px", textAlign: "left" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {data.allowedRoles.map((role, index) => (
            <Typography key={index} variant="h6">
              |<i>{role}</i>|
            </Typography>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Top} id={`${data.id}-top`} />
      <Handle
        type="target"
        position={Position.Bottom}
        id={`${data.id}-bottom`}
      />
    </Card>
  );
};

export default CustomNode;
