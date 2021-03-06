import React, { useEffect, useState } from 'react';
import WorkExpTable from './Items/WorkExpTable';
import Input from '../../Items/Input';
import CustomButton from '../../Items/CustomButton';
import ModalInput from '../../Items/ModalInput';
import DelInput from '../../../img/DelInput'
import { useAppDispatch, useTypedSelector } from '../../../redusers/useTypedSelector';
import { Box, Modal, Typography } from '@mui/material';
import { companiesActions } from '../../../actionsTypes/companiesActionTypes';
import PreviewPageTable from '../../Items/PreviewPages/PreviewPageTable';
import NoResult from '../../Items/Search/NoResult';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    borderRadius: '30px',
    boxShadow: 24,
    p: 4,
};

const WorkExperiencePage: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const [arrayCompanies, setarrayCompanies] = useState([""])
    const [company, setCompany] = React.useState('');
    const [ searchParam, setSearchParam ] = React.useState<string>('');
    const companies = useTypedSelector((state) => state.companies.companies);
    const load = useTypedSelector((state) => state.companies.isLoading.getAll);
    const result = useTypedSelector((state) => state.companies.result);

    useEffect(() => {
        dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
    }, [result, dispatch]);

    useEffect(() => {
        const listener = (event: { code: string; preventDefault: () => void; }) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                if (searchParam === '') {
                    dispatch({ type: companiesActions.GET_COMPANIES_REQUEST });
                } else {
                    dispatch({ type: companiesActions.SEARCH_COMPANIES_REQUEST, payload: searchParam });
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [searchParam]);

    const handleChangeCompany =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const editedArr = [...arrayCompanies];
      editedArr[index as number] = event.target.value;
      setarrayCompanies(editedArr);
    }; 
    
    const removeCompany = (index: number): void => {
        setarrayCompanies([...arrayCompanies.slice(0, index), ...arrayCompanies.slice(index + 1)]);
    };

    const [isDisabled, setIsDisabled] = React.useState(false);
    React.useEffect(() => {
        setIsDisabled(false)
        arrayCompanies.map((n) => {
            !n && setIsDisabled(true)
        });
    }, [arrayCompanies]);
    
    const addCompany = () => {
        const objArr= arrayCompanies.map(e => ({'Name': e}));
        dispatch( {type: companiesActions.ADD_COMPANY_REQUEST, payload: objArr});
        setarrayCompanies(['']);
        handleClose();
    }
    const handleAddCompany = () =>
        setarrayCompanies([...arrayCompanies, company])
    ;
    return (
        <>
            {!load ? (
                <Box sx={{ pl: '250px', pr: '35px' }}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box sx={{ m: '50px' }}>
                                <Typography sx={{ fontSize: '24px', color: '#535E6C', fontWeight: 800, mb: '40px' }}>
                                    Add Company
                                </Typography>
                                <Typography sx={{ fontSize: '16px', color: '#9EA9BA', fontWeight: 600, mb: '15px' }}>
                                    Company
                                </Typography>
                                {arrayCompanies.length && arrayCompanies.map((company, index) => (
                                    <Box key={index}>
                                        {index > 0 && (
                                            <Box sx={{ position: `relative`, left: `-35px`, top: `40px` }}>
                                                <DelInput index={index} removeItem={removeCompany} />
                                            </Box>
                                        )}
                                        <ModalInput placeholder="Company" item={company} setItem={handleChangeCompany(index)} index={index} />
                                    </Box>
                                ))}
                                <Box sx={{ mb: '35px' }}>
                                    <CustomButton variant="outlined" children='+ Add Company' onClick={handleAddCompany} />
                                </Box>
                                <Box>
                                    <CustomButton variant="contained" onClick={addCompany} children='Save Company' disabled={isDisabled} />
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                    <Typography sx={{ fontWeight: 800, fontSize: '24px', lineHeight: '33px', color: '#535E6C', mt: '35px', mb: '30px' }}>Work experience ({companies.length})</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Input setParam={setSearchParam} placeholder={"Search company"} />
                        <Box sx={{ marginLeft: 'auto' }}>
                            <CustomButton variant="contained" onClick={(handleOpen)} children='+ Add Company' />
                        </Box>
                    </Box>
                    { companies.length === 0 ? (
                        <NoResult />
                    ) : (
                        <WorkExpTable searchParam={searchParam} />
                    )}
                </Box>
            ) : (
                <PreviewPageTable />
            )}
        </>
    )
}
export default WorkExperiencePage