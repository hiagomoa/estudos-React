import axios from 'axios';

export const apiCadastro = axios.create({
    baseURL:"http://localhost:8001",
});