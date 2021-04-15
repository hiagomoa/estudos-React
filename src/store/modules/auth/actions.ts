import { Data } from "./types";

export function log_user(data: Data){
    console.log("DENTRO DA ACTION: " + JSON.stringify(data))
    return {
        type: 'LOG_USER',
        payload:{
            data
        }
    };
}