import React, { useEffect, useState } from 'react';
import CustomButtonFixed from '../../../Items/CustomButtonFixed';
import { useAppDispatch, useTypedSelector } from '../../../../redusers/useTypedSelector';
import { Box, Divider, Modal, SelectChangeEvent, styled, Typography } from '@mui/material';
import { IPhotoParams, ITechnology, IUser } from '../../../../interfaces';
import ChipSelect from '../../../Items/ChipSelect';
import DelInput from '../../../../img/DelInput';
import { usersActions } from '../../../../actionsTypes/usersActionTypes';
import Photo from '../Items/Photo';
import PhotoModal from './PhotoModal';
import ModalInput from '../../../Items/ModalInput';
import ModalFormControl from '../../../Items/ModalFormControl';
import DateField from '../../../Items/DateField';
import CloseIcon from "@mui/icons-material/Close";
import '../../../Components.css';
import ModalInputName from './Items/ModalInputName';
import ModalInputSpeciality from './Items/ModalInputSpeciality';
import ModalInputPosition from './Items/ModalInputPosition';
import ModalFormControlSmall from '../../../Items/ModalFormControlSmall';

interface IUserModal {
    open: boolean,
    handleClose: () => void,
    editableUser?: IUser,
}

const CustomDivider = styled(Divider)(() => ({
    border: '1px solid #E3E3EA',
    marginBottom: '40px',
    width: '698px',
    marginLeft: '0px',
    ['@media (max-width:1025px)']: {
        width: '495px'
    },
    ['@media (max-width:426px)']: {
        width: '300px'
    },
    ['@media (max-width:376px)']: {
        width: '250px'
    }
}))

const CustomBox = styled(Box)(() => ({
    display: 'flex',
    ['@media (max-width:1025px)']: {
        flexWrap: 'nowrap',
    },
    ['@media (max-width:426px)']: {
        flexWrap: 'wrap',
    }
}))

const CustomBoxDate = styled(Box)(() => ({
    display: 'flex',
    ['@media (max-width:376px)']: {
        flexWrap: 'wrap',
    }
}))

