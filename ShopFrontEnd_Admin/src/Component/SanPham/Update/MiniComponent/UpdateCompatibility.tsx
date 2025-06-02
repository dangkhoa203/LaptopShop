import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import {FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Response} from "../../../../Type/Respone.ts";
import DeleteIcon from '@mui/icons-material/Delete';
type specificationData={
    id:string,
    name: string,
}
type productCompatibility={
    id:string,
    name: string,
    value:string,
}
export default function UpdateCompatibility(props:{id:string}) {
    const [success, setSuccess] = useState(false);
    const [specificationData, setSpecificationData] = useState<specificationData[]>([])

    const {data,isPending}=useQuery({
        queryKey:["specification_list"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Admin/Specifications', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
        enabled:!success
    });
    useEffect(() => {
        if(data){
            setSuccess(data.success)
            setSpecificationData(data.data)
        }
    }, [data]);

    const [productCompatibilityData, setProductCompatibilityData] = useState<productCompatibility[]>([])
    const PRODUCTCOMPATIBILITY=useQuery({
        queryKey:["product_compatibility"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Compatibility`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(PRODUCTCOMPATIBILITY.data)
            setProductCompatibilityData(PRODUCTCOMPATIBILITY.data.data)
    }, [PRODUCTCOMPATIBILITY.data]);


    const [newCompatibility,setNewCompatibility]=useState<any>({
        id:"0",
        value: "",
    })
    const [globalError,setGlobalError]=useState("")
    const handleNewIdChange=(e:any)=>{
        setNewCompatibility({...newCompatibility,id:e.target.value})
    }
    const handleNewValueChange=(e:any)=>{
        setNewCompatibility({...newCompatibility,value:e.target.value})
    }
    const checkAdd=():boolean=>{
        if(newCompatibility.id==="0"||newCompatibility.value.length===0){
            return false
        }
        return true
    }
    const ADD=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            if(checkAdd()){
                const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Compatibility/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify(newCompatibility)
                })
                return await response.json();
            }
            setGlobalError("Chưa nhập thông tin")
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setGlobalError("")
                setNewCompatibility({
                    id:"0",
                    value:"",
                })
                PRODUCTCOMPATIBILITY.refetch()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })

    const specificationShowData=specificationData.filter((item)=>!productCompatibilityData.some(i=>i.id===item.id));

    const [deleteLoading,setDeleteLoading]= useState<string[]>([]);
    const DELETE=useMutation({
        mutationFn:async (id:string)=>{
            setGlobalError("")
            setDeleteLoading([...deleteLoading,id]);
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Compatibility`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({id:id})
            })
            const data= await response.json()
            setDeleteLoading(deleteLoading.filter(i=>i!==id));
            return data;
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setGlobalError("")
                PRODUCTCOMPATIBILITY.refetch()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    return (
        <div >
            <Divider/>
            <h2 style={{textAlign:"center",marginBottom:0}}>Tương thích</h2>
            {isPending  ? <LinearProgress />
                :
                <>
                    <Grid container spacing={2}>
                        <Grid size={{xs:5,sm:5,md:4,lg:4}}>
                            <FormControl
                                color="warning"
                                variant="filled" fullWidth>
                                <InputLabel >Thông số </InputLabel>
                                <Select
                                    value={newCompatibility.id}
                                    onChange={handleNewIdChange}
                                >
                                    <MenuItem value="0" disabled>Chọn thông số</MenuItem>
                                    {specificationShowData.map((item) => (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:7,sm:7,md:6,lg:6}}>
                            <TextField
                                fullWidth
                                color="warning"
                                label="Nội dung"
                                variant="filled"
                                value={newCompatibility.value}
                                onChange={handleNewValueChange}
                            />
                        </Grid>
                        <Grid size={{xs:12,sm:12,md:2,lg:2}}>
                            <Button color="warning" loading={ADD.isPending} fullWidth sx={{height:"100%",fontSize:"1.4em"}} onClick={()=>ADD.mutate()} variant="contained">Thêm </Button>
                        </Grid>
                    </Grid>
                    <div style={{textAlign:"center",color:"red"}}>
                        {globalError}
                    </div>
                    <List sx={{marginY:"10px",paddingX:"10px", minHeight: '200px',maxHeight:"300px",overflow: 'auto',border:"2px solid rgba(237, 108, 2)", bgcolor: 'rgba(237, 108, 2,0.13)' }}>
                        {productCompatibilityData.map((value) => (
                            <ListItem
                                sx={{paddingLeft:"10px",borderBottom:"1px solid rgba(0,0,0,0.53)"}}
                                key={value.id}
                                disableGutters
                                secondaryAction={
                                    <IconButton color={"error"} loading={deleteLoading.includes(value.id)} onClick={()=>DELETE.mutate(value.id)} aria-label="comment">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText  primary={value.name} secondary={value.value} />
                                <Divider />
                            </ListItem>

                        ))}
                    </List>
                </>
            }

        </div>
    );
}