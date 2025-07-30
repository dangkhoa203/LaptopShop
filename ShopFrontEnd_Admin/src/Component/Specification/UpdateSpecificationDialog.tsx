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
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";

export default function UpdateSpecificationDialog(props:{id:string,name:string,searchAble:boolean,open:boolean,handleClose:()=>void,reFetch:any}){
    const [globalError, setGlobalError] = useState("");
    const [validationError, setValidationError] = useState("");
    const [newName, setNewName] = useState("");
    const handleNameChange = (e:any) => {
        setNewName(e.target.value);
    }
    const [searchable, setSearchable] = useState(false);
    const handleSearchableChange = (e:any) => {
        setSearchable(e.target.checked);
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Specifications/${props.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({name:newName,searchAble:searchable})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setNewName("")
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
    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
            mutate()
        }
    }
    useEffect(()=>{
        setNewName(props.name)
        setSearchable(props.searchAble)
    },[props.id])
    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setNewName("")
                setGlobalError("")
                setValidationError("")
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
                Sửa thông số <span style={{fontWeight:700}}>{props.id}</span>
            </DialogTitle>
            <IconButton
                color="warning"
                onClick={()=> {
                    props.handleClose()
                    setNewName("")
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
                <CloseIcon color="warning" />
            </IconButton>
            <DialogContent dividers>
                <DialogContentText >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField value={newName} onChange={handleNameChange} fullWidth
                                       error={validationError.length>0}  helperText={validationError}
                                       color="warning"
                                       onKeyDown={handleKeyDown}
                                       size={"medium"} label="Tên" variant="filled" />
                        </Grid>
                        <Grid size={12}>
                            <Switch color="warning" value={searchable} onChange={handleSearchableChange} checked={searchable} /> Tìm kiếm sản phẩm theo thông số
                        </Grid>
                    </Grid>
                </DialogContentText>

            </DialogContent>
            <DialogActions sx={{minHeight:"55px"}}>
                {isPending?
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress color="warning"/>
                    </Box>
                    :
                    <>
                        <div style={{color:"red"}}>
                            {globalError}
                        </div>
                        <Button color="error" variant={"outlined"} onClick={()=> {
                            props.handleClose()
                            setNewName("")
                            setGlobalError("")
                            setValidationError("")
                        }}>Hủy</Button>
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