import {create} from "zustand"
import {userInfo} from "../Type/userInfo.ts";

export type userInfoState={
    user:userInfo,
    reFetch: any,
    setUserInfo:(userInfo:userInfo,reFetch:any)=> void,
    clearUserInfo:()=>void,
}

export const useUserInfo = create<userInfoState>((set)=>({
    user:{
        userName: 'default',
        userEmail: '',
        userId: '',
        isLogged: false,
    },
    reFetch:()=>{},
    setUserInfo:(userInfo:userInfo,reFetch:any)=>(
        set({user:userInfo,reFetch:reFetch})
    ),
    clearUserInfo:()=>{
        set({user:
                {
                    userName: '',
                    userEmail: '',
                    userId: '',
                    isLogged: false,
                }
            }
        )
    }
}))