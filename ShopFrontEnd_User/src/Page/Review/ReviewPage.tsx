import {Divider, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import ReviewAbleTab from "./Component/ReviewAbleTab.tsx";
import AllReviewTab from "./Component/AllReviewTab.tsx";
import {useUserInfo} from "../../State/User.ts";
import {Navigate} from "react-router";

export default function ReviewPage(){
    const [value, setValue] = useState(0);

    // @ts-ignore
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    useEffect(()=>{
        document.title="Các review"
    },[])
    const userInfo=useUserInfo(state=>state.user);
    if((!userInfo.isLogged) && userInfo.userName!=='default'){
        return <Navigate to={"/"}></Navigate>
    }
    return(
        <Container maxWidth="lg">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                allowScrollButtonsMobile
            >
                <Tab label="Chưa review" />
                <Tab label="Tất cả review" />
            </Tabs>
            <Divider sx={{marginBottom:"10px"}}/>
            {value===0 && <ReviewAbleTab  />}
            {value===1 && <AllReviewTab  />}
        </Container>
    )
}