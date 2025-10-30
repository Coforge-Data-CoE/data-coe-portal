import { FC } from "react";
import { DialogProps, Dialog as MuiDialog } from "@mui/material";

const Dialog: FC<DialogProps> = ({ open, children, ...rest }: DialogProps) => {
  return (
    <MuiDialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      //   TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...rest}
    >
      {children}
    </MuiDialog>
  );
};

export default Dialog;
