import { useEffect, useState } from "react";
import { useFeedback } from "../../hooks/useFeedback";
import { Feedback } from "../../types/types";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataView from "../../components/common/DataView";
import { useNavigate } from "react-router";

const AdminFeedback = () => {
  const { feedbacks, fetchFeedbacks } = useFeedback();
  const navigate = useNavigate();

  const [cols, setCols] = useState<
    Array<{
      field: string;
      headerName: string;
      width?: string;
      renderCell?: (params: { row: Feedback }) => JSX.Element;
    }>
  >([]);
  useEffect(() => {
    const fetchBlogsList = async () => {
      try {
        await fetchFeedbacks();

        setCols([
          { field: "id", headerName: "ID", width: "50" },
          { field: "title", headerName: "Titre", width: "300" },
          { field: "content", headerName: "Contenu", width: "500" },
          { field: "publicationDate", headerName: "Date de création" },
          {
            field: "actions",
            headerName: "Actions",
            width: "200",
            renderCell: (params) => (
              <div>
                <IconButton
                  color="info"
                  size="small"
                  onClick={() => handleView(params.row.id)}
                >
                  <VisibilityIcon />
                </IconButton>
              </div>
            ),
          },
        ]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Access denied. You do not have the required permissions.");
      }
    };

    fetchBlogsList();
  }, []);

  const handleView = (feedId: number | undefined) => {
    if (feedId) navigate(`/admin/feedback-details/${feedId}`);
  };
  return (
    <>
      <h1>Admin Feedback</h1>
      <DataView data={feedbacks} cols={cols} />
    </>
  );
};
export default AdminFeedback;
