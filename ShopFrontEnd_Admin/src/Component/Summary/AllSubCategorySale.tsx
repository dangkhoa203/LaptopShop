import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import {Checkbox, Paper, Skeleton} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
type data={
    name:string,
    count:number
}
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
export default function AllSubCategorySale(){
    const [success, setSuccess] = useState(false);
    const [saleData,setSaleData] = useState<data[]>([]);
    const {data,isPending,refetch}=useQuery({
        queryKey:[`Sub_Sale`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Summary/All_Sub_Sale`, {
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
            if(data.success)
                setSaleData(data.data);
        }
    }, [data]);
    const [selectedData, setSelectedData] = useState<number[]>([]);
    const handleSelectedChange=(index:number)=>{
        if(!selectedData.includes(index)){
            setSelectedData([...selectedData,index])
        }else
            setSelectedData(selectedData.filter(item => item !== index));
    }
    const [isAll, setIsAll] = useState<boolean>(false);
    const handleIsAllChange=(e:any)=>{
        setIsAll(e.target.checked);
    }
    const downloadExcel = () => {
        if(selectedData.length>0){
            const list:data[] = []
            selectedData.forEach(item=>{
                list.push({
                    name: saleData[item].name,
                    count: saleData[item].count,
                })
            })
            const worksheet = XLSX.utils.json_to_sheet(list);
            worksheet.A1.v = "Tên";
            worksheet.B1.v = "Số lượng";
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Danh mục phụ");
            XLSX.writeFile(workbook, "DanhMucPhu.xlsx");
        }
    };
    useEffect(() => {
        if(isAll){
            const index:number[]=[]
            for(let i=0;i<saleData.length;i++){
                index.push(i);
            }
            setSelectedData(index);
        }else {
            setSelectedData([]);
        }
    }, [isAll]);
    return(
        <Container>
            <Typography className="ubuntu" textAlign="center" variant="h4" color="textSecondary">
                Danh sách bán hàng của danh mục phụ

            </Typography>
            {success?
                <>
                    {isPending?
                        <div>
                            <Skeleton variant="rectangular"  height={400} />
                        </div>
                        :
                        <>
                            <Button disabled={selectedData.length===0} fullWidth color="success" onClick={downloadExcel}>Excel</Button>
                            <TableContainer elevation={12} sx={{maxHeight:"400px",overflowY:"auto"}} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isAll}
                                                    onChange={handleIsAllChange}
                                                />
                                            </TableCell>
                                            <TableCell sx={{fontSize:"1.2em"}}>Tên</TableCell>
                                            <TableCell sx={{fontSize:"1.2em"}} align="right">Số lượng sản phẩm</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {saleData.map((row,index) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectedData.includes(index)}
                                                        onClick={()=>handleSelectedChange(index)}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{fontSize:"1.1em"}} component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell sx={{fontSize:"1.1em"}} align="right">{row.count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    }
                </>
                :
                <div style={{display:"flex",justifyContent:"center"}}>
                    <Button variant={"contained"} sx={{width:"120px"}} onClick={()=>refetch()}>Tải lại</Button>
                </div>
            }


        </Container>

    )
}