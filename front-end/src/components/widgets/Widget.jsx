import "./style.scss";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { useMaintenanceCostQuery } from "../../redux/features/stats";
import React from "react";
import Summarize from "@mui/icons-material/Summarize";
import People from "@mui/icons-material/People";

const Widget = ({ title, todayCount, percentageChange, link, icon }) => {
  return (
    <div className="widget" style={{ minWidth: "260px" }}>
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">{todayCount}</span>
        <span className="link">{link}</span>
      </div>

      <div
        className="right"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {percentageChange <= 100 && (
          <div
            className="percentage positive"
            style={{ color: percentageChange < 0 ? "red" : "green" }}
          >
            {percentageChange >= 0 && <KeyboardArrowUp />}
            {percentageChange < 0 && (
              <KeyboardArrowDown style={{ color: "red" }} />
            )}
            {Math.abs(percentageChange).toFixed(2)}%
          </div>
        )}
        <div style={{ marginTop: "auto" }}>
          {icon == "requests" && (
            <Summarize style={{ color: "#4e24e1", marginLeft: "50px" }} />
          )}
          {icon == "users" && (
            <People style={{ color: "#4e24e1", marginLeft: "50px" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
