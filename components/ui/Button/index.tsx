import { FC } from "react";
import { ButtonProps, Button as MuiButton } from "@mui/material";

const Button: FC<ButtonProps> = ({
  variant = "text",
  color,
  classes,
  children,
  disabled,
  startIcon,
  endIcon,
  sx,
  onClick,
  ...rest
}: ButtonProps) => (
  <MuiButton
    variant={variant}
    disabled={disabled}
    sx={sx}
    color={color}
    onClick={onClick}
    {...rest}
  >
    {startIcon}
    {children}
    {endIcon}
  </MuiButton>
);
export default Button;
