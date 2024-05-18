import HexagonIcon from "@mui/icons-material/Hexagon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Report";
import SummarizeIcon from "@mui/icons-material/Summarize";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { issuerPaths } from "../../routing/paths";

const SidebarData = {
  userButtons: {
    main: [
      {
        text: "Dashboard",
        icon: DashboardIcon,
        path: issuerPaths.USER_DASHBOARD,
      },
    ],
    list: [
      {
        text: "My Reports",
        icon: SummarizeIcon,
        path: issuerPaths.MY_REPORTS,
      },
    ],
    usefull: [
      {
        text: "Report Issue",
        icon: ReportIcon,
        path: issuerPaths.REPORT_ISSUE,
      },
      // {
      //   text: "Notifications",
      //   icon: NotificationsIcon,
      //   path: issuerPaths.NOTIFICATIONS,
      // },
    ],
    user: [
      {
        text: "My Profile",
        icon: AccountCircleIcon,
        path: issuerPaths.MY_PROFILE,
      },
      // {
      //   text: "Settings",
      //   icon: SettingsIcon,
      //   path: issuerPaths.SETTINGS,
      // },
      {
        text: "Log Out",
        icon: LogoutIcon,
        path: "/",
        onclick: () => {
          console.log("Log out");
        },
      },
    ],
  },
};

export default SidebarData;
