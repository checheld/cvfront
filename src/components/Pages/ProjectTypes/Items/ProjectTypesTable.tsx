import React, { useState } from 'react';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { projectTypesActions } from '../../../../actionsTypes/projectTypesActionTypes';
import EditModal from '../../../Items/EditModal';
import DeleteModal from '../../../Items/DeleteModal';
import Delete from '../../../../img/Delete';
import { IProjectType } from '../../../../interfaces';
import '../../../Components.css';

const BasicTable: React.FC<{ projectTypes: IProjectType[] }> = (props) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [projectType, setProjectType] = useState<IProjectType>({ name: '', id: 0 })

    const modalOpen = (projectType: IProjectType) => {
        setOpen(true);
        setProjectType(projectType);
    };

    const [openDelModal, setOpenDelModal] = React.useState(false);
    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(Number(event.currentTarget.id));
        setOpenDelModal(true);
    }
    const handleCloseDelModal = () => setOpenDelModal(false);
    const [delId, setdelId] = React.useState(0);

    return (
        <Box>
            <EditModal open={open} handleClose={handleClose} item={projectType} action={projectTypesActions.EDIT_PROJECTTYPE_REQUEST} editName={'Project type'} />
            <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={delId} type={"project type"} />
            <TableContainer component={Paper}>
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell variant='head' sx={{ width: '20px' }}>ID</TableCell>
                            <TableCell variant='head' align="left">PROJECT TYPE</TableCell>
                            <TableCell variant='head' align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.projectTypes.map((projectType) => (
                            <TableRow
                                key={projectType.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell variant='footer' align="left">{projectType.id}</TableCell>
                                <TableCell component="th"
                                    scope="row"
                                    className='clicableTableItem'
                                    onClick={() => modalOpen(projectType)}>
                                    {projectType.name}
                                </TableCell>
                                <TableCell align="right" key={projectType.id}>
                                    <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={projectType.id}>
                                        <Button variant='text' onClick={handleOpenDelModal} id={String(projectType.id)} >
                                            <Delete />
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default BasicTable