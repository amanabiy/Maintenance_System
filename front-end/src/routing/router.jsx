import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import SignUp from "../(auth)/SignUp";
import Login from "../(auth)/Login";
import Dashboard from "../pages/Issuer/Dashboard";

//layouts

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

export default router;
