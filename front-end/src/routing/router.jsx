import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Lazy loading components
const SignUp = lazy(() => import("../(auth)/SignUp"));
const Login = lazy(() => import("../(auth)/Login"));
const NotAuthorized = lazy(() =>
  import("../components/errorPages/NotAuthorized")
);
const NotFound = lazy(() => import("../components/errorPages/NotFound"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ReportIssue = lazy(() => import("../pages/Issuer/ReportIssue"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

// paths
import { generalPaths, issuerPaths } from "./paths";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        index
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="active"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardLayout />
          </Suspense>
        }
      >
        <Route
          path="user-dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute requiredRoles={["user"]} />
            </Suspense>
          }
        >
          <Route index element={<div>Dashboard Content</div>} />
        </Route>
        <Route
          path="report-issue"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute requiredRoles={["user"]} />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ReportIssue />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        path="not-authorized"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotAuthorized />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  )
);

export default router;
