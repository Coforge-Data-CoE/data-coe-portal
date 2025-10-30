import { ChangeEvent, FC } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./index.scss";

type RadioButtonsProps = {
  labelFirst: string;
  labelSecond: string;
  valueFirst: string;
  valueSecond: string;
  name: string;
  label?: string;
  className?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
};

const RadioButtons: FC<RadioButtonsProps> = ({
  labelFirst,
  labelSecond,
  valueFirst,
  valueSecond,
  name,
  label,
  className,
  handleChange,
}: RadioButtonsProps) => {
  return (
    <Box className={`dq-radio-buttons ${className}`}>
      <FormControl>
        {label && <FormLabel id={`${name}-label`}>{label}</FormLabel>}
        <RadioGroup
          row
          name={name}
          className="dq-radio-buttons"
          onChange={handleChange}
        >
          <FormControlLabel
            value={valueFirst}
            control={
              <Radio
                sx={{
                  color: "#d9d9d9",
                  "&.Mui-checked": {
                    color: "#ff7a45",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                  },
                }}
              />
            }
            label={labelFirst}
          />

          <FormControlLabel
            value={valueSecond}
            control={
              <Radio
                sx={{
                  color: "#d9d9d9",
                  "&.Mui-checked": {
                    color: "#ff7a45",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                  },
                }}
              />
            }
            label={labelSecond}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default RadioButtons;
