import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Checkbox, LinearProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import {Response} from "../../../../Type/Respone.ts";
type categoryData={
    id:string,
    name: string,
}

export default function UpdateCaterory(props:{id:string}) {
    const [success, setSuccess] = useState(false);
    const [rowData, setRowData] = useState<categoryData[]>([]);
    const [productCategories, setProductCategories] = useState<string[]>([]);
    const [newCategories, setNewCategories] = useState<string[]>([]);
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
    const PRODUCTCATEGORY=useQuery({
        queryKey:["product_categories"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Category`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(PRODUCTCATEGORY.data){
            setSuccess(true)
            setProductCategories(PRODUCTCATEGORY.data.data)
        }
    }, [PRODUCTCATEGORY.data]);
    useEffect(() => {
        setNewCategories(productCategories);
    }, [productCategories]);
    const handleCheckChange=(id:string)=>{

        if(!newCategories.includes(id)){
            setNewCategories([...newCategories,id]);
        }else
            setNewCategories(newCategories.filter(item => item !== id));
    }
    const checkChange=():boolean=>{
        if (newCategories.length !== productCategories.length) {
            return false;
        }
        return newCategories.every(item=>productCategories.includes(item));
    }
    const [globalError,setGlobalError]=useState("")
    const UPDATE=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Category/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({categories:newCategories})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setGlobalError("")
                refetch()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    return (<div style={{marginBottom:'10px'}}>
            <Divider/>
            <h2 style={{textAlign:"center",marginBottom:0}}>Danh mục</h2>
            <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:10,minHeight:37}}>
                {!checkChange() &&
                    <>
                        <Button  loading={UPDATE.isPending} loadingPosition="end" endIcon={<ClearIcon/>} variant="contained" onClick={()=>setNewCategories(productCategories)} color="error">Clear</Button>
                        <Button loading={UPDATE.isPending} loadingPosition="end" endIcon={<SaveIcon/>} variant="contained" color="success" onClick={()=> UPDATE.mutate()}>Lưu</Button>
                    </>
                }
            </div>
            <div style={{color:"red",textAlign:"center",marginBottom:"10px"}}>
                {globalError}
            </div>
            {isPending ? <LinearProgress />
                :
                <>
                    {success?
                        <TableContainer sx={{height:400,overflowY:"scroll",border:"2px solid rgb(237, 108, 2)"}} component={Paper}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Chọn: {newCategories.length}</TableCell>
                                        <TableCell>Tên danh mục</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowData.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="warning"
                                                    checked={newCategories.includes(row.id)}
                                                    onChange={()=>handleCheckChange(row.id)}
                                                />
                                            </TableCell>
                                            <TableCell >
                                                <Button color="warning" onClick={()=>handleCheckChange(row.id)}> {row.name}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <>
                            <Button variant="contained" onClick={()=>refetch()}>Load lại</Button>
                        </>
                    }
                </>
            }

        </div>
    );
}