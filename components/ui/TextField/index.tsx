import { FC } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputBaseProps,
  InputLabel,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";

type TextFieldProps = {
  label: string;
  name: string;
  type?: string;
  className?: string;
  placeholder?: string;
  handleChange?: InputBaseProps["onChange"];
  required?: boolean;
  error?: boolean;
  value?: string;
};

const TextField: FC<TextFieldProps> = ({
  label,
  name,
  placeholder,
  className,
  type = "text",
  value = "",
  handleChange,
  ...rest
}: TextFieldProps) => {
  return (
    <Box className={`form-textfield ${className}`}>
      <InputLabel
        sx={{ fontSize: "12px", color: "#313131", marginBottom: "10px" }}
      >
        {label}
      </InputLabel>
      <FormControl sx={{ display: "flex" }}>
        <Input
          sx={{ border: "1px solid #d9d9d9" }}
          name={name}
          placeholder={placeholder}
          className={className}
          type={type}
          onChange={handleChange}
          value={value}
          {...rest}
        />
      </FormControl>
      {rest?.required && rest?.error && (
        <Typography sx={{ fontSize: "12px", color: "error.main", mt: "3px" }}>
          Required
        </Typography>
      )}
    </Box>
  );
};

export default TextField;
