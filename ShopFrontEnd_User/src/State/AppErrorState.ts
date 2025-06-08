import {create} from "zustand/index";


type error={
    message:string,
    show:boolean,
    setError:(message:string,show:boolean)=>void,
}

export const useAppError = create<error>((set)=>({
    message:"",
    show:false,
    setError:(message:string,show:boolean)=>{
        set({message:message,show:show});
    },
}))