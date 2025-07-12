import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { ColDef } from 'ag-grid-community';
import {CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";
import {AgGridReact} from "ag-grid-react";
import {myTheme} from "../../Type/myTheme.ts";
import {AG_GRID_LOCALE_VN} from "@ag-grid-community/locale";
import Container from "@mui/material/Container";


type brandData={
    id: string,
    orderId: string,
    transactionId: string,
    userName:string ,
    email:string ,
}
export default function Transaction(){
    const [success, setSuccess] = useState(false);


    const {data,isPending,refetch}=useQuery({
        queryKey:["transaction_list"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Admin/Transactions', {
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
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Id",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.orderId,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Mã đơn hàng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.transactionId,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Mã thanh toán Momo",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.userName,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Nguời dùng",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },

        { valueGetter:c=>c.data.email,
            wrapText:true,
            wrapHeaderText:true,
            headerName:"Email",filter:true,
            resizable:false,
            unSortIcon: true,flex: 2,
            minWidth:200,
            floatingFilter: true },
    ]);



    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <p style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Danh sách thanh toán</p>
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
                </>
            }
        </Container>
    )
}