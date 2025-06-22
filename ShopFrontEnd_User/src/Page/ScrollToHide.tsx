import { Slide, useScrollTrigger } from "@mui/material";

const ScrollToHide01 = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: props.threshold,
        target: window()
    });

    return (
        <Slide appear={true} direction="down" in={!trigger}>

        </Slide>
    );
};

export default ScrollToHide01;
