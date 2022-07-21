import React,{useState, useEffect} from "react";
import axios from 'axios';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Button,
    TableHead,
    TableRow,
    Icon
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';


function createData(name, calories, fat, carbs, protein, detail) {
  return { name, calories, fat, carbs, protein, detail };
}


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
    

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell>
          <Add onClick={() => setIsExpanded(!isExpanded)}/>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (

        <>
            <thead>
            <tr>
              <th key="id-innerTable">Id</th>
              <th key='transporte-innerTable'>Transporte</th>
              <th key='empresa-innerTable'>Empresa</th>
            </tr>
          </thead>
          <tbody>
          {expandComponent.map(transp => (
            <tr>
              {console.log(transp)}
              <th key='id-value-innerTable'>{transp.id}</th>
              <th key='transporte-value-innerTable' align="right">{transp.transporte}</th>
              <th key='mercado-value-innerTable' align="right">{transp.mercado? transp.mercado.nick : ""}</th>
            </tr>
          ))}
          </tbody>

        </>
      )}
    </>
  );
};


export default function SimpleTable() {
    const [value, setValue] = useState([{
        id: "",
        motorista: "",
        empresa: "",
        data: "",
        valor: "",
        avaria: "",
        transportes: [{}]
    }]);

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
        <Paper >
        <Table  aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Id</TableCell>
                <TableCell align="right">Motorista</TableCell>
                <TableCell align="right">Data</TableCell>
                <TableCell align="right">Valor</TableCell>
                <TableCell align="right">Avaria</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {value.map(row => (
                <ExpandableTableRow key={row.name} expandComponent={row.transportes} >
                  <TableCell component="th" scope="row"> {row.id} </TableCell>
                  <TableCell align="right">{row.motorista? row.motorista.nick : ""}</TableCell>
                  <TableCell align="right">{row.data ? row.data : ""}</TableCell>
                  <TableCell align="right">{row.valor}</TableCell>
                  <TableCell align="right">{row.avaria}</TableCell>
                </ExpandableTableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
    </>
  );

 
}
