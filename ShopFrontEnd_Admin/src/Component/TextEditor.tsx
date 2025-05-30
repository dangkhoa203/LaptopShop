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
export default function TextEditor(props:{description:string,setDescription:(value:any)=>void}) {

    function onChange(e:any) {
        props.setDescription(e.target.value);
    }

    return (
        <Editor value={props.description} style={{minHeight:"300px",border:"2px solid rgb(25, 118, 210)"}} onChange={onChange} >
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