import React, { useEffect, useState } from 'react';
import EducationTable from './Items/EducationTable';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import { universitiesActions } from '../../../actionsTypes/universitiesActionTypes';
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, Typography } from '@mui/material';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';
import AddModal from '../../Items/AddModal';

const EducationPage: React.FC = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const [searchParam, setSearchParam] = useState<string>('');
    const universities = useTypedSelector((state) => state.universities.universities);
    const load = useTypedSelector((state) => state.universities.isLoading.getAll);
    const result = useTypedSelector((state) => state.projects.result);

    useEffect(() => {
        dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
    }, [result, dispatch]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: universitiesActions.GET_UNIVERSITIES_REQUEST });
                } else {
                    dispatch({ type: universitiesActions.SEARCH_UNIVERSITIES_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    return (
        <>
            {!load ? (
                <Box sx={{ pl: '250px', pr: '35px' }}>
                    <AddModal open={open} handleClose={handleClose} action={universitiesActions.ADD_UNIVERSITY_REQUEST} addName={'University'} />
                    <Box sx={{ m: 0, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Education </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#D0D4DA', mt: '35px', mb: '30px', ml: '5px' }}>({universities.length})</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search university"} width={300} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add University' />
                        </Box>
                    </Box>
                    {universities.length === 0 ? (
                        <NoResult />
                    ) : (
                        <EducationTable />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default EducationPage