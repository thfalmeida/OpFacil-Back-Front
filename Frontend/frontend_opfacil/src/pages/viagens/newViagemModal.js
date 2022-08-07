import React, { useState } from "react";
import moment from 'moment';
import axios from 'axios';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
    ButtonGroup,
    Button,
    Paper,
    Icon
} from '@mui/material';
import { EmpresaModel } from "../empresas/empresaModel";
import { MotoristaModel } from "../motorista/motoristaModel";
import { NewTransporte } from "./newTransporte";
import { viagemModel } from "./viagemModel";



export default function NewViagemModel({ ...props }) {
    let { newModal, setNewModal, callback, motorista, empresa, mercado } = props;

    const [currentEmpresa, setCurrentEmpresa] = useState(EmpresaModel);
    const [currentMotorista, setCurrentMotorista] = useState(MotoristaModel);
    const [currentDate, setCurrentDate] = useState(null)
    const [currentNumTransporte, setcurrentNumTransporte] = useState(0);
    const [transportes, setTransportes] = useState([]);

    const [avaria, setAvaria] = useState('')
    const [valor, setValor] = useState('')


    const hadleConfirmNewClick = async () => {
        let newViagem = { ...viagemModel }
        newViagem.motorista = currentMotorista;
        newViagem.empresa = currentEmpresa;
        newViagem.endereco = currentDate;
        newViagem.avaria = avaria;
        newViagem.data = moment(currentDate).format('DD/MM/YYYY');
        newViagem.valor = valor;
        newViagem.id = -1;
        newViagem.transportes = transportes

        console.log(newViagem);

        await axios.post('http://localhost:8080/viagem/cadastrar/', newViagem)
            .then(() => {
                callback("success", "Viagem cadastrado com sucesso")
            })
            .catch(function (error) {
                if (error.response.data) {
                    callback("error", error.response.data.message)
                } else if (error.request.data) {
                    callback("error", error.request.data.message)
                } else {
                    callback("error", "Erro não identificado. Contate o ademir")
                }

            })
        setNewModal(false);
    }

    const handleSelectEmpresa = (event) => {
        setCurrentEmpresa(empresa.find(obj => {
            return obj.nick === event.target.value
        }))
        console.log(currentEmpresa)
    }
    const handleSelectMotorista = (event) => {
        setCurrentMotorista(motorista.find(obj => {
            return obj.nick === event.target.value
        }))
    }

    const handleIncreaseTransporteNum = () => {
        setcurrentNumTransporte(currentNumTransporte + 1);
    }

    const handleDecreaseTransporteNum = () => {
        if (currentNumTransporte === 0)
            return;
        transportes.pop();
        setcurrentNumTransporte(currentNumTransporte - 1);
    }

    const handleAvariaOnChange = (event) => {
        setAvaria(event.target.value);
    };

    const handleValorOnChange = (event) => {
        setValor(event.target.value);
    }

    return (
        <>
            <Dialog open={newModal} onClose={() => setNewModal(false)} fullWidth={'sm'} maxWidth={'sm'}>
                <DialogTitle>
                    {"Cadastrar nova viagem:"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField style={{ marginTop: "20px", flex: 1, width: "50%", height: 50, color: "#FFF", display: 'flex' }}
                            id="edit_empresa" label="Empresa" variant="outlined" value={currentEmpresa.nick}
                            select onChange={(handleSelectEmpresa)}>
                            {empresa.map((emp) => (
                                <MenuItem key={emp.id} value={emp.nick}>
                                    {emp.nick}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{ marginTop: "20px", width: "50%", height: 50, color: "#FFF", display: 'flex' }}
                            id="edit_motorista" label="Motorista" variant="outlined" value={currentMotorista.nick}
                            select onChange={handleSelectMotorista}>
                            {motorista.map((mot) => (
                                <MenuItem key={mot.id} value={mot.nick}>
                                    {mot.nick}
                                </MenuItem>
                            ))}

                        </TextField>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DesktopDatePicker
                                label="Data da viagem"
                                inputFormat="dd/MM/yyyy"
                                value={currentDate}
                                onChange={setCurrentDate}
                                renderInput={(params) => <TextField {...params} style={{ marginTop: "20px", width: "50%", height: 50, color: "#FFF", display: 'flex' }} />}
                            />
                        </LocalizationProvider>
                        <TextField style={{ marginTop: "20px", width: "50%", height: 50, color: "#FFF", display: 'flex' }}
                            id="edit_valor" label="Valor" variant="outlined" value={valor}
                            onChange={handleValorOnChange} />
                        <TextField style={{ marginTop: "20px", width: "50%", height: 50, color: "#FFF", display: 'flex' }}
                            id="edit_avaria" label="Avaria" variant="outlined" value={avaria}
                            onChange={handleAvariaOnChange} />
                    </Box>

                    {/* <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá editar esse contato novamente.
                    </DialogContentText> */}
                    <Box align='right'>
                        <ButtonGroup align='right' variant="outlined" aria-label="outlined button group" sx={{ 'margin-left': '80%' }}>
                            <Button onClick={() => handleIncreaseTransporteNum()} id='increaseTransporteNum'>
                                <Icon>
                                    <AddIcon />
                                </Icon>
                            </Button>
                            <Button sx={{ display: 'flex' }} onClick={() => handleDecreaseTransporteNum()} id='decreaseTransporteNum'>
                                <Icon>
                                    <HorizontalRuleIcon />
                                </Icon>
                            </Button>
                        </ButtonGroup>
                    </Box>

                    <Paper>
                        {(() => {
                            let td = [];
                            for (let i = 0; i < currentNumTransporte; i++) {
                                td.push(<NewTransporte mercados={mercado} transportes={transportes} setTransportes={setTransportes} index={i}/>);
                            }
                            return td;
                        })()}


                    </Paper>
                    <DialogActions>
                        <Button onClick={() => setNewModal(false)}>Cancelar</Button>
                        <Button autoFocus onClick={() => hadleConfirmNewClick()}> Cadastrar </Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </>
    )
}
