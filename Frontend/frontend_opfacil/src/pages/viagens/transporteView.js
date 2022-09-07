import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  ButtonGroup,
  Button,
  TableHead,
  TableRow,
  Icon
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';


export const ExpandableTableRow = ({ children, expandComponent, deleteTransp, editTransp, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
    const handleEditClick = (transp) => {
      console.log("Editar")
      editTransp(transp);

    }

    const handleDeleteClick = (transp) => {
      console.log("Deletar " + transp.id)
      deleteTransp(transp);
    }
  
    return (
      <>
        <TableRow {...otherProps}>
          <TableCell>
            <Add onClick={() => setIsExpanded(!isExpanded)} />
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
  
          <TableCell colSpan="5">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell key="id-innerTable">Id</TableCell>
                  <TableCell key='transporte-innerTable' align="right">Transporte</TableCell>
                  <TableCell key='universo-innerTable' align="right">Universo</TableCell>
                  <TableCell key='mercado-innerTable' align="right">Mercado</TableCell>
                  <TableCell ley='buttons' align='right' />
                </TableRow>
              </TableHead>
              <TableBody>
                {expandComponent.transportes.map(transp => (
                  <TableRow>
                    <TableCell key='id-value-innerTable'>{transp.id}</TableCell>
                    <TableCell key='transporte-value-innerTable' align="right">{transp.transporte}</TableCell>
                    <TableCell key='universo-value-innerTable' align="right">{"R$ " + transp.universo}</TableCell>
                    <TableCell key='mercado-value-innerTable' align="right">{transp.mercado ? transp.mercado.nick : ""}</TableCell>
                    <TableCell key='buttons' align='right'>
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>
                          <Icon>
                            <Edit onClick={() => handleEditClick(transp)}/>
                          </Icon>
                        </Button>
                        <Button>
                          <Icon>
                            <Delete onClick={() => handleDeleteClick(transp)}/>
                          </Icon>
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        )}
      </>
    );
  };