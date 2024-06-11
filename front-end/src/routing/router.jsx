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
const RequestDetails = lazy(() =>
  import("../components/commonScenes/RequestDetails.jsx")
);
const MyProfile = lazy(() => import("../pages/Admin/MyProfile"));
const RequestStatusDetails = lazy(() =>
  import("../components/commonScenes/RequestStatusDetails.jsx")
);
const Roles = lazy(() => import("../pages/Admin/Roles"));
const EditUser = lazy(() => import("../pages/Admin/EditUser"));
const CreateUser = lazy(() => import("../pages/Admin/CreateUser"));
const Departments = lazy(() => import("../pages/Admin/Departments"));
const PaymentDetails = lazy(() =>
  import("../components/commonScenes/PaymentDetails")
);
const CreatePayment = lazy(() => import("../pages/Admin/CreatePayment"));

// paths
import { generalPaths, issuerPaths } from "./paths";
import { allPermissions } from "../data/allPermissions.js";
import ErrorBoundary from "./ErrorBoundary.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
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
            <ProtectedRoute requiredPermissions={null} tokenChk={true} />
          </Suspense>
        }
      >
        <Route
          path=""
          element={
            <Suspense fallback={<Loading />}>
              <DashboardLayout />
            </Suspense>
          }
        >
          {/* Stats Admin----------------------------------------- */}
          <Route
            path="admin-dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  requiredPermissions={[allPermissions[35].name]}
                />
              </Suspense>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>
          {/* Users List---------------------------------------------- */}
          <Route
            path="all-users"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  requiredPermissions={[allPermissions[2].name]}
                />
              </Suspense>
            }
          >
            <Route index element={<Users />} />

            <Route
              path="edit/:userId"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute
                    requiredPermissions={[
                      allPermissions[3].name,
                      allPermissions[4].name,
                    ]}
                  />
                </Suspense>
              }
            >
              <Route index element={<EditUser />} />
            </Route>

            <Route
              path="create"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute
                    requiredPermissions={[allPermissions[1].name]}
                  />
                </Suspense>
              }
            >
              <Route index element={<CreateUser />} />
            </Route>
          </Route>
          {/* Financial Transactions----------------------------------------- */}
          <Route
            path="financial-transactions"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  requiredPermissions={[allPermissions[29].name]}
                />
              </Suspense>
            }
          >
            <Route index element={<FinancialTransactions />} />
          </Route>
          {/* All Requests-------------------------------------------------------- */}
          <Route
            path="all-requests"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  requiredPermissions={[allPermissions[12].name]}
                />
              </Suspense>
            }
          >
            <Route index element={<Requests />} />
            <Route
              path="view/:requestId/more-details"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute
                    requiredPermissions={[
                      allPermissions[16].name,
                      allPermissions[17].name,
                    ]}
                  />
                </Suspense>
              }
            >
              <Route index element={<RequestStatusDetails />} />
            </Route>
            <Route
              path="view/:requestId"
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute
                    requiredPermissions={[allPermissions[16].name]}
                  />
                </Suspense>
              }
            >
              <Route index element={<RequestDetails />} />
            </Route>
          </Route>
          {/* My Profile-------------------------------------------------------- */}
          <Route
            path="my-profile"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute />
              </Suspense>
            }
          >
            <Route index element={<MyProfile />} />
          </Route>
          {/* Manage Workflows----------------------------------------------------- */}
          <Route
            path="manage-workflows"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute />
                {/* Remember to add permissions here */}
              </Suspense>
            }
          >
            <Route index element={<ManageWorkFlow />} />
          </Route>
          {/* Roles------------------------------------------------------------- */}
          <Route
            path="roles"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  requiredPermissions={[allPermissions[7].name]}
                />
              </Suspense>
            }
          >
            <Route index element={<Roles />} />
          </Route>
          {/* Departments------------------------------------------------------------ */}
          <Route
            path="departments"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute />
                {/* Remember to add protected permissions */}
              </Suspense>
            }
          >
            <Route index element={<Departments />} />
          </Route>

          {/* Issuer Routes */}
          <Route
            path="report-issue"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  requiredPermissions={[allPermissions[11].name]}
                />
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
                <ProtectedRoute
                  requiredPermissions={[allPermissions[14].name]}
                />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  {/* <DataTable /> */}
                </Suspense>
              }
            />
          </Route>
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
