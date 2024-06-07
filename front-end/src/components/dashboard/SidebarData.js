import React, { Suspense } from "react";

const HexagonIcon = React.lazy(() => import("@mui/icons-material/Hexagon"));
const DashboardIcon = React.lazy(() => import("@mui/icons-material/Dashboard"));
const ReportIcon = React.lazy(() => import("@mui/icons-material/Report"));
const SummarizeIcon = React.lazy(() => import("@mui/icons-material/Summarize"));
const NotificationsIcon = React.lazy(() =>
  import("@mui/icons-material/Notifications")
);
const AccountCircleIcon = React.lazy(() =>
  import("@mui/icons-material/AccountCircle")
);
const SettingsIcon = React.lazy(() => import("@mui/icons-material/Settings"));
const LogoutIcon = React.lazy(() => import("@mui/icons-material/Logout"));

const PeopleIcon = React.lazy(() => import("@mui/icons-material/People"));
const ReceiptLongIcon = React.lazy(() =>
  import("@mui/icons-material/ReceiptLong")
);
const StoreIcon = React.lazy(() => import("@mui/icons-material/Store"));
const BarChartIcon = React.lazy(() => import("@mui/icons-material/BarChart"));
const AccountTreeIcon = React.lazy(() =>
  import("@mui/icons-material/AccountTree")
);
const ManageAccountsIcon = React.lazy(() =>
  import("@mui/icons-material/ManageAccounts")
);
const DomainIcon = React.lazy(() => import("@mui/icons-material/Domain"));
import logoutFunction from "../../functions/logoutFunction";
import { adminPaths, generalPaths, issuerPaths } from "../../routing/paths";

const SidebarData = {
  userButtons: {
    // main: [
    //   {
    //     text: "Dashboard",
    //     icon: DashboardIcon,
    //     path: issuerPaths.USER_DASHBOARD,
    //   },
    // ],
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
        // path: generalPaths.LOGIN,
        onclick: logoutFunction,
      },
    ],
  },
  adminButtons: {
    main: [
      {
        text: "Dashboard",
        icon: DashboardIcon,
        path: adminPaths.ADMIN_DASHBOARD,
      },
    ],
    list: [
      {
        text: "Users",
        icon: PeopleIcon,
        path: adminPaths.USERS,
      },
      {
        text: "Financial Transactions",
        icon: ReceiptLongIcon,
        path: adminPaths.FINANCIAL_TRANSACTIONS,
      },
      {
        text: "Store Transactions",
        icon: StoreIcon,
        path: adminPaths.STORE_TRANSACTIONS,
      },
      {
        text: "Requests",
        icon: SummarizeIcon,
        path: adminPaths.REQUESTS,
      },
    ],
    usefull: [
      {
        text: "Manage Workflows",
        icon: AccountTreeIcon,
        path: adminPaths.MANAGE_WORKFLOWS,
      },
      {
        text: "Generate Report",
        icon: BarChartIcon,
        path: adminPaths.GENERATE_REPORT,
      },
      {
        text: "Manage Roles",
        icon: ManageAccountsIcon,
        path: adminPaths.ROLES,
      },
      {
        text: "Manage Departments",
        icon: DomainIcon,
        path: adminPaths.DEPARTMENTS,
      },
    ],
    user: [
      {
        text: "My Profile",
        icon: AccountCircleIcon,
        path: adminPaths.MY_PROFILE,
      },

      {
        text: "Log Out",
        icon: LogoutIcon,
        // path: generalPaths.LOGIN,
        onclick: logoutFunction,
      },
    ],
  },
};

export default SidebarData;
