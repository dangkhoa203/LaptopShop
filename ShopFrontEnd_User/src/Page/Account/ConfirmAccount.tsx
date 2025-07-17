import { useParams, useNavigate } from "react-router";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export default function ConfirmAccount() {
    const navigate=useNavigate()
    const { username, code } = useParams()
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Account/ConfirmAccount/${username}/${code}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setSuccess(true)
            }
            else {
                setError(data.errorMessage)
            }
        }
    })

    useEffect(()=>{
        document.title = 'Xác nhận';
        mutate()
    },[])
    return (
        <>
            {isPending ?
                <Box sx={{minHeight:"80vh",display:"flex",justifyContent:"center"}}>
                    <div style={{display:"flex",flexDirection:"column",margin:"auto", justifyContent:"center"}}>
                        <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
                            <CircularProgress sx={{textAlign:"center"}} size="3rem" />
                        </div>
                        <Typography textAlign={"center"} variant={"h4"}>Xác nhận tài khoản</Typography>
                    </div>
                </Box>
                :
                <Box>
                    {success ?
                        <Box sx={{minHeight:"80vh",display:"flex",justifyContent:"center"}}>
                            <div style={{display:"flex",flexDirection:"column",margin:"auto", justifyContent:"center"}}>
                                <Typography textAlign={"center"} color={"success"} variant={"h4"}>Tài khoản xác nhận thành công</Typography>
                                <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                    <Button onClick={()=>navigate("/")} variant={"contained"} color="success">Quay về trang chủ</Button>
                                </div>
                            </div>
                        </Box>
                        :
                        <Box sx={{minHeight:"80vh",display:"flex",justifyContent:"center"}}>
                            <div style={{display:"flex",flexDirection:"column",margin:"auto", justifyContent:"center"}}>
                                <Typography textAlign={"center"} color={"error"} variant={"h4"}>{error}</Typography>
                                <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                    <Button onClick={()=>navigate("/")} variant={"contained"} color="error">Quay về trang chủ</Button>
                                </div>
                            </div>
                        </Box>
                    }
                </Box>
            }
        </>
    )
}