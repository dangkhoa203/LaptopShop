import './App.css'
import RouteComponent from "./Page/RouteComponent.tsx"
import {useEffect} from "react";
import {useUserInfo} from "./State/User.ts";
import {useQuery} from "@tanstack/react-query";
import {Backdrop, CircularProgress} from "@mui/material";
import {useCart} from "./State/Cart.ts";
import "./CSS/CardAnimation.css"
import "./CSS/ProductDescription.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function App() {
    const setUserInfo=useUserInfo((state)=> state.setUserInfo);
    const userInfo = useUserInfo((state)=>state.user);
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["user"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            try {
                const response = await fetch('https://localhost:7075/api/Account', {
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
    const setCart=useCart((state)=>state.setCartItem)
    const Cart=useQuery({
        queryKey: ["cart"],
        refetchOnWindowFocus:false,
        enabled:userInfo.isLogged,
        queryFn:async ()=>{
                const response = await fetch('https://localhost:7075/api/Cart', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method: "GET"
                });
                return response.json();
        },
    })
    useEffect(() => {
        if(data){
            setUserInfo(data,refetch)
        }
    }, [data]);
    useEffect(() => {
        if(Cart.data){
            if(!userInfo.isLogged)
                setCart([],Cart.refetch)
            else
                setCart(Cart.data.data,Cart.refetch)
        }
    }, [Cart.data]);
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
