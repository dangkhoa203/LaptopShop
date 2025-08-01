import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ProductData} from "../../../Type/ProductData.ts";
import Button from "@mui/material/Button";
import {CircularProgress, Divider, FormControl, Grid, MenuItem, Pagination, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainPageProductCard from "./ProductCard.tsx";
type specificationData={
    id:string,
    name:string,
    value:string,
}
export default function SpecSearchBox(props:{specificationData:specificationData[]}) {
    const [startSearch, setStartSearch] = useState(false)
    const [maxPage, setMaxPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // @ts-ignore
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const [products, setProducts] = useState<ProductData[]>([])
    const [total,setTotal] = useState(0);
    const [sortMode, setSortMode] = useState(0);
    const handleChangeSortMode = (event: any) => {
        setCurrentPage(1)
        setSortMode(event.target.value);
    };
    const {data,isFetching,refetch}=useQuery({
        queryKey:["Spec_search"],
        refetchOnWindowFocus:false,
        enabled:startSearch,
        queryFn:async ()=>{
            if(startSearch) {
                const response = await fetch(`https://localhost:7075/api/Specifications/Product?page=${currentPage}&sortMode=${sortMode}`, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method: "POST",
                    body: JSON.stringify(
                        {
                            specifications: props.specificationData
                        }
                    )
                });
                return await response.json();
            }
            else
                return []

        },
    });
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
        if(props.specificationData.length>0){
            if(currentPage===1){
                console.log("test")
                refetch();
            }

            else
                setCurrentPage(1);
        }else{
            setStartSearch(false)
            setProducts([])
        }
    }, [props.specificationData]);
    useEffect(() => {
        refetch();
        window.scrollTo(0, 0)
    }, [currentPage]);
    useEffect(()=>{
        if(startSearch)
            refetch();
    },[
        startSearch
    ])
    return(
        <>
            <Grid size={12}>
                <Button fullWidth disabled={props.specificationData.length===0} onClick={()=>{
                    if(!startSearch)
                        setStartSearch(true)
                    else
                        refetch()
                }} variant="contained">Search</Button>
            </Grid>

            {(products.length>0 || startSearch) &&
                <>
                    <Grid size={12}>
                        <Divider/>
                    </Grid>

                    <Grid  size={8}>
                        <Typography variant="h6" color="textSecondary">Có <span style={{fontWeight:"bolder"}}>{total}</span> sản phẩm</Typography>
                    </Grid>
                    <Grid sx={{display:"flex",justifyContent:"end"}} size={4}>
                        <FormControl size={"small"} sx={{width:'auto'}}>
                            <Select
                                sx={{fontWeight:"bold"}}
                                value={sortMode}
                                onChange={handleChangeSortMode}
                            >
                                <MenuItem value={0}>Tên A-Z</MenuItem>
                                <MenuItem value={1}>Tên Z-A</MenuItem>
                                <MenuItem value={2}>Mới nhất</MenuItem>
                                <MenuItem value={3}>Cũ nhất</MenuItem>
                                <MenuItem value={4}>Giá lớn nhất</MenuItem>
                                <MenuItem value={5}>Giá nhỏ nhất</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Grid style={{display:"flex"}} container spacing={3}>
                            {isFetching?
                                <CircularProgress sx={{margin:"auto"}} size="3rem" />
                                :
                                <>
                                    {products.length <=0 &&
                                        <Typography sx={{margin:"auto"}} variant={"body1"}>
                                            Không có sản phẩm
                                        </Typography>
                                    }
                                    {products.map(product=>
                                        <Grid key={product.id} size={{xs:6,sm:6,md:4,lg:3}}>
                                            <MainPageProductCard product={product}/>
                                        </Grid>

                                    )}
                                </>
                            }

                        </Grid>
                    </Grid>
                    <Grid sx={{marginTop:"20px"}} size={12}>
                        <div style={{display:"flex",justifyContent:"center"}}>
                            <Pagination count={maxPage} page={currentPage} onChange={handleChangePage}/>
                        </div>
                    </Grid>
                </>
            }
        </>
    )
}