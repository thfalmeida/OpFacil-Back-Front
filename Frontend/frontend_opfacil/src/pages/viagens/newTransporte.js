import React, { useEffect, useState } from "react";
import { MercadoModel } from "../mercados/mercadoPage";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export const NewTransporte = ({...props}) => {
    let { mercados, index, setTransportes, transportes } = props;
    const [transporte, setTransporte] = useState(-1);
    const [mercado, setMercado] = useState(MercadoModel);

    const handleSelectEmpresa = (event) => {
        setMercado(mercados.find(obj => {
            return obj.nick === event.target.value
        }))
    }
    
    useEffect(()=>{
        let ed_Transportes = transportes;
        ed_Transportes[index] = {
            transporte: transporte,
            mercado: mercado
        }
        setTransportes(ed_Transportes);
    })

    const handleTransporteOnChange = (event) => {
        setTransporte(event.target.value);
    };


    return (
        <>
            <TextField style={{ flex: 1, width: "40%", marginTop: "5px", color: "#FFF"}}
                id="edit_transporte" label="Transporte" variant="outlined" onChange={handleTransporteOnChange}/>
            <TextField style={{ flex: 0, width: "60%", marginTop: "5px", color: "#FFF" }}
                align='right' id="edit_empresa" label="Mercado" variant="outlined" value={mercado.nick}
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