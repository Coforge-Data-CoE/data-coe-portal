import { FC } from "react";
import {
  Box,
  LinearProgressProps,
  LinearProgress as MuiLinearProgress,
} from "@mui/material";
// import "./index.scss";

const LinearProgress: FC<LinearProgressProps> = ({
  variant = "indeterminate",
  color = "primary",
  value = 0,
  ...rest
}) => (
  <Box>
    <MuiLinearProgress
      color={color}
      variant={variant}
      value={value}
      {...rest}
    />
  </Box>
);

export default LinearProgress;
