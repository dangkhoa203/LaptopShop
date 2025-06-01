import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
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
export default function NewThumbnail(props:{thumbnail:any,setThumbnail:(value:any) => void,error:boolean}) {
    const handleThumbnailChange = (event:any) => {
        if (event.target.files && event.target.files[0] && (event.target.files[0].type==="image/png" || event.target.files[0].type==="image/jpeg")) {
            props.setThumbnail(event.target.files[0]);
        }
    }
    return(
        <>
            <div style={{display:"flex", justifyContent:"center"}}>
                {props.thumbnail!==null? <img alt="Thumbnail" width={300} height={300} src={URL.createObjectURL(props.thumbnail)} />
                    :
                    <Box
                        sx={{
                            width: 300,
                            height:300,
                            bgcolor:"gainsboro"
                        }}/>
                }
            </div>
            {props.error &&
                <div style={{color:"red",textAlign:"center"}}>
                    Chưa có hình
                </div>
            }
            <div style={{display:"flex",marginTop:"5px",gap:4, justifyContent:"center"}}>
                {props.thumbnail===null ?
                    <Button
                        component="label"
                        variant="contained"
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
                    <Button endIcon={<ClearIcon/>} variant="contained" onClick={()=>props.setThumbnail(null)} color="error">Clear</Button>}
            </div>
        </>
    )
}