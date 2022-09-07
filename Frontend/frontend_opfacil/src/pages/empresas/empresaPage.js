import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Icon,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import { EmpresaModel } from "./empresaModel";
import DeleteEmpresaModal from "./deleteEmpresaModal";
import EditarEmpresaModal from "./editarEmpresa";
import NewEmpresa from "./newEmpresaModal";
import { configURL } from "../setup/setup";

const ALERT_TYPE = {
    SUCESS: "success",
    ERROR: "error"
}

export default function EmpresaIndex() {
    const [value, setValue] = useState([EmpresaModel]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState(ALERT_TYPE.SUCESS)
    const [alertMessage, setAlertMessage] = useState("")

    const [editModal, setEditModal] = useState(false);
    const [empresaToEdit, setEmpresaToEdit] = useState(EmpresaModel);
    
    const [deleteModal, setDeleteModal] = useState(false)
    const [empresaToDelete, setEmpresaToDelete] = useState(EmpresaModel);

    const [newModal, setNewModal] = useState(false);


    useEffect(() => {
        const getEmpresas = async () => {
            const res = await axios(configURL + 'empresa/list');
            setValue(res.data);
        }

        getEmpresas();
    })

    const setAlert = (alertType, message) => {
        setShowAlert(true);
        setAlertType(alertType);
        setAlertMessage(message);
    }

    const handleDeleteClick = (empresa) => {
        console.log(empresa)
        setEmpresaToDelete(empresa);
        setDeleteModal(true);
    }

    const handleCancelDelete = () => {
        setEmpresaToDelete(EmpresaModel);
        setDeleteModal(false);
    }

    const handleEditClick = (empresa) => {
        console.log(empresa)
        setEmpresaToEdit(empresa);
        setEditModal(true);
    }

    return (
        <>

            {/* Alert para notificar sucesso ou erro das ações */}
            {showAlert && <Alert severity={alertType} onClose={() => { setShowAlert(false) }}>{alertMessage}</Alert>}


            <DeleteEmpresaModal callback={setAlert} empresaToDelete={empresaToDelete} deleteModal={deleteModal}
            handleCloseModal={handleCancelDelete} setEmpresaToDelete={setEmpresaToDelete} setDeleteModal={setDeleteModal}/>

            <EditarEmpresaModal callback={setAlert} empresaToEdit={empresaToEdit} setEmpresaToEdit={setEmpresaToEdit}
            editModal={editModal} setEditModal={setEditModal} />

            {/* Modal para criar nova empresa */}
            <NewEmpresa newModal={newModal} setNewModal={setNewModal} callback={setAlert} />



            <Button sx={{ margin: '16px' }} variant="contained" startIcon={<Add />} onClick={()=> setNewModal(true)}>
                Novo
            </Button>
            <Box sx={{ margin: '0 16px', height: 500 }}>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell key='id'>Id</TableCell>
                                <TableCell key='nome' align="right">Nome</TableCell>
                                <TableCell key="razaoSocial" align="right">RazaoSocial</TableCell>
                                <TableCell key="endereco" align="right">Endereço</TableCell>
                                <TableCell key='buttons' />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {value.map((item) => (
                                <TableRow key={item.nick} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell key='id' component="th" scope="row"> {item.id}</TableCell>
                                    <TableCell key='nome' align="right">{item.nick}</TableCell>
                                    <TableCell key='razaoSocial' align="right">{item.razaoSocial}</TableCell>
                                    <TableCell key="endereco" align="right">{item.endereco}</TableCell>
                                    <TableCell key={'buttons'} align="right" >
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button>
                                                <Icon>
                                                    <Edit onClick={() => handleEditClick(item)} />
                                                </Icon>
                                            </Button>
                                            <Button onClick={() => handleDeleteClick(item)}>
                                                <Icon>
                                                    <Delete />
                                                </Icon>
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}