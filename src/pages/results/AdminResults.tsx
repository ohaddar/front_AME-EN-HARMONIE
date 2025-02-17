import DataView from "../../components/common/DataView";
import { Result } from "../../types/types";
import { Title } from "../users/AdminUsers";
import { useQuestionnaire } from "../../hooks/useQuestionnaire";

const AdminResults = () => {
  const { results, error } = useQuestionnaire();
  const cols: Array<{
    field: string;
    headerName: string;
    width?: string;
    renderCell?: (params: { row: Result }) => JSX.Element;
  }> = [
    { field: "datetime", headerName: "Date et heure", width: "250" },
    {
      field: "user",
      headerName: "Utilisateur",
      width: "250",
      renderCell: (params) => (
        <span>
          {params.row.user.firstname} {params.row.user.lastname}
        </span>
      ),
    },
  ];

  return (
    <>
      <Title>Bilans utilisateurs</Title>
      {error && <div>{error}</div>}

      {results && <DataView data={results} cols={cols} />}
    </>
  );
};
export default AdminResults;
