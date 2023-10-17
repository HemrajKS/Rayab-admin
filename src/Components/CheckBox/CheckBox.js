import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 288,
    },
  },
};

export default function MultiSelect({ originalItem, item, label, updateItem }) {
  const handleChange = (value) => {
    updateItem(value, label);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, height: 48 }}>
        <InputLabel id="demo-multiple-checkbox-label">Add</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={item.map((obj) => obj.name)}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => {
            return selected.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {originalItem.map((name) => (
            <MenuItem
              key={name.name}
              value={name}
              onClick={() => handleChange(name)}
            >
              <Checkbox
                checked={item.some((person) => person.name === name.name)}
              />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
