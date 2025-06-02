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
import CreateNewSpecificationDiaglog from "./CreateNewSpecificationDiaglog.tsx";
import UpdateSpecificationDiaglig from "./UpdateSpecificationDiaglig.tsx";
type specificationData={
    id: string,
    name: string,
}
export default function Specification(){
    const [success, setSuccess] = useState(false);

    const [openCreate, setOpenCreate] = useState(false);
    const handleClickOpenCreate =() => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };



    const [openUpdate, setOpenUpdate] = useState(false);
    const [updateModel, setUpdateModel] = useState({
        id:"",
        name: ""
    });
    const handleClickOpenUpdate =(id:string,name:string) => {
        setUpdateModel({
            id:id,
            name: name
        })
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setUpdateModel({
            id:"",
            name: ""
        })
        setOpenUpdate(false);
    };

    const {data,isPending,refetch}=useQuery({
        queryKey:["specification_list"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            setSuccess(false)
            const response = await fetch('https://localhost:7075/api/Admin/Specifications', {
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

    const [rowData, setRowData] = useState<Array<specificationData>>([]);

    // @ts-ignore
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { valueGetter:c=>c.data.id,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Id",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.name,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Tên",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=> {
                return {
                    id:c.data.id,
                    name:c.data.name,
                }
            },
            sortable:false,
            resizable:false,
            flex: 3,
            minWidth:250
            ,floatingFilter: true,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100%",height:"100%",alignItems:"center"}}>
                    <Tooltip title="Sửa hãng">
                        <Button color="warning"  onClick={()=>handleClickOpenUpdate(params.value.id,params.value.name)}>Sửa thông số</Button>
                    </Tooltip>
                </div>
            ,
        },
    ]);



    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <p style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Danh sách thông số</p>
            <Button variant={"contained"} onClick={handleClickOpenCreate}>Tạo thông số mới</Button>
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
                                    localeText={AG_GRID_LOCALE_VN}
                                />
                            </div>
                            <CreateNewSpecificationDiaglog open={openCreate} handleClose={handleCloseCreate} reFetch={refetch}/>
                            <UpdateSpecificationDiaglig id={updateModel.id} name={updateModel.name} open={openUpdate} handleClose={handleCloseUpdate} reFetch={refetch}/>
                        </>
                    }
                </>
            }
        </Container>
    )
}