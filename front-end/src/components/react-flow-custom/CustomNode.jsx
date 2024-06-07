import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: data.isFirst ? "green" : "blue",
        color: "white",
        textAlign: "center",
      }}
    >
      {data.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
