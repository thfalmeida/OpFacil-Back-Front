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
import { mercadoEmpty } from "./mercadoPage";
import { configURL } from "../setup/setup";


export default function DeleteMercadoModal( {...props}) {
    let {deleteModal, mercadoToDelete, handleCloseModal, 
        callback, setMercadoToDelete, setDeleteModal} = props;

    const handleConfirmDeleteClick = async () => {
        try{
            await axios.delete(configURL + 'mercado/deletar/' + mercadoToDelete.id)
            callback("success", "Mercado deletado com sucesso")
        }catch(error) {
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }

        setDeleteModal(false);
        setMercadoToDelete(mercadoEmpty);
    }

    return (
        <>
            <Dialog open={deleteModal} onClose={() => handleCloseModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <DialogTitle id="delete-alert-dialog-title">
                    {"Deseja realmente deletar esse mercado?"}
                </DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key={'id'}>Id</TableCell>
                                <TableCell key={'nick'} align="right">Nome</TableCell>
                                <TableCell key={'nome'} align="right">Razao Social</TableCell>
                                <TableCell key={'endereco'} align="right">Endereço</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'-1'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell key={'id'} component="th" scope="row"> {mercadoToDelete.id}</TableCell>
                                <TableCell key={'nick'} align="right">{mercadoToDelete.nick}</TableCell>
                                <TableCell key={'nome'} align="right">{mercadoToDelete.nome}</TableCell>
                                <TableCell key={'endereco'} align="right">{mercadoToDelete.endereco}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá recadastrar esse mercado novamente.
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