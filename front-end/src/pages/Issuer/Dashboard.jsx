import React from "react";
import GridParent from "../../components/layout/GridParent";
import DashboardContainer from "../../components/dashboard/DashboardContainer";
import RequestPage from "./RequestPage";
import MyRequests from "./MyRequests";

const Dashboard = () => {
  return (
    <GridParent>
      <DashboardContainer content={<MyRequests />} />
    </GridParent>
  );
};

export default Dashboard;
