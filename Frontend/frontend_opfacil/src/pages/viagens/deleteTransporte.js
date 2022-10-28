import React from "react";
import axios from 'axios';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { configURL } from "../setup/setup";


const transporteModel = {
    id: -1
}

export default function DeleteTransporteModal({ ...props }) {
    let { deleteModal, transporteToDelete,
        callback, setTransporteToDelete, setDeleteModal } = props;

    const handleConfirmDeleteClick = async () => {
        try{
            await axios.delete(configURL + 'viagem/transporte/delete/' + transporteToDelete.id)
            callback("success", "Transporte deletado com sucesso");
        }catch(error) {
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

        setDeleteModal(false);
        setTransporteToDelete(transporteModel);

    }

    const handleCloseModal = () => {
        setDeleteModal(false);
        setTransporteToDelete(transporteModel);
    }

    return (
        <>
            <Dialog open={deleteModal} onClose={() => handleCloseModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <DialogTitle id="delete-alert-dialog-title">
                    {"Deseja realmente deletar essa viagem?"}
                </DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id-innerTable">Id</TableCell>
                                <TableCell key='transporte-innerTable' align="right">Transporte</TableCell>
                                <TableCell key='mercado-innerTable' align="right">Mercado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'-1'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell key='id-value-innerTable'>{transporteToDelete.id}</TableCell>
                                <TableCell key='transporte-value-innerTable' align="right">{transporteToDelete.transporte}</TableCell>
                                <TableCell key='mercado-value-innerTable' align="right">{transporteToDelete.mercado ? transporteToDelete.mercado.nick : ""}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá recadastrar esse transporte novamente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button onClick={handleConfirmDeleteClick} autoFocus> Deletar </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}