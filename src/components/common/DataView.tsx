import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Blog, Feedback, Result } from "src/types/types";
import { User } from "src/types/classes/User";

const paginationModel = { page: 0, pageSize: 5 };

interface DataViewProps {
  cols: Array<{
    field: string;
    headerName: string;
    width?: string;
    renderCell?: (params: { row: Blog }) => JSX.Element;
  }>;
  data: Blog[] | Feedback[] | Result[] | User[];
}

const DataView = ({ cols, data }: DataViewProps) => {
  const rows = data.map((row, index) => ({ id: index + 1, ...row }));
  const columns: GridColDef[] = cols.map((col) => ({
    field: col.field,
    headerName: col.headerName,
    width: Number.parseInt(col.width || "0"),
    flex: col.width === undefined ? 1 : undefined,
    renderCell: col.renderCell,
  }));

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        rowCount={data.length}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
export default DataView;
