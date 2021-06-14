

export const displayType = (display: string) => {
    let chartdis = false;
    let griddis = false;
    if(display == "GRID") {chartdis = !griddis}
    if(display == "CHART") {griddis = !chartdis}  
    return {
        type: display,
        chart: chartdis,
        grid: griddis
    };
}
