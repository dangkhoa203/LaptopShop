import {useEffect, useState} from "react";
import {ProductData} from "../../Type/ProductData.ts";
import {useQuery} from "@tanstack/react-query";
import Container from "@mui/material/Container";
import {
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    Pagination,
    Select,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainPageProductCard from "./Component/ProductCard.tsx";

export default function BrandPage(props:{title:string,categoryId:string,isMain:boolean,brandTag:string}) {
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


    const {data,refetch,isFetching}=useQuery ({
        queryKey: [`Category_${props.categoryId}_${props.brandTag}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{// @ts-ignore
            const response = await fetch(`https://localhost:7075/api/Category/${props.isMain ? "Main":"Sub"}/${props.categoryId}?sortMode=${sortMode}&page=${currentPage}&brands=${props.brandTag}`, {
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
        refetch();
        window.scrollTo(0, 0)
    }, [currentPage]);
    useEffect(()=>{
        document.title=props.title
    },[])
    return (
        <Container>
            <Grid container spacing={0}>
                <Grid size={8}>
                    <Typography variant="h5" color="textSecondary">{props.title}</Typography>
                </Grid>
                <Grid sx={{display:"flex",justifyContent:"end"}} size={4}>
                    <FormControl size={"small"} sx={{width:'auto'}}>
                        <Select
                            sx={{fontWeight:"bold"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
                    <Typography variant="h6" color="textSecondary">Có <span style={{fontWeight:"bolder"}}>{total}</span> sản phẩm</Typography>
                </Grid>
                <Grid sx={{marginY:"20px"}} size={12}>
                    <Divider />
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
                                    <Grid size={{xs:6,sm:6,md:4,lg:3}}>
                                        <MainPageProductCard product={product}/>
                                    </Grid>

                                )}
                            </>
                        }

                    </Grid>
                </Grid>
                <Grid sx={{marginTop:"20px"}} size={12}>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        {maxPage>1 && <Pagination count={maxPage} page={currentPage} onChange={handleChangePage}/>}
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
