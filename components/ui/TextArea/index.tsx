import { FC } from "react";
import {
  Box,
  FormControl,
  InputBaseProps,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import "./index.scss";
import { COLORS } from "../../../assets/static/colors";

type TextAreaProps = {
  label: string;
  name: string;
  placeholder?: string;
  handleChange: InputBaseProps["onChange"];
  required?: boolean;
  error?: boolean;
};

const TextArea: FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  handleChange,
  ...rest
}: TextAreaProps) => {
  return (
    <Box className="dq-form-textarea">
      <InputLabel
        sx={{ fontSize: "13px", color: "#313131", marginBottom: "10px" }}
      >
        {label}
      </InputLabel>
      <FormControl sx={{ display: "flex" }}>
        <TextareaAutosize
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
        />
      </FormControl>
      {rest?.required && rest?.error && (
        <Typography sx={{ fontSize: "12px", color: COLORS?.error, mt: "3px" }}>
          Required
        </Typography>
      )}
    </Box>
  );
};

export default TextArea;
