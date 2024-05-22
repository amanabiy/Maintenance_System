import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Loading from "../components/loading/Loading.jsx";

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
const MyRequests = lazy(() => import("../pages/Issuer/MyRequests"));
const NotFound = lazy(() => import("../components/errorPages/NotFound"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ReportIssue = lazy(() => import("../pages/Issuer/ReportIssue"));
const DataTable = lazy(() => import("../components/tables/DataTable.jsx"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

// paths
import { generalPaths, issuerPaths } from "./paths";

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
        <Route
          path="user-dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["user"]} />
            </Suspense>
          }
        >
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
        <Route
          path="report-issue"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute requiredRoles={["user"]} />
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
              <ProtectedRoute requiredRoles={["user"]} />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <DataTable />
              </Suspense>
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
