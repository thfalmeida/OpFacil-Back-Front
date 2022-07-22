import React from "react";
import axios from 'axios';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import { ContatoModel } from "./contatoModel";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function NewContato({...props}){
    let {newModal, setNewModal, callback} = props;

    const hadleConfirmNewClick = async () => {
        let newConto = {... ContatoModel}
        newConto.nome = document.getElementById("nome").value;
        newConto.email = document.getElementById("email").value;
        newConto.nick = document.getElementById("nick").value;
        delete newConto.empresa;
        
        const res = await axios.post('http://localhost:8080/contato/cadastrar/', newConto)
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

    return (
        <>
            <Dialog open={newModal} onClose={() => setNewModal(false)}>
                <DialogTitle>
                    {"Cadastrar novo contato:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="nome" label="Nome" variant="outlined" />
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="nick" label="Apelido" variant="outlined" />
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="email" label="Email" variant="outlined" />
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="empresa" label="Empresa" variant="outlined"/>
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