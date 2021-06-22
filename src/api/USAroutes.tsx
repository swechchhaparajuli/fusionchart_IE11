
export function stateTotalValue(){
    return fetch("http://localhost:3000/USAroutes")
          .then(res => res.json());
}
