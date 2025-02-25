import { useEffect, useState } from "react";
import ApiClient from "../../api/apiClient";
import { User } from "../../types/types";
import DataView from "../../components/common/DataView";
import { styled } from "@mui/system";
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
          { field: "id", headerName: "ID", width: "70" },
          { field: "firstname", headerName: "Prénom", width: "100" },
          { field: "lastname", headerName: "Nom", width: "100" },
          { field: "email", headerName: "Email", width: "200" },
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
      <Title>Utilisateurs</Title>
      {users && <DataView data={users} cols={cols} />}
    </>
  );
};
export default AdminUsers;

export const Title = styled("h1")({
  marginBottom: "0.5rem",
  textAlign: "center",
});
