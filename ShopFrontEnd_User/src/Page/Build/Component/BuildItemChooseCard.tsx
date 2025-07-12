import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {CircularProgress, Dialog, DialogContent, Divider, Pagination, TextField} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import DialogActions from "@mui/material/DialogActions";
import {ProductData} from "../../../Type/ProductData.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useUserInfo} from "../../../State/User.ts";
import {buildProduct} from "../PCBuilderPage.tsx";
import {Response} from "../../../Type/Respone.ts";
import {useAppError} from "../../../State/AppErrorState.ts";

export default function BuildItemChooseCard(props:{componentName:string,categoryId:string,product:buildProduct|undefined,reFetchBuild:()=>void}) {
    const userInfo = useUserInfo(state=>state.user);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [products, setProducts] = useState<ProductData[]>([]);
    const [maxPage, setMaxPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // @ts-ignore
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const [search,setSearch]=useState("");
    const handleSearchChange=(e:any)=>{
        setSearch(e.target.value);
    }

    const [currentSearching, setCurrentSearching]=useState("");
    const [totalProducts,setTotalProducts]=useState<number>(0);
    const {data,refetch,isFetching}=useQuery({
        queryKey: [`build_product_${props.categoryId}`],
        enabled:userInfo.isLogged && open ,
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            if(!props.product){
                const response = await fetch(`https://localhost:7075/api/Build/Product/${props.categoryId}?search=${encodeURIComponent(currentSearching)}&page=${currentPage}`, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method:"GET",
                });
                return await response.json();
            }
            return []
        },
    })

    const error=useAppError()
    const ADD=useMutation({
        mutationFn:async (productId: string)=>{
            const response = await fetch(`https://localhost:7075/api/Build`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    productId: productId,
                    componentName:props.categoryId,
                })
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.reFetchBuild()
                handleClose()
            }
            else {
                error.setError(data.errorMessage)
            }
        }
    })
    useEffect(() => {
        refetch();
    }, [currentPage]);
    useEffect(() => {
        if(currentPage===1)
            refetch()
        else
            setCurrentPage(1)
    }, [currentSearching]);
    useEffect(() => {
        if(data){
            if(data?.success){
                setProducts(data.data.products)
                setMaxPage(data.data.maxPage)
                setTotalProducts(data.data.total)
            }

        }
    }, [data]);
    return(
        <>
            <Card  sx={{ display: 'flex',justifyContent:"center",marginBottom:"10px",minHeight:"193px" }} elevation={3}>
                <CardContent sx={{minWidth:"100%",paddingX:"5px",display:"flex",flexDirection:"column",margin:"auto"}}>
                    <Typography textAlign="center" component={"div"} sx={{width:"100%",fontSize:"2.6em"}}  variant="h6">
                        {props.componentName}
                    </Typography>
                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <Button onClick={handleClickOpen} variant={"contained"} color={"success"} sx={{width:"130px"}}>Chọn</Button>
                    </div>
                </CardContent>
            </Card>
            <Dialog
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <Container sx={{marginTop:"10px"}}>
                    <Typography textAlign="center" variant="h4">
                        {props.componentName}
                    </Typography>
                    <div style={{display:"flex",gap:5}}>
                        <TextField sx={{marginBottom:"10px"}} onChange={handleSearchChange} value={search} fullWidth  label="Search" color="secondary" variant="outlined" />
                        <Button sx={{height:"56px"}} variant={"contained"} onClick={()=> {
                            setCurrentSearching(search);

                        }} color={"secondary"}>Search</Button>
                    </div>
                    <div style={{display:"flex",gap:5}}>
                        <Typography>
                            Tổng số lượng: {totalProducts}
                        </Typography>
                        {currentSearching!=="" &&
                            <>
                                <Divider orientation="vertical" flexItem/>
                                <Typography>
                                    Đang tìm: "{currentSearching}"
                                </Typography>
                            </>
                        }
                    </div>

                </Container>

                <DialogContent sx={{minHeight:"380px"}}>
                    {isFetching ?
                        <Container sx={{textAlign:"center"}}>
                            <CircularProgress sx={{fontSize:"4em"}}/>
                        </Container>

                        :
                        <>
                            {
                                products.map(data=>
                                    <>
                                        <Card key={data.id} sx={{ display: 'flex',justifyContent:"center",marginBottom:"10px",gap:1 }} elevation={3}>
                                            <CardMedia
                                                component="img"
                                                sx={{ margin:"auto",width: 60,height:60 }}
                                                image={`https://localhost:7075/api/Products/${data.id}/Thumbnail`}
                                                alt="Live from space album cover"
                                            />
                                            <Container sx={{ borderLeft:"1px solid black",display: 'flex', justifyContent:"space-between" }}>
                                                <CardContent sx={{minWidth:"100%",paddingX:"5px"}}>
                                                    <Typography className="ProductName"  component="p" >
                                                        {data.name}
                                                    </Typography>
                                                </CardContent>
                                            </Container>
                                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",minWidth:"100px"}}>
                                                <div style={{display:"flex",justifyContent:"center"}}>
                                                    <Typography variant="subtitle2" component={"p"} sx={{margin:"auto",textDecoration:"line-through"}}>
                                                        {data.isDiscount ? data.price.toLocaleString(undefined, {minimumFractionDigits: 0}) + " VNĐ":" "}
                                                    </Typography>
                                                </div>
                                                <div style={{display:"flex",justifyContent:"center"}}>
                                                    <Typography variant="subtitle1" component={"p"} sx={{margin:"auto"}}>
                                                        {data.isDiscount ? data.priceAfterDiscount.toLocaleString(undefined, {minimumFractionDigits: 0}) + " VNĐ":data.price.toLocaleString(undefined, {minimumFractionDigits: 0}) + " VNĐ"}
                                                    </Typography>
                                                </div>
                                            </div>
                                            {data.quantity>0?
                                                <Button sx={{minWidth:"85px"}} loading={ADD.isPending} color={"success"} variant={"contained"} onClick={()=>ADD.mutate(data.id)}>Chọn</Button>
                                                :
                                                <Button sx={{minWidth:"85px"}} disabled  variant={"contained"} >Hết hàng</Button>
                                            }

                                        </Card>
                                    </>
                                )
                            }
                        </>
                    }

                </DialogContent>
                <DialogActions sx={{display:"flex",justifyContent:"center"}}>
                    {maxPage>1 && <Pagination count={maxPage} page={currentPage} onChange={handleChange}/>}
                </DialogActions>
            </Dialog>
        </>
    )
}