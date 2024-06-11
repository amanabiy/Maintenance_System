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
// const LogoutIcon = React.lazy(() => import("@mui/icons-material/Logout"));

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
import { adminPaths, generalPaths, issuerPaths } from "../../routing/paths";
import { allPermissions } from "../../data/allPermissions";

const SidebarData = {
  adminButtons: {
    main: [
      {
        text: "Dashboard",
        icon: DashboardIcon,
        path: adminPaths.ADMIN_DASHBOARD,
        requiredPermissions: [allPermissions[35].name],
      },
    ],
    list: [
      {
        text: "My Reports",
        icon: SummarizeIcon,
        path: issuerPaths.MY_REPORTS,
        requiredPermissions: [allPermissions[14].name],
      },
      {
        text: "Users",
        icon: PeopleIcon,
        path: adminPaths.USERS,
        requiredPermissions: [allPermissions[2].name],
      },
      {
        text: "Financial Transactions",
        icon: ReceiptLongIcon,
        path: adminPaths.FINANCIAL_TRANSACTIONS,
        requiredPermissions: [allPermissions[29].name],
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
        requiredPermissions: [allPermissions[12].name],
      },
    ],
    usefull: [
      {
        text: "Report Issue",
        icon: ReportIcon,
        path: issuerPaths.REPORT_ISSUE,
        requiredPermissions: [allPermissions[11].name],
      },
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
        requiredPermissions: [allPermissions[7].name],
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
        path: issuerPaths.MY_PROFILE,
      },

      {
        text: "Log Out",
        // icon: LogoutIcon,
        // path: generalPaths.LOGIN,
        // onClick: logoutFunction,
        logout: true,
      },
    ],
  },
};

export default SidebarData;
