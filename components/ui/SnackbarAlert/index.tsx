import { FC } from "react";
import {
  Snackbar,
  Alert,
  SnackbarProps,
  AlertProps,
  AlertColor,
} from "@mui/material";
// import "./styles.scss";

export interface SnackbarAlertConfigType {
  show: boolean;
  message: string;
  severity: AlertColor;
}

type SnackbarAlertProps = {
  snackbarConfig: SnackbarProps;
  alertConfig: AlertProps;
};

const SnackbarAlert: FC<SnackbarAlertProps> = ({
  snackbarConfig: { open, message },
  alertConfig: { severity = "warning", variant = "filled" },
}: SnackbarAlertProps) => (
  <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
    <Alert severity={severity} variant={variant} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
