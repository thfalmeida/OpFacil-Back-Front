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
import { Add, Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import Alert from '@mui/material/Alert';
import DeleteContatoModal from "./deleteContatoModal";
import EditarContatoModal from "./editarContato";
import { ContatoModel } from "./contatoModel";
import NewContato from "./newContatoModel";
import { configURL } from "../setup/setup";

const ALERT_TYPE = {
    SUCESS: "success",
    ERROR: "error"
}

export default function ContatoIndex() {
    const [value, setValue] = useState([ContatoModel]);
    const [empresas, setEmpresas] = useState([{}]);

    const [deleteModal, setDeleteModal] = useState(false)
    const [contatoToDelete, setContatoToDelete] = useState(ContatoModel);

    const [editModal, setEditModal] = useState(false);
    const [contatoToEdit, setContatoToEdit] = useState(ContatoModel);

    const [newModal, setNewModal] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState(ALERT_TYPE.SUCESS)
    const [alertMessage, setAlertMessage] = useState("")

    useEffect(() => {
        const getContato = async () => {
            const res = await axios(configURL + 'contato/list');
            setValue(res.data);
        }
        const getEmpresas = async () => {
            const res = await axios(configURL + 'empresa/list');
            setEmpresas(res.data);
        }
    
        getEmpresas();
        getContato();
    })



    const setAlert = (alertType, message) => {
        setShowAlert(true);
        setAlertType(alertType);
        setAlertMessage(message);
    }

    const handleDeleteClick = (contato) => {
        setContatoToDelete(contato);
        setDeleteModal(true);
    }


    const handleCloseModal = () => {
        setDeleteModal(false);
        setContatoToDelete(ContatoModel);
    }

    const handleEditClick = (contato) => {
        setContatoToEdit(contato);
        setEditModal(true);
    }


    return (
        <>
            {/* Alert para notificar sucesso ou erro das ações */}
            {showAlert && <Alert severity={alertType} onClose={() => { setShowAlert(false) }}>{alertMessage}</Alert>}


            {/* Modal para deletar o contato */}
            <DeleteContatoModal contatoToDelete={contatoToDelete} deleteModal={deleteModal} handleCloseModal={handleCloseModal}
                callback={setAlert} setDeleteModal={setDeleteModal} setContatoToDelete={setContatoToDelete} />

            {/* Modal para editar o contato */}
            <EditarContatoModal editModal={editModal} setEditModal={setEditModal} setContatoToEdit={setContatoToEdit}
                contatoToDelete={contatoToDelete} callback={setAlert} contatoToEdit={contatoToEdit} empresas={empresas}/>

            {/* Modal para criar novo contato */}
            <NewContato newModal={newModal} setNewModal={setNewModal} callback={setAlert} empresas={empresas}/>



            <Button sx={{ margin: '16px' }} variant="contained" startIcon={<Add />} onClick={()=> setNewModal(true)}>
                Novo
            </Button>
            <Box sx={{ margin: '0 16px', height: 500 }}>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell key={'id'}>Id</TableCell>
                                <TableCell key={'nome'} align="right">Nome</TableCell>
                                <TableCell key={'email'} align="right">Email</TableCell>
                                <TableCell key={'empresa'} align="right">Empresa</TableCell>
                                <TableCell key={'nick'} align="right">Nick</TableCell>
                                <TableCell key={'buttons'} align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {value.map((item, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell key={'id'} component="th" scope="row"> {item.id}</TableCell>
                                    <TableCell key={'nome'} align="right">{item.nome}</TableCell>
                                    <TableCell key={'email'} align="right">{item.email}</TableCell>
                                    <TableCell key={'empresa'} align="right">{item.empresa ? item.empresa.nick : 'Não tem'}</TableCell>
                                    <TableCell key={'nick'} align="right">{item.nick}</TableCell>
                                    <TableCell key={'buttons'} align="right">
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button onClick={() => handleEditClick(item)}>
                                                <Icon>
                                                    <Edit />
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