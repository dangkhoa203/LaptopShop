import { themeQuartz, iconSetMaterial } from 'ag-grid-community';
export const myTheme_mini=themeQuartz
    .withPart(iconSetMaterial)
    .withParams({
        accentColor: "#1976D2",
        backgroundColor: "#FFFFFF",
        borderColor: "#0D56F985",
        columnBorder: true,
        fontFamily: {
            googleFont: "IBM Plex Mono"
        },
        fontSize: 12,
        foregroundColor: "#414756",
        headerFontFamily: {
            googleFont: "Roboto"
        },
        headerFontSize: 14,
        iconSize: 11,
        headerFontWeight: 600,
        headerRowBorder: true,
        headerTextColor: "#000000",
        rowBorder: true,
        wrapperBorder: true
    });
