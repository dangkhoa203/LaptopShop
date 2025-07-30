import { themeQuartz, iconSetMaterial } from 'ag-grid-community';
export const myTheme=themeQuartz
    .withPart(iconSetMaterial)
    .withParams({
        accentColor: "#1976D2",
        backgroundColor: "#FFFFFF",
        borderColor: "#0D56F985",
        columnBorder: true,
        fontFamily: {
            googleFont: "Arimo",
        },
        fontSize: 17,
        foregroundColor: "#414756",
        headerFontFamily: {
            googleFont: "Open Sans",
        },
            headerVerticalPaddingScale: 1.5,
        headerFontSize: 20,
        headerFontWeight: 600,
        headerRowBorder: true,
        headerTextColor: "#000000",
        rowBorder: true,
        wrapperBorder: true
    });
