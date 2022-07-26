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
import { EmpresaModel } from "./empresaModel";


export default function EditarEmpresaModal({...props}) {
    let{editModal, setEditModal, empresaToEdit, setEmpresaToEdit, 
        callback} = props;

    const hadleConfirmEditClick = async () => {
        let editedEmpresa = {... EmpresaModel}
        editedEmpresa.id = empresaToEdit.id;
        editedEmpresa.razaoSocial = document.getElementById("edit_razaoSocial").value;
        editedEmpresa.endereco = document.getElementById("edit_endereco").value;
        editedEmpresa.nick = document.getElementById("edit_nick").value;
        console.log(editedEmpresa);

        const res = await axios.put('http://localhost:8080/empresa/atualizar/' + editedEmpresa.id, editedEmpresa)
            .then((res) => {
                callback("success", "Empresa alterada com sucesso")
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
        setEmpresaToEdit(EmpresaModel);
    }

    return (
        <>
            <Dialog open={editModal} onClose={() => setEditModal(false)}>
                <DialogTitle>
                    {"Alterar empresa:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                        {/* Id */}
                        <TextField style={{ flex: 1, width: "20%", height: 50, color: "#FFF", textAlignVertical: "right", display: "block" }}
                            id="edit_id" label="Id" variant="outlined" disabled defaultValue={empresaToEdit.id} />
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_razaoSocial" label="Razão Social" variant="outlined" defaultValue={empresaToEdit.razaoSocial} />
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                            id="edit_nick" label="Nome" variant="outlined" defaultValue={empresaToEdit.nick} />
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="edit_endereco" label="Endereço" variant="outlined" defaultValue={empresaToEdit.endereco} />
                    </Box>

                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá editar essa empresa novamente.
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