import {useEffect, useState} from "react";
import { ColDef } from 'ag-grid-community';
import Container from "@mui/material/Container";
import {AgGridReact} from "ag-grid-react";
import {AG_GRID_LOCALE_VN} from "@ag-grid-community/locale";
import {myTheme} from "../../Type/myTheme.tsx";
import Button from "@mui/material/Button";
import {useQuery} from "@tanstack/react-query";
import type { ICellRendererParams } from 'ag-grid-community';
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
    CircularProgress,
    Tooltip
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ChangePasswordDiaglog from "./ChangePasswordDiaglog.tsx";
import ChangeEmailDiaglog from "./ChangeEmailDiaglog.tsx";
import IconButton from "@mui/material/IconButton";
import ConfirmAccountDiaglog from "./ConfirmAccountDiaglog.tsx";
type accountData={
    id: string,
    userName: string,
    email: string,
    emailConfirm:boolean,
    registerDate:Date
}
export default function Account(){
    const [passwordChangeModel, setPasswordChangeModel] = useState<any>({id:"",username: ""});
    const [confirmChangeModel, setConfirmChangeModel] = useState<any>({id:"",username: ""});
    const [emailChangeModel, setEmailChangeModel] = useState<any>({id:"",username: "", email: ""});
    const [success, setSuccess] = useState(false);
    const {data,isPending,refetch}=useQuery({
        queryKey:["account_list"],
        queryFn:async ()=>{
            setSuccess(false)
            const response = await fetch('https://localhost:7075/api/Admin/Account', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    const [openPassword, setOpenPassword] = useState(false);

    const handleClickOpenPassword = (id:string,username:string) => {
        setPasswordChangeModel({id:id,username: username});
        setOpenPassword(true);
    };

    const handleClosePassword = () => {
        setPasswordChangeModel({id:"",username: ""});
        setOpenPassword(false);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpenConfirm = (id:string,username:string) => {
        setConfirmChangeModel({id:id,username: username});
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setConfirmChangeModel({id:"",username: ""});
        setOpenConfirm(false);
    };

    const [openEmail, setOpenEmail] = useState(false);
    const handleClickOpenEmail =(id:string,username:string,email:string) => {
        setEmailChangeModel({id:id,username:username,email:email});
        setOpenEmail(true);
    };

    const handleCloseEmail = () => {

        setOpenEmail(false);
    };
    useEffect(() => {
        if(data){
            setSuccess(data.success)
            setRowData(data.data)
        }
    }, [data]);

    const [rowData, setRowData] = useState<Array<accountData>>([]);

    // @ts-ignore
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { valueGetter:c=>c.data.userName,
            headerName:"Tên",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.email,headerName:"Email",
            filter:true,resizable:false,
            unSortIcon: true,
            flex: 1,
            minWidth:140,
            floatingFilter: true },

        { valueGetter:c=> {
                return {
                    id:c.data.id,
                    username:c.data.userName,
                    emailConfirm:c.data.emailConfirm}
            },cellRenderer:(params: ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"100%",height:"100%",alignItems:"center"}}>
                    {params.value.emailConfirm ?
                        <DoneIcon fontSize="large" color={"success"}></DoneIcon>
                        :
                        <Tooltip title="Xác nhận email tài khoản">
                            <IconButton onClick={()=>handleClickOpenConfirm(params.value.id,params.value.username)}>
                                <CloseIcon fontSize="large" color={"error"}></CloseIcon>
                            </IconButton>
                        </Tooltip>
                    }
                </div>
            ,headerName:"Xác nhận",
            filter:false,
            resizable:false,
            unSortIcon: true,
            flex: 1,
            minWidth:140,
            floatingFilter: true },

        { valueGetter:c=>new Date(c.data.registerDate).toLocaleString('En-GB', { hour12: false }),headerName:"Ngày tạo",
            filter:true,resizable:false,unSortIcon: true,flex: 2,minWidth:200,floatingFilter: true },

        { valueGetter:c=> {
            return {
                id:c.data.id,
                username:c.data.userName,
                email:c.data.email
            }
            },
            sortable:false,
            resizable:false,
            flex: 3,
            minWidth:250
            ,floatingFilter: true,
            cellRenderer:(params:ICellRendererParams)=>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"3px",width:"100%",height:"100%",alignItems:"center"}}>
                    <Tooltip title="Cập nhật mật khẩu">
                        <Button color="secondary" onClick={()=>handleClickOpenPassword(params.value.id,params.value.username)}>Đổi mật khẩu</Button>
                    </Tooltip>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Tooltip title="Cập nhật email">
                        <Button color="warning" onClick={()=>handleClickOpenEmail(params.value.id,params.value.username,params.value.email)}>Đổi email</Button>
                    </Tooltip>
                </div>
            ,
        },
    ]);

    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <p style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Danh sách tài khoản</p>
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
                        <div style={{ height: "500px" }}>
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
                        <ConfirmAccountDiaglog username={confirmChangeModel.username} id={confirmChangeModel.id} open={openConfirm} handleClose={handleCloseConfirm} reFetch={refetch}/>
                        <ChangePasswordDiaglog id={passwordChangeModel.id} username={passwordChangeModel.username} open={openPassword} handleClose={handleClosePassword} reFetch={refetch} />
                        <ChangeEmailDiaglog id={emailChangeModel.id} username={emailChangeModel.username} email={emailChangeModel.email} open={openEmail} handleClose={handleCloseEmail} reFetch={refetch} />
                    </>
                    }
                </>
            }
        </Container>
    )
}