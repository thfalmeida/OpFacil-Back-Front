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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

export default function ViagemIndex(){
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = useState([{
        id: "",
        motorista: "",
        empresa: "",
        data: "",
        valor: "",
        avaria: "",
        transportes: [{}]
    }]);
    

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
          {...props}
        />
      ))(({ theme }) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
          marginLeft: theme.spacing(1),
        },
      }));

    useEffect(() => {
        const getContato = async () => {
            const res = await axios('http://localhost:8080/viagem/list');
            setValue(res.data);
        }

        getContato();
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
                        <TableCell key='motorista' align="right">Motorista</TableCell>
                        <TableCell key="data" align="right">Data</TableCell>
                        <TableCell key="valor" align="right">Valor</TableCell>
                        <TableCell key="avaria" align="right">Avaria</TableCell>
                        <TableCell key='buttons'/>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {value.map((item, ind) => (
                        <TableRow key={item.nick} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <Accordion key={'accordion'+ind} expanded={expanded === 'panel'+ind} onChange={handleChange('panel'+ind)}> 
                            <AccordionSummary> 1231
                                <TableCell key='id'>{item.id}</TableCell>
                                <TableCell key='motorista' align="right">{item.motorista ? item.motorista.nome : "Não possi"}</TableCell>
                                <TableCell key="data" align="right">{item.data || "" }</TableCell>
                                <TableCell key="valor" align="right">{item.valor}</TableCell>
                                <TableCell key="avaria" align="right">{item.avaria}</TableCell>
                                <TableCell key={'buttons'} align="right" >
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
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
                            </AccordionSummary>
                            <AccordionDetails>
                                34234234
                            </AccordionDetails>
                        </Accordion>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </>
    )
}