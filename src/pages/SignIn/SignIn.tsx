import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal';
import {Container, Content, Background} from './styles';
import { FiLogIn } from 'react-icons/fi'
import { api } from '../../services/api';

import logo from '../../assets/Proffy.svg'

Modal.setAppElement('#root');
export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseApi, setResponseApi] = useState({});
    const [modalSignInisOpen, setModalSignInisOpen] = useState(false);

    
    function handleOpenModal(){
        setModalSignInisOpen(true)
    }

    function handleCloseModal(){
        setModalSignInisOpen(false)
    }

    async function handleActionLogin(event:FormEvent){
        event.preventDefault();
        console.log(email, password);
        await api.post('/auth/search', {
            email: email,
            password: password
        }).then(function (response) {
            const retorno = JSON.stringify(response.data);
            setResponseApi(retorno);
            handleOpenModal();
                     
        }).catch(function (error) {
            console.log(" triste");
          });

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
                <a href="">
                    <FiLogIn/>
                    Criar conta
                </a>
                <Modal
                isOpen={modalSignInisOpen}
                onRequestClose={handleCloseModal}
                >
                    <h2>Login foi bem sucedido</h2>
                </Modal>
            </Content>
            <Background/>
        </Container>
    )
}