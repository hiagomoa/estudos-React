import { FormEvent, useState } from 'react'
import {Container, Content, Background} from './styles';
import { Link } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi'
import { api } from '../../services/api';

import logo from '../../assets/Proffy.svg'

export function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


   async function handleActionLogin(event:FormEvent){
        event.preventDefault();
        console.log(email, password);
        await api.post('/auth/search', {
            email: email,
            password: password
        })

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
                    value={email}
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
            </Content>
            
        </Container>
    )
}