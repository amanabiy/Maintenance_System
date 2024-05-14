import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import HeaderContainer from "../../components/dashboard/HeaderContainer";
import SidebarContainer from "../../components/dashboard/SidebarContainer";
import SidebarData from "../../components/dashboard/SidebarData";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = { user: { name: "User", role: "user" } }; //useSelector((state) => state.auth.user) for later
  const [sidebarButtons, setSidebarButtons] = useState(SidebarData.user);

  // Adjust sidebarButtons state if needed when user role changes

  return (
    <GridParent style={{ height: "100%", width: "100%" }}>
      {sidebarOpen && (
        <GridItem xs={2} style={{ overflow: "hidden" }}>
          <GridParent style={{ width: "100%" }}>
            <GridItem
              xs={12}
              style={{
                height: "100vh",
                borderRight: "solid grey 1px",
                backgroundColor: "#F9fbfd",
                position: "fixed",
              }}
            >
              <SidebarContainer buttons={sidebarButtons} />
            </GridItem>
          </GridParent>
        </GridItem>
      )}
      <GridItem
        xs={12}
        md={sidebarOpen ? 10 : 12}
        lg={10}
        style={{ height: "100%" }}
      >
        <GridParent style={{ height: "100%" }}>
          <GridItem xs={12} style={{ position: "sticky", top: 0, zIndex: "2" }}>
            <GridItem
              style={{
                backgroundColor: "#F9fbfd",
                borderBottom: "solid grey 1px",
                marginBottom: "10px",
              }}
            >
              <HeaderContainer />
            </GridItem>
          </GridItem>
          <GridItem
            xs={12}
            style={{
              height: "100%",
              padding: "30px",
            }}
          >
            <Outlet /> {/* Nested routes will be rendered here */}
          </GridItem>
        </GridParent>
      </GridItem>
    </GridParent>
  );
};

export default DashboardLayout;
