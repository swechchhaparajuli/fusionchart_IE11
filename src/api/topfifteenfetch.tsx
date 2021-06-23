

export function topFifteenValue(){
    return fetch("http://localhost:3000/TopFifteen")
          .then(res => res.json());
}