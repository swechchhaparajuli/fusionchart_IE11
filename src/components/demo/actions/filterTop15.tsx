
export const filterTopCount = (count: number) => {
    return {
        type:"TOPCOUNT",
        interval: count
    };
}

