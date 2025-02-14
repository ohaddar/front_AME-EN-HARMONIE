import DataView from "../../components/common/DataView";
import { Blog } from "../../types/types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useBlog } from "../../hooks/useBlog";
import { useNavigate } from "react-router";
import { Title } from "../users/AdminUsers";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const { blogs, deleteBlog } = useBlog();

  const cols = [
    { field: "id", headerName: "ID", width: "70" },
    { field: "title", headerName: "Titre", width: "500" },
    { field: "category", headerName: "Catégorie" },
    { field: "creationDate", headerName: "Date de création" },
    {
      field: "actions",
      headerName: "Actions",
      width: "200",
      renderCell: (params: { row: Blog }) => (
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
  ];

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
      await deleteBlog(blogId);
    }
  };

  return (
    <div>
      <Title>Articles</Title>
      <DataView data={blogs} cols={cols} />
    </div>
  );
};

export default AdminBlogs;
