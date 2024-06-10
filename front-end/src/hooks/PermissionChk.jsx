import React from "react";
import { usePermissions } from "./PermissionsProvider";

const PermissionChk = ({ requiredPermissions, children }) => {
  const permissions = usePermissions();
  return requiredPermissions.every((permission) =>
    permissions.includes(permission)
  )
    ? children
    : null;
};

export default PermissionChk;