const initialParams: IPhotoParams = {
    scale: 1,
    position: {
        x: 0.5,
        y: 0.5,
    },
};
const UserModal: React.FC<IUserModal> = ({ open, handleClose, editableUser }) => {

    let universities = useTypedSelector((state) => state.universities.universities);
    let companies = useTypedSelector((state) => state.companies.companies);
    let url = useTypedSelector((state) => state.userPhotos.result.add);
    const [firstName, setFirstName] = useState('users');
    const [lastName, setLastName] = useState('users');
    const [description, setDescription] = useState('users');
    const [education, setEducation] = useState({ university: {'id': 0}, speciality: 'users', startDate: '2021-01-02', endDate: '2021-01-03' });
    const [arrayEducation, setArrayEducation] = useState([education]);
    const [workExperience, setWorkExperience] = useState({ company: {'id': 0}, position: 'users', startDate: '2021-01-02', endDate: '2021-01-03', description: 'users' });
    const [arrayWorkExperience, setArrayWorkExperience] = useState([workExperience]);
    const [tech, setTech] = useState<ITechnology[]>([]);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [params, setParams] = useState(initialParams);
    const [photo, setPhoto] = useState<string | null>(url);

    const handleOpenPhoto = () => setOpenPhoto(true);
    const handleClosePhoto = () => {
        setOpenPhoto(false);
    };

    const handleOpenPhotoModal = (e: any) => {
        e.stopPropagation();
        setPhoto(null);
    };

    useEffect(() => {
        if (url !== undefined && url !== null) {
            setPhoto(url)
        }
    }, [url]);

    const [check, setCheck] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        (firstName === '' || lastName === '' || description === '' || arrayEducation[0].university.id === 0
            || arrayEducation[0].speciality === '' || arrayEducation[0].startDate === '' || arrayEducation[0].endDate === ''
            || arrayWorkExperience[0].company.id === 0 || arrayWorkExperience[0].position === '' || arrayWorkExperience[0].description === ''
            || arrayWorkExperience[0].startDate === '' || arrayWorkExperience[0].endDate === ''
        ) && setIsError(true)
    }, [firstName, lastName, description, tech, arrayEducation, arrayWorkExperience]);

    const dispatch = useAppDispatch();
    const addUser = () => {
        const clearArrayEducation = arrayEducation.filter(el => el.university.id !== 0 && el.speciality !== "" && el.startDate !== "" && el.endDate !== "")
        const clearArrayWorkExperience = arrayWorkExperience.filter(el => el.company.id !== 0 && el.position !== "" && el.startDate !== "" && el.endDate !== "" && el.description !== "")
        const objUser = {
            'firstName': firstName,
            'lastName': lastName,
            'description': description,
            'educations': clearArrayEducation,
            'workExperiences': clearArrayWorkExperience,
            'technologies': tech,
            'photoUrl': url,
            'photoParams': params
        };

        dispatch({ type: usersActions.ADD_USER_REQUEST, payload: objUser });
        setFirstName('');
        setLastName('');
        setDescription('');
        setEducation({ university: {'id': 0}, speciality: '', startDate: '', endDate: '' });
        setArrayEducation([]);
        setWorkExperience({ company: {'id': 0}, position: '', startDate: '', endDate: '', description: '' });
        setArrayWorkExperience([]);
        setTech([]);
        setPhoto(null);
        setParams(initialParams);
        handleClose();
    };

    const editUser = () => {
        if (editableUser !== undefined) {
            const clearArrayEducation = arrayEducation.filter(el => el.university.id !== 0 && el.speciality !== "" && el.startDate !== "" && el.endDate !== "")
            const educationWithUserId = clearArrayEducation.map(ed => ({...ed, 'user': {'id': editableUser.id}}))
            const clearArrayWorkExperience = arrayWorkExperience.filter(el => el.company.id !== 0 && el.position !== "" && el.startDate !== "" && el.endDate !== "" && el.description !== "")
            const workExpWithUserId = clearArrayWorkExperience.map(we => ({...we, 'user': {'id': editableUser.id}}))

            const objUser = {
                'id': editableUser.id,
                'firstName': firstName,
                'lastName': lastName,
                'description': description,
                'educations': educationWithUserId,
                'workExperiences': workExpWithUserId,
                'technologies': tech, 
                'photoUrl': photo,
                'photoParams': params
            };

            dispatch({ type: usersActions.EDIT_USER_REQUEST, id: editableUser.id, payload: objUser });
            setFirstName('');
            setLastName('');
            setDescription('');
            setEducation({ university: {'id': 0}, speciality: '', startDate: '', endDate: '' });
            setArrayEducation([]);
            setWorkExperience({ company: {'id': 0}, position: '', startDate: '', endDate: '', description: '' });
            setArrayWorkExperience([]);
            setTech([]);
            setPhoto(null);
            setParams(initialParams);
            handleClose();
        }
    };
    useEffect(() => {
        if (editableUser !== undefined) {
            
            setFirstName(editableUser.firstName);
            setLastName(editableUser.lastName);
            setDescription(editableUser.description);
            editableUser.educations.length && setArrayEducation(editableUser.educations);
            editableUser.workExperiences.length && setArrayWorkExperience(editableUser.workExperiences);
            setTech(editableUser.technologies);
            setPhoto(editableUser.photoUrl);
            editableUser.photoParams && setParams(editableUser.photoParams)
            handleClose();
        }
    }, [editableUser]);

    const handleChangeFirstName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget.value.includes(" ")) {
            ev.currentTarget.value = ev.currentTarget.value.replace(/\s/g, "");
        }
        const {
            target: { value },
        } = ev;
        setFirstName(value);
    };
    const handleChangeLastName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget.value.includes(" ")) {
            ev.currentTarget.value = ev.currentTarget.value.replace(/\s/g, "");
        }
        const {
            target: { value },
        } = ev;
        setLastName(value);
    };
    const handleChangeDescription = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = ev;
        setDescription(value);
    };
    const handleChangeUniversity = (index: number) => (event: SelectChangeEvent) => {
        const currentEducation = arrayEducation[index];
        const editedArr = [...arrayEducation];
        editedArr[index as number] = { ...currentEducation, [event.target.name]: {id: Number(event.target.value)} };
        setArrayEducation(editedArr);
    };
    const handleChangeEducation = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentEducation = arrayEducation[index];
        const editedArr = [...arrayEducation];
        editedArr[index as number] = { ...currentEducation, [event.target.name]: event.target.value };
        setArrayEducation(editedArr);
    };
    const removeEducation = (index: number): void => {
        setArrayEducation([...arrayEducation.slice(0, index), ...arrayEducation.slice(index + 1)]);
    };
    const handleAddEducation = () => {
        setArrayEducation([...arrayEducation, education])
    };
    const handleChangeCompany = (index: number) => (event: SelectChangeEvent) => {
        const currentWorkExp = arrayWorkExperience[index];
        const editedArr = [...arrayWorkExperience];
        editedArr[index as number] = { ...currentWorkExp, [event.target.name]: {id: Number(event.target.value)} };
        setArrayWorkExperience(editedArr);
    };
    const handleChangeWorkExperience = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentWorkExp = arrayWorkExperience[index];
        const editedArr = [...arrayWorkExperience];
        editedArr[index as number] = { ...currentWorkExp, [event.target.name]: event.target.value };
        setArrayWorkExperience(editedArr);
    };
    const removeWorkExperience = (index: number): void => {
        setArrayWorkExperience([...arrayWorkExperience.slice(0, index), ...arrayWorkExperience.slice(index + 1)]);
    };
    const handleAddWorkExperience = () =>
        setArrayWorkExperience([...arrayWorkExperience, workExperience]
        );

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='modal'>
                <PhotoModal
                    handleClosePhoto={handleClosePhoto}
                    handleOpenPhotoModal={handleOpenPhotoModal}
                    openPhoto={openPhoto}
                    photo={photo}
                    params={params}
                    setParams={setParams}
                />
                <Box sx={{ m: '10px' }}>
                    {(editableUser === undefined) ? (
                        <Typography className='mainModalName'>
                            Add Users
                        </Typography>
                    ) : (
                        <Typography className='mainModalName'>
                            Edit Users
                        </Typography>
                    )}
                    <CloseIcon
                        className='closeIcon'
                        onClick={handleClose}
                    />
                    <Box className='scrollContainer' sx={{ pb: '20px' }}>
                        <Box>
                            <CustomBox>
                                <Box sx={{ mr: '35px', ml: 0, mt: 0, mb: '20px', p: 0 }}>
                                    <Box sx={{ ml: '15px', mb: '20px' }}>
                                        <Photo params={params} photo={photo} />
                                    </Box>
                                    <CustomButtonFixed variant="outlined"
                                        children={`+ ${editableUser ? "Edit " : "Add "}photo`}
                                        onClick={handleOpenPhoto}
                                    />
                                </Box>
                                <Box sx={{ m: 0, p: 0 }}>
                                    <Box sx={{ mr: '20px', mb: '25px' }}>
                                        <Typography className='inputTitle'>
                                            First name
                                        </Typography>
                                        <ModalInputName placeholder='First name'
                                            item={firstName}
                                            check={check}
                                            index={0}
                                            setItem={handleChangeFirstName}
                                        />
                                    </Box>
                                    <Box sx={{ mr: '20px', mb: '25px' }}>
                                        <Typography className='inputTitle'>
                                            Last name
                                        </Typography>
                                        <ModalInputName placeholder='Last name'
                                            item={lastName}
                                            check={check}
                                            index={0}
                                            setItem={handleChangeLastName}
                                        />
                                    </Box>
                                </Box>
                            </CustomBox>
                            <Box sx={{ mr: '20px', mb: '40px' }}>
                                <Typography className='inputTitle'>
                                    Description
                                </Typography>
                                <ModalInput placeholder='Description'
                                    item={description}
                                    check={check}
                                    index={0}
                                    height={100}
                                    setItem={handleChangeDescription}
                                    inputLength={500}
                                />
                            </Box>
                            <CustomDivider variant="inset" />
                            <Box>
                                <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                                    EDUCATION
                                </Typography>
                                {arrayEducation.length && arrayEducation.map((education, index) => (
                                    <Box sx={{ m: 0, p: 0 }} key={index}>
                                        {index > 0 && (
                                            <Box sx={{ position: 'relative', left: '-35px', top: '30px' }}>
                                                <DelInput index={index} removeItem={removeEducation} />
                                            </Box>
                                        )}
                                        <Typography className='inputTitle'>
                                            University
                                        </Typography>
                                        <ModalFormControl elements={universities}
                                            selectName={'university'}
                                            placeholder={'university'}
                                            type={education.university.id}
                                            setType={handleChangeUniversity(index)}
                                            check={check} index={index}
                                        />
                                        <CustomBox>
                                            <Box sx={{ mr: '16px' }}>
                                                <Typography className='inputTitle'>
                                                    Speciality
                                                </Typography>
                                                <ModalInputSpeciality item={education.speciality}
                                                    check={check}
                                                    index={index}
                                                    setItem={handleChangeEducation(index)}
                                                />
                                            </Box>
                                            <Box sx={{ mr: '16px' }}>
                                                <Typography className='inputTitle'>
                                                    Start date - End date
                                                </Typography>
                                                <CustomBoxDate>
                                                    <DateField item={education.startDate}
                                                        setItem={handleChangeEducation(index)}
                                                        maxDate={education.endDate}
                                                        label={"Start date"}
                                                        name={'startDate'}
                                                        check={check}
                                                        index={index}
                                                    />
                                                    <DateField item={education.endDate}
                                                        setItem={handleChangeEducation(index)}
                                                        minDate={education.startDate}
                                                        label={"End date"}
                                                        name={'endDate'}
                                                        check={check}
                                                        index={index}
                                                    />
                                                </CustomBoxDate>
                                            </Box>
                                        </CustomBox>
                                    </Box>
                                ))}
                                <Box sx={{ mb: '35px' }}>
                                    <CustomButtonFixed variant="outlined"
                                        children='+ Add Education'
                                        onClick={handleAddEducation}
                                    />
                                </Box>
                            </Box>
                            <CustomDivider variant="inset" />
                            <Box>
                                <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                                    WORK EXPERIENCE
                                </Typography>
                                {arrayWorkExperience.length && arrayWorkExperience.map((workExperience, index) => (
                                    <Box sx={{ m: 0, p: 0 }} key={index}>
                                        {index > 0 && (
                                            <Box sx={{ position: 'relative', left: '-35px', top: '30px' }}>
                                                <DelInput index={index} removeItem={removeWorkExperience} />
                                            </Box>
                                        )}
                                        <div className='modalInternalContainer'>
                                            <Box sx={{ mr: '20px' }}>
                                                <Typography className='inputTitle'>
                                                    Company name
                                                </Typography>
                                                <ModalFormControlSmall elements={companies}
                                                    selectName={'company'}
                                                    placeholder={'company'}
                                                    type={workExperience.company.id}
                                                    setType={handleChangeCompany(index)}
                                                    check={check} index={index}
                                                />
                                            </Box>
                                            <CustomBox>
                                                <Box sx={{ mr: '20px' }}>
                                                    <Typography className='inputTitle'>
                                                        Position
                                                    </Typography>
                                                    <ModalInputPosition item={workExperience.position}
                                                        check={check}
                                                        index={index}
                                                        setItem={handleChangeWorkExperience(index)}
                                                    />
                                                </Box>
                                                <Box sx={{ mr: '20px' }}>
                                                    <Typography className='inputTitle'>
                                                        Start date - End date
                                                    </Typography>
                                                    <CustomBoxDate>
                                                        <DateField item={workExperience.startDate} setItem={handleChangeWorkExperience(index)} check={check} index={index} label={"Start date"} name={'startDate'} />
                                                        <DateField item={workExperience.endDate} setItem={handleChangeWorkExperience(index)} check={check} index={index} label={"End date"} name={'endDate'} />
                                                    </CustomBoxDate>
                                                </Box>
                                            </CustomBox>
                                        </div>
                                        <Box sx={{ mr: '20px' }}>
                                            <Typography className='inputTitle'>
                                                Description
                                            </Typography>
                                            <ModalInput placeholder='Description'
                                                selectName={'description'}
                                                check={check}
                                                index={index}
                                                height={100}
                                                item={workExperience.description}
                                                setItem={handleChangeWorkExperience(index)}
                                                inputLength={500}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                                <Box sx={{ mb: '35px' }}>
                                    <CustomButtonFixed variant="outlined"
                                        children='+ Add Work Experience'
                                        onClick={handleAddWorkExperience}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <CustomDivider variant="inset" />
                        <Typography sx={{ fontSize: '16px', color: '#535E6C', fontWeight: 600, mb: '15px' }}>
                            TECHNOLOGIES
                        </Typography>
                        <Typography className='inputTitle'>
                            Skills
                        </Typography>
                        <ChipSelect tech={tech} setTech={setTech} check={check} />
                    </Box>
                    {(editableUser === undefined) ? (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
                            <CustomButtonFixed variant="contained"
                                children='Add User'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (addUser())
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ m: '30px 0 20px 40px' }}>
                            <CustomButtonFixed variant="contained"
                                children='Save User'
                                onClick={() => {
                                    if (isError) setCheck(true);
                                    else (editUser())
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </div>
        </Modal >
    )
}
export default UserModal