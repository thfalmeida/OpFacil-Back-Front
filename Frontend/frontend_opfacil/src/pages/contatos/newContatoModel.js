import React, { useState } from "react";
import axios from 'axios';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import {criar_contato} from "./criar_contato_obj";
import {criar_empresa} from '../empresas/criar_empresa'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { configURL } from "../setup/setup";

export default function NewContato({...props}){
    let empresaEmpty = criar_empresa(-1, "", "", "");
    let {newModal, setNewModal, callback, empresas} = props;

    const [currentEmpresa, setCurrentEmpresa] = useState(empresaEmpty);

    const nomeInputText = document.getElementById("edit_nome");
    const emailInputText = document.getElementById("edit_email");
    const nickInputText = document.getElementById("edit_nick")

    const hadleConfirmNewClick = async () => {
        let nome = nomeInputText.value;
        let email = emailInputText.value;
        let nick = nickInputText.value;
        let empresa = currentEmpresa;
        let newContato = criar_contato(-1, nome, email, nick, empresa);
        
        try{
            await axios.post(configURL + 'contato/cadastrar/', newContato)
            callback("success", "Contato cadastrado com sucesso")
        }catch(error) {
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

        setNewModal(false);
    } 

    const handleSelectEmpresa = (event) => {
        setCurrentEmpresa(empresas.find(obj => {
            return obj.nick === event.target.value
        }))
        console.log(empresaEmpty)
    }

    return (
        <>
            <Dialog open={newModal} onClose={() => setNewModal(false)}>
                <DialogTitle>
                    {"Cadastrar novo contato:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nome" label="Nome" variant="outlined" />
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nick" label="Apelido" variant="outlined" />
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="edit_email" label="Email" variant="outlined" />
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="edit_empresa" label="Empresa" variant="outlined" value={currentEmpresa.nick}
                             select onChange={handleSelectEmpresa}>
                                {empresas.map((emp) => (
                                    <MenuItem key={emp.id} value={emp.nick}>
                                        {emp.nick}
                                    </MenuItem>
                                ))}
                        </TextField>
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