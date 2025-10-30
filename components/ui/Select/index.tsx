import { FC } from "react";
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  SelectProps as MuiSelectProps,
  MenuItem,
  Box,
  SelectChangeEvent,
} from "@mui/material";

type Value = string;

export type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: Array<Option>;
  name: string;
  handleChange: (
    event: SelectChangeEvent<Value>,
    child: React.ReactNode
  ) => void;
  value: string;
  error?: boolean;
};

const Select: FC<SelectProps> = ({
  name,
  options,
  label,
  value,
  handleChange,
}: SelectProps) => {
  return (
    <Box className="select-container">
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="select-report-label">{label}</InputLabel>
        <MuiSelect
          labelId={`select-${name}`}
          label={label}
          onChange={handleChange}
          name={name}
          value={value}
        >
          {options?.map((option) => (
            <MenuItem value={option?.value}>{option?.label}</MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
