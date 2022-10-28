import React, { useState } from "react";
import axios from 'axios';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { configURL } from "../setup/setup";
import { contatoEmpty, criar_contato } from "./criar_contato_obj";

export default function EditarContatoModal({...props}) {
    let{editModal, setEditModal, contatoToEdit, setContatoToEdit, 
        callback, empresas} = props;


    const [currentEmpresa, setCurrentEmpresa] = useState(contatoEmpty);

    const nomeInputText = document.getElementById("edit_nome");
    const emailInputText = document.getElementById("edit_email");
    const nickInputText = document.getElementById("edit_nick")


    const handleSelectEmpresa = (event) => {
        setCurrentEmpresa(empresas.find(obj => {
            return obj.nick === event.target.value
        }))
    }

    const hadleConfirmEditClick = async () => {
        let id = contatoToEdit.id;
        let nome = nomeInputText.value;
        let email = emailInputText.value;
        let nick = nickInputText.value;
        let empresa = currentEmpresa;
        let editedContato = criar_contato(id,nome, email, nick, empresa);
        
        console.log(editedContato);

        try{
            await axios.put(configURL + 'contato/atualizar/' + editedContato.id, editedContato)
            callback("success", "Contato alterado com sucesso")
        }catch(error) {
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

        setEditModal(false);
        setContatoToEdit(contatoEmpty);
    }

    return (
        <>
            <Dialog open={editModal} onClose={() => setEditModal(false)}>
                <DialogTitle>
                    {"Alterar contato:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                        {/* Id */}
                        <TextField style={{ flex: 1, width: "20%", height: 50, color: "#FFF", textAlignVertical: "right", display: "block" }}
                            id="edit_id" label="Id" variant="outlined" disabled defaultValue={contatoToEdit.id} />
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nome" label="Nome" variant="outlined" defaultValue={contatoToEdit.nome} />
                        <TextField  style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nick" label="Apelido" variant="outlined" defaultValue={contatoToEdit.nick} />
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="edit_email" label="Email" variant="outlined" defaultValue={contatoToEdit.email} />
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

                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá editar esse contato novamente.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setEditModal(false)}>Cancelar</Button>
                        <Button onClick={() => hadleConfirmEditClick()} autoFocus> Editar </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}