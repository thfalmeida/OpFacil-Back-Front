import axios from 'axios';

export const GetEmpresas = async () => {
    const res = await axios('http://localhost:8080/empresa/list');
    return res;
}