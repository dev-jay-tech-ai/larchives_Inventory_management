import { GridColDef } from "@mui/x-data-grid";
import { CellRenderParams } from "../types/datatable";
import './product.scss'

export const productColumns: GridColDef[] = [
  { field: "barcode", 
    headerName: "CODE", 
    width: 180,
    renderCell: (params: CellRenderParams) => {
      let barcode = params.row.variants.map((variant) => variant.barcode)
      return barcode && <div className='container'>{barcode?.map((bar: string, idx) => <div key={idx}>{bar}</div>)}</div>
    } 
  },
  { field: "title",
    headerName: "TITLE",
    width: 300,
    renderCell: (params: CellRenderParams) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.title}
        </div>
      );
    }
  },
  { field: "vendor", headerName: "BRAND", width: 100 },
  { field: "colour", headerName: "COLOUR", width: 100,
    renderCell: (params: CellRenderParams) => {
      let color = params.row.variants.map((variant) => variant?.option.split('/')[0])
      return color && <div className='container'>{color?.map((col: string, idx) => <div key={idx}>{col}</div>)}</div>
    }
  },
  { field: "size", headerName: "SIZE", width: 100,
    renderCell: (params: CellRenderParams) => {
      let size = params.row.variants.map((variant) => variant?.option.split('/')[1])
      return size && <div className='container'>{size?.map((s: string, idx) => <div key={idx}>{s}</div>)}</div>
    } 
  },
  { field: "price", headerName: "PRICE", width: 100,
    renderCell: (params: CellRenderParams) => {
      return (<div>{params.row.variants[0].price}</div>);
    } 
  },
  { field: "pricePurchase", headerName: "PRICE PUR", width: 100,
    renderCell: (params: CellRenderParams) => {
      return (<div>{params.row.variants[0].pricePurchase}</div>);
    } 
  },
  { field: "qty", headerName: "QTY", width: 70,
    renderCell: (params: CellRenderParams) => {
      let qty = params.row.variants.map((variant) => variant?.inventory_quantity)
      return qty && <div className='container'>{qty?.map((q: number, idx) => <div key={idx}>{q}</div>)}</div>
    } 
  },
  { field: "qtyShopify", headerName: "QTY SHOPIFY", width: 100,
    renderCell: (params: CellRenderParams) => {
      let qty = params.row.inventories.map((inventory) => inventory?.available);
      return qty && <div className='container'>{qty?.map((q: number, idx) => <div key={idx}>{q}</div>)}</div>
    }  
  },
  { field: "qtySheet", headerName: "QTY SHEET", width: 100,
    renderCell: (params: CellRenderParams) => {
      let qty = params.row.sheetstocks.map((stock) => stock?.countInStock);
      return qty && <div className='container'>{qty?.map((q: number | undefined, idx) => <div key={idx}>{q}</div>)}</div>
    }  
  },
  { field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params: CellRenderParams) => {
      let status = params.row.variants[0].inventory_quantity > 0 ? 'active' : 'passive'
      return (
        <div className={`cellWithStatus ${status}`}>
          {status}
        </div>
      );
    },
  },
];