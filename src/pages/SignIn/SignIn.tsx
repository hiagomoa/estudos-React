import { FormEvent, useEffect, useState, useContext } from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import {Container, Content, Background} from './styles';
import { FiLogIn } from 'react-icons/fi'
import { api } from '../../services/api';

import logo from '../../assets/Proffy.svg'
import { ContextLogin } from '../../context/ContextLogin';

Modal.setAppElement('#root');
export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseApi, setResponseApi] = useState({});
    const [modalSignInisOpen, setModalSignInisOpen] = useState(false);

    const {dados, loginUser} = useContext(ContextLogin);

    
    function handleOpenModal(){
        setModalSignInisOpen(true)
    }

    function handleCloseModal(){
        setModalSignInisOpen(false)
    }

    async function handleActionLogin(event:FormEvent){
        event.preventDefault();
        console.log(email, password);

       loginUser(email, password);
       console.log("O VALOR DO DATA: "+ dados);

    }

    useEffect(()=>{
        console.warn("USEEFFECT: " + responseApi)
    }, [responseApi])

    return(
        <Container>
            <Content>
                <img src={logo} alt="MyLogo"/>
                <form onSubmit={handleActionLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    />

                    <input type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    />

                    <button type="submit">Entrar</button>

                    <a href="forgot">Esqueci minha senha</a>
                </form>
                <Link to="/signup">
                    <FiLogIn/>
                    Criar conta
                </Link>
                <Modal
                isOpen={modalSignInisOpen}
                onRequestClose={handleCloseModal}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
                >
                    <h2>Login foi bem sucedido</h2>
                </Modal>
            </Content>
            <Background/>
        </Container>
    )
}