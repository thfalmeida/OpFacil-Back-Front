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
import { viagemModel } from "./viagemModel";
import { configURL } from "../setup/setup";


export default function DeleteViagemModal({ ...props }) {
    let { deleteModal, viagemToDelete,
        callback, setViagemToDelete, setDeleteModal } = props;

    const handleConfirmDeleteClick = async () => {
        const res = await axios.delete(configURL + 'viagem/deletar/' + viagemToDelete.id)
            .then((res) => {
                callback("success", "Viagem deletada com sucesso")

            })
            .catch(function (error) {
                if (error.response.data) {
                    callback("error", error.response.data.message)

                }else if (error.resquest.data){
                    callback("error", error.response.data.message)
                }

            })
        setDeleteModal(false);
        setViagemToDelete(viagemModel);

    }

    const handleCloseModal = () => {
        setDeleteModal(false);
        setViagemToDelete(viagemModel);
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
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Motorista</TableCell>
                                <TableCell align="right">Data</TableCell>
                                <TableCell align="right">Valor</TableCell>
                                <TableCell align="right">Empresa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'-1'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row"> {viagemToDelete.id} </TableCell>
                                <TableCell align="right">{viagemToDelete.motorista ? viagemToDelete.motorista.nick : ""}</TableCell>
                                <TableCell align="right">{viagemToDelete.data ? viagemToDelete.data : ""}</TableCell>
                                <TableCell align="right">{viagemToDelete.valor}</TableCell>
                                <TableCell align="right">{viagemToDelete.empresa ? viagemToDelete.empresa.nick : ""}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá recadastrar essa viagem novamente.
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