import { useFeedback } from "../../hooks/useFeedback";
import { Feedback } from "../../types/types";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataView from "../../components/common/DataView";
import { useNavigate } from "react-router";
import { Title } from "../users/AdminUsers";

const AdminFeedback = () => {
  const { feedbacks } = useFeedback();
  const navigate = useNavigate();
  const formattedFeedbacks = feedbacks.map((feedback) => ({
    ...feedback,
    userId: feedback.user?.firstname ?? "N/A",
  }));
  const cols = [
    { field: "id", headerName: "ID", width: "70" },
    { field: "title", headerName: "Titre", width: "300" },
    { field: "content", headerName: "Contenu", width: "500" },
    { field: "publicationDate", headerName: "Date de création", width: "200" },
    { field: "userId", headerName: "Utilisateur", width: "200" },

    {
      field: "actions",
      headerName: "Actions",
      width: "200",
      renderCell: (params: { row: Feedback }) => (
        <div>
          <IconButton
            color="info"
            size="small"
            onClick={() => handleView(params.row.id)}
            data-testid={`view-button-${params.row.id}`}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleView = (feedId: number | undefined) => {
    if (feedId) navigate(`/admin/feedback-details/${feedId}`);
  };
  return (
    <>
      <Title>Retours utilisateurs</Title>
      <DataView data={formattedFeedbacks} cols={cols} />
    </>
  );
};
export default AdminFeedback;
