import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

import {BarChart} from "@mui/x-charts/BarChart";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Skeleton} from "@mui/material";
type data={
    name:string,
    count:number
}
export default function TopCustomer(){
    const [saleData,setSaleData] = useState<data[]>([]);
    const {data,isPending}=useQuery({
        queryKey:[`Top_Customer`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Summary/Top_Customer`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            if(data.success)
                setSaleData(data.data);
        }
    }, [data]);
    return(
        <Container>
            <Typography textAlign="center" variant="h4" color="textSecondary">
                Top khách hàng
            </Typography>
            {isPending?
                <div>
                    <Skeleton variant="rectangular"  height={300} />
                </div>
                :
                <BarChart
                    yAxis={[
                        {label: "Số lượng đơn hàng"}
                    ]}
                    xAxis={[
                        {
                            id: 'customer',
                            data: saleData.map(item=>item.name),
                        },
                    ]}
                    series={[
                        {
                            data: saleData.map(item=>item.count),
                            label:"Đơn hàng"
                        },
                    ]}
                    height={300}
                />
            }
        </Container>

    )
}