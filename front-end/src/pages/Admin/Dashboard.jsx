import React from "react";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import Widget from "../../components/widgets/Widget";
import Featured from "../../components/widgets/Featured";
import LineChart from "../../components/charts/LineChart";

const Dashboard = () => {
  return (
    <GridParent>
      <GridItem
        xs={12}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        <Widget />
        <Widget />
        <Widget />
      </GridItem>
      <GridItem
        xs={12}
        sm={4}
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        <Featured />
      </GridItem>
      <GridItem
        xs={12}
        sm={8}
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        <LineChart />
      </GridItem>
    </GridParent>
  );
};

export default Dashboard;
