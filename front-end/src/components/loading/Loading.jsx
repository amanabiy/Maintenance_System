import React from "react";
import "./style.scss";
import GridParent from "../layout/GridParent";

const Loading = () => {
  return (
    <GridParent
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loader"></div>
    </GridParent>
  );
};

export default Loading;
