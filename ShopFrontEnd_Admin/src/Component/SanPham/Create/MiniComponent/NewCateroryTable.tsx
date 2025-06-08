import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Checkbox, LinearProgress, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
type categoryData={
    id:string,
    name: string,
}

export default function NewCateroryTable(props:{categories:string[],setCategories:(value:any) => void}) {
    const [success, setSuccess] = useState(false);
    const [rowData, setRowData] = useState<categoryData[]>([]);
    const [search,setSearch] = useState("");
    const {data,isPending,refetch}=useQuery({
        queryKey:["categories_list"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Admin/Category', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            setSuccess(data.success)
            setRowData(data.data)
        }
    }, [data]);
    const handleCheckChange=(id:string)=>{
        if(!props.categories.includes(id)){
            props.setCategories([...props.categories,id]);
        }else
            props.setCategories(props.categories.filter(item => item !== id));
    }
    const handleSearchChange=(e:any)=>{
        setSearch(e.target.value);
    }
    const showData=rowData.filter((item)=>{
        return item.name.toLowerCase().includes(search.toLowerCase());
    })
    return (<div style={{marginBottom:'10px'}}>
            <Divider/>
            <h2 style={{textAlign:"center",marginBottom:0}}>Danh mục</h2>
            {isPending && <LinearProgress />}
        {success?
                <>
                    <TextField value={search} onChange={handleSearchChange} fullWidth label="search" variant="outlined"/>
                    <TableContainer sx={{height:400,marginTop:"10px",overflowY:"scroll",border:"2px solid rgb(25, 118, 210)"}} component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Chọn: {props.categories.length}</TableCell>
                                    <TableCell>Tên danh mục</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showData.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={props.categories.includes(row.id)}
                                                onChange={()=>handleCheckChange(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <Button onClick={()=>handleCheckChange(row.id)}> {row.name}</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                :
                <>
                    <Button variant="contained" onClick={()=>refetch()}>Load lại</Button>
                </>
        }
        </div>
    );
}