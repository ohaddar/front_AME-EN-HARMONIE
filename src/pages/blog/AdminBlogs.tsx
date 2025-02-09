import { useEffect, useState } from "react";
import DataView from "../../components/common/DataView";
import { Blog, Feedback, Result } from "../../types/types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { User } from "../../types/classes/User";
import { useBlog } from "../../hooks/useBlog";
const AdminBlogs = () => {
  const { fetchBlogs, blogs } = useBlog();
  const [cols, setCols] = useState<
    Array<{
      field: string;
      headerName: string;
      width?: string;
      renderCell?: (params: { row: Blog }) => JSX.Element;
    }>
  >([]);

  useEffect(() => {
    const fetchBlogsList = async () => {
      try {
        await fetchBlogs();

        setCols([
          { field: "id", headerName: "ID", width: "50" },
          { field: "title", headerName: "Titre", width: "500" },
          { field: "category", headerName: "Catégorie" },
          { field: "creationDate", headerName: "Date de création" },
          {
            field: "actions",
            headerName: "Actions",
            width: "200",
            renderCell: (params) => (
              <div>
                <IconButton
                  onClick={() => handleEdit(params.row)}
                  color="primary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleView(params.row)}
                  color="info"
                  size="small"
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(params.row)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
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
  const handleEdit = (row: Blog | Feedback | Result | User) => {
    console.error("Edit:", row);
  };

  const handleView = (row: Blog | Feedback | Result | User) => {
    console.error("View:", row);
  };

  const handleDelete = (row: Blog | Feedback | Result | User) => {
    console.error("Delete:", row);
  };

  return (
    <div>
      <h1>Admin Blogs</h1>
      <DataView data={blogs} cols={cols} />
    </div>
  );
};

export default AdminBlogs;
