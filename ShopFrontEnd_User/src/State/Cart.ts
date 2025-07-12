import {create} from "zustand"
import {cartItem} from "../Type/CartItem.ts";


export type cartState={
    cartItems:cartItem[],
    reFetch: any,
    count:()=>number
    setCartItem:(cartItem:cartItem[],reFetch:any) => void,
}
export const useCart = create<cartState>((set,getState)=>({
    cartItems:[],
    reFetch:()=>{},
    setCartItem:(cartItems:cartItem[],reFetch:any)=> {
        set({cartItems:cartItems,reFetch:reFetch})
    },
    count:()=>{
        return getState().cartItems.filter(i=>i.storageCount!==0).length;
    }
}))