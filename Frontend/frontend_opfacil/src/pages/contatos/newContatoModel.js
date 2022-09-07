import React, { useState } from "react";
import axios from 'axios';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import { ContatoModel } from "./contatoModel";
import {EmpresaModel} from '../empresas/empresaModel'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { configURL } from "../setup/setup";

export default function NewContato({...props}){
    let {newModal, setNewModal, callback, empresas} = props;

    const [currentEmpresa, setCurrentEmpresa] = useState(EmpresaModel);

    const nomeInputText = document.getElementById("edit_nome");
    const emailInputText = document.getElementById("edit_email");
    const nickInputText = document.getElementById("edit_nick")

    const hadleConfirmNewClick = async () => {
        let newConto = {... ContatoModel}
        newConto.nome = nomeInputText.value;
        newConto.email = emailInputText.value;
        newConto.nick = nickInputText.value;
        newConto.empresa = currentEmpresa;
        
        const res = await axios.post(configURL + 'contato/cadastrar/', newConto)
            .then((res) => {
                callback("success", "Contato cadastrado com sucesso")
            })
            .catch(function (error) {
                if (error.response) {
                    callback("error", error.response.data.message)
                }

            })
        setNewModal(false);
    } 

    const handleSelectEmpresa = (event) => {
        setCurrentEmpresa(empresas.find(obj => {
            return obj.nick == event.target.value
        }))
        console.log(currentEmpresa)
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