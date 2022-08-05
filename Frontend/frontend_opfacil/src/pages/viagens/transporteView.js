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


export const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
  
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
                  <TableCell key='mercado-innerTable' align="right">Mercado</TableCell>
                  <TableCell ley='buttons' align='right' />
                </TableRow>
              </TableHead>
              <TableBody>
                {expandComponent.map(transp => (
                  <TableRow>
                    {console.log(transp)}
                    <TableCell key='id-value-innerTable'>{transp.id}</TableCell>
                    <TableCell key='transporte-value-innerTable' align="right">{transp.transporte}</TableCell>
                    <TableCell key='mercado-value-innerTable' align="right">{transp.mercado ? transp.mercado.nick : ""}</TableCell>
                    <TableCell key='buttons' align='right'>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        )}
      </>
    );
  };