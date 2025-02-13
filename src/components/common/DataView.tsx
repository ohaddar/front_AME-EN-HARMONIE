import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

interface DataViewProps<T> {
  cols: Array<{
    field: string;
    headerName: string;
    width?: string;
    renderCell?: (params: { row: T }) => JSX.Element;
  }>;
  data: T[];
}

const DataView = <T,>({ cols, data }: DataViewProps<T>) => {
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
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DataView;
