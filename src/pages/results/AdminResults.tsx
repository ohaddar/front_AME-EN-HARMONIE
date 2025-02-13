import { useEffect, useState } from "react";
import ApiClient from "../../api/apiClient";
import DataView from "../../components/common/DataView";
import { Result } from "../../types/types";

const AdminResults = () => {
  const apiClient = ApiClient();
  const [results, setResults] = useState<Result[]>([]);
  const [cols, setCols] = useState<
    Array<{
      field: string;
      headerName: string;
      width?: string;
      renderCell?: (params: { row: Result }) => JSX.Element;
    }>
  >([]);

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const response = await apiClient.get<Result[]>("/results/all");
        setResults(response.data);
        setCols([
          { field: "datetime", headerName: "Date et heure", width: "250" },
          { field: "user", headerName: "Utilisateur", width: "250" },
        ]);
      } catch (error) {
        console.error("Error fetching results:", error);
        alert("Access denied. You do not have the required permissions.");
      }
    };

    fetchResultsData();
  }, []);

  return (
    <>
      <h1>Bilans utilisateurs</h1>
      {results && <DataView data={results} cols={cols} />}
    </>
  );
};
export default AdminResults;
