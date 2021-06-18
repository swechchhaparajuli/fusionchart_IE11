



export const displayType = (display: string, dataSource) => {
    
    return {
        type: display,
        grid: true,
        chart: true,
        payload: dataSource
        
    };
}
