import {Grid, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function DiscountCodeCheckOut(){
    return (
        <>
            <Paper elevation={12} sx={{padding:"10px",marginBottom:"10px"}}>
                <Grid container spacing={1}>
                    <Grid size={9}>
                        <TextField
                            label="Mã giảm giá"
                            fullWidth
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid size={3}>
                        <Button fullWidth sx={{height:"100%"}} >Áp dụng</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={12} sx={{padding:"10px",marginBottom:"10px",display:"flex",justifyContent:"center"}}>
            </Paper>
        </>
    )
}