import { Data } from "./types";

export function log_user(data: Data){
    return {
        type: 'LOG_USER',
        payload:{
            data
        }
    };
}