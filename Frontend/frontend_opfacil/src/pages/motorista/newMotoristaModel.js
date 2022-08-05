import React, { useState } from "react";
import axios from 'axios';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import {EmpresaModel} from '../empresas/empresaModel'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { MotoristaModel } from "./motoristaModel";



export default function NewMotoristaModel({...props}){
    let {newModal, setNewModal, callback} = props;


    const nomeInputText = document.getElementById("edit_nome");
    const nickInputText = document.getElementById("edit_nick")

    const hadleConfirmNewClick = async () => {
        let newConto = {... MotoristaModel}
        newConto.nome = nomeInputText.value;
        newConto.nick = nickInputText.value;
        
        const res = await axios.post('http://localhost:8080/motorista/cadastrar/', newConto)
            .then((res) => {
                callback("success", "Motorista cadastrado com sucesso")
            })
            .catch(function (error) {
                if (error.response) {
                    callback("error", error.response.data.message)
                }

            })
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
                            id="edit_nick" label="Apelido" variant="outlined" />
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