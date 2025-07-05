import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { ColDef } from 'ag-grid-community';
import {CircularProgress, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {AgGridReact} from "ag-grid-react";
import type { ICellRendererParams } from 'ag-grid-community';
import {myTheme} from "../../Type/myTheme.ts";
import {AG_GRID_LOCALE_VN} from "@ag-grid-community/locale";
import Container from "@mui/material/Container";
import CreateNewDiscountCodeDialog from "./CreateNewDiscountCodeDialog.tsx";
import Typography from "@mui/material/Typography";
import UpdateDiscountCodeDialog from "./UpdateDiscountCodeDialog.tsx";


type discountCodeData={
    id: string,
    name: string,
    description: string,
    percent:number,
    code:string,
    isActive:boolean,
    endDate:Date,
}
export default function DiscountCode(){
    const [success, setSuccess] = useState(false);

    const [openCreate, setOpenCreate] = useState(false);
    const handleClickOpenCreate =() => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };


    const [openUpdate, setOpenUpdate] = useState(false);
    const [updateModel, setUpdateModel] = useState<discountCodeData>({
        id:'',
        name:'',
        description:'',
        percent:1,
        code:'',
        isActive:false,
        endDate:new Date(),
    });
    const handleClickOpenUpdate =(old:discountCodeData) => {
        setUpdateModel(old)
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setUpdateModel({
            ...updateModel,id:""
        })
        setOpenUpdate(false);
    };

    const {data,isPending,refetch}=useQuery({
        queryKey:["discount_list"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            setSuccess(false)
            const response = await fetch('https://localhost:7075/api/Admin/Discount-Codes', {
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

    const [rowData, setRowData] = useState<Array<discountCodeData>>([]);

    // @ts-ignore
    const [colDefs, setColDefs] = useState<ColDef[]>([

        { valueGetter:c=>c.data.id,
            wrapHeaderText:true,
            wrapText:true,
            headerName:"Id",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            floatingFilter: true },

        { valueGetter:c=>c.data.name,
            wrapHeaderText:true,
            wrapText:true,
            headerName:"Tên",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            floatingFilter: true },

        { valueGetter:c=>c.data.code,
            cellRenderer:(params:ICellRendererParams)=> <Tooltip title={params.value} >{params.value}</Tooltip> ,
            wrapHeaderText:true,
            wrapText:true,
            headerName:"Code",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            floatingFilter: true },
        { valueGetter:c=>c.data.description,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{ display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",fontSize:"1em",width:"100%",height:"42px",alignItems:"center"}}>
                    {params.value.length===0? "Không có" :
                        <Tooltip title={params.value} >{params.value}</Tooltip> }
                </div>,
            wrapHeaderText:true,
            wrapText:true,
            headerName:"Mô tả",filter:true,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            floatingFilter: true },

        { valueGetter:c=>c.data.percent,
            wrapHeaderText:true,
            wrapText:true,
            headerName:"Phần trăm",filter:true,
            cellDataType:"number",
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:140,
            floatingFilter: true },

        { valueGetter:c=>new Date(c.data.endDate).toLocaleString('En-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit' }),headerName:"Hạn dùng",
            wrapHeaderText:true,
            wrapText:true,
            filter:true,resizable:false,unSortIcon: true,flex: 1,minWidth:180,floatingFilter: true },

        { valueGetter:c=>c.data.isActive,
            cellDataType: "boolean",
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",fontSize:"1.3em",width:"100%",height:"42px",alignItems:"center"}}>
                    {params.value? <Typography color="success"> Có</Typography>:<Typography color="error">Không</Typography>}
                </div>
            ,
            wrapHeaderText:true,
            wrapText:true,
            headerName:"Hoạt động",filter:false,
            resizable:false,
            unSortIcon: true,flex: 1,
            minWidth:150,
            floatingFilter: true },

        { valueGetter:c=> c.data,
            sortable:false,
            resizable:false,
            minWidth:150
            ,floatingFilter: true,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100%",height:"100%",alignItems:"center"}}>
                    <Tooltip title="Sửa mã giảm giá">
                        <Button color="warning"  onClick={()=>handleClickOpenUpdate(params.value)}>Sửa mã</Button>
                    </Tooltip>
                </div>
            ,
        },
    ]);



    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <p style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Danh sách mã giảm giá</p>
            <Button variant={"contained"} onClick={handleClickOpenCreate}>Tạo mã giảm giá mới</Button>
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
                                    rowData={rowData}
                                    columnDefs={colDefs}
                                    theme={myTheme}
                                    pagination={true}
                                    paginationPageSize={50}
                                    paginationPageSizeSelector={[50,100]}
                                    enableCellTextSelection={true}
                                    ensureDomOrder={true}
                                    suppressDragLeaveHidesColumns={true}
                                    localeText={AG_GRID_LOCALE_VN}
                                />
                            </div>
                            <CreateNewDiscountCodeDialog open={openCreate} handleClose={handleCloseCreate} reFetch={refetch}/>
                            <UpdateDiscountCodeDialog old={updateModel} open={openUpdate} handleClose={handleCloseUpdate} reFetch={refetch}/>
                        </>
                    }
                </>
            }
        </Container>
    )
}