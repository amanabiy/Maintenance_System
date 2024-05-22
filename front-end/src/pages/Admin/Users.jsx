import React from "react";
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import DataTable from "../../components/tables/DataTable";
import { mockUserData } from "../../data/mockUserData";

const Users = () => {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role" },
    { field: "department", headerName: "Department" },
    { field: "isVerified", headerName: "Verified" },
  ];
  return (
    <GridParent>
      <GridItem xs={12}>
        <DataTable
          rows={mockUserData}
          columns={columns}
          title={"All Users"}
          subTitle={"All users in the system"}
        />
      </GridItem>
    </GridParent>
  );
};

export default Users;
