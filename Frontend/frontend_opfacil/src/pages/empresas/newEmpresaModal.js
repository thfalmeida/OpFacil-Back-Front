import React from "react";
import axios from 'axios';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { configURL } from "../setup/setup";
import { criar_empresa } from "./criar_empresa";

export default function NewEmpresa({ ...props }) {
    let { newModal, setNewModal, callback } = props;

    const hadleConfirmNewClick = async () => {
        let razaoSocial = document.getElementById("input_razaoSocial").value;
        let endereco = document.getElementById("input_endereco").value;
        let nick = document.getElementById("input_nick").value;
        let newEmpresa = criar_empresa(-1, razaoSocial, nick, endereco);

        
        try{
            await axios.post(configURL + 'empresa/cadastrar/', newEmpresa)
            callback("success", "Empresa cadastrado com sucesso")
        }catch(error){
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

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