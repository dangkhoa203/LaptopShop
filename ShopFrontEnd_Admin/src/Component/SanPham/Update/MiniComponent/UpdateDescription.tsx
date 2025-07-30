import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import TextEditor from "../../../TextEditor.tsx";
import Container from "@mui/material/Container";
import {Response} from "../../../../Type/Respone.ts";
import Button from "@mui/material/Button";
import {LinearProgress} from "@mui/material";
import {useAppNotify} from "../../../../State/AppGlobalNotifyState.ts";
export default function UpdateDescription(props:{id:string}){
    const [success,setSuccess]=useState(false)
    const [oldDescription,setOldDescription] = useState("");
    const [newDescription,setNewDescription] = useState("");
    const [globalError,setGlobalError]=useState("")
    const {data,isPending,refetch}=useQuery({
        queryKey:[`product_description_${props.id}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Description`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    const globalNotify=useAppNotify()
    const UPDATE=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Description`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({description:newDescription})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setGlobalError("")
                globalNotify.setNotify("Lưu mô tả thành công!")
                refetch()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    useEffect(() => {
        if(data){
            if(data.success) {
                setSuccess(data.success)
                setOldDescription(data.data)
            }
        }
    }, [data]);
    useEffect(()=>{
        setNewDescription(oldDescription)
    },[oldDescription])
    return (
        <Container sx={{maxWidth: {xs:"450px",sm:"480px",md:"750px",lg:"1152px"}}} style={{padding:0}}>
            <Divider/>
            <h2 style={{textAlign:"center"}}>Mô tả sản phẩm</h2>
            {!success ?
                <div style={{textAlign:"center"}}>
                    <h2>Lỗi đã xảy ra</h2>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Button onClick={()=>refetch()} variant="contained" sx={{fontSize:"1.3em"}}>Tải lại</Button>
                    </div>
                </div>
                :
                <>
                    {isPending ? <LinearProgress />
                        :
                        <>
                            <div style={{display:"flex",marginBottom:"10px",justifyContent:"center"}}>
                                <Button sx={{width:"120px"}} loading={UPDATE.isPending} loadingPosition="end" onClick={()=>UPDATE.mutate()} variant="contained" color="warning">Sửa</Button>
                            </div>
                            <div style={{color:"red",textAlign:"center",marginBottom:"10px"}}>
                                {globalError}
                            </div>
                            <TextEditor color={"rgb(237, 108, 2)"} description={newDescription} setDescription={setNewDescription}/>
                        </>
                    }
                </>
            }

        </Container>
    )
}