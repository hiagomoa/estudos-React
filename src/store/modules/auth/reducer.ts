import { Reducer } from "redux";
import { Data } from './types'


const INITIAL_STATE: Data = {
    token: "",
    data: {
        id: "",
        name: "",
        email: "",
    }
}

const auth: Reducer<Data> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_USER': {
            const { data, token } = action.payload.data
            state.token = token;
            state.data= data;
            return {
                token,
                data
            }
        }
        default:{
            return state
        }
    }
}

export default auth;