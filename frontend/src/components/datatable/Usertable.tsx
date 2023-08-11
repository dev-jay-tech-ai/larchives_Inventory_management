import "./datatable.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userColumns, userRows } from "../../datatablesource/user";
import { CellRenderParams } from "../../types/datatable";

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: CellRenderParams) => {
        return (
          <div className="cellAction">
            <Link to={'/users/test'} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to={'/users/new'} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable