import styled from 'styled-components';
import signIn from '../../assets/sign-in-background.png'
import { shade } from 'polished'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    place-content:center;
    width: 100%;
    max-width: 700px;
    align-items: center;
    img{
        width:50%;
        display:flex;
        justify-content:center;
    }

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
            margin-bottom:24px;
        }

        input {
            background: #DCDCE5;
            border-radius: 10px;
            border: 2px solid #DCDCE5;
            padding: 16px;
            width: 100%;

            & + input{
                margin-top: 10px;
            }
        }

        button{
            background: #04D361;
            border-radius: 10px;
            height: 56px;
            border:0;
            padding: 0 16px;
            color: #DCDCE5;
            width: 100%;
            margin-top: 16px;
            transition: background-color 0.3s;

            &:hover {
                background: ${shade(0.2, '#04D361')};
            }
        }

        a {
            color: white;
            display: block;
            margin-top: 24px;
            text-decoration: none;

            &:hover {
                color: ${shade(0.2, '#FFFFFF')};
            }
        }


    }

    > a {
    color: #04D361;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#04D361')};
    }
  }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signIn}) no-repeat center;
    background-size:cover;

`;