import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useMutation} from "@tanstack/react-query";
import {Response} from "../Type/Respone.ts";
import {useCart} from "../State/Cart.ts";

export default function HomePage() {
    const reFetch=useCart((state)=>state.reFetch)
    const {mutate}=useMutation({
        mutationFn:async (id:string)=>{
            const response = await fetch(`https://localhost:7075/api/Cart`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({productId:id})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                reFetch();
            }
            else {
                console.log(data);
            }
        }
    })
    return (
        <div style={{display:"flex",gap:2}}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={`https://localhost:7075/api/Products/SP-G4O1E3/Thumbnail`}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>mutate("SP-G4O1E3")} size="small">Share</Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={`https://localhost:7075/api/Products/SP-E0YGD3/Thumbnail`}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>mutate("SP-E0YGD3")} size="small">Share</Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={`https://localhost:7075/api/Products/SP-HV7IEX/Thumbnail`}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>mutate("SP-HV7IEX")} size="small">Share</Button>
                </CardActions>
            </Card>
        </div>
    );
}