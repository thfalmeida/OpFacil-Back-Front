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
import { Add, Delete, Edit, FileDownload } from '@mui/icons-material';
import { ExpandableTableRow } from "./transporteView";
import { Viagem } from "../../Model/entityModels";
import { EmpresaModel } from "../empresas/empresaModel";
import { MercadoModel } from "../mercados/mercadoPage";
import { MotoristaModel } from "../motorista/motoristaModel";

import Alert from '@mui/material/Alert';
import NewViagemModel from "./newViagemModal";
import DeleteViagemModal from "./deleteViagem";
import { viagemModel } from "./viagemModel";
import DeleteTransporteModal from "./deleteTransporte";
import EditViagemModal from "./editarViagemModal";
import { EditTransporte } from "./editTransportModal";
import { configURL } from "../setup/setup";

const FileDownloader = require('js-file-download');

const transporteDefault = {
  id: -1
}

export default function SimpleTable() {
  const [viagem, setViagem] = useState([{ Viagem }]);
  const [empresa, setEmpresa] = useState([{ EmpresaModel }]);
  const [mercado, setMercado] = useState([{ MercadoModel }]);
  const [motorista, setMotorista] = useState([{ MotoristaModel }])

  const [newModal, setNewModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [viagemToDelete, setViagemToDelete] = useState(viagemModel);

  const [deleteTransporteModal, setDeleteTransporteModal] = useState(false);
  const [transporteToDelete, setTransporteToDelete] = useState(transporteDefault);

  const [editViagemModal, setEditViagemModal] = useState(false);
  const [viagemToEdit, setViagemToEdit] = useState(viagemModel);

  const [editTransporteModal, setEditTransporteModal] = useState(false);
  const [transporteToEdit, setTransporteToEdit] = useState(transporteDefault)

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    const getViagem = async () => {
      const res = await axios(configURL + 'viagem/list');
      setViagem(res.data);
    }

    const getEmpresa = async () => {
      const res = await axios(configURL + 'empresa/list');
      setEmpresa(res.data);
    }

    const getMercado = async () => {
      const res = await axios(configURL + 'mercado/list');
      setMercado(res.data);
    }

    const getMotorista = async () => {
      const res = await axios(configURL + 'motorista/list');
      setMotorista(res.data);
    }

    getViagem();
    getEmpresa();
    getMercado();
    getMotorista();
  })

  const getReport = async () => {
    console.log("Downloading...")
    const res = await axios.get(configURL + 'viagem/report', { responseType: "blob" })
      .then((response) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = 'report ' + dd + '-' + mm + '-' + yyyy;
        FileDownloader(response.data, today + '.xlsx');
      })
      .catch(error => {
        console.log(error);
      });
  }

  const setAlert = (alertType, message) => {
    setShowAlert(true);
    setAlertType(alertType);
    setAlertMessage(message);
  }

  const handleEditClick = (item) => {
    setViagemToEdit(item);
    setEditViagemModal(true);
  }

  const cancelEditClick = () => {
    setViagemToEdit(viagemModel);
    setEditViagemModal(false);
  }

  const handleDeleteClick = (item) => {
    setViagemToDelete(item);
    setDeleteModal(true);
  }

  const deleteTransporte = (transporte) => {
    setTransporteToDelete(transporte);
    setDeleteTransporteModal(true);
  }

  const handleEditTransporteClick = (transporte) => {
    setTransporteToEdit(transporte);
    setEditTransporteModal(true);
  }


  return (
    <>
      {/* Alert para notificar sucesso ou erro das ações */}
      {showAlert && <Alert severity={alertType} onClose={() => { setShowAlert(false) }}>{alertMessage}</Alert>}

      <NewViagemModel callback={setAlert} newModal={newModal} setNewModal={setNewModal} motorista={motorista} empresa={empresa}
        mercado={mercado} />

      <DeleteViagemModal callback={setAlert} deleteModal={deleteModal} setDeleteModal={setDeleteModal} viagemToDelete={viagemToDelete}
        setViagemToDelete={setViagemToDelete} />

      <DeleteTransporteModal deleteModal={deleteTransporteModal} setDeleteModal={setDeleteTransporteModal} transporteToDelete={transporteToDelete}
        setTransporteToDelete={setTransporteToDelete} callback={setAlert} />

      <EditViagemModal editModal={editViagemModal} setEditModal={setEditViagemModal} closeModal={cancelEditClick} viagemToEdit={viagemToEdit} setViagemToEdit={setViagemToEdit}
        callback={setAlert} motorista={motorista} empresa={empresa} mercado={mercado} />

      <EditTransporte editModal={editTransporteModal} setEditModal={setEditTransporteModal} transporteToEdit={transporteToEdit}
        setTransporteToEdit={setTransporteToEdit} mercados={mercado} callback={setAlert} />

      <ButtonGroup>
        <Button sx={{ margin: '16px' }} variant="contained" startIcon={<Add />} onClick={() => setNewModal(true)}>
          Novo
        </Button>
        <Button sx={{ margin: '16px' }} variant="contained" startIcon={<FileDownload />} onClick={() => getReport()}>
          Exportar
        </Button>
      </ButtonGroup>

      <Paper >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Id</TableCell>
              <TableCell align="right">Motorista</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Empresa</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viagem.map(row => (
              <ExpandableTableRow key={row.name} expandComponent={row} deleteTransp={deleteTransporte} editTransp={handleEditTransporteClick}>
                <TableCell component="th" scope="row"> {row.id} </TableCell>
                <TableCell align="right">{row.motorista ? row.motorista.nick : ""}</TableCell>
                <TableCell align="right">{row.data ? row.data : ""}</TableCell>
                <TableCell align="right">{"R$ " + row.valor}</TableCell>
                <TableCell align="right">{row.empresa ? row.empresa.nick : ""}</TableCell>
                <TableCell key={'buttons'} align="right" >
                  <ButtonGroup variant="contained" aria-label="outlined primary button group"
                  >
                    <Button onClick={() => handleEditClick(row)}>
                      <Icon>
                        <Edit />
                      </Icon>
                    </Button>
                    <Button onClick={() => handleDeleteClick(row)}>
                      <Icon>
                        <Delete />
                      </Icon>
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </ExpandableTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );


}
