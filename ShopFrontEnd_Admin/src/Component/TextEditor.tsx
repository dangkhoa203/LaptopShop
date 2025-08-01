import Editor, {
    BtnBold,
    BtnItalic,
    BtnStyles,
    BtnLink,
    BtnBulletList,
    BtnNumberedList,
    BtnClearFormatting,
    BtnUnderline,
    BtnUndo,
    BtnRedo,
    Toolbar
} from 'react-simple-wysiwyg';
import Divider from "@mui/material/Divider";
export default function TextEditor(props:{description:string,setDescription:(value:any)=>void,color:string}) {
    function onChange(e:any) {
        props.setDescription(e.target.value);
    }

    return (
        <Editor  value={props.description} style={{fontWeight:400,minHeight:"300px",border:`2px solid ${props.color}`}} onChange={onChange} >
            <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline/>
                <BtnLink/>
                <Divider orientation="vertical" sx={{marginRight:1}} flexItem />
                <BtnNumberedList />
                <BtnBulletList/>
                <Divider orientation="vertical" sx={{marginRight:1}} flexItem />
                <BtnStyles/>
                <BtnClearFormatting/>
                <Divider orientation="vertical" sx={{marginRight:1}} flexItem />
                <BtnUndo/>
                <BtnRedo/>
            </Toolbar>
        </Editor>
    );
}