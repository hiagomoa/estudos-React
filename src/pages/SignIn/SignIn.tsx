import { FormEvent, useEffect, useState, useContext } from 'react'
import Modal from 'react-modal';
import { Link, useHistory } from 'react-router-dom';
import {Container, Content, Background} from './styles';
import { FiLogIn } from 'react-icons/fi'
import { api } from '../../services/api';


import logo from '../../assets/Proffy.svg'
import { useAuth }  from '../../context/ContextLogin';

//Modal.setAppElement('#root');
export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseApi, setResponseApi] = useState({});
    const [modalSignInisOpen, setModalSignInisOpen] = useState(false);


    //const { logged, loginUser } = useContext(ContextLogin);
    //const useAuth = useContext(ContextLogin)
    const {logged, loginUser}=useAuth()
    const history = useHistory();


   //console.log("TTTTT" +user );
    function handleOpenModal(){
        setModalSignInisOpen(true)
    }

    function handleCloseModal(){
        setModalSignInisOpen(false)
    }

    async function handleActionLogin(event:FormEvent){
        event.preventDefault();
        console.log(email, password);
       // useAuth.loginUser(email, password)
       await loginUser(email, password);
        console.log("LLLLLLLLLLLLLLll")
       //console.warn("O VALOR DO DATA: "+ dados[0].data.email);
       
    }

    useEffect(()=>{
        if (logged == false){
            handleOpenModal()
        }
        console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK: "+logged)
        if(logged == true){
            console.log("TA AQUI")
            history.push("/dashboard")
        }
    },[logged])

    return(
        <Container>
            <Content>
                <img src={logo} alt="MyLogo"/>
                <form onSubmit={handleActionLogin}>
                    <h1 data-testid="titulo">Faça seu logon</h1>

                    <input 
                    placeholder="Email"
                    data-testid="id-email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    />

                    <input type="password" 
                    placeholder="Senha"
                    data-testid="id-senha"
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