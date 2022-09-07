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
import { MotoristaModel } from "./motoristaModel";
import { configURL } from "../setup/setup";

export default function EditarContatoModal({...props}) {
    let{editModal, setEditModal, motoristaToEdit, setMotoristaToEdit, 
        callback} = props;
    

    const nomeInputText = document.getElementById("edit_nome");
    const nickInputText = document.getElementById("edit_nick")



    const hadleConfirmEditClick = async () => {
        let editedMotorista = {... MotoristaModel}
        editedMotorista.id = motoristaToEdit.id;
        editedMotorista.nome = nomeInputText.value;
        editedMotorista.nick = nickInputText.value;

        console.log(editedMotorista);

        const res = await axios.put(configURL + 'motorista/atualizar/' + editedMotorista.id, editedMotorista)
            .then((res) => {
                callback("success", "Motorista alterado com sucesso")
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
        setMotoristaToEdit(MotoristaModel);
    }

    return (
        <>
            <Dialog open={editModal} onClose={() => setEditModal(false)}>
                <DialogTitle>
                    {"Alterar motorista:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                        {/* Id */}
                        <TextField style={{ flex: 1, width: "20%", height: 50, color: "#FFF", textAlignVertical: "right", display: "block" }}
                            id="edit_id" label="Id" variant="outlined" disabled defaultValue={motoristaToEdit.id} />
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nome" label="Nome" variant="outlined" defaultValue={motoristaToEdit.nome} />
                        <TextField  style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nick" label="Apelido" variant="outlined" defaultValue={motoristaToEdit.nick} />
                    </Box>

                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá editar esse motorista novamente.
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