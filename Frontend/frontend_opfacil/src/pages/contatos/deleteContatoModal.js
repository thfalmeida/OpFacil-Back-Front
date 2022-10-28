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
import { criar_contato } from "./criar_contato_obj";
import { configURL } from "../setup/setup";

export default function DeleteContatoModal( {...props}) {
    let {deleteModal, contatoToDelete, handleCloseModal, 
        callback, setContatoToDelete, setDeleteModal} = props;

    const handleConfirmDeleteClick = async () => {
        try{
            await axios.delete(configURL + 'contato/deletar/' + contatoToDelete.id)
            callback("success", "Contato deletado com sucesso")
        }catch(error){
            console.log(error)
            if(error.code === 'ERR_NETWORK')
                callback("error", 'Não foi possível se conectar com o servidor') 
            else
                callback("error", error.response.data.message)
        }
        
        setDeleteModal(false);
        setContatoToDelete(criar_contato());
        
    }

    return (
        <>
            <Dialog open={deleteModal} onClose={() => handleCloseModal()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <DialogTitle id="delete-alert-dialog-title">
                    {"Deseja realmente deletar esse contato?"}
                </DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key={'id'}>Id</TableCell>
                                <TableCell key={'nome'} align="right">Nome</TableCell>
                                <TableCell key={'email'} align="right">Email</TableCell>
                                <TableCell key={'empresa'} align="right">Empresa</TableCell>
                                <TableCell key={'nick'} align="right">Nick</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'-1'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell key={'id'} component="th" scope="row"> {contatoToDelete.id}</TableCell>
                                <TableCell key={'nome'} align="right">{contatoToDelete.nome}</TableCell>
                                <TableCell key={'email'} align="right">{contatoToDelete.email}</TableCell>
                                <TableCell key={'empresa'} align="right">{contatoToDelete.empresa ? contatoToDelete.empresa.nick : 'Não tem'}</TableCell>
                                <TableCell key={'nick'} align="right">{contatoToDelete.nick}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação não poderá ser desfeita, mas você poderá recadastrar esse contato novamente.
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