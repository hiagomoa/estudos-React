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
    const [modalSignInisOpen, setModalSignInisOpen] = useState(false);

    const auth = useSelector<IState, Data>(state => state.auth);
    const dispatch = useDispatch();

    console.log("REDUX: " +  auth.token)
    const [dados, setDados] = useState<AuthState>(() => {
        const token = localStorage.getItem('@MeuSite:token');
        const data = localStorage.getItem('@MeuSite:user');

        if (token && data) {
            //const logged = true;
            //return { store.auth.token, logged, data: JSON.parse(data) };
            return {token:token, data:JSON.parse(data) }
        }
        return {} as AuthState;
    });
    const history = useHistory();


    //console.log("TTTTT" +user );
   

    function handleOpenModal() {
        setModalSignInisOpen(true)
    }

    function handleCloseModal() {
        setModalSignInisOpen(false)
    }

    async function handleActionLogin(event: FormEvent) {
        event.preventDefault();
        console.log("ENTROUUUU")
        await loginUser(email, password);
        history.push("/dashboard")
    }

   const handleAddLoginUser = useCallback((data:Data)=>{
        dispatch(log_user(data))
    }, [dispatch])

    async function loginUser(email: String, password: String) {

        await api.post('/auth/searcher', {
            "email": email,
            "password": password
        }).then(function (response) {
            const retorno = response.data;
            const { token, data } = response.data;
            console.log("OPAAAAAAA " + token)
            localStorage.setItem('@MeuSite:token', token);
            localStorage.setItem('@MeuSite:user', JSON.stringify(data));
            handleAddLoginUser({token, data})
        }).catch(function (error) {
            console.log(" triste");
        });
        
    }
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

                    <a href="forgot">Esqueci minha senha</a>

                </form>
                <Link to="/signup">
                    <FiLogIn />
                    Criar conta
                </Link>
                <Modal
                    isOpen={modalSignInisOpen}
                    onRequestClose={handleCloseModal}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <h2 id="input5"
                        data-testid="text-modal">Login foi mal sucedido</h2>
                </Modal>
            </Content>
            <Background />
        </Container>
    )
}