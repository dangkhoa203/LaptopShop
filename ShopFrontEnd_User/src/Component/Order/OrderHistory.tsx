import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {CardActionArea, Paper, Tabs} from "@mui/material";
import Box from "@mui/material/Box";

export default function OrderHistory(){
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [orders,setOrders]=useState([])
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["orders"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            try {
                const response = await fetch('https://localhost:7075/api/Orders', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method:"GET"
                });
                if (!response.ok) {
                    return({
                        userName: '',
                        userEmail: '',
                        userId: '',
                        isLogged: false,
                    })
                }
                const content = await response.json();
                return(content);
            } catch  {
                return({
                    userName: '',
                    userEmail: '',
                    userId: '',
                    isLogged: false,
                })
            }
        },
    })
    useEffect(() => {
        if(data){
            setOrders(data.data)
        }
    }, [data]);
    // @ts-ignore
    return(
        <Container>
            {orders.map((order,index)=>(
                <Card elevation={12} sx={{ minWidth: 275,marginBottom:"10px" }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Đơn {index + 1}
                        </Typography>
                        <Tabs
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {order.detailId.map(item=>
                                <>
                                    <div style={{display:"flex",padding:"5px",width:100,height:100}} >
                                        <Paper sx={{margin:"auto",padding:"0",width:100,height:100}} elevation={6}>
                                            <img style={{border:"1px solid black"}} src={`https://localhost:7075/api/Products/${item}/Thumbnail`} width={100} height={100}/>
                                        </Paper>
                                    </div>
                                </>

                            )}
                        </Tabs>
                        <Typography variant="body2">
                            Ngày đặt {new Date(order.orderDate).toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    )
}