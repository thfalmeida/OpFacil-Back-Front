import React,{useState, useEffect} from "react";
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
import NewMotoristaModel from "./newMotoristaModel";
import Alert from '@mui/material/Alert';
import DeleteMotoristaModal from "./deleteMotoristaModal";
import EditarContatoModal from "./editarMotorista";
import { configURL } from "../setup/setup";
import { criar_motorista } from "./criar_motorista";


export default function MotoristaIndex(){
    const motoristaEmpty = criar_motorista("","");
    const [value, setValue] = useState([motoristaEmpty]);

    const [deleteModal, setDeleteModal] = useState(false)
    const [motoristaToDelete, setMotoristaToDelete] = useState(motoristaEmpty);
    
    const [editModal, setEditModal] = useState(false);
    const [motoristaToEdit, setMotoristaToEdit] = useState(motoristaEmpty);

    const [newModal, setNewModal] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success")
    const [alertMessage, setAlertMessage] = useState("")

    useEffect(() => {
        const getContato = async () => {
            const res = await axios(configURL + 'motorista/list');
            setValue(res.data);
        }

        getContato();
    })

    
    const setAlert = (alertType, message) => {
        setShowAlert(true);
        setAlertType(alertType);
        setAlertMessage(message);
    }

    const handleDeleteClick = (motorista) => {
        setMotoristaToDelete(motorista);
        setDeleteModal(true);
    }

    const handleDeleteCloseModal = () => {
        setDeleteModal(false);
        setMotoristaToDelete(motoristaEmpty);
    }

    const handleEditClick = (motorista) => {
        setMotoristaToEdit(motorista);
        setEditModal(true);
    }

    return (
        <>
            {/* Alert para notificar sucesso ou erro das ações */}
            {showAlert && <Alert severity={alertType} onClose={() => { setShowAlert(false) }}>{alertMessage}</Alert>}

            {/* Modal para deletar o motorista */}
            <DeleteMotoristaModal motoristaToDelete={motoristaToDelete} deleteModal={deleteModal} handleCloseModal={handleDeleteCloseModal}
               callback={setAlert} setDeleteModal={setDeleteModal} setMotoristaToDelete={setMotoristaToDelete} />
            
            {/* Modal para criarnovo motorista */}
            <NewMotoristaModel callback={setAlert} newModal={newModal} setNewModal={setNewModal} />

            {/* Modal para editar o motorista */}
            <EditarContatoModal callback={setAlert} editModal={editModal} setEditModal={setEditModal} motoristaToEdit={motoristaToEdit}
                setMotoristaToEdit={setMotoristaToEdit} />

            <Button sx={{ margin: '16px' }} variant="contained" startIcon={<Add />} onClick={() => setNewModal(true)}>
                Novo
            </Button>
            <Box sx={{ margin: '0 16px', height: 500 }}>
                <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell key='id'>Id</TableCell>
                        <TableCell key='nome' align="right">Nome</TableCell>
                        <TableCell key="nick" align="right">Apelido</TableCell>
                        <TableCell key='buttons'/>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {value.map((item) => (
                        <TableRow key={item.nick} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell  key='id' component="th" scope="row"> {item.id}</TableCell>
                            <TableCell key='nome' align="right">{item.nome}</TableCell>
                            <TableCell key='nick' align="right">{item.nick}</TableCell>
                            <TableCell key={'buttons'} align="right" >
                                <ButtonGroup variant="contained" aria-label="outlined primary button group"
                                >
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