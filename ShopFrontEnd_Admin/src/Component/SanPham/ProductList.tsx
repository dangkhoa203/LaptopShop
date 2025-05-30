import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { ColDef } from 'ag-grid-community';
import {CircularProgress, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {AgGridReact} from "ag-grid-react";
import {AG_GRID_LOCALE_VN} from "@ag-grid-community/locale";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router";
import {myTheme_mini} from "../../Type/myTheme_mini.ts";
import type { ICellRendererParams } from 'ag-grid-community';
type productData={
    id: string,
    name: string,
    price: number,
    quantity:number,
    isDiscount:boolean,
    priceAfterDiscount:number,
    status:number,
    brandName:string,
}
export default function ProductList(){
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const {data,isPending,refetch}=useQuery({
        queryKey:["product_list"],
        queryFn:async ()=>{
            setSuccess(false)
            const response = await fetch('https://localhost:7075/api/Admin/Products', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            setSuccess(data.success)
            setRowData(data.data)
        }
    }, [data]);

    const [rowData, setRowData] = useState<Array<productData>>([]);

    // @ts-ignore
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { valueGetter:c=>c.data.id,
            headerName:"",filter:false,
            resizable:false,
            unSortIcon: false,flex: 1,
            maxWidth:100,
            minWidth: 100,
            cellStyle:params => {
                return {padding:0};
            },
            floatingFilter: false,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100px",height:"100px",alignItems:"center"}}>
                    <img alt="Thumbnail" width={100} height={100} src={`https://localhost:7075/api/Admin/Product/${params.value}/Thumbnail`}/>
                </div>},

        { valueGetter:c=>c.data.id,
            headerName:"Id",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },

        { valueGetter:c=>c.data.name,
            headerName:"Tên",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },

        { valueGetter:c=>c.data.quantity,
            headerName:"Số lượng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },

        { valueGetter:c=>c.data.price,
            headerName:"Giá",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },

        { valueGetter:c=>c.data.isDiscount,
            headerName:"Đang giảm",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },

        { valueGetter:c=>c.data.priceAfterDiscount,
            headerName:"Giá giảm",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },

        { valueGetter:c=>c.data.status,
            headerName:"Trạng thái",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },

        { valueGetter:c=>c.data.brandName,
            headerName:"Tên hãng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:100,
            floatingFilter: true },
    ]);



    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <p style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Danh sách sản phẩm</p>
            <Button variant={"contained"} onClick={()=>navigate("Tao")}>Tạo sản phẩm mới</Button>
            {isPending?
                <div style={{textAlign:"center"}}>
                    <CircularProgress  size="3rem" />
                </div>
                :
                <>
                    {!success ?
                        <div style={{textAlign:"center"}}>
                            <h2>Lỗi đã xảy ra</h2>
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <Button onClick={()=>refetch()} variant="contained" sx={{fontSize:"1.3em"}}>Tải lại</Button>
                            </div>
                        </div>
                        :
                        <>
                            <div style={{ height: "450px" }}>
                                <AgGridReact
                                    rowHeight={100}
                                    rowData={rowData}
                                    columnDefs={colDefs}
                                    theme={myTheme_mini}
                                    pagination={true}
                                    paginationPageSize={50}
                                    paginationPageSizeSelector={[50,100]}
                                    enableCellTextSelection={true}
                                    ensureDomOrder={true}
                                    suppressDragLeaveHidesColumns={true}
                                    localeText={AG_GRID_LOCALE_VN}
                                />
                            </div>
                        </>
                    }
                </>
            }



        </Container>
    )
}