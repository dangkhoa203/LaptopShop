import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {Card, CardActions, CardMedia, Grid, LinearProgress} from "@mui/material";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from '@mui/icons-material/Save';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Response} from "../../../../Type/Respone.ts";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function UpdateImage(props:{id:string}) {
    const [oldImages,setImages]=useState<string[]>([]);
    const [success,setSuccess]=useState<boolean>(false);
    const {data,isPending,refetch}=useQuery({
        queryKey:[`product_images_${props.id}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Images`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            if(data.success) {
                setSuccess(data.success)
                setImages(data.data)
            }
        }
    }, [data]);
    const [newImages,setNewImages]=useState<any[]>([]);
    const handleImageChange = (event:any) => {
        if(event.target.files){
            const list:any[]=[...newImages];
            // @ts-ignore
            Array.from(event.target.files).forEach(file=>{
                // @ts-ignore
                if (file.type==="image/png" || file.type==="image/jpeg") {
                    list.push(file);
                }
            })
            setNewImages(list);
        }
    }
    const deleteFromList=(index:number)=>{
        const reducedArr = [...newImages];

        reducedArr.splice(index, 1);

        setNewImages(reducedArr);
    }
    const [globalError,setGlobalError]=useState("")
    const toFormData=()=>{
        const formdata=new FormData();
        newImages.forEach((item,index)=>{
            formdata.append(`images[${index}]`,item);
        })
        return formdata;
    }
    const ADD=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Images`, {
                method: 'POST',
                credentials: 'include',
                body: toFormData()
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setGlobalError("")
                setNewImages([])
                refetch()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    const [deleteLoading,setDeleteLoading]= useState<string[]>([]);
    const DELETE=useMutation({
        mutationFn:async (id:string)=>{
            setGlobalError("")
            setDeleteLoading([...deleteLoading,id]);
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Images/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({id:id})
            })
            const data= await response.json()
            setDeleteLoading(deleteLoading.filter(i=>i!==id));
            return data;
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setGlobalError("")
                refetch()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    return(
        <>
            <Divider/>
            <h2 style={{textAlign:"center",marginBottom:0}}>Hình sản phẩm</h2>
            {isPending? <LinearProgress />
                :
                <>
                    {!success ?
                        <div style={{textAlign:"center"}}>
                            <h2>Lỗi đã xảy ra</h2>
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <Button onClick={()=>refetch()} variant="contained" sx={{fontSize:"1.3em"}}>Tải lại</Button>
                            </div>
                        </div>
                        :
                        <>
                            <div style={{display:"flex",gap:4,marginBottom:"10px", justifyContent:"center"}}>
                                <Button
                                    color="warning"
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    endIcon={<FileUploadIcon/>}
                                >
                                    Tải hình lên
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleImageChange}
                                        multiple
                                    />
                                </Button>
                                {newImages.length>0 && <Button loading={ADD.isPending} loadingPosition={"end"} endIcon={<ClearIcon/>} variant="contained" onClick={()=>setNewImages([])} color="error">Clear</Button>}
                                {newImages.length>0 && <Button loading={ADD.isPending} loadingPosition={"end"} endIcon={<SaveIcon/>} variant="contained" onClick={()=>ADD.mutate()} color="success">Lưu</Button>}
                            </div>
                            <div style={{color:"red",textAlign:"center",marginBottom:"10px"}}>
                                {globalError}
                            </div>
                            <Grid sx={{border:"2px solid rgb(237, 108, 2)",borderRadius:"5px",backgroundColor:"rgba(237, 108, 2,0.13)",
                                padding:"15px",minHeight:"400px",maxHeight:"400px",overflowY:"auto",
                                marginBottom:"10px"}} container spacing={2}>
                                {oldImages.map((image:any)=>
                                    <Grid sx={{display:"flex",justifyContent:"center"}} size={{sm:12,xs:12,md:6,lg:3}}>
                                        <Card elevation={6} key={image} sx={{ backgroundColor:"rgba(237, 108, 2,0.56)",width: 250,height:310 }}>
                                            <CardMedia
                                                sx={{ height: 250 }}
                                                image={`https://localhost:7075/api/Admin/Product/${props.id}/Images/${image}`}
                                                title="green iguana"
                                            />
                                            <CardActions sx={{display:"flex",justifyContent:"center"}}>
                                                <Button loading={deleteLoading.includes(image)} endIcon={<ClearIcon/>} size="large" variant="contained" color="error" onClick={()=>DELETE.mutate(image)}>Xóa</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )}
                                {newImages.map((image:any,index)=>
                                    <Grid sx={{display:"flex",justifyContent:"center"}} size={{sm:12,xs:12,md:6,lg:3}}>
                                        <Card elevation={6} key={index} sx={{ backgroundColor:"rgba(237, 108, 2,0.56)",width: 250,height:310 }}>
                                            <CardMedia
                                                sx={{ height: 250 }}
                                                image={URL.createObjectURL(image)}
                                                title="green iguana"
                                            />
                                            <CardActions sx={{display:"flex",justifyContent:"center"}}>
                                                <Button endIcon={<ClearIcon/>} size="large" variant="contained" color="error" onClick={()=>deleteFromList(index)}>Xóa ảnh mới</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        </>
                    }

                </> }
        </>
    )
}