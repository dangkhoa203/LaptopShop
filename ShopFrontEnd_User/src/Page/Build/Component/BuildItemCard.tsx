import {buildProduct} from "../PCBuilderPage.tsx";
import BuildItemChooseCard from "./BuildItemChooseCard.tsx";
import BuildItemProductCard from "./BuildItemProductCard.tsx";

export default function BuildItemCard(props:{products: buildProduct[],componentName:string,reFetch:()=>void,updateAble:boolean,categoryId:string}) {
    const product=props.products.find(p=>p.componentName==props.categoryId)
    return(
        <>
            {product ?
                <BuildItemProductCard product={product} componentName={props.componentName} categoryId={props.categoryId} reFetchBuild={props.reFetch} updateAble={props.updateAble}/>
                :
                <BuildItemChooseCard componentName={props.componentName} categoryId={props.categoryId}  product={product} reFetchBuild={props.reFetch}/>
            }
        </>
    )
}