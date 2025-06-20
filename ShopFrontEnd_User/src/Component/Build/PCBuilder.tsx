import Container from "@mui/material/Container";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

export default function PCBuilder(){
    const [build,setBuild]=useState([]);
    const {data}=useQuery({
        queryKey: ["build"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
                const response = await fetch('https://localhost:7075/api/Build', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method:"GET"
                });
                return await response.json();
        },
    })
    useEffect(() => {
        if(data){
            setBuild(data.data)
        }
    }, [data]);
    return(
        <Container maxWidth="lg">
            build
        </Container>
    )
}