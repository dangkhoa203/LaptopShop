import {create} from "zustand/index";


type notification={
    message:string,
    setNotify:(message:string)=>void,
}

export const useAppNotify = create<notification>((set)=>({
    message:"",
    setNotify:(message:string)=>{
        set({message:message});
    },

}))