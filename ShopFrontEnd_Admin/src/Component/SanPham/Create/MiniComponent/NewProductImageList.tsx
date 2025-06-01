import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {Card, CardActions, CardMedia, Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";

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
export default function NewProductImageList(props:{productImage:any[],setProductImage:(value:any)=>void}) {
    const handleImageChange = (event:any) => {
        if(event.target.files){
            const list:any[]=[...props.productImage];
            // @ts-ignore
            Array.from(event.target.files).forEach(file=>{
                // @ts-ignore
                if (file.type==="image/png" || file.type==="image/jpeg") {
                    list.push(file);
                }
            })
            props.setProductImage(list);
        }
    }
    const deleteFromList=(index:number)=>{
        const reducedArr = [...props.productImage];

        reducedArr.splice(index, 1);

        props.setProductImage(reducedArr);
    }
    return(
        <>
            <Divider/>
            <h2 style={{textAlign:"center",marginBottom:0}}>Hình sản phẩm</h2>
            <div style={{display:"flex",gap:4,marginBottom:"10px", justifyContent:"center"}}>
                <Button
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
                {props.productImage.length>0 && <Button endIcon={<ClearIcon/>} variant="contained" onClick={()=>props.setProductImage([])} color="error">Clear</Button>}
            </div>

                <Grid sx={{border:"2px solid rgb(25, 118, 210)",borderRadius:"5px",backgroundColor:"rgba(25,118,210,0.13)",
                    padding:"15px",minHeight:"400px",maxHeight:"400px",overflowY:"scroll",
                    marginBottom:"10px"}} container spacing={2}>
                    {props.productImage.map((image:any,index)=>
                        <Grid sx={{display:"flex",justifyContent:"center"}} size={{sm:12,xs:12,md:6,lg:3}}>
                            <Card elevation={6} key={index} sx={{ backgroundColor:"rgba(181,208,236,0.56)",width: 250,height:310 }}>
                                <CardMedia
                                    sx={{ height: 250 }}
                                    image={URL.createObjectURL(image)}
                                    title="green iguana"
                                />
                                <CardActions sx={{display:"flex",justifyContent:"center"}}>
                                    <Button endIcon={<ClearIcon/>} size="large" variant="contained" color="error" onClick={()=>deleteFromList(index)}>Xóa</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>


        </>
    )
}