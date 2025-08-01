import {Accordion, AccordionDetails, AccordionSummary, Grid, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {validCode} from "./CreateOrderPage.tsx";
import {Response} from "../../Type/Respone.ts";
import {useAppError} from "../../State/AppErrorState.ts";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
export default function DiscountCodeCheckOut(props:{validCode:validCode,setValidCode:(value:any)=>void}){
    const [validCode,setValidCode] = useState<validCode[]>([]);
    const [codeInput, setCodeInput] = useState("");
    const handleCodeChange = (event:any)=>{
        setCodeInput(event.target.value);
    }
    const {data}=useQuery({
        queryKey:[`Valid_Code`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Discount-Codes/`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            if(data?.success){
                setValidCode(data.data)
            }
        }
    }, [data]);
    const globalError=useAppError()
    const VALIDATE=useMutation({
        mutationFn:async (code:string)=>{
            const response = await fetch(`https://localhost:7075/api/Discount-Codes`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                  code:code
                })
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.setValidCode(data.data)
            }
            else {
                globalError.setError(data.errorMessage)
            }
        }
    })
    return (
        <>
            <Paper elevation={12} sx={{padding:"15px",marginBottom:"10px"}}>
                <Grid container spacing={1}>
                    {props.validCode.id==="" ?
                        <>
                            <Grid size={9}>
                                <TextField

                                    onKeyDown={(event)=>{
                                        if(event.key === 'Enter'){
                                            VALIDATE.mutate(codeInput)
                                        }
                                    }}
                                    label="Mã giảm giá"
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                    value={codeInput}
                                    onChange={handleCodeChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <Button fullWidth sx={{height:"100%"}} loading={VALIDATE.isPending} onClick={()=>VALIDATE.mutate(codeInput)} >Áp dụng</Button>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid sx={{display:"flex",flexDirection:"column"}} size={11}>
                                <p className="manrope" style={{margin:"0"}}>Áp dụng mã giảm giá {props.validCode.name}</p>
                                <p className="manrope" style={{marginTop:"5px"}}>
                                    Giảm giá <span style={{fontWeight:"bolder",fontSize:"1.2em",color:"rgb(237, 108, 2)"}}>{props.validCode.percent}%</span></p>
                            </Grid>
                            <Grid size={1}>
                                <IconButton onClick={()=>props.setValidCode({
                                    id:"",
                                    name:"",
                                    description:"",
                                    percent:0,
                                    code:"",
                                })}>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </>
                    }

                </Grid>
            </Paper>
            {(validCode.length>0 && props.validCode.id==="") &&
                    <Accordion elevation={6} sx={{marginBottom:"10px"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography component="span">Tất cả mã giảm giá</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{maxHeight:200,overflowY:"auto"}}>
                            {validCode.map(code=>
                                <Paper key={code.id} elevation={4} sx={{padding:"10px",marginBottom:"20px",bgcolor:"rgba(212,255,203,0.15)"}}>
                                    <Grid container spacing={1}>
                                        <Grid size={10}><Typography variant="body1">{code.name}</Typography></Grid>
                                        <Grid size={2} sx={{border:"1px solid rgba(211,223,130,1)",bgcolor:"rgba(235,248,146,0.5)",borderRadius:"30%",textAlign:"center"}}><Typography variant="body1">{code.percent}%</Typography></Grid>
                                        <Grid size={12}><Typography variant="caption">{code.description}</Typography></Grid>
                                        <Grid size={12}>
                                            <Button loading={VALIDATE.isPending} color="success" onClick={()=>VALIDATE.mutate(code.code)} fullWidth>Áp dụng</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )}
                        </AccordionDetails>
                    </Accordion>
            }

        </>
    )
}