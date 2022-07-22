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


export default function MercadoIndex(){
    const [value, setValue] = useState([{
        id: "",
        razaoSocial: "",
        nick: "",
        endereco: ""
    }]);

    useEffect(() => {
        const getMercados = async () => {
            const res = await axios('http://localhost:8080/mercado/list');
            setValue(res.data);
        }

        getMercados();
    })

    return (
        <>
            <Button sx={{ margin: '16px' }} variant="contained" startIcon={<Add />}>
                Novo
            </Button>
            <Box sx={{ margin: '0 16px', height: 500 }}>
                <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell key='id'>Id</TableCell>
                        <TableCell key='nome' align="right">Nome</TableCell>
                        <TableCell key="endereco" align="right">Endereço</TableCell>
                        <TableCell key='buttons'/>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {value.map((item) => (
                        <TableRow key={item.nick} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell  key='id' component="th" scope="row"> {item.id}</TableCell>
                            <TableCell key='nome' align="right">{item.nome}</TableCell>
                            <TableCell key="endereco" align="right">{item.endereco}</TableCell>
                            <TableCell key={'buttons'} align="right" >
                                <ButtonGroup variant="contained" aria-label="outlined primary button group"
                                >
                                <Button>
                                    <Icon>
                                    <Edit />
                                    </Icon>
                                </Button>
                                <Button>
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