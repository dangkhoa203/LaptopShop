import {useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAppNotify} from "../../State/AppGlobalNotifyState.ts";

export default function DeleteBrandDialog(props:{name:string,id:string,open:boolean,handleClose:()=>void,reFetch:any}) {
    const [globalError, setGlobalError] = useState("");
    const globalNotify=useAppNotify()
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Brands/${props.id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data){
                if(data.success){
                    props.handleClose()
                    setGlobalError("")
                    globalNotify.setNotify("Xóa thành công")
                    props.reFetch()
                }
                else {
                    setGlobalError(data.errorMessage)
                }
            }
        }
    })

    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setGlobalError("")
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    fontFamily:"Open sans",
                    letterSpacing:1,
                    borderTop:"10px solid rgb(230, 81, 0)",
                }}>
                Xóa hãng <span style={{fontWeight:700}}>{props.name}</span>

            </DialogTitle>
            <IconButton
                color="error"
                onClick={()=> {
                    props.handleClose()
                    setGlobalError("")
                }}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon color="error" />
            </IconButton>
            <DialogContent >
                <DialogContentText >
                    <Typography>
                        Bạn có muốn xóa {props.name}
                    </Typography>
                </DialogContentText>

            </DialogContent>
            <DialogActions sx={{minHeight:"55px"}}>
                {isPending?
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                    :
                    <>
                        <div style={{color:"red"}}>
                            {globalError}
                        </div>
                        <Button color="error" variant={"outlined"} onClick={()=> {
                            props.handleClose()
                            setGlobalError("")
                        }}>Hủy</Button>
                        <Button variant="contained" color="error" onClick={()=> {
                            mutate()
                        }} autoFocus
                        >
                            Xác nhận
                        </Button>
                    </>
                }

            </DialogActions>
        </Dialog>
    )
}