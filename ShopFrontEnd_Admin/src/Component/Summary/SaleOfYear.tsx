import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Skeleton} from "@mui/material";
import {BarChart} from "@mui/x-charts/BarChart";

type data={
    month:string,
    number:number
}
export default function SaleOfYear(props:{year:number}) {
    const [saleData,setSaleData] = useState<data[]>([]);
    const {data,isPending}=useQuery({
        queryKey:[`Sale_${props.year}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Summary/Sale/${props.year}`, {
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
    const getData=()=>{
        const data=[]
        for(let i=1; i<13; i++){
            const check=saleData.find(d=>d.month==(i+""))
            if(check){
                data.push({month:i,number:check.number});
            }else {
                data.push({month:i,number:0});
            }
        }
        return data;
    }
    const dataset=getData();
    console.log(dataset)
    console.log(setSaleData);
    return(
        <Container>
            <Typography className="ubuntu" textAlign="center" variant="h4" color="textSecondary">
                Doanh thu năm {props.year}
            </Typography>
            {isPending?
                <div>
                    <Skeleton variant="rectangular"  height={300} />
                </div>
                :
                <BarChart
                    loading={isPending}
                    localeText={{
                        loading: 'Load dữ liệu.',
                        noData: 'Không có dữ liệu để hiển thị.',
                    }}
                    dataset={dataset}
                    yAxis={[{ scaleType: 'band', dataKey: 'month',label:"Tháng" }]}
                    series={[{ dataKey: 'number', label: 'VNĐ' }]}
                    xAxis={[{label:"VNĐ"}]}
                    layout="horizontal"
                    height={500}
                    grid={{ vertical: true }}

                />
            }
        </Container>

    )
}