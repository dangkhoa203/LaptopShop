import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { ColDef } from 'ag-grid-community';
import {Alert, CircularProgress, Snackbar, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {AgGridReact} from "ag-grid-react";
import type { ICellRendererParams } from 'ag-grid-community';
import {myTheme} from "../../Type/myTheme.ts";
import {AG_GRID_LOCALE_VN} from "@ag-grid-community/locale";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import {OrderStatus} from "../../Type/OrderStatus.ts";
import {Response} from "../../Type/Respone.ts";
import {useNavigate} from "react-router";
type orderData={
    id: string,
    dateOfOrder: string,
    userName: string,
    status:number ,
}
export default function Order(){
    const [success, setSuccess] = useState(false);
    const [error,setError] = useState("");
    const navigate=useNavigate();



    const {data,isPending,refetch}=useQuery({
        queryKey:["order_list"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Admin/Orders', {
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

    const [rowData, setRowData] = useState<Array<orderData>>([]);

    // @ts-ignore
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { valueGetter:c=>c.data.id,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Mã đơn hàng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>new Date(c.data.dateOfOrder).toLocaleString('En-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit' }),
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Ngày đặt",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },
        { valueGetter:c=>c.data.userName,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Người dùng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },
        { valueGetter:c=>c.data.status,
            valueFormatter:c=>OrderStatus[c.data.status],
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Trạng thái",filter:true,
            cellDataType:"number",
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },
        { valueGetter:c=> {
                return {
                    id:c.data.id,
                    status:c.data.status,
                }
            },
            sortable:false,
            resizable:false,
            flex: 3,
            minWidth:250
            ,floatingFilter: true,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100%",height:"100%",alignItems:"center"}}>
                    <Tooltip title="Chi tiết đơn hàng" placement="left">
                        <Button color="primary"  onClick={()=>navigate(params.value.id)}>Chi tiết</Button>
                    </Tooltip>
                    {params.value.status===1 &&
                        <>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Tooltip title="Xác nhận đơn hàng" placement="right">
                                <Button loading={confirmLoading.includes(params.value.id)} color="warning"  onClick={()=>CONFIRM.mutate({id:params.value.id,status:2})}>Xác nhận</Button>
                            </Tooltip>
                        </>
                    }
                    {params.value.status===2 &&
                        <>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Tooltip title="Chuẩn bị đơn hàng" placement="right">
                                <Button loading={confirmLoading.includes(params.value.id)} color="warning"  onClick={()=>CONFIRM.mutate({id:params.value.id,status:3})}>Chuẩn bị</Button>
                            </Tooltip>
                        </>
                    }
                    {params.value.status===3 &&
                        <>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Tooltip title="Giao đơn hàng" placement="right">
                                <Button loading={confirmLoading.includes(params.value.id)} color="warning"  onClick={()=>CONFIRM.mutate({id:params.value.id,status:4})}>Giao hàng</Button>
                            </Tooltip>
                        </>
                    }
                    {params.value.status===4 &&
                        <>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Tooltip title="Hoàn thành đơn hàng" placement="right">
                                <Button loading={confirmLoading.includes(params.value.id)} color="warning"  onClick={()=>CONFIRM.mutate({id:params.value.id,status:5})}>Hoàn thành</Button>
                            </Tooltip>
                        </>
                    }
                </div>
            ,
        },
    ]);
    const [confirmLoading, setConfirmLoading] = useState<string[]>([]);
    const CONFIRM=useMutation({
        mutationFn:async (info:{id: string, status: number})=>{
            setError("")
            setConfirmLoading([...confirmLoading,info.id])
            const response = await fetch(`https://localhost:7075/api/Admin/Orders`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(info)
            })
            setConfirmLoading(confirmLoading.filter(i=>i!==info.id));
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                refetch()
            }
            else {
                setError(data.errorMessage)
                }
        }
    })
    const openError=error.length>0

    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <p style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Danh sách đơn hàng</p>
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
                        </>
                    }
                    <Snackbar
                        open={openError}
                        autoHideDuration={6000}
                        onClose={()=>setError("")}
                        message={error}
                    >
                        <Alert
                            onClose={()=>setError("")}
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {error}
                        </Alert>
                    </Snackbar>
                </>
            }
        </Container>
    )
}