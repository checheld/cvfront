import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, createTheme, Paper, styled, ThemeProvider } from '@mui/material';
import CustomButton from '../../Items/CustomButton';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { usersActions } from '../../../actionsTypes/usersActionTypes';
import Input from '../../Items/Input';
import { useNavigate } from 'react-router-dom';
import UserModal from './Modal/UserModal';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { technologiesActions } from '../../../actionsTypes/technologiesActionTypes';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';
import Photo from './Items/Photo';
import NoResult from '../../Items/Search/NoResult';
import PreviewPageUser from '../../Items/PreviewPages/PreviewPageUser';
import { IUser } from '../../../interfaces';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '30px',
    width: '335px',
    mr: '6px',
    ['@media (min-width:780px)']: { width: '304px' },
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const UsersPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const router = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const allUsers = useTypedSelector((state) => state.users.users);
    const load = useTypedSelector((state) => state.users.isLoading.getAll);
    const isAdded = useTypedSelector((state) => state.users.isLoading.add);
    const del = useTypedSelector((state) => state.users.isLoading.delete);
    const edit = useTypedSelector((state) => state.users.isLoading.edit);
    const search = useTypedSelector((state) => state.users.isLoading.search);

    const [users, setUsers] = React.useState<IUser[]>([]);
    const [searchParam, setSearchParam] = useState<string>('');

    useEffect(() => {
        dispatch({ type: usersActions.GET_USERS_REQUEST });
        dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
        dispatch({ type: technologiesActions.GET_TECHNOLOGIES_REQUEST });
        dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        setUsers(allUsers)
    }, [load, isAdded, del, edit, search]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: usersActions.GET_USERS_REQUEST });
                } else {
                    dispatch({ type: usersActions.SEARCH_USERS_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    const screenWidth = window.screen.width;
    const [winWidthPadding, setWinWidthPadding] = useState<string>();
    const [inputSearchWidth, setInputSearchWidth] = useState<number>();
    const [widthButton, setWidthButton] = useState<string>();

    useEffect(() => {
        if (screenWidth < 769 && screenWidth > 425) {
            setWinWidthPadding('35px')
            setInputSearchWidth(300)
        } else if (screenWidth < 426) {
            setWinWidthPadding('35px')
            setInputSearchWidth(355)
            setWidthButton('355px')
        }
        else {
            setWidthButton('auto')
            setWinWidthPadding('250px')
            setInputSearchWidth(300)
        }
    }, [screenWidth]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: winWidthPadding, pr: '35px' }}>
                    <UserModal open={open} handleClose={handleClose} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Users </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({users.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Input setParam={setSearchParam} placeholder={"Search user"} width={inputSearchWidth!} />
                        <Box sx={{ marginLeft: 'auto', mb: '20px' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add User' width={widthButton} />
                        </Box>
                    </Box>
                    {users.length === 0 ? (
                        <NoResult />
                    ) : (
                        <Box sx={{
                            p: 2,
                            bgcolor: '#FBFBFB',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gridTemplateColumns: { md: '1fr 1fr' },
                            gap: 2,
                            padding: '0px'
                        }}>
                            <ThemeProvider theme={lightTheme}>
                                {users.map((user) => (
                                    <Item elevation={4} onClick={() => router(`/users/${user.id}`)}>
                                        <Box sx={{ m: 0, p: 0, justifyContent: 'center', display: 'flex', mb: '20px' }}>
                                            {(user.photoParams !== null) ? (
                                                <Photo params={{
                                                    scale: user.photoParams.scale,
                                                    position: { x: user.photoParams.positionX, y: user.photoParams.positionY }
                                                }}
                                                    photo={user.photoUrl} />
                                            ) : (
                                                <Photo />
                                            )}
                                        </Box>
                                        <Typography sx={{
                                            fontWeight: 600,
                                            fontSize: '18px',
                                            lineHeight: '24.5px',
                                            color: '#535E6C',
                                            mb: '25px',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            fontFamily: `"Nunito", sans-serif`
                                        }}>
                                            {user.firstName} {user.lastName}
                                        </Typography>
                                        <Typography sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            lineHeight: '22px',
                                            color: '#AFB5BF',
                                            height: '115px',
                                            mb: '25px',
                                            overflow: 'hidden',
                                            fontFamily: `"Nunito", sans-serif`
                                        }}>
                                            {user.description}
                                        </Typography>
                                        <Button variant="contained"
                                            onClick={handleOpen}
                                            sx={{
                                                backgroundColor: '#ECF2FC',
                                                color: '#5893F9',
                                                textTransform: 'capitalize',
                                                width: '88px',
                                                height: '45px',
                                                fontFamily: `"Nunito", sans-serif`,
                                                ':hover': { bgcolor: '#ECF2FD', }
                                            }}>
                                            More
                                        </Button>
                                    </Item>
                                ))}
                            </ThemeProvider>
                        </Box>
                    )}
                </Box>
            ) : (
                <PreviewPageUser />
            )}
        </>
    )
}
export default UsersPage