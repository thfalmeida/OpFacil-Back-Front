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
import { MotoristaModel } from "./motoristaModel";


export default function DeleteMotoristaModal( {...props}) {
    let {deleteModal, motoristaToDelete, handleCloseModal, 
        callback, setMotoristaToDelete, setDeleteModal} = props;

    const handleConfirmDeleteClick = async () => {
        const res = await axios.delete('http://localhost:8080/motorista/deletar/' + motoristaToDelete.id)
            .then(() => {
                callback("success", "Motorista deletado com sucesso")

            })
            .catch(function (error) {
                if (error.response) {
                    callback("error", error.response.data.message)

                }

            })
        setDeleteModal(false);
        setMotoristaToDelete(MotoristaModel);
        
    }

    return (
        <>
            <Dialog open={deleteModal} onClose={() => handleCloseModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <DialogTitle id="delete-alert-dialog-title">
                    {"Deseja realmente deletar esse motorista?"}
                </DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key={'id'}>Id</TableCell>
                                <TableCell key={'nome'} align="right">Nome</TableCell>
                                <TableCell key={'nick'} align="right">Nick</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'-1'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell key={'id'} component="th" scope="row"> {motoristaToDelete.id}</TableCell>
                                <TableCell key={'nome'} align="right">{motoristaToDelete.nome}</TableCell>
                                <TableCell key={'nick'} align="right">{motoristaToDelete.nick}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá recadastrar esse motorista novamente.
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