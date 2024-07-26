import React, { useState, useEffect } from "react";
import TableUser from '../components/table'
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';

export default function TableContent() {
    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('name')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(1)

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc')
    }

    return(
        <>
            <Container>
                <Table>
                    <TableUser 
                        valueToOrderBy={valueToOrderBy}
                        orderDirection={orderDirection}
                        handleRequestSort={handleRequestSort}
                    />
                </Table>
            </Container>

        </>
    )
}