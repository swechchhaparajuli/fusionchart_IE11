



export const displayType = (display: string) => {
    let chartdis = true;
    let griddis = true;
    if(display == "GRID") {chartdis = !griddis}
    if(display == "CHART") {griddis = !chartdis}  
    return {
        type: display,
        chart: chartdis,
        grid: griddis
    };
}
