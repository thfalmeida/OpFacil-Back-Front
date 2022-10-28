import React from "react";
import axios from 'axios';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { configURL } from "../setup/setup";
import { criar_mercado } from "./criar_mercado_obj";

export default function NewMercadoModel({...props}){
    let {newModal, setNewModal, callback} = props;

    const nomeInputText = document.getElementById("edit_nick");
    const nickInputText = document.getElementById("edit_nome");
    const enderecoInputText = document.getElementById("edit_endereco");

    const hadleConfirmNewClick = async () => {
        let nome = nomeInputText.value;
        let endereco = enderecoInputText.value
        let nick = nickInputText.value;
        let newConto = criar_mercado(nome, endereco, nick)
        
        try{
            await axios.post(configURL + 'mercado/cadastrar/', newConto)
            callback("success", "Mercado cadastrado com sucesso")
        }catch(error){
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

        setNewModal(false);
    } 

    return (
        <>
            <Dialog open={newModal} onClose={() => setNewModal(false)}> 
                <DialogTitle>
                    {"Cadastrar novo motorista:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nome" label="Nome" variant="outlined" />
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nick" label="Razao Social" variant="outlined" />
                        <TextField style={{ flex: 1, width: "100%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_endereco" label="Endereço" variant="outlined" />
                    </Box>

                    {/* <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá editar esse contato novamente.
                    </DialogContentText> */}
                    <DialogActions>
                        <Button onClick={() => setNewModal(false)}>Cancelar</Button>
                        <Button onClick={() => hadleConfirmNewClick()} autoFocus> Cadastrar </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}