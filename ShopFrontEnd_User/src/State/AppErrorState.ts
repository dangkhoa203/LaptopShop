import {create} from "zustand/index";


type error={
    message:string,
    setError:(message:string)=>void,
}

export const useAppError = create<error>((set)=>({
    message:"",
    setError:(message:string)=>{
        set({message:message});
    },

}))