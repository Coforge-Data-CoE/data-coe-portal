import { FC } from "react";
import { Box } from "@mui/material";
import {
  DataGridProps,
  DataGrid as MuiDataGrid,
  GridColDef,
} from "@mui/x-data-grid";
// import ascending from "../../../assets/images/ascending.svg";
// import descending from "../../../assets/images/descending.svg";
import "./index.scss";
import { v4 as uuidv4 } from "uuid";
/* Column Def */
// const columns: GridColDef<(typeof rows)[number]>[] = [
//   { field: "id", headerName: "ID" },
//   {
//     field: "firstName",
//     headerName: "First name",
//     minWidth: 150,
//   },
// ];

// const rows = [{ id: 1, lastName: "Snow", firstName: "Jon", age: 14 }];

const SortedDescendingIcon = () => {
  return <></> //<img src={descending} height="15" width="15" />;
};

const SortedAscendingIcon = () => {
  return <></> //<img src={ascending} height="15" width="15" />;
};

const DataGrid: FC<DataGridProps> = ({ columns, rows }: DataGridProps) => {
  return (
    <Box sx={{ width: "100%", overflow: "auto" }} className="dq-data-grid">
      <MuiDataGrid
        rows={rows}
        getRowId={() => uuidv4()}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        slots={{
          columnSortedDescendingIcon: SortedDescendingIcon,
          columnSortedAscendingIcon: SortedAscendingIcon,
        }}
      />
    </Box>
  );
};

export default DataGrid;
