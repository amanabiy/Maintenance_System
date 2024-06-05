import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Loading from "../components/loading/Loading.jsx";
import { adminPaths } from "./paths";

// Lazy loading components
const SignUp = lazy(() => import("../(auth)/SignUp"));
const Login = lazy(() => import("../(auth)/Login"));
const VerifyEmail = lazy(() => import("../(auth)/verify-email"));
const CheckYourEmail = lazy(() => import("../(auth)/CheckYourEmail"));
const VerifyOTP = lazy(() => import("../(auth)/VerifyOTP"));
const ForgotPassword = lazy(() => import("../(auth)/ForgotPassword"));
const ResetPassword = lazy(() => import("../(auth)/ResetPassword"));
const NotAuthorized = lazy(() =>
  import("../components/errorPages/NotAuthorized")
);

// issuer pages
const MyRequests = lazy(() => import("../pages/Issuer/MyRequests"));
const NotFound = lazy(() => import("../components/errorPages/NotFound"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ReportIssue = lazy(() => import("../pages/Issuer/ReportIssue"));
const DataTable = lazy(() => import("../components/tables/DataTable.jsx"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
// admin pages
const AdminDashboard = lazy(() => import("../pages/Admin/Dashboard"));
const FinancialTransactions = lazy(() =>
  import("../pages/Admin/FinancialTransactions")
);
const Users = lazy(() => import("../pages/Admin/Users"));
const Requests = lazy(() => import("../pages/Admin/Requests"));
const ManageWorkFlow = lazy(() => import("../pages/Admin/ManageWorkFlow"));

// paths
import { generalPaths, issuerPaths } from "./paths";
import RequestDetails from "../components/commonScenes/RequestDetails.jsx";
import MyProfile from "../pages/Admin/MyProfile.jsx";
import RequestStatusDetails from "../components/commonScenes/RequestStatusDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="verify-email/:token"
        element={
          <Suspense fallback={<Loading />}>
            <VerifyEmail />
          </Suspense>
        }
      />
      <Route
        path="check-your-email"
        element={
          <Suspense fallback={<Loading />}>
            <CheckYourEmail />
          </Suspense>
        }
      />
      <Route
        path="forgot-password"
        element={
          <Suspense fallback={<Loading />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="verify-otp"
        element={
          <Suspense fallback={<Loading />}>
            <VerifyOTP />
          </Suspense>
        }
      />
      <Route
        path="reset-password"
        element={
          <Suspense fallback={<Loading />}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path="active"
        element={
          <Suspense fallback={<Loading />}>
            <DashboardLayout />
          </Suspense>
        }
      >
        {/* Admin Routes */}
        <Route
          path="admin-dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["ADMIN"]} />
            </Suspense>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route
          path="all-users"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["ADMIN"]} />
            </Suspense>
          }
        >
          <Route index element={<Users />} />
        </Route>
        <Route
          path="financial-transactions"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["ADMIN"]} />
            </Suspense>
          }
        >
          <Route index element={<FinancialTransactions />} />
        </Route>
        <Route
          path="all-requests"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["ADMIN"]} />
            </Suspense>
          }
        >
          <Route index element={<Requests />} />
          <Route
            path="view/:requestId/more-details"
            element={<RequestStatusDetails />}
          />
          <Route path="view/:requestId" element={<RequestDetails />} />
          <Route path="edit/:requestId" element={<RequestDetails />} />
        </Route>
        <Route
          path="admin-profile"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["ADMIN"]} />
            </Suspense>
          }
        >
          <Route index element={<MyProfile />} />
        </Route>
        <Route
          path="manage-workflows"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["ADMIN"]} />
            </Suspense>
          }
        >
          <Route index element={<ManageWorkFlow />} />
        </Route>

        {/* Issuer Routes */}
        <Route
          path="user-dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["STUDENT"]} />
            </Suspense>
          }
        >
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
        <Route
          path="report-issue"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["STUDENT"]} />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <ReportIssue />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="my-reports"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["STUDENT"]} />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>{/* <DataTable /> */}</Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        path="not-authorized"
        element={
          <Suspense fallback={<Loading />}>
            <NotAuthorized />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  )
);

export default router;
