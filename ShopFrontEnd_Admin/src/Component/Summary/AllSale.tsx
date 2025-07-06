import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import {Paper, Skeleton} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
type data={
    month:string,
    number:number
}
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
export default function AllSale(){
    const [success, setSuccess] = useState(false);
    const [saleData,setSaleData] = useState<data[]>([]);
    const {data,isPending,refetch}=useQuery({
        queryKey:[`All_Sale`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Summary/Sale`, {
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
    const downloadExcel = () => {
        if(saleData.length>0){
            const list:data[] = []
            saleData.map(n =>
                list.push({
                    month: n.month,
                    number: n.number,
                })
            )
            const worksheet = XLSX.utils.json_to_sheet(list);
            worksheet.A1.v = "Tháng";
            worksheet.B1.v = "VNĐ";
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Doanh thu");
            XLSX.writeFile(workbook, "DOanhTHu.xlsx");
        }
    };
    return(
        <Container sx={{paddingBottom:"20px"}}>
            <Typography textAlign="center" variant="h4" color="textSecondary">
                Danh sách doanh thu tháng

            </Typography>
            {success?
                <>
                    {isPending?
                        <div>
                            <Skeleton variant="rectangular"  height={400} />
                        </div>
                        :
                        <>
                            <Button fullWidth color="success" onClick={downloadExcel}>Excel</Button>
                            <TableContainer elevation={12} sx={{maxHeight:"400px",overflowY:"auto"}} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tháng</TableCell>
                                            <TableCell align="right">VNĐ </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {saleData.map((row) => (
                                            <TableRow
                                                key={row.month}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.month}
                                                </TableCell>
                                                <TableCell align="right">{row.number.toLocaleString(undefined, { minimumFractionDigits: 0 })}</TableCell>
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