import React from "react";
import { useGetMeQuery } from "../../redux/features/user";
import ProfileDetails from "../../components/commonScenes/ProfileDetails";

const MyProfile = () => {
  const { data, isLoading, error } = useGetMeQuery();
  console.log(data, isLoading, error);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ProfileDetails user={data} />
    </div>
  );
};

export default MyProfile;
