import React, { ChangeEventHandler, useEffect } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Box, TextField } from '@mui/material';
import './DateField.css';

interface Iprops {
    item?: string,
    setItem?: ChangeEventHandler<HTMLInputElement>,
    index?: number,
    check?: boolean,
    label?: string,
    name?: string,
    minDate?: string,
    maxDate?: string
}

const DateField: React.FC<Iprops> = ({ item, setItem, index, check, label, name, minDate, maxDate }) => {

    const currentDate = new Date();
    const currentDateYear = currentDate.getFullYear();
    const currentDateMonth = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : `${currentDate.getMonth() + 1}`;
    const currentDateDay = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;
    const date = `${currentDateYear}-${currentDateMonth}-${currentDateDay}`;

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};

        const helperText: string = React.useMemo(() => {
            if (!item && check && index === 0) {
                return 'Empty field';
            }
            return '';
        }, [focused]);

        return <FormHelperText style={{ color: 'red', marginLeft: '12px' }}>{helperText}</FormHelperText>;
    }

    const [min, setMin] = React.useState<string>('1950-01-01');
    const [max, setMax] = React.useState<string>(date);

    useEffect(() => {
        minDate && setMin(minDate);
        maxDate && setMax(maxDate);
      }, [minDate, maxDate]);

    return (
        <Box sx={{ m: 0 }}>
            <TextField
                required
                error={item === '' && check && index === 0}
                id="date"
                label={label}
                type="date"
                InputProps={{ inputProps: { min: min, max: max } }}
                sx={{ width: '130px', mr: '10px', fontSize: '14px !important', mb: 0 }}
                InputLabelProps={{
                    shrink: true,
                }}
                name={name}
                value={item}
                onChange={setItem}
                onKeyDown={(e) => e.preventDefault()}
            />
            <MyFormHelperText />
        </Box>
    );
}

export default DateField