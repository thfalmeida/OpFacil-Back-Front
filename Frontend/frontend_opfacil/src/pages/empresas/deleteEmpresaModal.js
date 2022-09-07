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
import { EmpresaModel } from "./empresaModel";
import { configURL } from "../setup/setup";


export default function DeleteEmpresaModal( {...props}) {
    let {deleteModal, empresaToDelete, handleCloseModal, 
        callback, setEmpresaToDelete, setDeleteModal} = props;

    const handleConfirmDeleteClick = async () => {
        const res = await axios.delete(configURL + 'empresa/delete/' + empresaToDelete.id)
            .then((res) => {
                callback("success", "Empresa deletada com sucesso")

            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error);
                    callback("error", error.response.data.message)

                }

            })
        setDeleteModal(false);
        setEmpresaToDelete(EmpresaModel);
    }

    return (
        <>
            <Dialog open={deleteModal} onClose={() => handleCloseModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <DialogTitle id="delete-alert-dialog-title">
                    {"Deseja realmente deletar essa empresa?"}
                </DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key={'id'}>Id</TableCell>
                                <TableCell key={'nome'} align="right">Razao Social</TableCell>
                                <TableCell key={'nick'} align="right">Nome</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'-1'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell key={'id'} component="th" scope="row"> {empresaToDelete.id}</TableCell>
                                <TableCell key={'nome'} align="right">{empresaToDelete.razaoSocial}</TableCell>
                                <TableCell key={'nick'} align="right">{empresaToDelete.nick}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá recadastrar essa empresa novamente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} autoFocus>Cancelar</Button>
                    <Button onClick={handleConfirmDeleteClick}> Deletar </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}