import { useEffect, useState } from "react";
import ApiClient from "../../api/api-client";
import { User } from "../../types/classes/User";
import DataView from "../../components/common/DataView";
const AdminUsers = () => {
  const apiClient = ApiClient();
  const [users, setUsers] = useState<User[]>([]);
  const [cols, setCols] = useState<
    Array<{
      field: string;
      headerName: string;
      width?: string;
      renderCell?: (params: { row: User }) => JSX.Element;
    }>
  >([]);
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await apiClient.get<User[]>("/auth/users");
        setUsers(response.data);
        setCols([
          { field: "id", headerName: "ID", width: "50" },
          { field: "firstName", headerName: "Prénom", width: "100" },
          { field: "lastName", headerName: "Nom", width: "100" },
          { field: "Email", headerName: "Email", width: "200" },
        ]);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Access denied. You do not have the required permissions.");
      }
    };
    fetchUsersData();
  }, []);

  return (
    <>
      <h1>Admin Users</h1>
      {users && <DataView data={users} cols={cols} />}
    </>
  );
};
export default AdminUsers;
