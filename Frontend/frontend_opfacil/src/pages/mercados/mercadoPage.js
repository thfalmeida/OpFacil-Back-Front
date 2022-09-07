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
import DeleteMercadoModal from "./deleteMercadoModal";
import Alert from '@mui/material/Alert';
import EditarMercadoModel from "./editarMercado";
import NewMercadoModel from "./newMercadoModal";
import { configURL } from "../setup/setup";

export const MercadoModel ={
    id: "",
    razaoSocial: "",
    nick: "",
    endereco: ""
}

export default function MercadoIndex(){
    const [value, setValue] = useState([MercadoModel]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('success')
    const [alertMessage, setAlertMessage] = useState("")

    const [editModal, setEditModal] = useState(false);
    const [mercadoToEdit, setMercadoToEdit] = useState(MercadoModel);

    const [newModal, setNewModal] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false)
    const [mercadoToDelete, setMercadoToDelete] = useState(MercadoModel);

    useEffect(() => {
        const getMercados = async () => {
            const res = await axios(configURL + 'mercado/list');
            setValue(res.data);
        }

        getMercados();
    })

    const setAlert = (alertType, message) => {
        setShowAlert(true);
        setAlertType(alertType);
        setAlertMessage(message);
    }

    const handleDeleteClick = (mercado) =>{
        setMercadoToDelete(mercado);
        setDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setMercadoToDelete(MercadoModel);
        setDeleteModal(false);
    }

    const handleEditClick = (mercado) => {
        setMercadoToEdit(mercado);
        setEditModal(true);
    }

    return (
        <>
            {/* Alert para notificar sucesso ou erro das ações */}
            {showAlert && <Alert severity={alertType} onClose={() => { setShowAlert(false) }}>{alertMessage}</Alert>}


            <DeleteMercadoModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} mercadoToDelete={mercadoToDelete}
               setMercadoToDelete={setMercadoToDelete} callback={setAlert} handleCloseModal={handleCloseDeleteModal} />

            <EditarMercadoModel callback={setAlert} mercadoToEdit={mercadoToEdit} setMercadoToEdit={setMercadoToEdit}
                editModal={editModal} setEditModal={setEditModal} />

            <NewMercadoModel callback={setAlert} newModal={newModal} setNewModal={setNewModal}/> 

            <Button sx={{ margin: '16px' }} variant="contained" startIcon={<Add />}
                onClick={() => setNewModal(true)}>
                Novo
            </Button>
            <Box sx={{ margin: '0 16px', height: 500 }}>
                <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell key='id'>Id</TableCell>
                        <TableCell key='nome' align="right">Nome</TableCell>
                        <TableCell key='razaoSocial' align="right">Razão Social</TableCell>
                        <TableCell key="endereco" align="right">Endereço</TableCell>
                        <TableCell key='buttons'/>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {value.map((item) => (
                        <TableRow key={item.nick} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell  key='id' component="th" scope="row"> {item.id}</TableCell>
                            <TableCell key='nick' align="right">{item.nick}</TableCell>
                            <TableCell key='nome' align="right">{item.nome}</TableCell>
                            <TableCell key="endereco" align="right">{item.endereco}</TableCell>
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