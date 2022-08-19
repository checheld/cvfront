import React, { useEffect, useRef, useState } from 'react';
import EditButton from '../../../Items/EditButton';
import Delete from '../../../../img/Delete';
import { Box, Button, Chip, Stack, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IProject, ITechnology } from '../../../../interfaces';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';

interface ITableItem {
    project: IProject
    setOpenDelModal: any,
    setdelId: any,
    setEditableProject: any,
    handleOpen: any
}

const TableItem: React.FC<ITableItem> = ({ project, setOpenDelModal, setdelId, setEditableProject, handleOpen }) => {

    const router = useNavigate();
    const dispatch = useAppDispatch();
    const handleClick = (project: IProject) => {
        setEditableProject(project);
        handleOpen();
    };
    const handleOpenDelModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        setdelId(event.currentTarget.id);
        setOpenDelModal(true);
    }
    const result = useTypedSelector((state) => state.projectTypes.result);

    useEffect(() => {
        setAmountHideTech(project.technologyList.length - showTech.length)
    }, [project]);

    let techTableCellRef = useRef();

    const [showTech, setShowTech] = useState<ITechnology[]>([project.technologyList[0], project.technologyList[1], project.technologyList[2]]);
    const [amountHideTech, setAmountHideTech] = React.useState(0);

    return (
        <TableRow
            key={project.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell variant='footer' align="left">{project.id}</TableCell>
            <TableCell component="th"
                scope="row"
                onClick={() => router(`/projects/${project.id}`)}
                sx={{ color: '#5893F9', width: '30%' }}
            >
                {project.name}
            </TableCell>

            <TableCell component="th" scope="row" sx={{ width: '10%' }}>
                {project.projectType!.name}
            </TableCell>
            <TableCell component="th" scope="row" sx={{ display: 'flex' }} ref={techTableCellRef}>
                {project.technologyList.length > 3 ? (
                    <Box sx={{ m: 0, p: 0, overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
                        {
                            showTech.map((tech: ITechnology, index) => (
                                <Chip label={tech.name} sx={{ mr: '10px' }} id={`chipId${index}`} />
                            ))
                        }
                        <Chip label={`+${amountHideTech}`} />
                    </Box>
                ) : (
                    <Box sx={{ m: 0, p: 0, overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
                        {
                            project.technologyList.map((tech: ITechnology, index) => (
                                <Chip label={tech.name} sx={{ mr: '10px' }} id={`chipId${index}`} />
                            ))
                        }
                    </Box>
                )}
            </TableCell>
            <TableCell component="th" scope="row" sx={{ width: '15%' }}>
                {project.country}
            </TableCell>
            <TableCell align="right" key={project.id} sx={{ mr: 'auto', width: 0 }}>
                <Stack spacing='15px' direction="row" sx={{ mr: '30px' }} key={project.id}>
                    {/* <Button variant='text' onClick={() => handleClick(project)} key={project.id} >
                        <EditButton />
                    </Button> */}
                    <Button variant='text' onClick={handleOpenDelModal} id={project.id} >
                        <Delete />
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
}
export default TableItem
