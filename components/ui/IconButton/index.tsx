import { FC, ReactNode } from "react";
import { IconButtonProps, IconButton as MuiIconButton } from "@mui/material";

const IconButton: FC<IconButtonProps> = ({
  children,
  className,
  onClick,
}: IconButtonProps) => (
  <MuiIconButton className={className} onClick={onClick}>
    {children}
  </MuiIconButton>
);

export default IconButton;
