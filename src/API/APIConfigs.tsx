import axios from "axios";

const client = axios.create({
    baseURL: "https://api.hatchways.io/assessment" 
  });

export function executeGetStudentsQuery (target:any) {
  return(  
    client.get(target).then((response) => {
      return response.data;
    })
  )
}