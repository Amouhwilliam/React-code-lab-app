import  { executeGetStudentsQuery } from "./APIConfigs";

export function getStudents() {
    let target = "/students";
    return executeGetStudentsQuery(target);
}
  