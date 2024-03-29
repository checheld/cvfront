import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText, styled } from '@mui/material';

interface ISelect {
    type: number,
    setType: any,
    check: boolean,
    index: number,
    placeholder: string,
    elements: any,
    selectName: string
}

const CustomSelect = styled(Select)(() => ({
    height: '50px',
    width: '700px',
    marginBottom: '0px',
    ['@media (max-width:1025px)']: {
        width: '505px',
    },
    ['@media (max-width:426px)']: {
        width: '300px',
    },
    ['@media (max-width:376px)']: {
        width: '250px',
    }
}))

const ModalFormControl: React.FC<ISelect> = ({ elements, selectName, type, setType, check, index, placeholder }) => {

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (!type && check && index === 0) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>;
    }

    return (
        <FormControl sx={{ mb: '20px' }}>
            <CustomSelect
                name={selectName}
                value={type}
                error={type === 0 && check && index === 0}
                onChange={setType}
                displayEmpty
            >
                <MenuItem value="0">
                    <span style={{ color: `#a7aaac`, fontSize: `14px` }}>
                        Select {placeholder}
                    </span>
                </MenuItem>
                {
                    (selectName === 'userId') ? (elements.map((el: any, key: number) => <MenuItem value={el.id} key={key}>{el.firstName} {el.lastName}</MenuItem>)) :
                        (elements.map((el: any, key: number) => <MenuItem value={el.id} key={key}>{el.name}</MenuItem>))

                }
            </CustomSelect>
            <MyFormHelperText />
        </FormControl>
    );
}
export default ModalFormControl