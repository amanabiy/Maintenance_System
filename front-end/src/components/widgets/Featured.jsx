import React from "react";
import "./style.scss";
import { Typography } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <Typography variant="h3" className="title">
          Requests
        </Typography>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={60} text={`${60}%`} strokeWidth={3} />
        </div>
        <p className="title">Requests Resolved</p>
        <p className="amount">1234</p>
        <Typography variant="caption" className="desc">
          Number of requests resolved in the past week.
        </Typography>
        {/* <div className="summary">
            <div className="item">
                <div className="itemTitle"></div>
            </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
