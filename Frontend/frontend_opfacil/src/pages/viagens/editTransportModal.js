import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle } from "@mui/material";
import {
    Button
} from '@mui/material';
import { configURL } from "../setup/setup";
import { criar_transporte } from "./factory_viagem_transporte";
export const EditTransporte = ({ ...props }) => {
    let { mercados, transporteToEdit, editModal, setEditModal, callback } = props;
    const [transporte, setTransporte] = useState(null);
    const [universo, setUniverso] = useState(null);
    const [mercado, setMercado] = useState(null);

    const handleSelectEmpresa = (event) => {
        setMercado(mercados.find(obj => {
            return obj.nick === event.target.value
        }))
    }

    const handleTransporteOnChange = (event) => {
        setTransporte(event.target.value);
    };

    const handleUniversoOnChange = (event) => {
        setUniverso(event.target.value);
    };

    const hadleConfirmEditClick = async () => {
        let transporteValue = transporte ? transporte : transporteToEdit.transporte;
        let universoValue = universo ? parseFloat(universo) : transporteToEdit.universo;
        let mercadoValue = mercado ? mercado : transporteToEdit.mercado;
        let editedTransporte = criar_transporte(transporteToEdit.id, transporteValue, universoValue, mercadoValue)
        
        console.log(editedTransporte);
        try{
            await axios.put(configURL + 'viagem/transporte/atualizar/' + editedTransporte.id, editedTransporte)
            callback("success", "Transporte editado com sucesso")
        }catch(error) {
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

        setEditModal(false);
    }


    return (
        <>
            <Dialog open={editModal} onClose={() => setEditModal(false)}>
                <DialogTitle>
                    {"Editar transporte:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField style={{ flex: 1, width: "20%", marginTop: "5px", color: "#FFF" }}
                            id="edit_id" label="Id" variant="outlined" disabled defaultValue={transporteToEdit.id} />
                        <TextField style={{ flex: 1, width: "25%", marginTop: "5px", color: "#FFF" }}
                            id="edit_transporte" label="Transporte" variant="outlined" defaultValue={transporte ? transporte : transporteToEdit.transporte}
                            onChange={handleTransporteOnChange} />
                        <TextField style={{ flex: 1, width: "25%", marginTop: "5px", color: "#FFF" }}
                            id="edit_universo" label="valor Universo" variant="outlined" onChange={handleUniversoOnChange}
                            defaultValue={universo ? universo : transporteToEdit.universo} />
                        <TextField style={{ flex: 0, width: "30%", marginTop: "5px", color: "#FFF" }}
                            align='right' id="edit_empresa" label="Mercado" variant="outlined" value={mercado ? mercado.nick : (transporteToEdit.mercado ? transporteToEdit.mercado.nick : "")}
                            select onChange={handleSelectEmpresa}>
                            {mercados.map((merc) => (
                                <MenuItem key={merc.id} value={merc.nick}>
                                    {merc.nick}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <DialogActions>
                        <Button onClick={() => setEditModal(false)}>Cancelar</Button>
                        <Button autoFocus onClick={() => hadleConfirmEditClick()}> Cadastrar </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}