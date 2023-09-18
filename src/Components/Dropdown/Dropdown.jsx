import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import React from 'react';

const Dropdown = ({ name, value, onChange, list, label }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, width: '100%', margin: 0, p: 0 }}>
      <div className="text-[16px] opacity-[0.8] text-[#0b1c48] mb-[4px]">
        {label}
      </div>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        displayEmpty
        sx={{
          fontSize: '0.875rem',
          color: '#0b1c48',
          padding: '8.5px',
          paddingLeft: '12px',
        }}
      >
        {list &&
          list.map((item, i) => (
            <MenuItem value={item.name} key={i} sx={{ padding: '8px 12px' }}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
