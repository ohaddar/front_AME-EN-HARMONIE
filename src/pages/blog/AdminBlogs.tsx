import { useEffect, useState } from "react";
import DataView from "../../components/common/DataView";
import { Blog } from "../../types/types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useBlog } from "../../hooks/useBlog";
import { useNavigate } from "react-router";
import ApiClient from "../../api/api-client";
const AdminBlogs = () => {
  const { fetchBlogs, blogs, setBlogs } = useBlog();
  const navigate = useNavigate();
  const apiClient = ApiClient();

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
                  onClick={() => handleEdit(params.row.id)}
                  color="primary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleView(params.row.id)}
                  color="info"
                  size="small"
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(params.row.id)}
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

  const handleEdit = (blogId: number | undefined) => {
    if (blogId !== undefined) {
      navigate(`/admin/edit-blog/${blogId}`);
    }
  };

  const handleView = (blogId: number | undefined) => {
    if (blogId) navigate(`/admin/blog-details/${blogId}`);
  };

  const handleDelete = async (blogId: number | undefined) => {
    if (
      blogId &&
      window.confirm("Are you sure you want to delete this blog?")
    ) {
      try {
        const response = await apiClient.delete<Blog>(`/Blogs/${blogId}`);

        if (response.status === 204) {
          setBlogs((prevBlogs: Blog[]) =>
            prevBlogs.filter((blog) => blog.id !== blogId),
          );
        } else {
          console.error("Failed to delete blog");
        }
      } catch (error) {
        console.error("An error occurred while deleting the blog:");
      }
    }
  };

  return (
    <div>
      <h1>Admin Blogs</h1>
      <DataView data={blogs} cols={cols} />
    </div>
  );
};

export default AdminBlogs;
