import { FC } from "react";
import { FormControl, Input as MuiInput, InputProps, Box } from "@mui/material";

const Input: FC<InputProps> = ({
  name,
  placeholder,
  className,
  type,
  inputRef,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <Box className={`dq-input`}>
      <FormControl sx={{ display: "flex" }}>
        <MuiInput
          name={name}
          placeholder={placeholder}
          className={className}
          type={type}
          onChange={onChange}
          inputRef={inputRef}
          {...rest}
        />
      </FormControl>
    </Box>
  );
};

export default Input;
