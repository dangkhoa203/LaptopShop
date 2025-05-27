import {queryOptions} from "@tanstack/react-query";
import {userInfo} from "../Type/userInfo.tsx";

export default function GetUserInfoQueryOption(){
    return queryOptions({
        queryKey: ["userId"],
        queryFn:getUserInfo,
    });
}

const getUserInfo=async ():Promise<userInfo> =>{
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
}