import type { ICellRendererParams } from 'ag-grid-community';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
export function YesNoField(params: ICellRendererParams) {
    const picture=<div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"100%",height:"100%",alignItems:"center"}}>
        {params ? <DoneIcon fontSize="large" color={"success"}></DoneIcon> : <CloseIcon fontSize="large" color={"error"}></CloseIcon>}
    </div>
    return picture;
}