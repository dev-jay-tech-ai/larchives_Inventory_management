import "./datatable.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { productColumns } from "../../datatablesource/product";
import { 
  useGetProductsQuery, 
  useDeleteProductMutation, 
  useDeleteProductsMutation,
  useUpdateProductMutation
 } from "../../hooks/productHooks";
import LoadingBox from "../loading/LoadingBox";
import { MessageBox } from "../MessageBox";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { CellRenderParams } from "../../types/datatable";
import { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useQueryClient } from '@tanstack/react-query'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Datatable = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  const [ selectedProductIds, setSelectedProductIds ] = useState<number[]>([]);
  const [ search, setSearch ] = useState('');

  const productsWithIds = products?.map((product) => ({
    ...product,
    id: product.productId, 
  })) ?? [];

  const updateProductMutation = useUpdateProductMutation()
  const deleteProductMutation = useDeleteProductMutation() // Call the hook to get the mutation function
  const deleteProductsMutation = useDeleteProductsMutation() // Call the hook to get the mutation function
  const queryClient = useQueryClient()

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSelectionChange = async (ids: any) => {
    try {
      setSelectedProductIds(ids);
    } catch (err) {
      throw getError(error as ApiError);
    }
  }

  const handleSelectionDelete = async () => {
    await deleteProductsMutation.mutateAsync(selectedProductIds);
    queryClient.invalidateQueries(['products']);
    // console.log(selectedProductIds)
    try {
      await deleteProductsMutation.mutateAsync(selectedProductIds);
    } catch (err) {
      throw getError(error as ApiError);
    }
  }

  const handleDelete = async (id: number, product: string) => {
    if(window.confirm(`Are you sure you want to delete ${product}`)) {
      try {
        await deleteProductMutation.mutateAsync(id);
        console.log(`Product ${product} deleted!`)
      } catch (err) {
        throw getError(error as ApiError);
      }
    }
  }

  const handleUpdate = async () => {
      try {
        // await updateProductMutation.mutateAsync(id, qty);
        console.log('Updated!')
        
      } catch (err) {
        throw getError(error as ApiError);
      }
   
  }

  const actionColumn:GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: CellRenderParams) => {
        return (
          <div className="cellAction">
            <Link to={'/products/test'} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div 
            className='updateButton'
            onClick={() => {
              console.log(params.row)
              // handleUpdate(params.row.productId, params.row.qty)
            }}
            >Update</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.productId, params.row.title)}
            >Delete
            </div>
          </div>
        );
      },
    },
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Product List
        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between' }}>
          <Link to={'/products/new'} className="link">
          Add New
        </Link>
        <Button>Update</Button>
        <Button onClick={handleSelectionDelete}>Delete</Button>
        </div>
      </div>
      <div style={{ margin: '10px 0' }}>
        <input 
          type='text' 
          placeholder='Search...'  
          className='search' 
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {isLoading ? <LoadingBox />
      : error ? <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
      : 
      <DataGrid
        className="datagrid"
        rows={productsWithIds}
        columns={productColumns.concat(actionColumn)}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
        onSelectionModelChange={(ids) => handleSelectionChange(ids)}
      />
      }
    </div>
  );
};

export default Datatable