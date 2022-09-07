import React from "react"

import { Routes , Route } from 'react-router-dom';


import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import HomeIndex from '../pages/home/homePage';
import ContatoIndex from '../pages/contatos/contatosPage';
import MotoristaIndex from "../pages/motorista/motoristaPage";
import EmpresaIndex from "../pages/empresas/empresaPage";
import ViagemIndex2 from "../pages/viagens/viagensPage2";
import MercadoIndex from "../pages/mercados/mercadoPage";
import SetupPage from "../pages/setup/setup";


export default function Rotas(){
    return(
        <Routes>
            <Route element = { <HomeIndex/> }  path="/" exact />
            <Route element = { <ContatoIndex/> }  path="/contato" />
            <Route element = { <MotoristaIndex/> } path='/motorista' />
            <Route element = { <EmpresaIndex/>} path ='/empresa' />
            <Route element = { <ViagemIndex2/>} path ='/viagem' />
            <Route element = { <MercadoIndex/>} path = '/mercado' />
            <Route element = { <SetupPage/>} path= '/setup' />
        </Routes>


    )
}

export const MapRoutes = {
    "home":{
        "title": "Página inicial",
        "rota":"/",
        "ico": <HomeIcon/>
    },
    "contato":{
        "title": "Contatos",
        "rota":"/contato",
        "ico": <ContactMailIcon/>
    },
    "motorista":{
        "title": "Motoristas",
        "rota":"/motorista",
        "ico": <AssignmentIndIcon/>
    },
    "viagem":{
        "title": "Viagens",
        "rota":"/viagem",
        "ico": <LocalShippingIcon/>
    },
    "empresa":{
        "title": "Empresas",
        "rota":"/empresa",
        "ico": <BusinessIcon/>
    },
    "mercado":{
        "title": "Mercados",
        "rota":"/mercado",
        "ico": <LocalMallIcon/>
    }
    

}