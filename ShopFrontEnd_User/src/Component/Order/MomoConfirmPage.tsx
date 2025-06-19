import {useNavigate, useSearchParams} from "react-router";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import Container from "@mui/material/Container";
import {CircularProgress, LinearProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
type transactionInfo={
    orderId:string|null,
    requestId:string|null,
    transactionId:string|null,
}
export default function MomoConfirmPage(){
    // const getQuery:() => { orderId: string | null; requestId: string | null; transactionId: string | null }=()=>{
    //     const order=searchParams.get('orderId')===null?"":searchParams.get('orderId');
    //     const request= searchParams.get('requestId')===null?"":searchParams.get('requestId');
    //     const transaction=searchParams.get('transactionId')===null?"":searchParams.get('transactionId');
    //     return {
    //         orderId:order,
    //         requestId:request,
    //         transactionId:transaction,
    //     }
    // }
    const [searchParams] = useSearchParams();

    const transactionInfo:transactionInfo=
        {
            orderId:searchParams.get('orderId'),
            requestId:searchParams.get('requestId'),
            transactionId:searchParams.get('transId'),
        };

    const checkData:boolean= (transactionInfo.orderId!==null && transactionInfo.requestId!==null && transactionInfo.transactionId!==null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const CONFIRM=useMutation({
        mutationFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Orders/Momo/Confirm`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(transactionInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                navigate("/DonHang");
            }
            else {
                setError(data.errorMessage)
            }
        }
    })
    useEffect(() => {
        if(checkData)
            CONFIRM.mutate()
    }, []);
    return(
        <Container sx={{textAlign:"center",paddingTop:"40px"}} maxWidth={"lg"}>
            {checkData ?
                <>
                    {error.length===0 ?
                        <>
                            <Typography  variant="h4">
                                Xác nhận
                            </Typography>
                            <LinearProgress sx={{marginTop:"10px"}}  />
                        </>
                        :
                        <>
                            <Typography color={'error'}  variant="h4">
                                {error}
                            </Typography>
                            <Button sx={{width:"250px"}} color={"primary"} variant={"contained"} onClick={()=>{
                                setError("")
                                CONFIRM.mutate()
                            }}>Quay về</Button>
                        </>
                    }

                </>
                :
                <>
                    <Typography color={'error'}  variant="h4">
                        Lỗi dữ liệu
                    </Typography>
                    <Button sx={{width:"250px"}} color={"primary"} variant={"contained"} onClick={()=>navigate("/")}>Quay về</Button>
                </>
            }

        </Container>
    )
}