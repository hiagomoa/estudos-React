import { FormEvent, useEffect, useState, useContext, useCallback } from 'react'
import Modal from 'react-modal';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import { FiLogIn } from 'react-icons/fi'
import { api } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux'


import logo from '../../assets/Proffy.svg'
import { log_user } from '../../store/modules/auth/actions';
import { Data } from '../../store/modules/auth/types';
import { IState } from '../../store';

interface AuthState {
    token: string;
    data: object;
}
//Modal.setAppElement('#root');
export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(false);
    const [notLog, setNotLog] = useState(true)

    const auth = useSelector<IState, Data>(state => state.auth);
    const dispatch = useDispatch();

    const handleAddLoginUser = useCallback((data: Data) => {
        dispatch(log_user(data))
    }, [dispatch])


    const [dados, setDados] = useState<AuthState>(() => {
        const token = localStorage.getItem('@MeuSite:token');
        const data = localStorage.getItem('@MeuSite:user');

        if (token && data) {
            //const logged = true;
            //return { store.auth.token, logged, data: JSON.parse(data) };
            handleAddLoginUser({ token, data: JSON.parse(data) })
            return { token, data: JSON.parse(data) }
        }
        return {} as AuthState;
    });
    const history = useHistory();

    async function handleActionLogin(event: FormEvent) {
        event.preventDefault();
        console.log("ENTROUUUU")
       var log = await loginUser(email, password);
       if(log == 0){
           
           console.log("EEEEEEEEEE? " + notLog)
       }
       
        history.push("/dashboard")
    }

    async function loginUser(email: String, password: String) {
      const retorno =  await api.post('/auth/searcher', {
            "email": email,
            "password": password
        }).then(function (response) {
            const retorno = response.data;
            const { token, data } = response.data;
            console.log("OPAAAAAAA " + JSON.stringify(response))
            console.log("AAAAAAAA: " + token)
            localStorage.setItem('@MeuSite:token', token);
            localStorage.setItem('@MeuSite:user', JSON.stringify(data));
            setDados({ token, data })
            handleAddLoginUser({ token, data })
            return 1
        }).catch(function (error) {
            
            console.log(" triste" + notLog);
            return 0
        });

        return retorno

    }
    useEffect(()=>{
        console.log("NOVO VALOR " + notLog)
        setNotLog(false)
    },[dados]) 
    // useEffect(() => {
    //     // console.log("valor do logged: " + logged)
    //     // if (logged == false) {
    //     //     handleOpenModal()
    //     // }
    //     if (logged == true) {
    //         history.push("/dashboard")
    //     }
    // }, [logged])

    return (
        <Container>
            <Content>
                <img src={logo} alt="MyLogo" />
                <form onSubmit={handleActionLogin}>
                    <h1 data-testid="titulo">Faça seu logon</h1>

                    <input
                        placeholder="Email"
                        id="input1"
                        data-testid="id-email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <input type="password"
                        placeholder="Senha"
                        id="input2"
                        data-testid="id-senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    <button type="submit">Entrar</button>
                    {!notLog &&
                        <h2>Email ou senha incorretos</h2>
                    }

                    <a href="forgot">Esqueci minha senha</a>

                </form>

                <Link to="/signup">
                    <FiLogIn />
                    Criar conta
                </Link>
            </Content>
            <Background />
        </Container>
    )
}