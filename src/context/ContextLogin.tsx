import { createContext, ReactNode, useState, useContext } from 'react';
import { api } from '../services/api';
import { useHistory } from 'react-router-dom';



interface Data {
    token: String | "";
    data: {
        id: String | "";
        name: String | "";
        email: String | "";
    }
}

interface ContextLoginProvider {
    children: ReactNode;
}

interface AuthState {
    token: string;
    logged:boolean;
    data: object;
}

interface AuthContextData {
    user: object;
    logged: boolean;
    loginUser: (email: String, password: String) => Promise<void>;
}

export const ContextLogin = createContext<AuthContextData>(
    {} as AuthContextData
);


export function ContextLoginProvider({ children }: ContextLoginProvider) {
    const history = useHistory();

    const [dados, setDados] = useState<AuthState>(() => {
        const token = localStorage.getItem('@MeuSite:token');
        const data = localStorage.getItem('@MeuSite:user');

        if (token && data) {
            const logged = true;
            return { token, logged, data: JSON.parse(data) };
        }


        return {} as AuthState;
    });


    async function loginUser(email: String, password: String) {

        await api.post('/auth/searcher', {
            "email": email,
            "password": password
        }).then(function (response) {
            const retorno = response.data;
            const { token, data } = response.data;

            localStorage.setItem('@MeuSite:token', token);
            localStorage.setItem('@MeuSite:user', JSON.stringify(data));
            let logged = true; 

            setDados({ token,logged, data });
            console.log("RETORNO " + JSON.stringify(retorno))
            
           
        }).catch(function (error) {
            let logged = false; 
            setDados({logged} as AuthState);
            console.log(" triste");
        });

    }

    return (
        <ContextLogin.Provider value={{ user:dados.data, logged:dados.logged , loginUser }}>
            {children}
        </ContextLogin.Provider>
    )
}

export function useAuth(){
    const context = useContext(ContextLogin);
  
    return context;
  }