import { FormEvent, useState } from 'react'
import {Container, Content, Background} from './styles';
import { FiLogIn } from 'react-icons/fi'
import { api } from '../services/api';

import logo from '../assets/Proffy.svg'

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleActionLogin(event:FormEvent){
        event.preventDefault();
        console.log(email, password);
    }

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
            </Content>
            <Background/>
        </Container>
    )
}