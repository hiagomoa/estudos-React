import { FormEvent, useEffect, useState, useContext } from 'react'
import Modal from 'react-modal';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import { FiLogIn } from 'react-icons/fi'
import { api } from '../../services/api';


import logo from '../../assets/Proffy.svg'
import { useAuth } from '../../context/ContextLogin';

//Modal.setAppElement('#root');
export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseApi, setResponseApi] = useState({});
    const [modalSignInisOpen, setModalSignInisOpen] = useState(false);


    //const { logged, loginUser } = useContext(ContextLogin);
    //const useAuth = useContext(ContextLogin)
    const { logged, loginUser } = useAuth()
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
        //console.log(email, password);
        // useAuth.loginUser(email, password)
        await loginUser(email, password);
        if(logged===false){
            handleOpenModal()
        }
        //console.log("LLLLLLLLLLLLLLll")
        //console.warn("O VALOR DO DATA: "+ dados[0].data.email);

    }

    useEffect(() => {
        // console.log("valor do logged: " + logged)
        // if (logged == false) {
        //     handleOpenModal()
        // }
        if (logged == true) {
            history.push("/dashboard")
        }
    }, [logged])

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