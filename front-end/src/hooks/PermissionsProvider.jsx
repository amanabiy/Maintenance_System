import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetRoleByIdMutation } from "../redux/features/role";

// Create the context
const PermissionsContext = createContext();

// Custom hook to use the permissions context
export const usePermissions = () => useContext(PermissionsContext);

// Provider component
export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(
    localStorage.getItem("permissions")
  );
  const roleId = localStorage.getItem("roleId");
  const [fetchRolebyId, { data: roleData, isError, isSuccess }] =
    useGetRoleByIdMutation();

  useEffect(() => {
    // Function to fetch permissions from an API or other source
    const fetchPermissions = async () => {
      const userRole = await fetchRolebyId(roleId);
      const userPermissions = userRole.data.permissions.map(
        (permission) => permission.name
      );
      //   console.log(userPermissions);
      setPermissions(userPermissions);
      localStorage.setItem("permissions", userPermissions);
    };

    // Load permissions from localStorage if available
    fetchPermissions();
    //   console.log("fetchPermissions");

    // Set an interval to check for updates every 5 seconds
    const intervalId = setInterval(fetchPermissions, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
};

// Function to fetch user permissions
const getUserPermissions = async () => {
  // This is a placeholder. Implement your API call here.
  return ["view_dashboard", "edit_profile"];
};
