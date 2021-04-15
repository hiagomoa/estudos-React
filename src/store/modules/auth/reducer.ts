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
    console.log("DENTRO DO REDUCER: " + JSON.stringify(state), action)
    switch (action.type) {
        case 'LOG_USER': {
            const { data, token } = action.payload.data
            console.log("JJJJJJJJJJ" + JSON.stringify(data))
            state.token = token;
            state.data= data;
            console.log("PPPPPPPPPPPPPPPPPPPPpp " + JSON.stringify(state))
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