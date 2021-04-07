import {createContext, ReactNode, useState} from 'react';
import { api } from '../services/api';


interface Data{
    token: String;
    data:{
        id: String;
        name: String;
        email: String;
    }

}

interface ContextLoginProvider{
    children: ReactNode;
}

interface TransactionsContextData{
    dados: Data[];
    loginUser:(email: String, password:String) => void;

}

export const ContextLogin = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);


export function ContextLoginProvider({children}: ContextLoginProvider ){
    const [dados, setDados] = useState<Data[]>([]);


    async function loginUser(email: String, password: String){
        await api.post('/auth/search', {
            email: email,
            password: password
        }).then(function (response) {
            const retorno:Data = response.data;
            setDados([retorno]);
            console.log(dados);
            //handleOpenModal();
                     
        }).catch(function (error) {
            console.log(" triste");
          });
    }

    return(
        <ContextLogin.Provider value={{dados, loginUser}}>
            {children}
        </ContextLogin.Provider>
    )
}