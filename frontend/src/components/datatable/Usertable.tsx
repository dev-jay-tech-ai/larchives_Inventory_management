import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { userColumns } from "../../datatablesource/user";
import { CellRenderParams } from "../../types/datatable";
import { useGetUsersQuery } from "../../hooks/userHooks";
import LoadingBox from "../LoadingBox";
import { MessageBox } from "../MessageBox";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";

const Datatable:React.FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery()
  const usersWithIds = users?.map((user) => ({
    ...user,
    id: user._id, 
  })) ?? [];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: CellRenderParams) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
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

  return isLoading ? <LoadingBox /> :
    error ? <MessageBox>{getError(error as ApiError)}</MessageBox> :  
    (
      <div className="datatable">
        <div className="datatableTitle">
          Users and permissions
          <Link to={'/users/new'} className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={usersWithIds ?? []}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    )
}

export default Datatable