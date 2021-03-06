import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTypedSelector } from '../../redusers/useTypedSelector';
import { ITechnology } from '../../interfaces';

interface IChipSelect {
  tech: ITechnology[],
  setTech: (tech: ITechnology[]) => void
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ChipSelect: React.FC<IChipSelect> = ({ tech, setTech }) => {
  const technologies = useTypedSelector((state) => state.technologies.technologies);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (tech !== undefined) {
      tech.map((t) => (
        personName.push(t.name)
      ))
    }
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    var result: Array<ITechnology> = [];
    for (var i = 0; i < value.length; i++) {
      let foundTech = technologies.find(tech => tech.name === value[i])
      result.push(foundTech!);
    }
    setTech(result);
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <Select
          id="demo-multiple-chip"
          multiple
          displayEmpty
          value={personName}
          sx={{ width: '700px', height: '50px' }}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          //@ts-ignore
          renderValue={(selected) => {
            if (!selected.length) {
              return ('Select technologies');
            } else {
              return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            }
          }}
          MenuProps={MenuProps}
        >
          {technologies.map((technology) => (
            <MenuItem
              key={technology.name}
              value={technology.name}
              style={getStyles(technology.name, personName, theme)}
            >
              {technology.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export default ChipSelect