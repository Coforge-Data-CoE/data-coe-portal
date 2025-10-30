import { FC } from "react";
import { MenuItemProps, MenuItem as MuiMenuItem } from "@mui/material";

const MenuItem: FC<MenuItemProps> = ({ children }) => {
  return <MuiMenuItem>{children}</MuiMenuItem>;
};

export default MenuItem;
