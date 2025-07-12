import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {
    Divider,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import SpecSearchBox from "./Component/SpecSearchBox.tsx";
type specificationData={
    id:string,
    name:string,
    value:string,
}
type searchAble={
    id:string,
    name:string,
}
export default function SearchBySpecification(){
    const [searchAble, setSearchAble] = useState<searchAble[]>([])
    const [specificationData, setSpecificationData] = useState<specificationData[]>([])
    const {data}=useQuery({
        queryKey:["searchable_specification"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Specifications/SearchAble', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            setSearchAble(data.data)
        }
    }, [data]);

    const specificationShowData=searchAble.filter((item)=>!specificationData.some(i=>i.id===item.id));
    const [newSpecSearch, setNewSpecSearch] = useState({
        id:"0",
        value:"",
    });
    const handleNewIdChange=(e:any)=>{
        setNewSpecSearch({...newSpecSearch,id:e.target.value})
    }
    const handleNewValueChange=(e:any)=>{
        setNewSpecSearch({...newSpecSearch,value:e.target.value})
    }
    const deleteFromList=(index:number)=>{
        const reducedArr = [...specificationData];

        reducedArr.splice(index, 1);

       setSpecificationData(reducedArr);
    }
    return(
        <Container maxWidth="lg" >
            <Typography textAlign={"center"} variant="h3" color="textPrimary">Tìm theo cấu hình</Typography>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <FormControl
                        variant="filled" color="warning" fullWidth>
                        <InputLabel >Thông số </InputLabel>
                        <Select
                            value={newSpecSearch.id}
                            onChange={handleNewIdChange}
                        >
                            <MenuItem value="0" disabled>Chọn thông số</MenuItem>
                            {specificationShowData.map((item) => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs:8,sm:8,md:6,lg:6}}>
                    <TextField fullWidth value={newSpecSearch.value} onChange={handleNewValueChange}  label="Nội dung tìm" variant="filled" />
                </Grid>
                <Grid size={{xs:12,sm:12,md:2,lg:2}}>
                    <Button fullWidth sx={{height:"100%"}} disabled={newSpecSearch.id==="0" || newSpecSearch.value.length===0} variant="contained"
                        onClick={()=>{
                            const spec=specificationShowData.find(s=>s.id===newSpecSearch.id)
                            if(spec) {
                                setSpecificationData([...specificationData,{id:spec.id,name:spec.name,value:newSpecSearch.value}])
                                setNewSpecSearch({
                                    id:"0",
                                    value:"",
                                })
                            }

                        }}
                    >Thêm</Button>
                </Grid>
                <Grid size={12}>
                    <Paper elevation={8} sx={{minHeight: 200,maxHeight:400}}>
                        <List sx={{marginY:"10px",paddingX:"10px", minHeight: '200px',maxHeight:"300px",overflow: 'auto'}}>
                            {specificationData.length===0 &&
                                <Typography variant="h6" textAlign="center">Chưa có nội dung</Typography>
                            }
                            {specificationData.map((value,index) => (
                                <ListItem
                                    sx={{paddingLeft:"10px",borderBottom:"1px solid black"}}
                                    key={value.id}
                                    disableGutters
                                    secondaryAction={
                                        <IconButton color={"error"}  onClick={()=>deleteFromList(index)} aria-label="comment">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText  primary={value.name} secondary={value.value} />
                                    <Divider />
                                </ListItem>

                            ))}
                        </List>
                    </Paper>
                </Grid>
                <SpecSearchBox  specificationData={specificationData}/>
            </Grid>
        </Container>
    )
}