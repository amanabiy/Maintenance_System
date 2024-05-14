import HexagonIcon from "@mui/icons-material/Hexagon";

const SidebarData = {
  user: [
    {
      text: "Home",
      icon: HexagonIcon,
      onClick: () => console.log("Home button clicked"),
    },
    {
      text: "Profile",
      icon: HexagonIcon,
      onClick: () => console.log("Profile button clicked"),
    },
    {
      text: "Settings",
      icon: HexagonIcon,
      onClick: () => console.log("Settings button clicked"),
    },
  ],
};

export default SidebarData;
