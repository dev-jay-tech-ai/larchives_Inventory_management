import { GridColDef } from "@mui/x-data-grid"

interface CellRenderParams {
  row: {
    file: string;
    username: string;  
    email: string;  
    age: number;
    status: 'active' | 'pending';
    isAdmin: boolean
    [key: string]: any;   
  };
}

export const userColumns:GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params: CellRenderParams) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={'/images/'+ params.row.file} alt="avatar" />
          {params.row.name}
        </div>
      );
    }
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "isAdmin",
    headerName: "Permissions",
    width: 150,
    renderCell: (params: CellRenderParams) => {
      return (
        <div>{params.row.isAdmin ? 'Admin' : '' }</div>
      );
    }
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params: CellRenderParams) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
]