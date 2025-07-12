import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {ProductData} from "../../Type/ProductData.ts";
import {useQuery} from "@tanstack/react-query";
import Container from "@mui/material/Container";
import MainPageProductCard from "./Component/ProductCard.tsx";
import {Grid, Pagination} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SearchMode} from "../../Type/SearchMode.ts";
const showMode=["tên","cấu hình","hãng"]
export default function SearchPage(){
    const {query,mode}=useParams();

    const [maxPage, setMaxPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // @ts-ignore
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const [products, setProducts] = useState<ProductData[]>([])
    const [total,setTotal] = useState(0);

    const {data,refetch}=useQuery({
        queryKey: [`search_products_${mode}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{// @ts-ignore
            const response = await fetch(`https://localhost:7075/api/Products?search=${decodeURIComponent(query)}&mode=${SearchMode.indexOf(mode)}&page=${currentPage}`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET",
            });
            return await response.json()
        },
    })
    useEffect(() => {
        if(data){
            if(data?.success){
                setProducts(data.data.products)
                setMaxPage(data.data.maxPage)
                setTotal(data.data.total)
            }

        }
    }, [data]);
    useEffect(() => {
        if(currentPage===1)
            refetch();
        else
            setCurrentPage(1);
    }, [query]);
    useEffect(() => {
        refetch();
        window.scrollTo(0, 0)
    }, [currentPage]);


    return(
        <Container sx={{display:"flex",flexDirection:"column",justifyContent:"center",gap:2}} maxWidth="lg">
            <div >
                <Typography textAlign={"center"} variant="h4">Tìm kiếm </Typography>
                <Typography textAlign={"center"} variant="h6">Có <span style={{fontWeight:"bolder"}}>{total}</span> sản phẩm  </Typography>
                <Container sx={{minWidth:"100%",display:"flex",justifyContent:"center"}}>
                    <div style={{width:"140px",height:"4px",backgroundColor:"black"}}></div>
                </Container>
            </div>
            <Typography>
                Kết quả tìm kiếm {
                // @ts-ignore
                showMode[SearchMode.indexOf(mode)!==-1 ? SearchMode.indexOf(mode):0]} cho " <span style={{fontWeight:"bolder"}}>{query}</span>"
            </Typography>
            <Grid container spacing={3}>
                {products.map(product=>
                    <Grid size={{xs:6,sm:6,md:4,lg:3}}>
                        <MainPageProductCard product={product}/>
                    </Grid>

                )}
            </Grid>
            <div style={{display:"flex",justifyContent:"center"}}>
                {maxPage>1 && <Pagination count={maxPage} page={currentPage} onChange={handleChange}/>}
            </div>

        </Container>
    )
}