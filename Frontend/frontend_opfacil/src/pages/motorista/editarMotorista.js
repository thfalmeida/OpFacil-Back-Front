import React from "react";
import axios from 'axios';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { configURL } from "../setup/setup";
import { criar_motorista, motoristaEmpty } from "./criar_motorista";

export default function EditarContatoModal({...props}) {
    let{editModal, setEditModal, motoristaToEdit, setMotoristaToEdit, 
        callback} = props;
    

    const nomeInputText = document.getElementById("edit_nome");
    const nickInputText = document.getElementById("edit_nick")



    const hadleConfirmEditClick = async () => {
        let id = motoristaToEdit.id;
        let nome = nomeInputText.value;
        let nick = nickInputText.value;
        let editedMotorista = criar_motorista(nome, nick, id)
        
        console.log(editedMotorista);

        try{

            await axios.put(configURL + 'motorista/atualizar/' + editedMotorista.id, editedMotorista)
            callback("success", "Motorista alterado com sucesso")
        }catch(error){
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

        setEditModal(false);
        setMotoristaToEdit(motoristaEmpty);
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