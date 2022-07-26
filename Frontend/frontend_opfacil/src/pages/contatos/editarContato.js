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
import { ContatoModel } from "./contatoModel";
import {EmpresaModel} from '../empresas/empresaModel'


export default function EditarContatoModal({...props}) {
    let{editModal, setEditModal, contatoToEdit, setContatoToEdit, 
        callback, empresas} = props;
    

    const [currentEmpresa, setCurrentEmpresa] = useState(EmpresaModel);

    const nomeInputText = document.getElementById("edit_nome");
    const emailInputText = document.getElementById("edit_email");
    const nickInputText = document.getElementById("edit_nick")


    const handleSelectEmpresa = (event) => {
        setCurrentEmpresa(empresas.find(obj => {
            return obj.nick == event.target.value
        }))
        console.log(currentEmpresa)
    }

    const hadleConfirmEditClick = async () => {
        let editedContato = {... ContatoModel}
        editedContato.id = contatoToEdit.id;
        editedContato.nome = nomeInputText.value;
        editedContato.email = emailInputText.value;
        editedContato.nick = nickInputText.value;
        editedContato.empresa = currentEmpresa;

        console.log(editedContato);

        const res = await axios.put('http://localhost:8080/contato/atualizar/' + editedContato.id, editedContato)
            .then((res) => {
                callback("success", "Contato alterado com sucesso")
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error)
                    callback("error", error.response.data.message)
                }
                else if (error.request) {
                    console.log(error)
                    callback("error", error.request.data.message)
                }
            })
        setEditModal(false);
        setContatoToEdit(ContatoModel);
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