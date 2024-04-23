import { useState } from "react";
import GridParent from "../layout/GridParent";
import GridItem from "../layout/GridItem";
import HeaderContainer from "./HeaderContainer";
import SidebarContainer from "./SidebarContainer";
import HexagonIcon from "@mui/icons-material/Hexagon";

const DashboardContainer = ({ content }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarButtons = [
    {
      text: "Home",
      icon: <HexagonIcon />,
      onClick: () => console.log("Home button clicked"),
    },
    {
      text: "Profile",
      icon: <HexagonIcon />,
      onClick: () => console.log("Profile button clicked"),
    },
    {
      text: "Settings",
      icon: <HexagonIcon />,
      onClick: () => console.log("Settings button clicked"),
    },
  ];
  return (
    <GridParent
      style={{
        height: "100%",
        width: "100%",
        // border: "solid red 2px"
      }}
    >
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
        style={{
          height: "100%",
          // border: "solid red 2px"
        }}
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
            {content}
          </GridItem>
        </GridParent>
      </GridItem>
    </GridParent>
  );
};

export default DashboardContainer;
