import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, InputLabel,
    LinearProgress, MenuItem, Select,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import {OrderStatus} from "../../Type/OrderStatus.ts";


export default function UpdateStatusDialog(props:{id:string,status:number,open:boolean,handleClose:()=>void,reFetch:any}){
    const [globalError, setGlobalError] = useState("");
    const [status, setStatus] = useState<number>(0);
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
    const handleStatusChange = (e:any) => {
        setStatus(e.target.value);
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Orders`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    id:props.id,
                    status:status,
                })
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                close()
                props.reFetch()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    const close=()=>{
        props.handleClose()
        setStatus(props.status)
        setGlobalError("")
    }

    return(
        <Dialog
            open={props.open}
            onClose={close}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    borderTop:"10px solid rgb(230, 81, 0)",
                }}>
                Sửa hãng {props.id}
            </DialogTitle>
            <IconButton
                color="warning"
                onClick={close}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon color="warning" />
            </IconButton>
            <DialogContent dividers>
                <DialogContentText >
                    <FormControl color="warning" fullWidth>
                        <InputLabel >Trạng thái</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Trạng thái"
                            onChange={handleStatusChange}
                        >
                            {OrderStatus.map((status,index) =>
                                <MenuItem value={index}>{status}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
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
                        <Button color="error" variant={"outlined"} onClick={close}>Hủy</Button>
                        <Button variant="contained" color="warning" onClick={()=> {
                            mutate()
                        }} autoFocus
                        >
                            Sửa
                        </Button>
                    </>

                }

            </DialogActions>
        </Dialog>
    )
}