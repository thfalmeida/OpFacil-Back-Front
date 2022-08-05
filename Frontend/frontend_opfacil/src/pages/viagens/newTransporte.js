import React, { useState } from "react";
import { MercadoModel } from "../mercados/mercadoPage";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export const NewTransporte = ({...props}) => {
    let { mercados } = props;
    const [transporte, setTransporte] = useState(-1);
    const [mercado, setMercado] = useState(MercadoModel);

    const handleSelectEmpresa = (event) => {
        setMercado(mercados.find(obj => {
            return obj.nick == event.target.value
        }))
        console.log(mercado)
    }

    return (
        <>
            <TextField style={{ flex: 1, width: "40%", marginTop: "20px", color: "#FFF"}}
                id="edit_transporte" label="Transporte" variant="outlined" />
            <TextField style={{ flex: 0, width: "60%", marginTop: "20px", color: "#FFF" }}
                align='right' id="edit_empresa" label="Empresa" variant="outlined" value={mercado.nick}
                select onChange={handleSelectEmpresa}>
                {mercados.map((merc) => (
                    <MenuItem key={merc.id} value={merc.nick}>
                        {merc.nick}
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}