import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
// custom components
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import SidebarContainer from "../../components/dashboard/SidebarContainer";
import Navbar from "../../components/dashboard/Navbar";
// data
import SidebarData from "../../components/dashboard/SidebarData";
// styles
import "./style.scss";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarType, setSidebarType] = useState("large-sidebar");
  const user = { user: { name: "User", role: "admin" } }; //useSelector((state) => state.auth.user) for later
  const [sidebarButtons, setSidebarButtons] = useState(
    SidebarData.adminButtons
  );

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
        setSidebarType("small-sidebar");
      } else {
        setSidebarOpen(true);
        setSidebarType("large-sidebar");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarType]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  console.log(sidebarOpen);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <GridParent className={"main-dashboard-container"}>
      {sidebarOpen && (
        <SidebarContainer
          ref={sidebarRef}
          buttons={sidebarButtons}
          sidebarOpen={sidebarOpen}
          sidebarType={sidebarType}
        />
      )}

      <GridItem xs={12} className="main">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Outlet /> {/* Nested routes will be rendered here */}
      </GridItem>
    </GridParent>
  );
};

export default DashboardLayout;
