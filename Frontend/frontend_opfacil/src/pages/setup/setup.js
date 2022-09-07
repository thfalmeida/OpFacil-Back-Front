import React, { useState } from "react";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Alert from '@mui/material/Alert'; 
import fs from 'fs';

export const config = require('../setup/default.json')
export const ipConfig = config.host;
export const portConfig = config.port;
export const configURL = 'http://' + ipConfig + ':' + portConfig + '/';

export default function SetupPage() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const hadleConfirmClick = async () => {

    }

    const callback = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
    }
    return (
        <>
            <Box>
                {showAlert && <Alert severity={alertType} onClose={() => { setShowAlert(false) }}>{alertMessage}</Alert>}
                <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                    id="edit_ip" label="Ip Servidor" variant="outlined" defaultValue={ipConfig} />
                <TextField style={{ flex: 1, width: "50%", marginTop: "20px", color: "#FFF", textAlignVertical: "top", display: "block" }}
                    id="edit_port" label="Porta backend" variant="outlined" defaultValue={portConfig} />

                <Button onClick={() => hadleConfirmClick()} autoFocus> Atualizar </Button>
                <p>
                    Ip atual: {ipConfig}:{portConfig}
                </p>
            </Box>
        </>)
} 