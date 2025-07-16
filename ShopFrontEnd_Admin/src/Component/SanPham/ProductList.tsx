import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { ColDef } from 'ag-grid-community';
import {CircularProgress, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {AgGridReact} from "ag-grid-react";
import {AG_GRID_LOCALE_VN} from "@ag-grid-community/locale";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router";
import {myTheme} from "../../Type/myTheme.ts";
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
        refetchOnWindowFocus:false,
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
            wrapText:true,
            wrapHeaderText:true,
            headerName:"",filter:false,
            resizable:false,
            unSortIcon: false,flex: 1,
            maxWidth:100,
            minWidth: 100,
            cellStyle:() => {
                return {padding:0};
            },
            floatingFilter: false,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100px",height:"100px",alignItems:"center"}}>
                    <img alt="Thumbnail" width={100} height={100} src={`https://localhost:7075/api/Admin/Product/${params.value}/Thumbnail`}/>
                </div>},

        { valueGetter:c=>c.data.id,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Id",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            floatingFilter: true },

        { valueGetter:c=>c.data.name,
            cellRenderer:(params:ICellRendererParams)=> <Tooltip  sx={{cursor:"pointer"}} title={params.value}>{params.value}</Tooltip> ,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Tên",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            floatingFilter: true },

        { valueGetter:c=>c.data.quantity,
            wrapHeaderText:true,
            headerName:"Số lượng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            wrapText: true,
            floatingFilter: true },

        { valueGetter:c=>c.data.price,
            valueFormatter:c=>c.data.price.toLocaleString(undefined, { minimumFractionDigits: 0 })+" VNĐ",
            wrapHeaderText:true,
            headerName:"Giá",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            wrapText: true,
            minWidth:160,
            floatingFilter: true },

        { valueGetter:c=>c.data.isDiscount,
            wrapHeaderText:true,
            headerName:"Đang giảm",filter:false,
            valueFormatter:(c:any)=>c.value ? "Có":"Không",
            resizable:false,
            unSortIcon: false,flex: 1,
            wrapText: true,
            minWidth:100,
            floatingFilter: false },

        { valueGetter:c=>c.data.priceAfterDiscount,
            valueFormatter:c=>c.data.isDiscount? c.data.priceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 0 })+" VNĐ":"Không giảm",
            wrapHeaderText:true,
            headerName:"Giá giảm",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:160,
            wrapText: true,
            floatingFilter: true },

        { valueGetter:c=>c.data.status,
            wrapHeaderText:true,
            headerName:"Trạng thái",filter:false,
            valueFormatter:(c:any)=>`${c.value===0 ? "Đang bán":"Không bán"}`,
            resizable:false,
            unSortIcon: false,flex: 1,
            minWidth:150,
            wrapText: true,
            floatingFilter: false },

        { valueGetter:c=>c.data.brandName,
            wrapHeaderText:true,
            headerName:"Tên hãng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            wrapText: true,
            floatingFilter: true },
        { valueGetter:c=> c.data.id,
            sortable:false,
            resizable:false,
            flex: 1,
            minWidth:100,
            floatingFilter: true,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100%",height:"100px",alignItems:"center"}}>
                    <Tooltip title="Sửa sản phẩm">
                        <Button size={"small"} color="warning" onClick={()=>navigate(`Sua/${params.value}`)}>Sửa</Button>
                    </Tooltip>
                </div>
            ,
        },
    ]);


    useEffect(()=>{
        document.title="Sản phẩm"
    },[])
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
                                    theme={myTheme}
                                    pagination={true}
                                    paginationPageSize={25}
                                    paginationPageSizeSelector={[25,50]}
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