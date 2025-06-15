export interface User {
name:string;
email:string;
password:string;
gender:"male"|"female"|"other";
age:number;
height:number;
weight:number;
role:string;
}

export interface LoginReq {
    email: string;
    password: string;
}