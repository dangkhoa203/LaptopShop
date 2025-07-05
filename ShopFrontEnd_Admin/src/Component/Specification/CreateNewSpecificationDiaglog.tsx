import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    LinearProgress, Switch,
    TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";

export default function CreateNewSpecificationDiaglog(props:{open:boolean,handleClose:()=>void,reFetch:any}){
    const [globalError, setGlobalError] = useState("");
    const [validationError, setValidationError] = useState("");
    const [name, setName] = useState("");

    const handleNameChange = (e:any) => {
        setName(e.target.value);
    }
    const [searchable, setSearchable] = useState(false);
    const handleSearchableChange = (e:any) => {
        setSearchable(e.target.checked);
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Specifications`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({name:name,searchAble:searchable})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setName("")
                setGlobalError("")
                setValidationError("")
                props.reFetch()
            }
            else {
                setGlobalError(data.errorMessage)
                if(!data.validationError.isValid){
                    setValidationError(data.validationError.errors[0].errorMessage)
                }
            }
        }
    })
    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setName("")
                setGlobalError("")
                setValidationError("")
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    borderTop:"10px solid rgb(25, 118, 210)",
                }}>
                Tạo thông số mới
            </DialogTitle>
            <IconButton
                color="primary"
                onClick={()=> {
                    props.handleClose()
                    setName("")
                    setGlobalError("")
                    setValidationError("")
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
            <DialogContent dividers>
                <DialogContentText >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField value={name} onChange={handleNameChange} fullWidth
                                       error={validationError.length>0}  helperText={validationError}
                                       color="primary"
                                       size={"medium"} label="Tên" variant="filled" />
                        </Grid>
                        <Grid size={12}>
                            <Switch value={searchable} onChange={handleSearchableChange} /> Tìm kiếm sản phẩm theo thông số
                        </Grid>
                    </Grid>
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
                            setName("")
                            setGlobalError("")
                            setValidationError("")
                        }}>Hủy</Button>
                        <Button variant="contained" color="primary" onClick={()=> {
                            mutate()
                        }} autoFocus
                        >
                            Tạo
                        </Button>
                    </>

                }

            </DialogActions>
        </Dialog>
    )
}