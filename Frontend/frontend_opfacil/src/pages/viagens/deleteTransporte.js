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
        const res = await axios.delete(configURL + 'viagem/transporte/delete/' + transporteToDelete.id)
            .then((res) => {
                callback("success", "Transporte deletado com sucesso")

            })
            .catch(function (error) {
                if (error.response.data) {
                    callback("error", error.response.data.message)

                } else if (error.resquest.data) {
                    callback("error", error.response.data.message)
                }

            })
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