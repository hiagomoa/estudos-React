import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
::root {
    --background: #9871F5;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    @media (max-width: 1080px){
        font-size: 93.75%;
    }

    @media(max-width: 720px){
        font-size: 87.5%;
    }
}

body {
    background-color: #9871F5;
    -webkit-font-smoothing: antialiased;
}

button {
    cursor:pointer;
}

body, input, button{
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
}

[disabled]{
    opacity: 0.6;
    cursor: not-allowed;
}
`;
