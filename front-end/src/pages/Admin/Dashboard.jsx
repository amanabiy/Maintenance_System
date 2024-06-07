import React, { useState, useEffect } from "react";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import Widget from "../../components/widgets/Widget";
import Featured from "../../components/widgets/Featured";
import AreaChart from "../../components/charts/AreaChart";
import Updates from "../../components/widgets/Updates";
import PieChartt from "../../components/charts/PieChartt";
import { Grid } from "@mui/material";
import BarChart from "../../components/charts/BarChart";
import { useMaintenanceCostQuery } from "../../redux/features/stats";
import { useGetAllUsersQuery } from "../../redux/features/user";
import { useGetMaintenanceRequestsQuery } from "../../redux/features/maintenanceRequest";

const Dashboard = () => {
  const [todayCount, setTodayCount] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { data: users } = useGetAllUsersQuery();
  const { data: maintenanceRequests } = useGetMaintenanceRequestsQuery();
  const [names, setNames] = useState([]);
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    if (users) {
      setTotalUsers(users.total);
    }
  }, [users]);

  useEffect(() => {
    if (maintenanceRequests) {
      const names = maintenanceRequests.items.map(
        (request) => request.requester.fullName
      );
      const subject = maintenanceRequests.items.map(
        (request) => request.subject
      );
      setNames(names);
      setSubject(subject);
    }
  }, [maintenanceRequests]);

  const today = new Date();
  today.setDate(today.getDate());
  const endDate = today.toISOString().split("T")[0];

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const startDate = yesterday.toISOString().split("T")[0];

  const { data, isLoading, error } = useMaintenanceCostQuery({
    startDate,
    endDate,
    groupBy: "DAY",
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      const todayy = new Date().toISOString().split("T")[0];

      const todayData = data?.find((item) => item.period === todayy);
      const todayCount = todayData ? todayData.count : 0;
      setTodayCount(todayCount);

      const yesterData = data?.find((item) => item.period === startDate);
      const yesterCount = yesterData ? yesterData.count : 0;

      function calculatePercentageChange(todayCount, yesterdayCount) {
        if (yesterdayCount === 0) {
          return todayCount === 0 ? 0 : 100;
        }

        const change = todayCount - yesterdayCount;
        const percentageChange = (change / yesterdayCount) * 100;

        return percentageChange;
      }

      const percentageChange = calculatePercentageChange(
        todayCount,
        yesterCount
      );
      setPercentageChange(percentageChange);
    }
  }, [isLoading, error, data, startDate]);

  return (
    <GridParent
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        gap: "100px",
      }}
    >
      <GridItem
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            marginLeft: "30px",
          }}
        >
          <Widget
            title="Maintenance Requests"
            todayCount={todayCount}
            percentageChange={percentageChange}
            link="See all Maintenance Requests"
            icon="requests"
          />
          <Widget
            title="Total Users"
            todayCount={totalUsers}
            percentageChange={101}
            link="See all users"
            icon="users"
          />
        </div>

        <div>
          <Updates names={names} subject={subject} />
        </div>
      </GridItem>

      <GridItem
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <PieChartt />
        </div>
        <div>
          <BarChart />
        </div>
      </GridItem>
    </GridParent>
  );
};

export default Dashboard;
