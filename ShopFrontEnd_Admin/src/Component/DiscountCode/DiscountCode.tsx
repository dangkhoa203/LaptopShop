import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { ColDef } from 'ag-grid-community';
import {CircularProgress, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {AgGridReact} from "ag-grid-react";
import type { ICellRendererParams } from 'ag-grid-community';
import {myTheme} from "../../Type/myTheme.tsx";
import {AG_GRID_LOCALE_VN} from "@ag-grid-community/locale";
import Container from "@mui/material/Container";

import Divider from "@mui/material/Divider";
import CreateNewDiscountCodeDiaglog from "./CreateNewDiscountCodeDiaglog.tsx";

type brandData={
    id: string,
    name: string,
    tag: string,
    productCount:number ,
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

    const [openDelete, setOpenDelete] = useState(false);
    const [deleteModel, setDeleteModel] = useState({
        id:"",
        name: "",
    });
    const handleClickOpenDelete =(id:string,name:string) => {
        setDeleteModel({
            id:id,
            name: name,
        })
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setDeleteModel({
            id:"",
            name: "",
        })
        setOpenDelete(false);
    };

    const [openUpdate, setOpenUpdate] = useState(false);
    const [updateModel, setUpdateModel] = useState({
        id:"",
        name: "",
        tag:""
    });
    const handleClickOpenUpdate =(id:string,name:string,tag:string) => {
        setUpdateModel({
            id:id,
            name: name,
            tag:tag
        })
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setUpdateModel({
            id:"",
            name: "",
            tag:""
        })
        setOpenUpdate(false);
    };

    const {data,isPending,refetch}=useQuery({
        queryKey:["account_list"],
        queryFn:async ()=>{
            setSuccess(false)
            const response = await fetch('https://localhost:7075/api/Admin/Brands', {
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

    const [rowData, setRowData] = useState<Array<brandData>>([]);

    // @ts-ignore
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { valueGetter:c=>c.data.id,
            headerName:"Id",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.name,
            headerName:"Tên",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.tag,
            headerName:"Tag",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.productCount,
            headerName:"Số sản phẩm",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },
        { valueGetter:c=> {
                return {
                    id:c.data.id,
                    name:c.data.name,
                    tag:c.data.tag,
                    productCount:c.data.productCount
                }
            },
            sortable:false,
            resizable:false,
            flex: 3,
            minWidth:250
            ,floatingFilter: true,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100%",height:"100%",alignItems:"center"}}>
                    <Tooltip title="Xóa hãng">
                        <Button color="secondary" disabled={params.value.productCount>0} onClick={()=>handleClickOpenDelete(params.value.id,params.value.name)}>Xóa hãng</Button>
                    </Tooltip>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Tooltip title="Sửa hãng">
                        <Button color="secondary"  onClick={()=>handleClickOpenUpdate(params.value.id,params.value.name,params.value.tag)}>Sửa hãng</Button>
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
                            <CreateNewDiscountCodeDiaglog open={openCreate} handleClose={handleCloseCreate} reFetch={refetch}/>
                        </>
                    }
                </>
            }



        </Container>
    )
}