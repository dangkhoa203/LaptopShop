import './App.css'
import RouteComponent from "./Component/RouteComponent.tsx"
import {useEffect} from "react";
import {useUserInfo} from "./State/User.ts";
import {useQuery} from "@tanstack/react-query";
import GetUserInfoQueryOption from "./Query/GetUserInfoQueryOption.ts";
import {Backdrop, CircularProgress} from "@mui/material";
function App() {
    const setUserInfo=useUserInfo((state)=> state.setUserInfo);
    const {data,isFetching,refetch}=useQuery(GetUserInfoQueryOption())
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
