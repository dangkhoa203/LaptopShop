import './App.css'
import RouteComponent from "./Component/RouteComponent.tsx"
import {useEffect} from "react";
import {useUserInfo} from "./State/User.ts";
import {useQuery} from "@tanstack/react-query";
import {Backdrop, CircularProgress} from "@mui/material";
import './CSS/Font.css'
function App() {
    const setUserInfo=useUserInfo((state)=> state.setUserInfo);
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["user"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            try {
                const response = await fetch('https://localhost:7075/api/Admin/Account/Info', {
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
            setUserInfo(data,refetch)
        }
    }, [data]);
    if(isFetching){
        return (
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isFetching}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    return (
        <div style={{minHeight:"100vh"}}>
            <RouteComponent  />
        </div>
    )
}

export default App
