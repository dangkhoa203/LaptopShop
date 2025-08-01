import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../../../Type/Respone.ts";
import {useAppNotify} from "../../../../State/AppGlobalNotifyState.ts";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function UpdateThumbnail(props:{id:string}){
    const [newThumbnail, setNewThumbnail] = useState<any>(null);
    const [error, setError] = useState("");
    const handleThumbnailChange = (event:any) => {
        if (event.target.files && event.target.files[0] && (event.target.files[0].type==="image/png" || event.target.files[0].type==="image/jpeg")) {
            setNewThumbnail(event.target.files[0]);
        }
    }
    const globalNotify=useAppNotify()
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setError("")
            const formData = new FormData();
            formData.append("Thumbnail",newThumbnail)
            const response = await fetch(`https://localhost:7075/api/Admin/Product/${props.id}/Thumbnail`, {
                method: 'PUT',
                credentials: 'include',
                body: formData
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data) {
                if (data.success) {
                    setNewThumbnail(null)
                    globalNotify.setNotify("Cập nhật thành công")
                } else {
                    setError(data.errorMessage)
                }
            }
        }
    })
    return(
        <>
            <div style={{display:"flex", justifyContent:"center"}}>
                {newThumbnail!==null? <img alt="Thumbnail" width={300} height={300} src={URL.createObjectURL(newThumbnail)} />
                    :
                    <img alt="Thumbnail" width={300} height={300} src={`https://localhost:7075/api/Admin/Product/${props.id}/Thumbnail`}/>
                }
            </div>
            {error.length!==0 &&
                <div style={{color:"red",textAlign:"center"}}>
                    Chưa có hình
                </div>
            }
            <div style={{display:"flex",marginTop:"5px",gap:4, justifyContent:"center"}}>
                {newThumbnail===null ?
                    <Button
                        component="label"
                        variant="contained"
                        color="warning"
                        tabIndex={-1}
                        endIcon={<FileUploadIcon/>}
                    >
                        Tải hình lên
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleThumbnailChange}
                        />
                    </Button>
                    :
                    <div style={{display:"flex",justifyContent:"center",gap:2}}>
                        <Button endIcon={<ClearIcon/>} variant="contained" onClick={()=>setNewThumbnail(null)} loading={isPending} loadingPosition={"end"} color="error">Hủy</Button>
                        <Button endIcon={<FileUploadIcon/>} variant="contained" onClick={()=>mutate()} loading={isPending} loadingPosition={"end"} color="warning">Cập nhật</Button>
                    </div>
                    }
            </div>
        </>
    )
}