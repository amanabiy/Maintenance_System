import React from "react";
import ProfileDetails from "../../components/commonScenes/ProfileDetails";

const MyProfile = () => {
  const admin = {
    createdAt: "2024-05-26T09:19:21.452Z",
    updatedAt: "2024-05-26T09:19:21.452Z",
    role: {
      createdAt: "2024-05-26T09:19:21.452Z",
      updatedAt: "2024-05-26T09:19:21.452Z",
      roleName: "ADMIN",
    },
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    department: {
      createdAt: "2024-05-26T09:19:21.452Z",
      updatedAt: "2024-05-26T09:19:21.452Z",
      name: "IT",
    },
    isVerified: true,
    lastPasswordUpdatedAt: "2024-05-26T09:19:21.452Z",
    assignedMaintenanceRequests: ["request1", "request2"],
  };

  return (
    <div>
      <ProfileDetails user={admin} />
    </div>
  );
};

export default MyProfile;
