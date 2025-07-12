import {create} from "zustand/index";


type searchMode={
    query:string,
    mode:number,
    setQuery:(query:string,mode:number)=>void,
}

export const UseSearch = create<searchMode>((set)=>({
    query:"",
    mode:0,
    setQuery:(query:string,mode:number)=>{
        set({query:query,mode:mode});
    },

}))