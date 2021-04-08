import { FormEvent, useState } from 'react'
import {Container, Content, Background} from './styles';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import { FiLogIn } from 'react-icons/fi'
import { apiCadastro } from '../../services/apiCadastro';

import logo from '../../assets/Proffy.svg'

export function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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
        await apiCadastro.post('/users/all1', {
            "email":"hiagosilva@gmail.com",
            "name": "Hiago Silva",
            "password": "aaaaaaaaaaaa"
        }).then(function (response) {
            const retorno = response.data;
            handleOpenModal();
            console.log(retorno);
        }).catch(function (error) {
            console.log(" triste");
        });

    }

    return(
        <Container>
            <Background/>
            <Content>
                <img src={logo} alt="MyLogo"/>
                <form onSubmit={handleActionLogin}>
                    <h1>Faça seu Cadastro</h1>

                    <input 
                    placeholder="Nome"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    />

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
                </form>
                <Link to="/">
                    <FiLogIn/>
                    Fazer Login
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
            
        </Container>
    )
}