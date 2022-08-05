import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  ButtonGroup,
  Button,
  TableHead,
  TableRow,
  Icon
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { ExpandableTableRow } from "./transporteView";
import { Viagem } from "../../Model/entityModels";
import { EmpresaModel } from "../empresas/empresaModel";
import { MercadoModel } from "../mercados/mercadoPage";
import { MotoristaModel } from "../motorista/motoristaModel";

import Alert from '@mui/material/Alert';
import NewViagemModel from "./newViagemModal";

export default function SimpleTable() {
  const [viagem, setViagem] = useState([{Viagem}]);
  const [empresa, setEmpresa] = useState([{EmpresaModel}]);
  const [mercado, setMercado] = useState([{MercadoModel}]);
  const [motorista, setMotorista] = useState([{MotoristaModel}])

  const [newModal, setNewModal] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    const getViagem = async () => {
      const res = await axios('http://localhost:8080/viagem/list');
      setViagem(res.data);
    }

    const getEmpresa = async () => {
      const res = await axios('http://localhost:8080/empresa/list');
      setEmpresa(res.data);
    }

    const getMercado = async () => {
      const res = await axios('http://localhost:8080/mercado/list');
      setMercado(res.data);
    }

    const getMotorista = async () => {
      const res = await axios('http://localhost:8080/motorista/list');
      setMotorista(res.data);
    }

    getViagem();
    getEmpresa();
    getMercado();
    getMotorista();
  })

  const setAlert = (alertType, message) => {
    setShowAlert(true);
    setAlertType(alertType);
    setAlertMessage(message);
}

  return (
    <>
    {/* Alert para notificar sucesso ou erro das ações */}
    {showAlert && <Alert severity={alertType} onClose={() => { setShowAlert(false) }}>{alertMessage}</Alert>}

      <NewViagemModel callback={setAlert} newModal={newModal} setNewModal={setNewModal} motorista={motorista} empresa={empresa} 
        mercado={mercado}/>

      <Button sx={{ margin: '16px' }} variant="contained" startIcon={<Add />} onClick={() => setNewModal(true)}>
        Novo
      </Button>
      <Paper >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Id</TableCell>
              <TableCell align="right">Motorista</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Avaria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viagem.map(row => (
              <ExpandableTableRow key={row.name} expandComponent={row.transportes} >
                <TableCell component="th" scope="row"> {row.id} </TableCell>
                <TableCell align="right">{row.motorista ? row.motorista.nick : ""}</TableCell>
                <TableCell align="right">{row.data ? row.data : ""}</TableCell>
                <TableCell align="right">{row.valor}</TableCell>
                <TableCell align="right">{row.avaria}</TableCell>
              </ExpandableTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );


}
