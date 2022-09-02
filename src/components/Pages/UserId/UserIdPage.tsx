import { Box, Button, Chip, CircularProgress, createTheme, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, styled, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { usersActions } from '../../../actionsTypes/usersActionTypes';
import UserModal from '../Users/Modal/UserModal';
import { ICV, IEducation, ITechnology, IUser, IWorkExperience } from '../../../interfaces';
import { useTypedSelector } from '../../../redusers/useTypedSelector';
import Photo from '../Users/Items/Photo';
import CVItem from '../CVs/Items/CVItem';
import { CVsActions } from '../../../actionsTypes/CVsActionTypes';
import { projectsActions } from '../../../actionsTypes/projectsActionTypes';
import DeleteModal from '../../Items/DeleteModal';
import Dot from '../../../img/Dot';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '25px'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const UserIdPage: React.FC = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const currentPath = location.pathname;
    const userId = Number(
        currentPath.substring(currentPath.lastIndexOf('/') + 1)
    );
    const AllCVs = useTypedSelector((state) => state.CVs.CVs);

    useEffect(() => {
        const getUser = (async () => {
            await dispatch({ type: usersActions.GET_USER_REQUEST, id: userId });
            await dispatch({ type: CVsActions.GET_CVS_REQUEST });
        })
        getUser()
    }, [dispatch]);

    const currentUser: IUser | undefined = useTypedSelector((state) => state.users.user);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openDelModal, setOpenDelModal] = useState(false);
    const handleOpenDelModal = () => setOpenDelModal(true);
    const handleCloseDelModal = () => setOpenDelModal(false);

    const screenWidth = window.screen.width;
    const [winWidthPadding, setWinWidthPadding] = useState<string>();

    useEffect(() => {
        if (screenWidth < 769) {
            setWinWidthPadding('35px')
        }
        else {
            setWinWidthPadding('250px')
        }
    }, [screenWidth]);

    return (
        <Box sx={{ pl: winWidthPadding, pr: '35px', pt: '35px' }}>
            {currentUser === undefined ? (
                <>
                    <CircularProgress></CircularProgress>
                </>
            ) : (
                <>
                    <UserModal open={open} handleClose={handleClose} editableUser={currentUser} />
                    <DeleteModal open={openDelModal} handleClose={handleCloseDelModal} id={userId} type={"user"} />
                    <ThemeProvider theme={lightTheme}>
                        <Stack spacing={2}>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", minWidth: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto', fontFamily: `"Nunito", sans-serif` }}>
                                        PROFILE
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ ml: '15px', mb: '20px', mt: '20px' }}>
                                    {(currentUser.photoParams !== null) ? (
                                        <Photo params={{ scale: currentUser.photoParams.scale, position: { x: currentUser.photoParams.positionX, y: currentUser.photoParams.positionY } }} photo={currentUser.photoUrl} />
                                    ) : (
                                        <Photo />
                                    )}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '23px', color: '#535E6C', mt: '35px', ml: '40px', mb: '15px', fontFamily: `"Nunito", sans-serif` }}>
                                        {currentUser.firstName} {currentUser.lastName}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#AFB5BF', mb: '37px', ml: '40px', mr: '40px', fontFamily: `"Nunito", sans-serif` }}>
                                        {currentUser.description}
                                    </Typography>
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", minWidth: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto', fontFamily: `"Nunito", sans-serif` }}>
                                        EDUCATION
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {
                                        currentUser.educationList.map((education: IEducation) => (
                                            <Box sx={{ mt: '35px', mb: '35px', ml: '40px', mr: '100px' }}>
                                                <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '20px', fontFamily: `"Nunito", sans-serif` }}>
                                                    {education.speciality}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '21.7px', color: '#AFB5BF', mb: '15px', fontFamily: `"Nunito", sans-serif` }}>
                                                    {education!.university!.name}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '21.7px', color: '#AFB5BF', fontFamily: `"Nunito", sans-serif` }}>
                                                    {education.startDate.substr(0, 4)} - {education.endDate.substr(0, 4)}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", minWidth: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto', fontFamily: `"Nunito", sans-serif` }}>
                                        WORK EXPERIENCE
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {
                                        currentUser.workExperienceList.map((workExperience: IWorkExperience) => (
                                            <Box sx={{ mt: '35px', mb: '35px', ml: '40px', mr: '50px', width: '300px' }}>
                                                <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '20px', fontFamily: `"Nunito", sans-serif` }}>
                                                    {workExperience.startDate.substr(0, 4)} - {workExperience.endDate.substr(0, 4)} | {workExperience.company!.name}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '20px', fontFamily: `"Nunito", sans-serif` }}>
                                                    {workExperience.position}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '21.7px', color: '#AFB5BF', fontFamily: `"Nunito", sans-serif` }}>
                                                    {workExperience.description}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", minWidth: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto', fontFamily: `"Nunito", sans-serif` }}>
                                        TECHNOLOGIES
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ mt: '35px', ml: '40px', mb: '35px' }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Box sx={{ width: '300px', minHeight: '100px' }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px', fontFamily: `"Nunito", sans-serif` }}>
                                                Front-end
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'front-end').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px', fontFamily: `"Nunito", sans-serif`, bgcolor: '#F0F2F5', color: '#9EA9BA', pr: '15px', pl: '15px', mb: '5px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                        <Box sx={{ width: '300px', minHeight: '100px' }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px', fontFamily: `"Nunito", sans-serif` }}>
                                                Databases
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'databases').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px', fontFamily: `"Nunito", sans-serif`, bgcolor: '#F0F2F5', color: '#9EA9BA', pr: '15px', pl: '15px', mb: '5px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Box sx={{ width: '300px', minHeight: '100px' }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px', fontFamily: `"Nunito", sans-serif` }}>
                                                Back-end
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'back-end').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px', fontFamily: `"Nunito", sans-serif`, bgcolor: '#F0F2F5', color: '#9EA9BA', pr: '15px', pl: '15px', mb: '5px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                        <Box sx={{ width: '300px', minHeight: '100px' }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px', fontFamily: `"Nunito", sans-serif` }}>
                                                Hosting
                                            </Typography>
                                            <Box>
                                                {
                                                    currentUser.technologyList.filter((tech) => tech.type === 'hosting').map((tech: ITechnology) => (
                                                        <Chip label={tech.name} sx={{ mr: '10px', fontFamily: `"Nunito", sans-serif`, bgcolor: '#F0F2F5', color: '#9EA9BA', pr: '15px', pl: '15px', mb: '5px' }} />
                                                    ))
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ width: '300px', minHeight: '100px' }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px', color: '#535E6C', mb: '15px', fontFamily: `"Nunito", sans-serif` }}>
                                            Other
                                        </Typography>
                                        <Box>
                                            {
                                                currentUser.technologyList.filter((tech) => tech.type === 'other').map((tech: ITechnology) => (
                                                    <Chip label={tech.name} sx={{ mr: '10px', fontFamily: `"Nunito", sans-serif`, bgcolor: '#F0F2F5', color: '#9EA9BA', pr: '15px', pl: '15px', mb: '5px' }} />
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", minWidth: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mr: '40px', ml: 'auto', fontFamily: `"Nunito", sans-serif` }}>
                                        SOFT SKILLS
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ mt: '35px', ml: '40px', mb: '35px' }}>
                                    <List>
                                        {
                                            currentUser.technologyList.filter((tech) => tech.type === 'soft skills').map((tech: ITechnology) => (
                                                <ListItem>
                                                    <ListItemIcon sx={{ minWidth: '20px' }} >
                                                        <Dot />
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ fontFamily: `"Nunito", sans-serif`, color: '#AFB5BF' }} primary={tech.name} primaryTypographyProps={{ fontFamily: `"Nunito", sans-serif` }} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Box>
                            </Item>
                            <Item elevation={4} sx={{ display: 'flex', p: 0 }}>
                                <Box sx={{ display: "flex", minWidth: '280px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#989CA8', mt: '35px', mb: '35px', mr: '40px', ml: 'auto', fontFamily: `"Nunito", sans-serif` }}>
                                        CV
                                    </Typography>
                                    <Divider orientation="vertical" sx={{ height: '100%' }} />
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: '30px', mb: '15px', mr: '30px', ml: '30px' }}>
                                    {AllCVs.filter((CV) => CV.userId === currentUser!.id).map((CV: ICV) => (
                                        <Box sx={{ mt: 0, mb: '15px', mr: 0, ml: 0 }}>
                                            <CVItem CV={CV} />
                                        </Box>
                                    ))}
                                </Box>
                            </Item>
                        </Stack>
                    </ThemeProvider>
                    <Box sx={{ ml: '307px', mt: '35px' }}>
                        <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#ECF2FC', color: '#5893F9', mr: '10px' }} >Edit</Button>
                        <Button variant="contained" onClick={handleOpenDelModal} sx={{ backgroundColor: '#F1F3F5', color: '#BAC1CC' }} >Delete</Button>
                    </Box>
                </>
            )
            }
        </Box >
    )
}
export default UserIdPage