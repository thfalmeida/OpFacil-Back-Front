import React from "react";
import axios from 'axios';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { EmpresaModel } from "./empresaModel";

export default function NewEmpresa({ ...props }) {
    let { newModal, setNewModal, callback } = props;

    const hadleConfirmNewClick = async () => {
        let newEmpresa = { ...EmpresaModel }
        newEmpresa.razaoSocial = document.getElementById("input_razaoSocial").value;
        newEmpresa.endereco = document.getElementById("input_endereco").value;
        newEmpresa.nick = document.getElementById("input_nick").value;

        const res = await axios.post('http://localhost:8080/empresa/cadastrar/', newEmpresa)
            .then(() => {
                callback("success", "Empresa cadastrado com sucesso")
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
                    {"Cadastrar nova empresa:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="on">
                        <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top"}}
                            align='right' id="input_nick" label="Apelido" variant="outlined" />
                            
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="input_endereco" label="Endereço" variant="outlined"/>
                        <TextField style={{ flex: 1, width: "100%", height: 50, color: "#FFF", textAlignVertical: "top", }}
                            align='right' id="input_razaoSocial" label="Razão social" variant="outlined" />

                    </Box>
                    {/* <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá editar esse contato novamente.
                    </DialogContentText> */}
                    <DialogActions sx={{marginTop:'20px'}}>
                        <Button onClick={() => setNewModal(false)}>Cancelar</Button>
                        <Button onClick={() => hadleConfirmNewClick()} autoFocus> Cadastrar </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}