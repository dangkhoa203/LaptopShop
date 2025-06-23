import {useParams} from "react-router";

export default function SearchPage(){
    const {query}=useParams();
    return(
        <>
            {decodeURIComponent(query)}
        </>
    )
}