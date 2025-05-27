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

export default function ConfirmAccountDiaglog(props:{username:string,id:string,open:boolean,handleClose:()=>void,reFetch:any}) {
    const [globalError, setGlobalError] = useState("");
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Account/Email/${props.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setGlobalError("")
                props.reFetch()
            }
            else {
                setGlobalError(data.errorMessage)
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
                    borderTop:"10px solid rgb(25, 118, 210)",
                }}>
                Xác nhận email người dùng {props.username}
            </DialogTitle>
            <IconButton
                color="primary"
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
                <CloseIcon color="primary" />
            </IconButton>
            <DialogContent >
                <DialogContentText >
                   <Typography>
                       Xác nhận email cho người dùng này?
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
                        <Button variant="contained" color="primary" onClick={()=> {
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