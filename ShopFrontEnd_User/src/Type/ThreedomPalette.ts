import { createTheme } from '@mui/material/styles';

export const Threedom = createTheme({
    palette:{
        primary:{
            main: '#ed6c02',
            light: '#ff8f32',
            dark:'#2e1a01',
        },
        success:{
            main: '#00b584',
            light: '#01fbb0',
            dark: '#02976c',
            contrastText: '#f6f6f6',
        },
        secondary:{
            main: '#5b7fff',
            light: '#03a9f4',
            dark: '#0376aa',
            contrastText: '#ffffff',
        },
        // @ts-expect-error
        white:{
            main: '#dfe0df',
            light: '#ffffff',
            dark: '#acabab',
            contrastText: '#040404',
        }
    }
}
);
