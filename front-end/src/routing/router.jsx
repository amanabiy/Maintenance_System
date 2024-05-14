import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import SignUp from "../(auth)/SignUp";
import Login from "../(auth)/Login";
import NotAuthorized from "../components/errorPages/NotAuthorized";
import NotFound from "../components/errorPages/NotFound";

//layouts
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route
          path="test"
          element={<ProtectedRoute requiredRoles={["admin"]} />}
        >
          <Route index element={<div>Test</div>} />
        </Route>
      </Route>
      <Route path="not-authorized" element={<NotAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
